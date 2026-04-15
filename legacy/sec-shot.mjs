import puppeteer from 'puppeteer';
const [,,sectionId='hero', vpH='900'] = process.argv;
const browser = await puppeteer.launch({ headless:'new', args:['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width:1440, height:parseInt(vpH), deviceScaleFactor:2 });
await page.goto('http://localhost:3000', { waitUntil:'networkidle0', timeout:30000 });
await page.evaluate(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible')));
await new Promise(r=>setTimeout(r,400));
await page.evaluate(id=>{
  const el = document.getElementById(id) || document.querySelector(id);
  if (el) el.scrollIntoView({ behavior:'instant', block:'start' });
}, sectionId);
await new Promise(r=>setTimeout(r,200));
await page.screenshot({ path:`./temporary screenshots/${sectionId}-shot.png`, fullPage:false });
await browser.close();
console.log(`Saved: ${sectionId}-shot.png`);
