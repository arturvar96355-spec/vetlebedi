// Аудит доступности axe-core по всем маршрутам: node scripts/a11y.mjs
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const root = join(process.cwd(), 'out');
const srv = createServer((req, res) => {
  let f = join(root, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { f = join(root, '404.html'); res.statusCode = 404; }
  res.setHeader('content-type', mime[extname(f)] ?? 'application/octet-stream');
  res.end(readFileSync(f));
}).listen(0);
const axe = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const sky of ['day', 'night']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((s) => localStorage.setItem('sky', s), sky);
  const p = await ctx.newPage();
  for (const path of ['/', '/emergency/', '/surgery/', '/clinics/', '/doctors/', '/prices/', '/privacy/', '/styleguide/']) {
    await p.goto(`http://localhost:${srv.address().port}${path}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(1800);
    await p.evaluate(axe);
    const r = await p.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }));
    console.log(`${sky} ${path}: ${r.violations.length} нарушений`);
    for (const v of r.violations) console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}) ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
  }
  await ctx.close();
}
await b.close(); srv.close();
