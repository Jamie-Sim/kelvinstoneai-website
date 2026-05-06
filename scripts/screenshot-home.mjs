import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";

const url = process.env.HOME_URL || "http://localhost:3000";
const label = process.argv[2] || "home";
const outDir = "temporary screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluateHandle("document.fonts.ready");
await page.addStyleTag({
  content: ".reveal, .reveal.rd1, .reveal.rd2, .reveal.rd3, .reveal.rd4, .reveal.rd5 { opacity: 1 !important; transform: none !important; }",
});
await new Promise((r) => setTimeout(r, 400));

const sections = ["hero", "pain", "services", "what-you-get", "pricing", "process", "benefits", "guarantee", "cta", "founder"];
const ts = Date.now();
for (const id of sections) {
  const el = await page.$(`#${id}`);
  if (!el) {
    console.log(`Missing #${id}`);
    continue;
  }
  const path = `${outDir}/${label}-${id}-${ts}.png`;
  await el.screenshot({ path });
  console.log(`Saved ${path}`);
}

await browser.close();
