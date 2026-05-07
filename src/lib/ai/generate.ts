import Anthropic from "@anthropic-ai/sdk";
import { BRAND_VOICE_SYSTEM_PROMPT } from "./brandVoice";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MODEL = "claude-sonnet-4-6";

async function fetchVoiceSamples(): Promise<string> {
  const { data, error } = await supabaseAdmin()
    .from("studio_voice_samples")
    .select("label, sample_text")
    .order("created_at", { ascending: true });
  if (error || !data || data.length === 0) return "";

  const blocks = data.map(
    (row, i) =>
      `## Sample ${i + 1} — ${row.label}\n\n${(row.sample_text as string).trim()}`,
  );
  return [
    "\n\n# Voice samples — Jamie's actual writing",
    "These are pieces Jamie wrote himself. They are the gold standard for tone, rhythm, vocabulary, and the sort of details he actually notices. Imitate the *texture* of these — the sentence shapes, the way he opens, the way he closes, the level of irreverence, the kind of specific detail he reaches for. Do not lift exact phrases from them; absorb the voice and apply it to the new content.",
    blocks.join("\n\n"),
  ].join("\n\n");
}

// Sonnet 4.6 pricing per 1M tokens.
const COST_INPUT = 3;
const COST_CACHE_WRITE = 3.75;
const COST_CACHE_READ = 0.3;
const COST_OUTPUT = 15;

let cached: Anthropic | null = null;
function client(): Anthropic {
  if (cached) return cached;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY missing — add it to .env.local");
  }
  cached = new Anthropic({ apiKey });
  return cached;
}

export type BlogContent = {
  title: string;
  slug: string;
  excerpt: string;
  body_md: string;
  meta_description: string;
};

export type LinkedInContent = {
  body: string;
};

export type XThreadContent = {
  tweets: string[];
};

export type GenerationFormat = "blog" | "linkedin" | "x_thread";

export type GenerateInput = {
  rawInput: string;
  sourceType: "youtube" | "text" | "blog";
  notes?: string | null;
  refineNote?: string | null;
  previousContent?: unknown;
  /** Cached web-search-grounded research for this idea, if available. */
  researchNotes?: string | null;
};

export type GenerateMetadata = {
  model: string;
  costUsd: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
};

export type GenerateResult<T> = {
  content: T;
  metadata: GenerateMetadata;
};

const blogSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string", description: "SEO-friendly headline, 50–70 chars." },
    slug: {
      type: "string",
      description: "URL slug: lowercase, hyphen-separated, 3–6 words, no stop words.",
    },
    excerpt: {
      type: "string",
      description: "1–2 sentence teaser shown on the blog index.",
    },
    body_md: {
      type: "string",
      description:
        "Full markdown body. Use H2 (##) and H3 (###). Short paragraphs. 800–1500 words typical.",
    },
    meta_description: {
      type: "string",
      description: "140–160 character SEO meta description.",
    },
  },
  required: ["title", "slug", "excerpt", "body_md", "meta_description"],
} as const;

const linkedinSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    body: {
      type: "string",
      description:
        "LinkedIn post body, 150–300 words, blank lines between paragraphs. No leading emoji.",
    },
  },
  required: ["body"],
} as const;

const xThreadSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    tweets: {
      type: "array",
      description: "Each entry is a single tweet, max 280 characters.",
      items: { type: "string" },
    },
  },
  required: ["tweets"],
} as const;

const formatGuidance: Record<GenerationFormat, string> = {
  blog:
    "Generate a blog post for kelvinstone.ai. Follow the Blog posts section of your guidance.",
  linkedin:
    "Generate a single LinkedIn post for Jamie's personal profile. Follow the LinkedIn posts section.",
  x_thread:
    "Generate an X (Twitter) thread. Follow the X (Twitter) threads section. Every tweet ≤ 280 characters — count carefully.",
};

