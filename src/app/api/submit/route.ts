import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "name",
  "email",
  "phone",
  "business_name",
  "business_type",
  "team_size",
  "location",
] as const;

type LeadRow = {
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  team_size: string;
  location: string;
  ideal_outcome: string | null;
  source: string;
};

function pickString(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function buildEmailHtml(lead: LeadRow & { id: string; created_at: string }): string {
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Business name", lead.business_name],
    ["Business type", lead.business_type],
    ["Team size", lead.team_size],
    ["Location", lead.location],
    ["Ideal outcome", lead.ideal_outcome ?? "—"],
    ["Source", lead.source],
    ["Submitted at", lead.created_at],
    ["Lead ID", lead.id],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap"><strong>${label}</strong></td><td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;color:#111;max-width:600px"><h2 style="margin:0 0 16px">New Kelvinstone lead</h2><table style="border-collapse:collapse;font-size:14px;line-height:1.4">${tableRows}</table></body></html>`;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Form labels use en-dashes for readability; Airtable picklist uses hyphens.
const TEAM_SIZE_TO_AIRTABLE: Record<string, string> = {
  "Just me": "Just me",
  "2 – 5": "2-5",
  "6 – 15": "6-15",
  "16 – 50": "16-50",
  "50+": "50+",
};

async function postToAirtable(
  lead: LeadRow,
  env: { token: string; baseId: string; tableId: string },
): Promise<void> {
  const teamSizeChoice = TEAM_SIZE_TO_AIRTABLE[lead.team_size] ?? lead.team_size;
  const fields: Record<string, unknown> = {
    "Name": lead.name,
    "Email": lead.email,
    "Phone Number": lead.phone,
    "Business Name": lead.business_name,
    "Business Type": lead.business_type,
    "Team Size": [teamSizeChoice],
    "Location": lead.location,
  };
  if (lead.ideal_outcome) fields["Ideal Outcome"] = lead.ideal_outcome;

  const res = await fetch(
    `https://api.airtable.com/v0/${env.baseId}/${env.tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable POST ${res.status}: ${body}`);
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const required: Partial<Record<(typeof REQUIRED_FIELDS)[number], string>> = {};
  const missing: string[] = [];
  for (const key of REQUIRED_FIELDS) {
    const value = pickString(payload, key);
    if (!value) missing.push(key);
    else required[key] = value;
  }
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const lead: LeadRow = {
    name: required.name!,
    email: required.email!,
    phone: required.phone!,
    business_name: required.business_name!,
    business_type: required.business_type!,
    team_size: required.team_size!,
    location: required.location!,
    ideal_outcome: pickString(payload, "ideal_outcome"),
    source: "kelvinstone.ai",
  };

  let inserted: { id: string; created_at: string };
  try {
    const { data, error } = await supabaseAdmin()
      .from("leads")
      .insert(lead)
      .select("id, created_at")
      .single();
    if (error || !data) {
      console.error("[/api/submit] Supabase insert failed", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save lead." },
        { status: 502 },
      );
    }
    inserted = data;
  } catch (err) {
    console.error("[/api/submit] Supabase insert threw", err);
    return NextResponse.json(
      { ok: false, error: "Failed to save lead." },
      { status: 502 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (apiKey && to && from) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: lead.email,
        subject: `New Kelvinstone lead: ${lead.name} (${lead.business_name})`,
        html: buildEmailHtml({ ...lead, id: inserted.id, created_at: inserted.created_at }),
      });
      if (error) {
        console.error("[/api/submit] Resend returned error", error);
      }
    } catch (err) {
      console.error("[/api/submit] Resend threw", err);
    }
  } else {
    console.warn("[/api/submit] Resend env vars missing — skipping notification email");
  }

  const airtableToken = process.env.AIRTABLE_TOKEN;
  const airtableBase = process.env.AIRTABLE_BASE_ID;
  const airtableTable = process.env.AIRTABLE_TABLE_ID;
  if (airtableToken && airtableBase && airtableTable) {
    try {
      await postToAirtable(lead, {
        token: airtableToken,
        baseId: airtableBase,
        tableId: airtableTable,
      });
    } catch (err) {
      console.error("[/api/submit] Airtable write failed", err);
    }
  } else {
    console.warn("[/api/submit] Airtable env vars missing — skipping CRM sync");
  }

  return NextResponse.json({ ok: true });
}
