"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type SourceType = "youtube" | "text";

export function NewIdeaForm() {
  const router = useRouter();
  const [sourceType, setSourceType] = useState<SourceType>("text");
  const [sourceUrl, setSourceUrl] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcriptUnavailable, setTranscriptUnavailable] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setTranscriptUnavailable(false);

    const payload: Record<string, string> = {
      sourceType,
      notes,
    };
    if (sourceType === "youtube") payload.sourceUrl = sourceUrl;
    if (rawInput.trim()) payload.rawInput = rawInput;

    const res = await fetch("/api/studio/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      if (data.transcriptUnavailable) {
        setTranscriptUnavailable(true);
        setError(data.error);
        return;
      }
      setError(data.error ?? "Something went wrong.");
      return;
    }
    router.push(`/studio/ideas/${data.idea.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex gap-2">
        {(["text", "youtube"] as const).map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => setSourceType(opt)}
            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition ${
              sourceType === opt
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {opt === "text" ? "Text dump" : "YouTube link"}
          </button>
        ))}
      </div>

      {sourceType === "youtube" && (
        <label className="block">
          <span className="text-sm font-medium text-slate-700">YouTube URL</span>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            required={sourceType === "youtube" && !rawInput}
            placeholder="https://youtube.com/watch?v=…"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </label>
      )}

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          {sourceType === "youtube"
            ? transcriptUnavailable
              ? "Paste transcript manually"
              : "Or paste transcript manually"
            : "Brain-dump / idea"}
        </span>
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          rows={8}
          required={sourceType === "text" || transcriptUnavailable}
          placeholder={
            sourceType === "youtube"
              ? "Optional unless captions can't be fetched."
              : "Type or paste the idea here. The more concrete the better."
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Steering note <span className="text-slate-400">(optional)</span>
        </span>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. emphasise the cost-saving angle"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </label>

      {error && (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {submitting ? "Saving…" : "Capture idea"}
      </button>
    </form>
  );
}
