"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type GenerationFormat = "blog" | "linkedin" | "x_thread";

type Generation = {
  id: string;
  format: GenerationFormat;
  status: "draft" | "published" | "archived";
  content: Record<string, unknown>;
  image_url: string | null;
  image_prompt: string | null;
  cost_usd: number | null;
  created_at: string;
};

const FORMAT_LABEL: Record<GenerationFormat, string> = {
  blog: "Blog post",
  linkedin: "LinkedIn post",
  x_thread: "X thread",
};

export function IdeaWorkspace({
  ideaId,
  initialGenerations,
}: {
  ideaId: string;
  initialGenerations: Generation[];
}) {
  const router = useRouter();
  const [generations, setGenerations] = useState<Generation[]>(initialGenerations);
  const [busy, setBusy] = useState<GenerationFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const latestByFormat = useMemo(() => {
    const map = new Map<GenerationFormat, Generation>();
    for (const g of generations) {
      if (!map.has(g.format)) map.set(g.format, g);
    }
    return map;
  }, [generations]);

  async function generate(format: GenerationFormat, refineNote?: string) {
    setBusy(format);
    setError(null);
    const previous = latestByFormat.get(format);
    const res = await fetch("/api/studio/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ideaId,
        format,
        refineNote: refineNote ?? null,
        previousGenerationId: refineNote ? previous?.id : null,
      }),
    });
    const data = await res.json();
    setBusy(null);
    if (!res.ok) {
      setError(data.error ?? "Generation failed.");
      return;
    }
    setGenerations((prev) => [data.generation as Generation, ...prev]);
  }

  function applyLocalEdit(genId: string, content: Record<string, unknown>) {
    setGenerations((prev) =>
      prev.map((g) => (g.id === genId ? { ...g, content } : g)),
    );
  }

  function applyImage(genId: string, imageUrl: string, prompt: string) {
    setGenerations((prev) =>
      prev.map((g) =>
        g.id === genId
          ? { ...g, image_url: imageUrl, image_prompt: prompt }
          : g,
      ),
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {(["blog", "linkedin", "x_thread"] as GenerationFormat[]).map((format) => {
        const gen = latestByFormat.get(format);
        return (
          <section
            key={format}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <header className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                {FORMAT_LABEL[format]}
              </h2>
              {gen?.cost_usd !== null && gen?.cost_usd !== undefined && (
                <span className="text-xs text-slate-400">
                  ${Number(gen.cost_usd).toFixed(4)}
                </span>
              )}
            </header>

            {!gen && (
              <div className="mt-6 flex flex-1 flex-col items-center justify-center text-center">
                <p className="text-sm text-slate-500">No draft yet.</p>
                <button
                  type="button"
                  onClick={() => generate(format)}
                  disabled={busy === format}
                  className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {busy === format ? "Generating…" : "Generate"}
                </button>
              </div>
            )}

            {gen && (
              <GenerationPanel
                key={gen.id}
                generation={gen}
                busy={busy === format}
                router={router}
                onRegenerate={(refine) => generate(format, refine)}
                onContentChange={(content) => applyLocalEdit(gen.id, content)}
                onImageGenerated={(url, prompt) =>
                  applyImage(gen.id, url, prompt)
                }
              />
            )}
          </section>
        );
      })}

      {error && (
        <div className="lg:col-span-3">
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

function GenerationPanel({
  generation,
  busy,
  router,
  onRegenerate,
  onContentChange,
  onImageGenerated,
}: {
  generation: Generation;
  busy: boolean;
  router: ReturnType<typeof useRouter>;
  onRegenerate: (refineNote?: string) => void;
  onContentChange: (content: Record<string, unknown>) => void;
  onImageGenerated: (url: string, prompt: string) => void;
}) {
  const [refineNote, setRefineNote] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageRefineBusy, setImageRefineBusy] = useState(false);
  const [imagePrompt, setImagePrompt] = useState(generation.image_prompt ?? "");
  const [imageRefineNote, setImageRefineNote] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [savingExemplar, setSavingExemplar] = useState(false);
  const [exemplarSaved, setExemplarSaved] = useState(false);

  async function publishBlog() {
    setPublishing(true);
    setLocalError(null);
    const res = await fetch("/api/studio/blog/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ generationId: generation.id }),
    });
    const data = await res.json();
    setPublishing(false);
    if (!res.ok) {
      setLocalError(data.error ?? "Publish failed.");
      return;
    }
    router.push(`/studio/blog/${data.post.id}`);
  }

  async function generateImage() {
    setImageBusy(true);
    setLocalError(null);
    const preset =
      generation.format === "blog" ? "blog-hero" : "linkedin-square";
    const res = await fetch("/api/studio/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: "generation",
        targetId: generation.id,
        preset,
        prompt: imagePrompt.trim() || undefined,
      }),
    });
    const data = await res.json();
    setImageBusy(false);
    if (!res.ok) {
      setLocalError(data.error ?? "Image generation failed.");
      return;
    }
    setImagePrompt(data.prompt);
    onImageGenerated(data.imageUrl, data.prompt);
  }

  async function refineImage() {
    if (!imageRefineNote.trim()) return;
    setImageRefineBusy(true);
    setLocalError(null);
    const preset =
      generation.format === "blog" ? "blog-hero" : "linkedin-square";
    const res = await fetch("/api/studio/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: "generation",
        targetId: generation.id,
        preset,
        refineNote: imageRefineNote.trim(),
      }),
    });
    const data = await res.json();
    setImageRefineBusy(false);
    if (!res.ok) {
      setLocalError(data.error ?? "Image refine failed.");
      return;
    }
    setImagePrompt(data.prompt);
    setImageRefineNote("");
    onImageGenerated(data.imageUrl, data.prompt);
  }

  function copyForFormat() {
    const c = generation.content as Record<string, unknown>;
    let text = "";
    if (generation.format === "blog") text = String(c.body_md ?? "");
    else if (generation.format === "linkedin") text = String(c.body ?? "");
    else if (generation.format === "x_thread")
      text = (c.tweets as string[]).join("\n\n");
    navigator.clipboard.writeText(text);
  }

  async function saveAsExemplar() {
    setSavingExemplar(true);
    setLocalError(null);
    const res = await fetch("/api/studio/voice-samples/from-generation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generationId: generation.id,
        // Send current panel content so any local tweaks are captured.
        content: generation.content,
      }),
    });
    const data = await res.json();
    setSavingExemplar(false);
    if (!res.ok) {
      setLocalError(data.error ?? "Failed to save voice exemplar.");
      return;
    }
    setExemplarSaved(true);
    setTimeout(() => setExemplarSaved(false), 3000);
  }

  return (
    <div className="mt-4 flex flex-1 flex-col gap-4">
      <ContentRenderer
        format={generation.format}
        content={generation.content}
        onChange={onContentChange}
      />

      {generation.format !== "x_thread" && (
        <div className="space-y-3">
          {generation.image_url && (
            <img
              src={generation.image_url}
              alt="Generated"
              className="rounded-md border border-slate-200"
            />
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Image prompt (auto-generated if blank)
            </label>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={2}
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              placeholder="Leave blank to auto-write from content."
            />
            <button
              type="button"
              onClick={generateImage}
              disabled={imageBusy || imageRefineBusy}
              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              {imageBusy
                ? "Generating image…"
                : generation.image_url
                ? "Regenerate image (fresh)"
                : "Generate image"}
            </button>
          </div>

          {generation.image_url && (
            <div className="space-y-1 rounded-md border border-slate-200 bg-slate-50 p-3">
              <label className="block text-xs font-medium text-slate-700">
                Refine image (edit the existing one)
              </label>
              <input
                type="text"
                value={imageRefineNote}
                onChange={(e) => setImageRefineNote(e.target.value)}
                placeholder="e.g. remove the USB stick, change wallpaper to deep blue"
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <p className="text-[11px] text-slate-500">
                Keeps the same composition and style — only applies the change you describe.
              </p>
              <button
                type="button"
                onClick={refineImage}
                disabled={imageRefineBusy || imageBusy || !imageRefineNote.trim()}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                {imageRefineBusy ? "Refining image…" : "Refine image"}
              </button>
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-700">
          Refine text with a note
        </label>
        <input
          type="text"
          value={refineNote}
          onChange={(e) => setRefineNote(e.target.value)}
          placeholder="e.g. punchier opening, less corporate"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
        <p className="mt-1 text-[11px] text-slate-400">
          Operates on the written copy only. To change the image, edit the
          image prompt above and click <em>Regenerate image</em>.
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onRegenerate(refineNote.trim() || undefined)}
          disabled={busy}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {busy
            ? "Working…"
            : refineNote.trim()
            ? "Refine text"
            : "Regenerate text"}
        </button>
        <button
          type="button"
          onClick={copyForFormat}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Copy
        </button>
        {generation.format !== "blog" && (
          <button
            type="button"
            onClick={saveAsExemplar}
            disabled={savingExemplar}
            title="Save the current draft as a voice exemplar — future generations will learn from it."
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {savingExemplar
              ? "Saving…"
              : exemplarSaved
              ? "Saved ✓"
              : "Save as voice exemplar"}
          </button>
        )}
        {generation.format === "blog" && (
          <button
            type="button"
            onClick={publishBlog}
            disabled={publishing}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {publishing ? "Publishing…" : "Publish blog"}
          </button>
        )}
      </div>

      {localError && (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {localError}
        </p>
      )}
    </div>
  );
}

function ContentRenderer({
  format,
  content,
  onChange,
}: {
  format: GenerationFormat;
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}) {
  if (format === "blog") {
    return (
      <BlogContentEditor
        content={content as { title: string; excerpt: string; body_md: string; meta_description: string; slug: string }}
        onChange={onChange}
      />
    );
  }
  if (format === "linkedin") {
    return (
      <textarea
        value={String(content.body ?? "")}
        onChange={(e) => onChange({ ...content, body: e.target.value })}
        rows={12}
        className="block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-xs leading-relaxed shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
    );
  }
  return (
    <XThreadEditor
      tweets={(content.tweets as string[]) ?? []}
      onChange={(tweets) => onChange({ ...content, tweets })}
    />
  );
}

function BlogContentEditor({
  content,
  onChange,
}: {
  content: { title: string; excerpt: string; body_md: string; meta_description: string; slug: string };
  onChange: (next: Record<string, unknown>) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  function update(key: keyof typeof content, value: string) {
    onChange({ ...content, [key]: value });
  }
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={content.title ?? ""}
        onChange={(e) => update("title", e.target.value)}
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <input
        type="text"
        value={content.slug ?? ""}
        onChange={(e) => update("slug", e.target.value)}
        placeholder="url-slug"
        className="block w-full rounded-md border border-slate-300 px-3 py-1.5 font-mono text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <textarea
        value={content.excerpt ?? ""}
        onChange={(e) => update("excerpt", e.target.value)}
        rows={2}
        placeholder="Excerpt"
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-700">Body (markdown)</span>
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="text-xs text-slate-500 underline hover:text-slate-900"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>
      {showPreview ? (
        <div className="prose prose-sm max-w-none rounded-md border border-slate-200 bg-slate-50 p-3 text-slate-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content.body_md ?? ""}
          </ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={content.body_md ?? ""}
          onChange={(e) => update("body_md", e.target.value)}
          rows={14}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-xs leading-relaxed shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      )}
      <textarea
        value={content.meta_description ?? ""}
        onChange={(e) => update("meta_description", e.target.value)}
        rows={2}
        placeholder="Meta description"
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
    </div>
  );
}

function XThreadEditor({
  tweets,
  onChange,
}: {
  tweets: string[];
  onChange: (tweets: string[]) => void;
}) {
  return (
    <ol className="space-y-2">
      {tweets.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 w-6 shrink-0 text-right text-xs text-slate-400">
            {i + 1}
          </span>
          <textarea
            value={t}
            onChange={(e) => {
              const next = [...tweets];
              next[i] = e.target.value;
              onChange(next);
            }}
            rows={3}
            className={`block w-full rounded-md border px-3 py-2 font-mono text-xs leading-relaxed shadow-sm focus:outline-none focus:ring-1 ${
              t.length > 280
                ? "border-rose-400 focus:border-rose-600 focus:ring-rose-600"
                : "border-slate-300 focus:border-slate-900 focus:ring-slate-900"
            }`}
          />
          <span
            className={`mt-2 w-10 shrink-0 text-right text-xs ${
              t.length > 280 ? "text-rose-600" : "text-slate-400"
            }`}
          >
            {t.length}
          </span>
        </li>
      ))}
    </ol>
  );
}
