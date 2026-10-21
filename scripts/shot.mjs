// Скриншоты для проверки: node scripts/shot.mjs <path> <name> [--night|--day] [--w=1440 --h=900] [--full] [--scroll=Y] [--wait=ms]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const args = process.argv.slice(2);
const [path = '/', name = 'shot'] = args;
const flag = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=')[1];
const sky = args.includes('--night') ? 'night' : args.includes('--day') ? 'day' : null;
const w = +flag('w', 1440), h = +flag('h', 900), scroll = +flag('scroll', 0), wait = +flag('wait', 2600);
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain', '.jpg': 'image/jpeg', '.png': 'image/png' };
const root = join(process.cwd(), 'out');
const srv = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(root, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { f = join(root, '404.html'); res.statusCode = 404; }
  res.setHeader('content-type', mime[extname(f)] ?? 'application/octet-stream');
  res.end(readFileSync(f));
}).listen(0);
const port = srv.address().port;
mkdirSync('shots', { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 600 ? 2 : 1, isMobile: w < 600, hasTouch: w < 600 });
if (sky) await ctx.addInitScript((s) => { try { localStorage.setItem('sky', s); } catch {} }, sky);
const p = await ctx.newPage();
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()));
await p.goto(`http://localhost:${port}${path}`, { waitUntil: 'networkidle' });
await p.waitForTimeout(wait);
const click = args.find((a) => a.startsWith('--click='))?.slice(8);
if (click) { await p.getByRole('button', { name: new RegExp(click) }).first().click(); await p.waitForTimeout(1400); }
if (scroll) { await p.evaluate((y) => window.scrollTo(0, y), scroll); await p.waitForTimeout(1500); }
await p.screenshot({ path: `shots/${name}.png`, fullPage: args.includes('--full') });
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(`${name}: horizontal overflow = ${overflow}px`);
await b.close(); srv.close();
