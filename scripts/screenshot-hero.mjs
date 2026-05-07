import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";

const url = process.env.HOME_URL || "http://localhost:3000";
const outDir = "temporary screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const ts = Date.now();

const cases = [
  { label: "desktop", width: 1440, height: 900, dpr: 1 },
  { label: "mobile", width: 390, height: 844, dpr: 2 },
];

for (const c of cases) {
  const page = await browser.newPage();
  await page.setViewport({ width: c.width, height: c.height, deviceScaleFactor: c.dpr });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");
  await page.addStyleTag({
    content: ".reveal, .reveal.rd1, .reveal.rd2, .reveal.rd3, .reveal.rd4, .reveal.rd5 { opacity: 1 !important; transform: none !important; }",
  });
  await new Promise((r) => setTimeout(r, 400));
  const hero = await page.$("#hero");
  if (hero) {
    const path = `${outDir}/hero-${c.label}-${ts}.png`;
    await hero.screenshot({ path });
    console.log(`Saved ${path}`);
  }
  await page.close();
}

await browser.close();
