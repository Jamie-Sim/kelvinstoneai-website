"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  meta_description: string | null;
  hero_image_url: string | null;
  hero_image_prompt: string | null;
  published_at: string | null;
};

export function BlogEditor({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [draft, setDraft] = useState(post);
  const [saving, setSaving] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageRefineBusy, setImageRefineBusy] = useState(false);
  const [imageRefineNote, setImageRefineNote] = useState("");
  const [repurposeBusy, setRepurposeBusy] = useState<"linkedin" | "x_thread" | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState(post.hero_image_prompt ?? "");

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  async function save({ publish, unpublish }: { publish?: boolean; unpublish?: boolean } = {}) {
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/studio/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        body_md: draft.body_md,
        meta_description: draft.meta_description ?? "",
        publish,
        unpublish,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error ?? "Save failed.");
      return;
    }
    router.refresh();
  }

  async function generateHeroImage() {
    setImageBusy(true);
    setError(null);
    const res = await fetch("/api/studio/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: "blog",
        targetId: post.id,
        preset: "blog-hero",
        prompt: imagePrompt.trim() || undefined,
      }),
    });
    const data = await res.json();
    setImageBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Image generation failed.");
      return;
    }
    update("hero_image_url", data.imageUrl);
    update("hero_image_prompt", data.prompt);
    setImagePrompt(data.prompt);
  }

  async function refineHeroImage() {
    if (!imageRefineNote.trim()) return;
    setImageRefineBusy(true);
    setError(null);
    const res = await fetch("/api/studio/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: "blog",
        targetId: post.id,
        preset: "blog-hero",
        refineNote: imageRefineNote.trim(),
      }),
    });
    const data = await res.json();
    setImageRefineBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Image refine failed.");
      return;
    }
    update("hero_image_url", data.imageUrl);
    update("hero_image_prompt", data.prompt);
    setImagePrompt(data.prompt);
    setImageRefineNote("");
  }

  async function spin(format: "linkedin" | "x_thread") {
    setRepurposeBusy(format);
    setError(null);
    const res = await fetch("/api/studio/repurpose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId: post.id, format }),
    });
    const data = await res.json();
    setRepurposeBusy(null);
    if (!res.ok) {
      setError(data.error ?? "Spin failed.");
      return;
    }
    router.push(`/studio/ideas/${data.ideaId}`);
  }

  async function deletePost() {
    if (!confirm("Delete this post permanently?")) return;
    const res = await fetch(`/api/studio/blog/${post.id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Delete failed.");
      return;
    }
    router.push("/studio/blog");
  }

  return (
    <div className="mt-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Edit post</h1>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            post.published_at
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {post.published_at ? "Published" : "Draft"}
        </span>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <input
          type="text"
          value={draft.title}
          onChange={(e) => update("title", e.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-base font-semibold shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
        <input
          type="text"
          value={draft.slug}
          onChange={(e) => update("slug", e.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-1.5 font-mono text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
        <textarea
          value={draft.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />

        <div className="flex items-center justify-between pt-2">
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
          <div className="prose prose-sm max-w-none rounded-md border border-slate-200 bg-slate-50 p-4 text-slate-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {draft.body_md}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={draft.body_md}
            onChange={(e) => update("body_md", e.target.value)}
            rows={20}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-xs leading-relaxed shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        )}
        <textarea
          value={draft.meta_description ?? ""}
          onChange={(e) => update("meta_description", e.target.value)}
          rows={2}
          placeholder="Meta description"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Hero image</h2>
        {draft.hero_image_url && (
          <img
            src={draft.hero_image_url}
            alt="Hero"
            className="rounded-md border border-slate-200"
          />
        )}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Image prompt (leave blank to auto-write)
          </label>
          <textarea
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            rows={3}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
          <button
            type="button"
            onClick={generateHeroImage}
            disabled={imageBusy || imageRefineBusy}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {imageBusy
              ? "Generating image…"
              : draft.hero_image_url
              ? "Regenerate hero (fresh)"
              : "Generate hero"}
          </button>
        </div>

        {draft.hero_image_url && (
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
              onClick={refineHeroImage}
              disabled={imageRefineBusy || imageBusy || !imageRefineNote.trim()}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              {imageRefineBusy ? "Refining image…" : "Refine image"}
            </button>
          </div>
        )}
      </section>

      <section className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          onClick={() => save()}
          disabled={saving}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {post.published_at ? (
          <button
            type="button"
            onClick={() => save({ unpublish: true })}
            disabled={saving}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Unpublish
          </button>
        ) : (
          <button
            type="button"
            onClick={() => save({ publish: true })}
            disabled={saving}
            className="rounded-md border border-emerald-600 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
          >
            Publish
          </button>
        )}
        <a
          href={`/blog/${draft.slug}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          View live →
        </a>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Repurpose</h2>
        <p className="text-xs text-slate-500">
          Spin this post into a LinkedIn or X variant. Creates a new idea you can iterate on.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => spin("linkedin")}
            disabled={!!repurposeBusy}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {repurposeBusy === "linkedin" ? "Working…" : "Spin LinkedIn"}
          </button>
          <button
            type="button"
            onClick={() => spin("x_thread")}
            disabled={!!repurposeBusy}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {repurposeBusy === "x_thread" ? "Working…" : "Spin X thread"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <button
          type="button"
          onClick={deletePost}
          className="text-xs font-medium text-rose-700 underline hover:text-rose-900"
        >
          Delete post permanently
        </button>
      </section>

      {error && (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      )}
    </div>
  );
}
