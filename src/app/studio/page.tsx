import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { NewIdeaForm } from "./NewIdeaForm";

export const dynamic = "force-dynamic";

type IdeaRow = {
  id: string;
  title: string | null;
  source_type: "youtube" | "text" | "blog";
  source_url: string | null;
  created_at: string;
};

export default async function StudioDashboard() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: ideas } = await supabaseAdmin()
    .from("ideas")
    .select("id, title, source_type, source_url, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  const list: IdeaRow[] = (ideas ?? []) as IdeaRow[];

  return (
    <>
      <StudioHeader email={user?.email ?? null} />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1.2fr]">
        <section>
          <h1 className="text-lg font-semibold text-slate-900">New idea</h1>
          <p className="mt-1 text-sm text-slate-600">
            Drop in a YouTube link or a brain-dump. Generate blog, LinkedIn, and X thread variants from one source.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <NewIdeaForm />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Recent ideas</h2>
          <ul className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {list.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-slate-500">
                No ideas yet.
              </li>
            )}
            {list.map((idea) => (
              <li key={idea.id}>
                <Link
                  href={`/studio/ideas/${idea.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {idea.title ?? "Untitled idea"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {idea.source_type === "youtube"
                        ? `YouTube · ${idea.source_url ?? ""}`
                        : idea.source_type === "blog"
                        ? "Repurpose from blog"
                        : "Text dump"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(idea.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
