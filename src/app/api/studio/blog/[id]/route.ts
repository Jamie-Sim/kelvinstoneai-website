import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

type Body = {
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  body_md?: unknown;
  meta_description?: unknown;
  hero_image_url?: unknown;
  hero_image_prompt?: unknown;
  publish?: unknown;
  unpublish?: unknown;
};

const STRING_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "body_md",
  "meta_description",
  "hero_image_url",
  "hero_image_prompt",
] as const;

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
  for (const key of STRING_FIELDS) {
    const value = body[key];
    if (typeof value === "string") {
      updates[key] = key === "slug" ? slugify(value) : value;
    }
  }
  if (body.publish === true) updates.published_at = new Date().toISOString();
  if (body.unpublish === true) updates.published_at = null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { ok: false, error: "No fields to update." },
      { status: 400 },
    );
  }

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select("id, slug, published_at")
    .single();
  if (error || !data) {
    console.error("[/api/studio/blog/[id]] update failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update post." },
      { status: 502 },
    );
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);

  return NextResponse.json({ ok: true, post: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = supabaseAdmin();
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    console.error("[/api/studio/blog/[id]] delete failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete post." },
      { status: 502 },
    );
  }

  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
