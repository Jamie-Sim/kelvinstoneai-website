# CLAUDE.md — Kelvinstone AI Website

## Always Do First
1. **Invoke the `frontend-design` skill** before writing any frontend code, every session.
2. **Invoke the `copywriting` skill** before writing any website copy, every session.
3. **Read the `brand_assets/` folder** before any design decisions. Use Glob to list all files, then read every file. Brand assets override everything else — colours, fonts, logos, tone.

---

## About Kelvinstone AI

Kelvinstone AI is an independent AI automation agency serving UK trades and property businesses. It exists to put advanced AI within reach of small organisations — giving them the tools, training and support to genuinely compete, so the gains from this technology shift are shared more fairly instead of being captured only by large corporates.

**Mission:** Democratise the benefits of AI. Help small businesses compete effectively. Ensure the wealth created by the AI revolution is distributed as broadly as possible.

**Positioning:** Long-term infrastructure partner. Removes technical barriers. Opens doors for communities typically left behind in tech shifts.

**Values:** Reliability, trustworthiness, precision, practicality, accessibility.

**Tone of voice:** Professional but approachable. Trustworthy and plain-spoken — no jargon, no hype. Empowering, not intimidating. Speaks to people who are skeptical of big tech promises.

---

## Target Audience

- Small UK business owners in trades and property (plumbers, electricians, builders, letting agents, estate agents, etc.)
- Non-technical; time-poor; skeptical of tech hype and salespeople
- They need to trust Kelvinstone before they'll engage — credibility and clarity matter more than cleverness
- They respond to practical outcomes ("save 10 hours a week") over abstract features ("AI-powered automation")

---

## Site Goals

- **Now:** Marketing landing page — build trust, communicate value, convert visitors to leads/enquiries
- **Near-future:** Expand to include a client dashboard, blog/resources section, and backend features (following a Next.js tutorial structure)
- **Stack direction:** Next.js + Tailwind CSS (migration from current vanilla HTML to happen as a separate task)

---

## Brand Assets

Always read `brand_assets/` at the start of every session. It contains:
- Logos (light and dark variants) — always use the real logo file, never a placeholder
- Colour palette — use exact hex values, do not invent or substitute
- Font preferences — use brand fonts if specified
- Guidelines — read fully and apply all rules about spacing, logo usage, and tone

**Brand assets always win.** If a brand asset conflicts with any guidance below, the brand asset takes priority.

---

## Project Tooling

- `node serve.mjs` — serves the static site on `http://localhost:3000` (will be superseded by `npm run dev` after the Next.js migration)
- `node screenshot.mjs http://localhost:3000 [label]` — captures a PNG via Puppeteer into `temporary screenshots/screenshot-N.png` (auto-incremented, never overwrites)
- After screenshotting, read the PNG with the Read tool to analyse it visually
- During the Next.js migration, use these against the archived `/legacy/index.html` to compare design fidelity against the new build

---

## Hard Rules

- Never use pure `#ffffff` or `#000000` as a background — always add a subtle tint
- Never use default Tailwind blue/indigo as the primary colour
- All CSS in a `<style>` block (or `.css`/component files for Next.js) — never inline `style=""` attributes
- Mobile-first responsive design
