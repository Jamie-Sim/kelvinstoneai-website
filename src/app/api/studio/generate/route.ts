import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  type GenerateInput,
  type GenerationFormat,
  generateBlog,
  generateLinkedIn,
  generateXThread,
} from "@/lib/ai/generate";
import { researchIdea } from "@/lib/ai/research";

export const runtime = "nodejs";
export const maxDuration = 120;

type Body = {
  ideaId?: unknown;
  format?: unknown;
  refineNote?: unknown;
  previousGenerationId?: unknown;
};

const VALID_FORMATS: GenerationFormat[] = ["blog", "linkedin", "x_thread"];

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

  const ideaId = typeof body.ideaId === "string" ? body.ideaId : null;
  const format = body.format as GenerationFormat;
  if (!ideaId || !VALID_FORMATS.includes(format)) {
    return NextResponse.json(
      { ok: false, error: "ideaId and a valid format are required." },
      { status: 400 },
    );
  }
  const refineNote =
    typeof body.refineNote === "string" && body.refineNote.trim()
      ? body.refineNote.trim()
      : null;
  const previousGenerationId =
    typeof body.previousGenerationId === "string"
      ? body.previousGenerationId
      : null;

  const supabase = supabaseAdmin();
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select(
      "id, source_type, source_url, raw_input, notes, research_notes, research_done_at",
    )
    .eq("id", ideaId)
    .single();
  if (ideaError || !idea) {
    return NextResponse.json(
      { ok: false, error: "Idea not found." },
      { status: 404 },
    );
  }

  // Research the idea once on first generation; cache for all future formats
  // and refines. Web search lives ONLY in the research call — generation
  // calls keep strict structured output.
  let researchNotes: string | null = idea.research_notes ?? null;
  if (!idea.research_done_at) {
    try {
      const sourceLabel =
        idea.source_type === "youtube"
          ? `YouTube transcript${idea.source_url ? ` from ${idea.source_url}` : ""}`
          : idea.source_type === "blog"
          ? "Existing published blog post"
          : "Brain-dump from Jamie";
      const research = await researchIdea({
        rawInput: idea.raw_input,
        sourceLabel,
      });
      researchNotes = research.notes;
      await supabase
        .from("ideas")
        .update({
          research_notes: research.notes,
          research_done_at: new Date().toISOString(),
          research_cost_usd: research.costUsd,
        })
        .eq("id", ideaId);
    } catch (err) {
      console.error("[/api/studio/generate] research failed — continuing without", err);
      // Mark research as attempted so we don't keep retrying. Save a marker.
      await supabase
        .from("ideas")
        .update({
          research_notes: `RESEARCH_FAILED: ${(err as Error).message}`,
          research_done_at: new Date().toISOString(),
        })
        .eq("id", ideaId);
      researchNotes = null;
    }
  }

  let previousContent: unknown = undefined;
  let carryImageUrl: string | null = null;
  let carryImagePrompt: string | null = null;
  if (previousGenerationId) {
    const { data: prev } = await supabase
      .from("generations")
      .select("content, image_url, image_prompt")
      .eq("id", previousGenerationId)
      .single();
    if (prev) {
      previousContent = prev.content;
      // Carry forward the image so refining text doesn't visually nuke it.
      carryImageUrl = prev.image_url ?? null;
      carryImagePrompt = prev.image_prompt ?? null;
    }
  }

  const input: GenerateInput = {
    rawInput: idea.raw_input,
    sourceType: idea.source_type,
    notes: idea.notes,
    refineNote,
    previousContent,
    researchNotes,
  };

  let result;
  try {
    if (format === "blog") result = await generateBlog(input);
    else if (format === "linkedin") result = await generateLinkedIn(input);
    else result = await generateXThread(input);
  } catch (err) {
    console.error("[/api/studio/generate] AI call failed", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 502 },
    );
  }

  const { data: row, error: insertError } = await supabase
    .from("generations")
    .insert({
      idea_id: ideaId,
      format,
      status: "draft",
      content: result.content,
      original_content: result.content,
      model: result.metadata.model,
      cost_usd: result.metadata.costUsd,
      image_url: carryImageUrl,
      image_prompt: carryImagePrompt,
    })
    .select("*")
    .single();
  if (insertError || !row) {
    console.error("[/api/studio/generate] insert failed", insertError);
    return NextResponse.json(
      { ok: false, error: "Failed to save generation." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    generation: row,
    cacheReadTokens: result.metadata.cacheReadTokens,
    cacheWriteTokens: result.metadata.cacheWriteTokens,
  });
}
