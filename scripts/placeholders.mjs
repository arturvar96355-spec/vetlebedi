// Находит все видимые заглушки для данных клиента: <Ph>…</Ph>, ph: '…', [фото — от клиента]
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['app', 'components', 'content'];
const found = new Map();
const add = (text, file) => {
  const k = text.trim();
  if (!found.has(k)) found.set(k, new Set());
  found.get(k).add(file);
};
const walk = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|md)$/.test(n)) {
      const s = readFileSync(p, 'utf8');
      for (const m of s.matchAll(/<Ph>([^<]+)<\/Ph>/g)) add(m[1], p);
      for (const m of s.matchAll(/\bph:\s*'([^']+)'/g)) add(m[1], p);
      for (const m of s.matchAll(/\[(фото — от клиента)\]/g)) add(m[1], p);
    }
  }
};
roots.forEach(walk);
console.log(`Заглушек: ${found.size}\n`);
for (const [t, files] of [...found].sort()) console.log(`• ${t}\n    ${[...files].join(', ')}`);
