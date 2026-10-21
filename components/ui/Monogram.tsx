import { initials } from '@/content/doctors';
import { cn } from '@/lib/utils';

const palette = [
  'bg-reed-pale text-lake-deep',
  'bg-sand text-ink',
  'bg-lake text-milk',
  'bg-night-2 text-moon',
  'bg-[#dfe9e2] text-lake',
];

export function Monogram({ name, index = 0, className }: { name: string; index?: number; className?: string }) {
  const sum = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <div className={cn('relative grid place-items-center overflow-hidden', palette[(sum + index) % palette.length], className)} aria-hidden>
      <svg viewBox="0 0 680 440" className="absolute -bottom-6 -right-10 w-[130%] opacity-[0.12]" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M214 340 C150 312 134 262 162 222 C186 188 166 148 164 108 C163 86 158 68 152 56 M272 318 C216 284 204 250 226 214 C248 180 224 146 214 110 C208 88 198 66 184 52 M152 56 C158 40 172 36 184 52 M214 340 C258 402 380 416 480 394 C552 378 606 326 644 254 M300 326 C324 246 430 214 520 240 C566 254 604 258 644 254" />
      </svg>
      <span className="relative font-display text-[64px] font-medium leading-none tracking-tight">{initials(name)}</span>
    </div>
  );
}
