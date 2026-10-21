// Статический сервер для out/ с gzip: node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, extname } from 'node:path';
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain', '.jpg': 'image/jpeg', '.png': 'image/png' };
const root = join(process.cwd(), 'out');
createServer((req, res) => {
  let f = join(root, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { f = join(root, '404.html'); res.statusCode = 404; }
  const ext = extname(f);
  res.setHeader('content-type', mime[ext] ?? 'application/octet-stream');
  let body = readFileSync(f);
  if (/\.(html|js|css|svg|txt|json)$/.test(ext) && /gzip/.test(req.headers['accept-encoding'] ?? '')) { body = gzipSync(body); res.setHeader('content-encoding', 'gzip'); }
  res.end(body);
}).listen(+(process.argv[2] ?? 4173));
