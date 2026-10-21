// Прокрутка страницы экран за экраном: node scripts/tour.mjs <path> <prefix> [--w=1440 --h=900 --step=1 --night --max=40]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
const args = process.argv.slice(2);
const [path = '/', prefix = 'tour'] = args;
const flag = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=')[1];
const w = +flag('w', 1440), h = +flag('h', 900), step = +flag('step', 1), max = +flag('max', 40);
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain' };
const root = join(process.cwd(), 'out');
const srv = createServer((req, res) => {
  let f = join(root, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { f = join(root, '404.html'); res.statusCode = 404; }
  res.setHeader('content-type', mime[extname(f)] ?? 'application/octet-stream');
  res.end(readFileSync(f));
}).listen(0);
mkdirSync('shots', { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 600 ? 2 : 1, isMobile: w < 600, hasTouch: w < 600 });
if (args.includes('--night')) await ctx.addInitScript(() => localStorage.setItem('sky', 'night'));
const p = await ctx.newPage();
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await p.goto(`http://localhost:${srv.address().port}${path}`, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const total = await p.evaluate(() => document.documentElement.scrollHeight);
console.log('page height', total, 'overflowX', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
let n = 0;
for (let y = 0; y < total && n < max; y += h * step, n++) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `shots/${prefix}-${String(n).padStart(2, '0')}.png` });
}
console.log('shots', n);
await b.close(); srv.close();
