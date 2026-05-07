import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type Body = {
  generationId?: unknown;
  label?: unknown;
  content?: unknown;
};

function flattenContent(
  format: string,
  content: Record<string, unknown>,
): string {
  if (format === "blog") {
    const title = String(content.title ?? "");
    const excerpt = String(content.excerpt ?? "");
    const body = String(content.body_md ?? "");
    return [title, excerpt, body].filter(Boolean).join("\n\n");
  }
  if (format === "linkedin") return String(content.body ?? "");
  if (format === "x_thread") {
    const tweets = (content.tweets as string[]) ?? [];
    return tweets.join("\n\n");
  }
  return JSON.stringify(content);
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

  const generationId =
    typeof body.generationId === "string" ? body.generationId : null;
  if (!generationId) {
    return NextResponse.json(
      { ok: false, error: "generationId is required." },
      { status: 400 },
    );
  }

  const supabase = supabaseAdmin();
  const { data: gen, error: genError } = await supabase
    .from("generations")
    .select("id, format, content")
    .eq("id", generationId)
    .single();
  if (genError || !gen) {
    return NextResponse.json(
      { ok: false, error: "Generation not found." },
      { status: 404 },
    );
  }

  // Prefer the client-supplied content (Jamie's local edits) if provided;
  // otherwise fall back to whatever's stored on the row.
  const content =
    typeof body.content === "object" && body.content !== null
      ? (body.content as Record<string, unknown>)
      : (gen.content as Record<string, unknown>);

  const sampleText = flattenContent(gen.format, content).trim();
  if (!sampleText) {
    return NextResponse.json(
      { ok: false, error: "Generation content is empty — nothing to save." },
      { status: 400 },
    );
  }

  const label =
    typeof body.label === "string" && body.label.trim()
      ? body.label.trim()
      : `${gen.format} exemplar · ${new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`;

  const { data, error } = await supabase
    .from("studio_voice_samples")
    .insert({
      label: label.slice(0, 200),
      sample_text: sampleText,
      source_kind: "saved_generation",
      source_id: gen.id,
    })
    .select("id, label, sample_text, created_at, updated_at")
    .single();

  if (error || !data) {
    console.error(
      "[/api/studio/voice-samples/from-generation] insert failed",
      error,
    );
    return NextResponse.json(
      { ok: false, error: "Failed to save voice sample." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, sample: data });
}
