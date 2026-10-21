import { cn } from '@/lib/utils';

const PATHS = [
  'M214 340 C150 312 134 262 162 222 C186 188 166 148 164 108 C163 86 158 68 152 56',
  'M272 318 C216 284 204 250 226 214 C248 180 224 146 214 110 C208 88 198 66 184 52',
  'M152 56 C158 40 172 36 184 52',
  'M152 56 C136 58 122 62 108 72 C124 74 140 72 154 68',
  'M214 340 C258 402 380 416 480 394 C552 378 606 326 644 254',
  'M272 318 C285 322 292 324 300 326',
  'M300 326 C324 246 430 214 520 240 C566 254 604 258 644 254',
  'M334 322 C358 268 440 244 510 262',
  'M368 326 C392 286 450 270 504 280',
  'M404 328 C424 300 460 292 500 298',
  'M548 254 C582 264 612 266 640 262',
];

/** Лебедь одной тонкой линией (stroke ≈ 1.25 px). Рисуется при загрузке. */
export function Swan({
  className,
  delay = 0,
  breathe = true,
  strokeWidth = 1.25,
  label,
}: {
  className?: string;
  delay?: number;
  breathe?: boolean;
  strokeWidth?: number;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 680 440"
      className={cn('swan overflow-visible', breathe && 'swan-breathe', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ ['--d' as string]: `${delay}ms` }}
    >
      {PATHS.map((d, i) => (
        <path key={i} d={d} pathLength={1} className="draw" style={{ ['--i' as string]: i }} />
      ))}
      <circle cx="166" cy="52" r="1.8" fill="currentColor" stroke="none" className="eye" />
    </svg>
  );
}

/** Маленький знак для логотипа/фавикона: статичный. */
export function SwanMark({ className }: { className?: string }) {
  return (
    <svg viewBox="100 30 560 400" className={className} fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS.slice(0, 7).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
