import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";

const url = process.env.HOME_URL || "http://localhost:3000";
const outDir = "temporary screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluateHandle("document.fonts.ready");
await page.addStyleTag({
  content: ".reveal, .reveal.rd1, .reveal.rd2, .reveal.rd3, .reveal.rd4, .reveal.rd5 { opacity: 1 !important; transform: none !important; }",
});
await new Promise((r) => setTimeout(r, 400));

const ts = Date.now();

await page.screenshot({ path: `${outDir}/mobile-top-${ts}.png` });
console.log(`Saved mobile-top-${ts}.png`);

await page.click(".nav-toggle");
await new Promise((r) => setTimeout(r, 450));
await page.screenshot({ path: `${outDir}/mobile-menu-open-${ts}.png` });
console.log(`Saved mobile-menu-open-${ts}.png`);

await page.click(".nav-toggle");
await new Promise((r) => setTimeout(r, 350));

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 350));
await page.screenshot({ path: `${outDir}/mobile-bottom-${ts}.png` });
console.log(`Saved mobile-bottom-${ts}.png`);

const glasgow = await page.$(".glasgow-image-strip");
if (glasgow) {
  await glasgow.screenshot({ path: `${outDir}/mobile-glasgow-${ts}.png` });
  console.log(`Saved mobile-glasgow-${ts}.png`);
}

await browser.close();
