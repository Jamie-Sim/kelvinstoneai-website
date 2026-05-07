import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  type GenerationFormat,
  generateBlog,
  generateLinkedIn,
  generateXThread,
} from "@/lib/ai/generate";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  blogId?: unknown;
  format?: unknown;
};

const VALID_FORMATS: GenerationFormat[] = ["linkedin", "x_thread"];

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

  const blogId = typeof body.blogId === "string" ? body.blogId : null;
  const format = body.format as GenerationFormat;
  if (!blogId || !VALID_FORMATS.includes(format)) {
    return NextResponse.json(
      { ok: false, error: "blogId and format ('linkedin'|'x_thread') required." },
      { status: 400 },
    );
  }

  const supabase = supabaseAdmin();
  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select("id, title, excerpt, body_md")
    .eq("id", blogId)
    .single();
  if (postError || !post) {
    return NextResponse.json(
      { ok: false, error: "Blog post not found." },
      { status: 404 },
    );
  }

  const rawInput = `# ${post.title}\n\n${post.excerpt}\n\n${post.body_md}`;

  // Find the original idea so we can carry forward its research notes —
  // the published blog was already grounded, no need to research again.
  const { data: originalIdea } = await supabase
    .from("ideas")
    .select("research_notes, research_done_at, research_cost_usd")
    .eq("source_blog_id", blogId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .insert({
      source_type: "blog",
      source_blog_id: blogId,
      raw_input: rawInput,
      title: `Repurpose: ${post.title.slice(0, 60)}`,
      // Inherit research from the original idea if we have it. Otherwise
      // mark as done with a skip marker — the blog body is already vetted
      // content, no need to spend on re-research.
      research_notes:
        originalIdea?.research_notes ??
        "NO_RESEARCH_NEEDED: source is a published blog post (already grounded).",
      research_done_at:
        originalIdea?.research_done_at ?? new Date().toISOString(),
      research_cost_usd: originalIdea?.research_cost_usd ?? 0,
    })
    .select("id, research_notes")
    .single();
  if (ideaError || !idea) {
    console.error("[/api/studio/repurpose] idea insert failed", ideaError);
    return NextResponse.json(
      { ok: false, error: "Failed to seed repurpose idea." },
      { status: 502 },
    );
  }

  let result;
  try {
    if (format === "linkedin") {
      result = await generateLinkedIn({
        rawInput,
        sourceType: "blog",
        researchNotes: idea.research_notes,
      });
    } else if (format === "x_thread") {
      result = await generateXThread({
        rawInput,
        sourceType: "blog",
        researchNotes: idea.research_notes,
      });
    } else {
      result = await generateBlog({
        rawInput,
        sourceType: "blog",
        researchNotes: idea.research_notes,
      });
    }
  } catch (err) {
    console.error("[/api/studio/repurpose] AI call failed", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 502 },
    );
  }

  const { data: gen, error: genError } = await supabase
    .from("generations")
    .insert({
      idea_id: idea.id,
      format,
      status: "draft",
      content: result.content,
      original_content: result.content,
      model: result.metadata.model,
      cost_usd: result.metadata.costUsd,
    })
    .select("*")
    .single();
  if (genError || !gen) {
    console.error("[/api/studio/repurpose] generation insert failed", genError);
    return NextResponse.json(
      { ok: false, error: "Failed to save generation." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, ideaId: idea.id, generation: gen });
}
