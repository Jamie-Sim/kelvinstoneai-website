import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { BlogEditor } from "./BlogEditor";

export const dynamic = "force-dynamic";

export default async function StudioBlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post } = await supabaseAdmin()
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (!post) notFound();

  return (
    <>
      <StudioHeader email={user?.email ?? null} />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/studio/blog"
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← All posts
        </Link>
        <BlogEditor post={post} />
      </main>
    </>
  );
}
