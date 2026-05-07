import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { type ImagePreset, generateImage, refineImage } from "@/lib/ai/image";
import { writeImagePrompt } from "@/lib/ai/generate";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  targetType?: unknown;
  targetId?: unknown;
  prompt?: unknown;
  preset?: unknown;
  refineNote?: unknown;
};

const VALID_PRESETS: ImagePreset[] = ["blog-hero", "linkedin-square"];

function summariseBlog(row: { title: string; excerpt: string; body_md: string }): string {
  const intro = row.body_md.slice(0, 600);
  return `Title: ${row.title}\nExcerpt: ${row.excerpt}\nOpening: ${intro}`;
}

function summariseGenerationContent(content: unknown): string {
  if (typeof content === "object" && content !== null) {
    const c = content as Record<string, unknown>;
    if (typeof c.body === "string") return c.body.slice(0, 800);
    if (Array.isArray(c.tweets)) return (c.tweets as string[]).join("\n\n").slice(0, 800);
    if (typeof c.body_md === "string") return c.body_md.slice(0, 800);
  }
  return String(content).slice(0, 800);
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

  const targetType = body.targetType;
  const targetId = typeof body.targetId === "string" ? body.targetId : null;
  const preset = body.preset as ImagePreset;
  let prompt =
    typeof body.prompt === "string" && body.prompt.trim()
      ? body.prompt.trim()
      : null;
  const refineNote =
    typeof body.refineNote === "string" && body.refineNote.trim()
      ? body.refineNote.trim()
      : null;

  if (
    (targetType !== "blog" && targetType !== "generation") ||
    !targetId ||
    !VALID_PRESETS.includes(preset)
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "targetType ('blog'|'generation'), targetId and a valid preset are required.",
      },
      { status: 400 },
    );
  }

  const supabase = supabaseAdmin();

  // Refinement path: image-to-image edit. Pulls the existing image off the
  // target row and asks Gemini to apply just the requested changes.
  if (refineNote) {
    const imageColumn =
      targetType === "blog" ? "hero_image_url" : "image_url";
    const promptColumn =
      targetType === "blog" ? "hero_image_prompt" : "image_prompt";
    const table = targetType === "blog" ? "blog_posts" : "generations";

    const { data: existing, error: fetchError } = await supabase
      .from(table)
      .select(`${imageColumn}, ${promptColumn}`)
      .eq("id", targetId)
      .single<Record<string, string | null>>();
    if (fetchError || !existing) {
      return NextResponse.json(
        { ok: false, error: "Target row not found." },
        { status: 404 },
      );
    }
    const previousImageUrl = existing[imageColumn];
    if (!previousImageUrl) {
      return NextResponse.json(
        {
          ok: false,
          error: "No existing image to refine. Generate one first, then refine.",
        },
        { status: 422 },
      );
    }

    let image;
    try {
      image = await refineImage({
        previousImageUrl,
        refineNote,
        preset,
      });
    } catch (err) {
      console.error("[/api/studio/generate-image] refine failed", err);
      return NextResponse.json(
        { ok: false, error: (err as Error).message },
        { status: 502 },
      );
    }

    const previousPrompt = existing[promptColumn] ?? "";
    const nextPrompt = previousPrompt
      ? `${previousPrompt}\n\n[refine] ${refineNote}`
      : `[refine] ${refineNote}`;

    const updateRow =
      targetType === "blog"
        ? { hero_image_url: image.publicUrl, hero_image_prompt: nextPrompt }
        : { image_url: image.publicUrl, image_prompt: nextPrompt };

    const { error: updateError } = await supabase
      .from(table)
      .update(updateRow)
      .eq("id", targetId);
    if (updateError) {
      console.error(
        "[/api/studio/generate-image] refine row update failed",
        updateError,
      );
      return NextResponse.json(
        { ok: false, error: "Image refined but row update failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      imageUrl: image.publicUrl,
      storagePath: image.storagePath,
      prompt: nextPrompt,
      refined: true,
    });
  }

  if (!prompt) {
    let summary: string;
    if (targetType === "blog") {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, excerpt, body_md")
        .eq("id", targetId)
        .single();
      if (error || !data) {
        return NextResponse.json(
          { ok: false, error: "Blog post not found." },
          { status: 404 },
        );
      }
      summary = summariseBlog(data);
    } else {
      const { data, error } = await supabase
        .from("generations")
        .select("content")
        .eq("id", targetId)
        .single();
      if (error || !data) {
        return NextResponse.json(
          { ok: false, error: "Generation not found." },
          { status: 404 },
        );
      }
      summary = summariseGenerationContent(data.content);
    }
    try {
      prompt = await writeImagePrompt({
        format: preset,
        contentSummary: summary,
      });
    } catch (err) {
      console.error("[/api/studio/generate-image] prompt write failed", err);
      return NextResponse.json(
        { ok: false, error: (err as Error).message },
        { status: 502 },
      );
    }
  }

  let image;
  try {
    image = await generateImage({ prompt, preset });
  } catch (err) {
    console.error("[/api/studio/generate-image] image gen failed", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 502 },
    );
  }

  const updateRow =
    targetType === "blog"
      ? { hero_image_url: image.publicUrl, hero_image_prompt: prompt }
      : { image_url: image.publicUrl, image_prompt: prompt };
  const table = targetType === "blog" ? "blog_posts" : "generations";

  const { error: updateError } = await supabase
    .from(table)
    .update(updateRow)
    .eq("id", targetId);
  if (updateError) {
    console.error("[/api/studio/generate-image] target update failed", updateError);
    return NextResponse.json(
      { ok: false, error: "Image generated but row update failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    imageUrl: image.publicUrl,
    storagePath: image.storagePath,
    prompt,
  });
}
