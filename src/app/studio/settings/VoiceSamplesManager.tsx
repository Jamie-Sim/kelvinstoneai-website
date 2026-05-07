"use client";

import { useState } from "react";

export type VoiceSample = {
  id: string;
  label: string;
  sample_text: string;
  created_at: string;
  updated_at: string;
};

export function VoiceSamplesManager({ initial }: { initial: VoiceSample[] }) {
  const [samples, setSamples] = useState<VoiceSample[]>(initial);
  const [error, setError] = useState<string | null>(null);

  const tokenEstimate = samples.reduce(
    (acc, s) => acc + Math.ceil(s.sample_text.length / 3.5),
    0,
  );

  async function addSample(label: string, sampleText: string) {
    setError(null);
    const res = await fetch("/api/studio/voice-samples", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, sampleText }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to add sample.");
      return false;
    }
    setSamples((prev) => [...prev, data.sample as VoiceSample]);
    return true;
  }

  async function updateSample(
    id: string,
    label: string,
    sampleText: string,
  ): Promise<boolean> {
    setError(null);
    const res = await fetch(`/api/studio/voice-samples/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, sampleText }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to update sample.");
      return false;
    }
    setSamples((prev) =>
      prev.map((s) => (s.id === id ? (data.sample as VoiceSample) : s)),
    );
    return true;
  }

  async function deleteSample(id: string) {
    if (!confirm("Delete this voice sample?")) return;
    const res = await fetch(`/api/studio/voice-samples/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to delete sample.");
      return;
    }
    setSamples((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-4">
      {samples.length > 0 && (
        <p className="text-xs text-slate-500">
          {samples.length} sample{samples.length === 1 ? "" : "s"} active · ~
          {tokenEstimate.toLocaleString()} tokens included in every generation
          (cached after first call).
        </p>
      )}

      <ul className="space-y-3">
        {samples.map((sample) => (
          <SampleRow
            key={sample.id}
            sample={sample}
            onSave={(label, text) => updateSample(sample.id, label, text)}
            onDelete={() => deleteSample(sample.id)}
          />
        ))}
      </ul>

      <NewSampleForm onSubmit={addSample} />

      {error && (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      )}
    </div>
  );
}

function SampleRow({
  sample,
  onSave,
  onDelete,
}: {
  sample: VoiceSample;
  onSave: (label: string, text: string) => Promise<boolean>;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(sample.label);
  const [sampleText, setSampleText] = useState(sample.sample_text);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const ok = await onSave(label, sampleText);
    setSaving(false);
    if (ok) setEditing(false);
  }

  if (!editing) {
    return (
      <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900">
            {sample.label}
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="text-xs font-medium text-rose-600 hover:text-rose-800"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="mt-2 line-clamp-3 text-xs text-slate-600">
          {sample.sample_text}
        </p>
        <p className="mt-2 text-[11px] text-slate-400">
          {sample.sample_text.length.toLocaleString()} characters · ~
          {Math.ceil(sample.sample_text.length / 3.5).toLocaleString()} tokens
        </p>
      </li>
    );
  }

  return (
    <li className="rounded-md border border-slate-300 bg-white p-4">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Short label (e.g. 'July LinkedIn post on follow-ups')"
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <textarea
        value={sampleText}
        onChange={(e) => setSampleText(e.target.value)}
        rows={10}
        className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-xs leading-relaxed shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={save}
          disabled={saving || !label.trim() || !sampleText.trim()}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            setLabel(sample.label);
            setSampleText(sample.sample_text);
            setEditing(false);
          }}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </li>
  );
}

function NewSampleForm({
  onSubmit,
}: {
  onSubmit: (label: string, sampleText: string) => Promise<boolean>;
}) {
  const [label, setLabel] = useState("");
  const [sampleText, setSampleText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!label.trim() || !sampleText.trim()) return;
    setSubmitting(true);
    const ok = await onSubmit(label.trim(), sampleText.trim());
    setSubmitting(false);
    if (ok) {
      setLabel("");
      setSampleText("");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-md border border-dashed border-slate-300 bg-white p-4"
    >
      <h3 className="text-sm font-semibold text-slate-900">Add a new sample</h3>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Short label (e.g. 'October LinkedIn post on hiring')"
        className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <textarea
        value={sampleText}
        onChange={(e) => setSampleText(e.target.value)}
        rows={8}
        placeholder="Paste a piece of your own writing here…"
        className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-xs leading-relaxed shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <button
        type="submit"
        disabled={submitting || !label.trim() || !sampleText.trim()}
        className="mt-3 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {submitting ? "Adding…" : "Add sample"}
      </button>
    </form>
  );
}
