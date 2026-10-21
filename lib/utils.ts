import { site } from '@/content/site';
import type { Hours } from '@/content/clinics';

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

const NBSP = ' ';
const SHORT = /(^|[\s(«„—–-])([А-Яа-яЁёA-Za-z]{1,2})\s+/g;

/** Типографика: неразрывные пробелы, ёлочки, тире. */
export function typograph(input: string): string {
  return input
    .replace(/"([^"]*)"/g, '«$1»')
    .replace(/\s+[-–—]\s+/g, `${NBSP}— `)
    .replace(SHORT, (_, a, b) => `${a}${b}${NBSP}`)
    .replace(SHORT, (_, a, b) => `${a}${b}${NBSP}`)
    .replace(/(\d)\s+(₽|руб|кг|мин|ч\b|шт)/g, `$1${NBSP}$2`);
}

export function formatPrice(n: number) {
  return `${n.toLocaleString('ru-RU').replace(/\s/g, NBSP)}${NBSP}₽`;
}

export function moscowParts(now: Date = new Date()) {
  const f = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = f.formatToParts(now);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return { h, m, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` };
}

export function isNightShift(now?: Date) {
  const { h } = moscowParts(now);
  return h >= site.nightShift.from || h < site.nightShift.to;
}

export function isOpenNow(hours: Hours, now?: Date) {
  if (hours.kind === '24/7') return true;
  const { h, m } = moscowParts(now);
  const cur = h * 60 + m;
  const [fh, fm] = hours.from.split(':').map(Number);
  const [th, tm] = hours.to.split(':').map(Number);
  return cur >= fh * 60 + fm && cur < th * 60 + tm;
}

export function pluralRu(n: number, one: string, few: string, many: string) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
}
