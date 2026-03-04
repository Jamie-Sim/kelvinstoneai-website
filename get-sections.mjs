import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless:'new', args:['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width:1440, height:900, deviceScaleFactor:1 });
await page.goto('http://localhost:3000', { waitUntil:'networkidle0' });
const sections = await page.evaluate(() => {
  const ids = ['hero','pain','services','process','benefits','cta'];
  return ids.map(id => {
    const el = document.getElementById(id);
    const rect = el ? el.getBoundingClientRect() : null;
    return { id, top: el ? el.offsetTop : 0, height: rect ? Math.round(rect.height) : 0 };
  }).concat([{ id: 'total', top: 0, height: document.body.scrollHeight }]);
});
console.log(JSON.stringify(sections, null, 2));
await browser.close();
