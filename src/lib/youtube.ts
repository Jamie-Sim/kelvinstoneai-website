import { YoutubeTranscript } from "youtube-transcript";

export class TranscriptUnavailableError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "TranscriptUnavailableError";
  }
}

const ID_PATTERNS: RegExp[] = [
  /(?:v=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)([a-zA-Z0-9_-]{11})/,
  /^([a-zA-Z0-9_-]{11})$/,
];

export function extractVideoId(input: string): string {
  const trimmed = input.trim();
  for (const pattern of ID_PATTERNS) {
    const match = pattern.exec(trimmed);
    if (match) return match[1];
  }
  throw new TranscriptUnavailableError(
    `Could not extract a YouTube video ID from "${trimmed}".`,
  );
}

export async function fetchTranscript(urlOrId: string): Promise<string> {
  const videoId = extractVideoId(urlOrId);
  let segments: Array<{ text: string }>;
  try {
    segments = await YoutubeTranscript.fetchTranscript(videoId);
  } catch (err) {
    throw new TranscriptUnavailableError(
      "Could not fetch transcript — the video may have captions disabled, be region-locked, or be age-restricted. Paste the transcript manually instead.",
      err,
    );
  }
  if (!segments.length) {
    throw new TranscriptUnavailableError(
      "Transcript came back empty. Paste the transcript manually instead.",
    );
  }
  return segments
    .map((s) => s.text.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ");
}
