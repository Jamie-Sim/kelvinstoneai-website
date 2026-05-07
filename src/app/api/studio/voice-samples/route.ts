import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type Body = {
  label?: unknown;
  sampleText?: unknown;
};

function pickString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export async function GET() {
  const { data, error } = await supabaseAdmin()
    .from("studio_voice_samples")
    .select("id, label, sample_text, created_at, updated_at")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[/api/studio/voice-samples] list failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load voice samples." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, samples: data ?? [] });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }
  const label = pickString(body.label);
  const sampleText = pickString(body.sampleText);
  if (!label || !sampleText) {
    return NextResponse.json(
      { ok: false, error: "label and sampleText are required." },
      { status: 400 },
    );
  }
  const { data, error } = await supabaseAdmin()
    .from("studio_voice_samples")
    .insert({ label, sample_text: sampleText })
    .select("id, label, sample_text, created_at, updated_at")
    .single();
  if (error || !data) {
    console.error("[/api/studio/voice-samples] insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save voice sample." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, sample: data });
}
