// Проверка автоматической темы по московскому времени без localStorage: node scripts/autosky.mjs
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
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
// московское время (UTC+3) → ожидаемая тема. Часовой пояс браузера нарочно чужой.
const cases = [['2026-10-22T23:00:00+03:00', 'night'], ['2026-10-22T22:59:00+03:00', 'day'], ['2026-10-22T00:30:00+03:00', 'night'], ['2026-10-22T04:59:00+03:00', 'night'], ['2026-10-22T05:00:00+03:00', 'day'], ['2026-10-22T14:00:00+03:00', 'day'], ['2026-10-22T09:30:00+03:00', 'day']];
let bad = 0;
for (const tz of ['America/Los_Angeles', 'Asia/Tokyo']) for (const [iso, want] of cases) {
  const ctx = await b.newContext({ timezoneId: tz, viewport: { width: 1000, height: 700 } });
  const p = await ctx.newPage();
  await p.clock.install({ time: new Date(iso) });
  await p.goto(`http://localhost:${srv.address().port}/`);
  const got = await p.evaluate(() => document.documentElement.dataset.sky);
  const clock = await p.evaluate(() => document.querySelector('header')?.innerText.match(/\d\d:\d\d/)?.[0]);
  if (got !== want) bad++;
  console.log(`${tz} ${iso} → ${got} (ожидали ${want}) ${got === want ? 'OK' : 'ОШИБКА'}`);
  await ctx.close();
}
console.log(bad ? `ошибок: ${bad}` : 'все случаи верны');
await b.close(); srv.close();
