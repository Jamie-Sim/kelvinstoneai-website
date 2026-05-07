import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

type Body = { generationId?: unknown };

type BlogContent = {
  title?: string;
  slug?: string;
  excerpt?: string;
  body_md?: string;
  meta_description?: string;
};

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
  if (gen.format !== "blog") {
    return NextResponse.json(
      { ok: false, error: "Only 'blog' generations can be published." },
      { status: 400 },
    );
  }

  const content = gen.content as BlogContent;
  if (!content.title || !content.body_md || !content.excerpt) {
    return NextResponse.json(
      { ok: false, error: "Generation missing required blog fields." },
      { status: 422 },
    );
  }

  const baseSlug = slugify(content.slug || content.title);
  let slug = baseSlug;
  for (let i = 0; i < 10; i++) {
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${i + 2}`;
  }

  const { data: inserted, error: insertError } = await supabase
    .from("blog_posts")
    .insert({
      slug,
      title: content.title,
      excerpt: content.excerpt,
      body_md: content.body_md,
      meta_description: content.meta_description ?? content.excerpt,
      generation_id: gen.id,
      published_at: new Date().toISOString(),
    })
    .select("id, slug")
    .single();
  if (insertError || !inserted) {
    console.error("[/api/studio/blog/publish] insert failed", insertError);
    return NextResponse.json(
      { ok: false, error: "Failed to publish post." },
      { status: 502 },
    );
  }

  await supabase
    .from("generations")
    .update({ status: "published" })
    .eq("id", gen.id);

  revalidatePath("/blog");
  revalidatePath(`/blog/${inserted.slug}`);

  return NextResponse.json({ ok: true, post: inserted });
}
