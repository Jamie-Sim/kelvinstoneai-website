import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { IdeaWorkspace } from "./IdeaWorkspace";

export const dynamic = "force-dynamic";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const admin = supabaseAdmin();
  const { data: idea } = await admin
    .from("ideas")
    .select("*")
    .eq("id", id)
    .single();
  if (!idea) notFound();

  const { data: generations } = await admin
    .from("generations")
    .select("*")
    .eq("idea_id", id)
    .order("created_at", { ascending: false });

  return (
    <>
      <StudioHeader email={user?.email ?? null} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/studio"
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← All ideas
        </Link>

        <header className="mt-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            {idea.title ?? "Untitled idea"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {idea.source_type === "youtube"
              ? `From YouTube · ${idea.source_url ?? ""}`
              : idea.source_type === "blog"
              ? "Repurposed from blog"
              : "Text dump"}
            {" · "}
            {new Date(idea.created_at).toLocaleString("en-GB")}
          </p>
        </header>

        <details className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-medium text-slate-700">
            Source content ({idea.raw_input.length.toLocaleString()} chars)
          </summary>
          <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-xs text-slate-700">
            {idea.raw_input}
          </pre>
          {idea.notes && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-medium text-slate-800">Steering note:</span>{" "}
              {idea.notes}
            </p>
          )}
        </details>

        <IdeaWorkspace
          ideaId={idea.id}
          initialGenerations={generations ?? []}
        />
      </main>
    </>
  );
}
