import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { TranscriptUnavailableError, fetchTranscript } from "@/lib/youtube";

export const runtime = "nodejs";

type Body = {
  sourceType?: unknown;
  sourceUrl?: unknown;
  rawInput?: unknown;
  notes?: unknown;
  title?: unknown;
};

function pickString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
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

  const sourceType = pickString(body.sourceType);
  if (sourceType !== "youtube" && sourceType !== "text") {
    return NextResponse.json(
      { ok: false, error: "sourceType must be 'youtube' or 'text'." },
      { status: 400 },
    );
  }

  const sourceUrl = pickString(body.sourceUrl);
  let rawInput = pickString(body.rawInput);
  const notes = pickString(body.notes);
  const title = pickString(body.title);
  const transcriptUnavailable = false;

  if (sourceType === "youtube") {
    if (!rawInput) {
      if (!sourceUrl) {
        return NextResponse.json(
          { ok: false, error: "sourceUrl required for YouTube ideas." },
          { status: 400 },
        );
      }
      try {
        rawInput = await fetchTranscript(sourceUrl);
      } catch (err) {
        if (err instanceof TranscriptUnavailableError) {
          return NextResponse.json(
            {
              ok: false,
              transcriptUnavailable: true,
              error: err.message,
            },
            { status: 422 },
          );
        }
        throw err;
      }
    }
  }

  if (!rawInput) {
    return NextResponse.json(
      { ok: false, error: "rawInput required (or paste a transcript)." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin()
    .from("ideas")
    .insert({
      source_type: sourceType,
      source_url: sourceUrl,
      raw_input: rawInput,
      notes,
      title: title ?? deriveTitle(rawInput),
    })
    .select("id, created_at, title, source_type, source_url")
    .single();

  if (error || !data) {
    console.error("[/api/studio/ideas] insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save idea." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, idea: data, transcriptUnavailable });
}

function deriveTitle(input: string): string {
  const firstLine = input.split(/\n/)[0]?.trim() ?? "";
  if (firstLine.length === 0) return "Untitled idea";
  return firstLine.slice(0, 80);
}
