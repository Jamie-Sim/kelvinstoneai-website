import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { VoiceSamplesManager, type VoiceSample } from "./VoiceSamplesManager";

export const dynamic = "force-dynamic";

export default async function StudioSettingsPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: samples } = await supabaseAdmin()
    .from("studio_voice_samples")
    .select("id, label, sample_text, created_at, updated_at")
    .order("created_at", { ascending: true });

  return (
    <>
      <StudioHeader email={user?.email ?? null} />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Voice samples
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Paste 3–5 pieces of your <strong>own writing</strong> here — a
            LinkedIn post you wrote yourself, an old blog draft, a long-form
            note you sent a client, a journal entry. Anything that sounds
            unmistakably like you.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            These are pulled into the AI&rsquo;s system prompt at every
            generation as voice exemplars. The model doesn&rsquo;t copy them
            verbatim — it absorbs the rhythm, vocabulary, and the kind of
            specific details you reach for, and applies that texture to new
            content. <strong>This is the single biggest lever</strong> for
            making the output feel like you wrote it.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Tips: skew towards posts you&rsquo;re proud of. Include at least
            one casual / off-the-cuff piece and one more considered one. 200–600
            words each is the sweet spot. Update them whenever your voice
            evolves.
          </p>

          <div className="mt-6">
            <VoiceSamplesManager
              initial={(samples ?? []) as VoiceSample[]}
            />
          </div>
        </section>
      </main>
    </>
  );
}
