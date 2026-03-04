import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url    = process.argv[2] || 'http://localhost:3000';
const label  = process.argv[3] || '';
const width  = parseInt(process.argv[4]) || 1440;
const height = parseInt(process.argv[5]) || 900;

const dir = './temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Auto-increment filename
let n = 1;
while (fs.existsSync(path.join(dir, buildName(n)))) n++;
function buildName(num) {
  return label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;
}
const outPath = path.join(dir, buildName(n));

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));

// Force all reveal animations to their visible state for screenshot
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 400));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`Saved: ${outPath}`);
