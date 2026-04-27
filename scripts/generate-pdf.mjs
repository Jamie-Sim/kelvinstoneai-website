#!/usr/bin/env node
/**
 * Render /lead-magnet to a print-quality A4 PDF.
 * Usage:
 *   1. In one terminal: npm run dev
 *   2. In another:      node scripts/generate-pdf.mjs
 * Output: public/lead-magnet/kelvinstone-ai-guide.pdf
 */
import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const URL = process.env.LEAD_MAGNET_URL || "http://localhost:3000/lead-magnet";
const OUT = resolve(projectRoot, "public/lead-magnet/kelvinstone-ai-guide.pdf");

async function ensureServerUp() {
  try {
    const res = await fetch(URL, { method: "GET" });
    if (!res.ok) throw new Error(`Non-OK status ${res.status}`);
  } catch (err) {
    console.error(
      `\nCould not reach ${URL}.\nStart the dev server first with:  npm run dev\n(then re-run this script in a separate terminal)\n`,
    );
    throw err;
  }
}

async function main() {
  await ensureServerUp();
  await mkdir(dirname(OUT), { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    page.on("pageerror", (err) => console.warn("page error:", err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") console.warn("console error:", msg.text());
    });

    await page.goto(URL, { waitUntil: "networkidle0", timeout: 60_000 });
    await page.evaluateHandle("document.fonts.ready");
    await page.emulateMediaType("print");

    await page.pdf({
      path: OUT,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    console.log(`PDF written: ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
