# CLAUDE.md — Frontend Website Rules

## Always Do First
1. **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
2. **Read the `brand_assets/` folder** before making any design decisions. This is mandatory — do it before choosing colors, fonts, layout, or any visual element. Brand assets always take priority over your own design choices.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- **Viewport sizes:** Always take a desktop screenshot at 1440px wide first. After desktop passes are complete, take a mobile screenshot at 390px wide.
- **Round 1 comparison:** Check layout, structure, section order, and overall proportions.
- **Round 2 comparison:** Check pixel-level details — exact colors (hex), font sizes, font weights, spacing, border-radius, shadows, and image sizing.
- Be specific when logging differences: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"

## Output Defaults
- Single `index.html` file with all CSS in a `<style>` block inside `<head>` — never inline `style=""` attributes on elements.
- Load Google Fonts **before** the Tailwind CDN tag. Always import two fonts: one display/serif for headings, one clean sans-serif for body.
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive. Evaluate primary design at 1440px desktop width.

## Head Setup
Every page must include:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="..." />
  <title>...</title>
  <!-- Google Fonts: display font + body font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />
  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>/* all custom CSS here */</style>
</head>
```
- Use semantic HTML5: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<header>`
- One `<h1>` per page. Heading hierarchy must be logical (h1 → h2 → h3, never skipped).

## Brand Assets
**Read the `brand_assets/` folder at the start of every session before writing a single line of code.** Use the Glob tool to list all files in it. Read every file you find there — style guides, markdown files, color references, font lists. Look for and use:

- **Logo:** Use the actual logo file (SVG preferred, then PNG). Never substitute a placeholder or text when a logo file exists. Reference it with a relative path: `<img src="brand_assets/logo.svg" />`. Check for light and dark variants and use the appropriate one.
- **Color palette:** Extract exact hex values. Use these as your primary, secondary, accent, background, and text colors throughout the entire design. Do not invent or substitute colors. These override all color-related guardrails below.
- **Fonts:** If a brand font is specified (by name or as a file), use it. Load it via Google Fonts if available there, otherwise use a `@font-face` declaration. Brand fonts override the default instruction to choose your own font pairing.
- **Style guide / guidelines:** Read fully. Extract any rules about spacing, tone, logo usage (clear space, minimum size, color restrictions), and apply them.
- **Supporting imagery:** Any photos, illustrations, or textures in `brand_assets/` should be used in the design where appropriate. Do not replace real brand imagery with placeholders.

If `brand_assets/` is empty or does not exist, fall back to the Anti-Generic Guardrails below for all design decisions.

**Brand assets always win.** If a brand asset conflicts with a guardrail below, the brand asset takes priority, no exceptions.

## Anti-Generic Guardrails

### Colors
- **If brand colors are defined in `brand_assets/`, use those exact values. Do not deviate.**
- If no brand colors exist: never use the default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom color and derive a full scale from it.
- Never use pure white (`#ffffff`) or pure black (`#000000`) as a background. Always add a subtle tint, grain, or layered gradient.

### Typography
- **If brand fonts are defined in `brand_assets/`, use those. Do not substitute or add extra fonts.**
- If no brand fonts exist: never use the same font for headings and body. Pair a display/serif with a clean sans-serif.
- Apply tight tracking (`-0.03em` to `-0.05em`) on large headings.
- Apply generous line-height (`1.7`) on body text.
- Apply generous line-height (`1.2`) on display headings.

### Shadows
- Never use flat `shadow-md`. Use layered, color-tinted box shadows with low opacity. Example: `box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)`.

### Gradients & Texture
- Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.

### Backgrounds
- Never pure white or pure black. Use a very slight tint or subtle gradient. Dark sites: use a near-black with a hue (e.g., `#0a0a0f`). Light sites: use an off-white (e.g., `#fafaf8`).

### Buttons & CTAs
- Define a clear hierarchy: **primary** (filled, brand color), **secondary** (outlined or subtle fill), **ghost** (text-only with underline or arrow).
- Every button needs hover, focus-visible, and active states. No exceptions.
- Primary CTA should have a subtle glow or color-tinted shadow on hover.

### Animations
- Only animate `transform` and `opacity`. Never `transition-all`.
- Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for entrance, `ease-out` for exit.
- Add `scroll-behavior: smooth` to the `html` element.
- Sections should have subtle scroll-triggered reveal: `opacity: 0 → 1` + `translateY(20px → 0)` using IntersectionObserver.

### Interactive States
- Every clickable element needs hover, focus-visible, and active states. No exceptions.

### Images
- Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.

### Spacing
- Use intentional, consistent spacing tokens — not random Tailwind steps. Pick a base unit (e.g., 8px) and multiply consistently.

### Depth
- Surfaces must have a layering system (base → elevated → floating). Not everything sits at the same z-plane.

### Negative Space
- Premium sites breathe. Use aggressive whitespace between sections. When in doubt, add more padding, not less.

## Consistency Audit (do before final screenshot)
After building all sections, run a consistency check:
- Are the same color values used across all sections?
- Are border-radius values uniform for the same element types?
- Are spacing steps consistent across equivalent sections?
- Are font sizes following the same type scale throughout?
- Do all buttons follow the defined CTA hierarchy?

Fix any inconsistencies before the final screenshot pass.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not use pure `#ffffff` or `#000000` backgrounds
- Do not use inline `style=""` attributes — all CSS goes in the `<style>` block
- Do not use the same font for headings and body copy
- Do not skip semantic HTML structure
- Do not invent brand colors, fonts, or logos when they are defined in `brand_assets/`
- Do not use `placehold.co` for any asset that exists in `brand_assets/`
- Do not skip reading `brand_assets/` — even if you think it is empty, always check with Glob first
