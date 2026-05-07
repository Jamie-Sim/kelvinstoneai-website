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
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .insert({
      source_type: "blog",
      source_blog_id: blogId,
      raw_input: rawInput,
      title: `Repurpose: ${post.title.slice(0, 60)}`,
    })
    .select("id")
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
      });
    } else if (format === "x_thread") {
      result = await generateXThread({ rawInput, sourceType: "blog" });
    } else {
      result = await generateBlog({ rawInput, sourceType: "blog" });
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
