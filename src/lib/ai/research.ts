import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-6";
const MAX_SEARCHES = 5;

// Sonnet 4.6 pricing per 1M tokens.
const COST_INPUT = 3;
const COST_CACHE_WRITE = 3.75;
const COST_CACHE_READ = 0.3;
const COST_OUTPUT = 15;
// Web search is $10 per 1,000 searches.
const COST_PER_SEARCH = 0.01;

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

const RESEARCH_SYSTEM = `You are doing background research for a content piece that Jamie Sim — founder of Kelvinstone AI, a UK property-services AI agency — will write next. Your job is to find the up-to-date facts the writer needs, not to write the post.

Use the web search tool when the source material mentions:
- Specific products, tools, services, or AI models that have a current state (Claude features, Claude Code, Anthropic Skills, AI tool capabilities, prices, version numbers, recent product launches)
- Current events, news, or industry developments
- Statistics, market figures, or factual claims that may have changed
- People, companies, or organisations whose details may have shifted

Skip web search and return a short marker if the source is:
- A pure personal anecdote with no external claims to verify
- Opinion-only with no factual hooks
- Self-contained — Jamie tells a story about his own experience

# Output

Return concise plain-text research notes — 200–500 words max. Use this structure:

If research is needed:
\`\`\`
## What this piece is about
(one sentence)

## Key facts to ground the post
- Specific fact 1 (with date / number / source domain)
- Specific fact 2
- ...

## Anything to correct or update
(if the source material implies something that's now out of date, flag it)

## Useful angles
(1–3 short bullets on framings or current debates that would make the post sharper)
\`\`\`

If no research is needed:
\`\`\`
NO_RESEARCH_NEEDED: <one-line reason>
\`\`\`

Do not write the post itself. Do not summarise the source verbatim. Just the research notes.`;

function extractText(message: Anthropic.Messages.Message): string {
  return message.content
    .filter(
      (block): block is Anthropic.Messages.TextBlock => block.type === "text",
    )
    .map((b) => b.text)
    .join("\n\n")
    .trim();
}

function computeCostUsd(
  usage: Anthropic.Messages.Usage,
  searches: number,
): number {
  const inputTokens = usage.input_tokens ?? 0;
  const cacheWrite = usage.cache_creation_input_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  const tokenCost =
    (inputTokens * COST_INPUT +
      cacheWrite * COST_CACHE_WRITE +
      cacheRead * COST_CACHE_READ +
      output * COST_OUTPUT) /
    1_000_000;
  return tokenCost + searches * COST_PER_SEARCH;
}

export type ResearchResult = {
  notes: string;
  searchesUsed: number;
  costUsd: number;
};

export async function researchIdea(args: {
  rawInput: string;
  sourceLabel: string;
}): Promise<ResearchResult> {
  const userMessage = `Source (${args.sourceLabel}):\n\n${args.rawInput.trim()}\n\nResearch this. Use web search if there are external facts to verify. Return notes only.`;

  const message = await client().messages.create({
    model: MODEL,
    max_tokens: 2048,
    thinking: { type: "adaptive" },
    output_config: { effort: "medium" },
    tools: [
      {
        type: "web_search_20260209",
        name: "web_search",
        max_uses: MAX_SEARCHES,
      },
    ],
    system: RESEARCH_SYSTEM,
    messages: [{ role: "user", content: userMessage }],
  });

  const text = extractText(message);
  const searches = message.usage.server_tool_use?.web_search_requests ?? 0;
  return {
    notes: text,
    searchesUsed: searches,
    costUsd: computeCostUsd(message.usage, searches),
  };
}

export function isSkippedResearch(notes: string | null | undefined): boolean {
  if (!notes) return true;
  return /^\s*NO_RESEARCH_NEEDED/i.test(notes);
}
