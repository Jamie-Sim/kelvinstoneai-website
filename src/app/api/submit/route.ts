import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "name",
  "email",
  "phone",
  "business_name",
  "business_type",
  "location",
] as const;

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Server misconfigured: webhook URL missing." },
      { status: 500 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const missing = REQUIRED_FIELDS.filter(
    (key) => typeof payload[key] !== "string" || !(payload[key] as string).trim(),
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const body = {
    ...payload,
    source: "kelvinstone.ai",
    submitted_at: new Date().toISOString(),
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: `Webhook returned ${upstream.status}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to reach webhook." },
      { status: 502 },
    );
  }
}
