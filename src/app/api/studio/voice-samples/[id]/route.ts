import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type Body = {
  label?: unknown;
  sampleText?: unknown;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }
  const updates: Record<string, unknown> = {};
  if (typeof body.label === "string" && body.label.trim()) {
    updates.label = body.label.trim();
  }
  if (typeof body.sampleText === "string" && body.sampleText.trim()) {
    updates.sample_text = body.sampleText.trim();
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nothing to update." },
      { status: 400 },
    );
  }
  const { data, error } = await supabaseAdmin()
    .from("studio_voice_samples")
    .update(updates)
    .eq("id", id)
    .select("id, label, sample_text, created_at, updated_at")
    .single();
  if (error || !data) {
    console.error("[/api/studio/voice-samples/[id]] patch failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update voice sample." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, sample: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error } = await supabaseAdmin()
    .from("studio_voice_samples")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("[/api/studio/voice-samples/[id]] delete failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete voice sample." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