function buildUserMessage(format: GenerationFormat, input: GenerateInput): string {
  const sourceLabel =
    input.sourceType === "youtube"
      ? "YouTube transcript"
      : input.sourceType === "blog"
      ? "Existing published blog post (repurpose into new format)"
      : "Brain-dump from Jamie";

  const sections: string[] = [];
  sections.push(formatGuidance[format]);

  if (input.notes && input.notes.trim()) {
    sections.push(`## Steering note from Jamie\n${input.notes.trim()}`);
  }

  if (
    input.researchNotes &&
    input.researchNotes.trim() &&
    !/^\s*NO_RESEARCH_NEEDED/i.test(input.researchNotes)
  ) {
    sections.push(
      `## Research notes (current factual context — use these as ground truth)\n${input.researchNotes.trim()}\n\nGround any factual claims in the post with these notes. If the source material contradicts these notes, prefer the notes (they're current).`,
    );
  }

  if (input.refineNote && input.refineNote.trim()) {
    sections.push(
      `## Refinement instruction\n${input.refineNote.trim()}\n\nApply this confidently — don't just nudge the previous draft slightly.`,
    );
    if (input.previousContent !== undefined) {
      sections.push(
        `## Previous draft (for reference — do not just rephrase it)\n\`\`\`json\n${JSON.stringify(
          input.previousContent,
          null,
          2,
        )}\n\`\`\``,
      );
    }
  }

  sections.push(`## Source (${sourceLabel})\n\n${input.rawInput.trim()}`);
  sections.push("Return only the structured output. No preamble.");

  return sections.join("\n\n");
}

function computeCostUsd(usage: Anthropic.Messages.Usage): number {
  const inputTokens = usage.input_tokens ?? 0;
  const cacheWrite = usage.cache_creation_input_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  return (
    (inputTokens * COST_INPUT +
      cacheWrite * COST_CACHE_WRITE +
      cacheRead * COST_CACHE_READ +
      output * COST_OUTPUT) /
    1_000_000
  );
}

function extractStructuredText(message: Anthropic.Messages.Message): string {
  for (const block of message.content) {
    if (block.type === "text") return block.text;
  }
  throw new Error("No text block in Claude response");
}

async function runGeneration<T>(
  format: GenerationFormat,
  schema: Record<string, unknown>,
  input: GenerateInput,
): Promise<GenerateResult<T>> {
  const voiceSamples = await fetchVoiceSamples();
  const systemText = voiceSamples
    ? `${BRAND_VOICE_SYSTEM_PROMPT}${voiceSamples}`
    : BRAND_VOICE_SYSTEM_PROMPT;

  const message = await client().messages.create({
    model: MODEL,
    max_tokens: 8192,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema },
    },
    system: [
      {
        type: "text",
        text: systemText,
        // Cached as a single block — invalidates only when voice samples
        // change, which is rare. After Jamie sets samples once, every
        // subsequent generation is a cache hit.
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: buildUserMessage(format, input) }],
  });

  const json = extractStructuredText(message);
  let parsed: T;
  try {
    parsed = JSON.parse(json) as T;
  } catch (err) {
    throw new Error(
      `Claude returned non-JSON for ${format}: ${(err as Error).message}\n\nRaw: ${json.slice(0, 500)}`,
    );
  }

  return {
    content: parsed,
    metadata: {
      model: MODEL,
      costUsd: computeCostUsd(message.usage),
      cacheReadTokens: message.usage.cache_read_input_tokens ?? 0,
      cacheWriteTokens: message.usage.cache_creation_input_tokens ?? 0,
    },
  };
}

export function generateBlog(input: GenerateInput): Promise<GenerateResult<BlogContent>> {
  return runGeneration<BlogContent>("blog", blogSchema, input);
}

export function generateLinkedIn(
  input: GenerateInput,
): Promise<GenerateResult<LinkedInContent>> {
  return runGeneration<LinkedInContent>("linkedin", linkedinSchema, input);
}

export function generateXThread(
  input: GenerateInput,
): Promise<GenerateResult<XThreadContent>> {
  return runGeneration<XThreadContent>("x_thread", xThreadSchema, input);
}

/** Generate a Gemini image prompt from existing content (blog body or LinkedIn body). */
export async function writeImagePrompt(args: {
  format: "blog-hero" | "linkedin-square";
  contentSummary: string;
}): Promise<string> {
  const formatHint =
    args.format === "blog-hero"
      ? "wide 16:9 hero image suitable for a blog header"
      : "square 1:1 image suitable for a LinkedIn post";

  const message = await client().messages.create({
    model: MODEL,
    max_tokens: 600,
    system:
      "You write concise, vivid, brand-appropriate prompts for an image generator. Output a single paragraph, 40–80 words, no preamble, no quotes around the prompt. Style direction: editorial photography or clean tasteful illustration. Reflect a UK property/trades context where relevant. Avoid stock-photo cliches: no businesspeople shaking hands, no glowing brains, no robot hands, no generic AI imagery. Aim for warmth, craftsmanship, and quiet confidence.",
    messages: [
      {
        role: "user",
        content: `Write a ${formatHint} prompt for the following content:\n\n${args.contentSummary}`,
      },
    ],
  });

  const text = extractStructuredText(message).trim();
  return text.replace(/^["'`]|["'`]$/g, "");
}
