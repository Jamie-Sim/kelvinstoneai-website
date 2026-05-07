import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { StudioHeader } from "@/components/studio/StudioHeader";

export const dynamic = "force-dynamic";

export default async function StudioBlogIndex() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabaseAdmin()
    .from("blog_posts")
    .select("id, slug, title, excerpt, published_at, updated_at, hero_image_url")
    .order("updated_at", { ascending: false });

  return (
    <>
      <StudioHeader email={user?.email ?? null} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Blog posts</h1>

        <ul className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {(!posts || posts.length === 0) && (
            <li className="px-5 py-10 text-center text-sm text-slate-500">
              No posts yet. Generate a blog from an idea, then publish.
            </li>
          )}
          {posts?.map((p) => (
            <li key={p.id}>
              <Link
                href={`/studio/blog/${p.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {p.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {p.excerpt}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                    p.published_at
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {p.published_at ? "Published" : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
