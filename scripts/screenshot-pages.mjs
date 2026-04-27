// Screenshot each .lm-page as its own PNG so we can eyeball the spread.
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const url = process.env.LEAD_MAGNET_URL || "http://localhost:3000/lead-magnet";
const outDir = "temporary screenshots/lead-magnet";
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
// A4 at 96dpi-ish: 210mm ≈ 794px, 297mm ≈ 1123px. Use 2x for crisp.
await page.setViewport({ width: 820, height: 1200, deviceScaleFactor: 2 });
await page.emulateMediaType("print");
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluateHandle("document.fonts.ready");

const count = await page.$$eval(".lm-page", (els) => els.length);
console.log(`Found ${count} pages`);

for (let i = 0; i < count; i++) {
  const el = (await page.$$(".lm-page"))[i];
  const outPath = join(outDir, `page-${String(i + 1).padStart(2, "0")}.png`);
  await el.screenshot({ path: outPath });
  console.log(`Saved ${outPath}`);
}

await browser.close();
