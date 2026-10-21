import { cn } from '@/lib/utils';

function wave(width: number, amp: number, period: number, y: number) {
  let d = `M0 ${y} q ${period / 4} ${-amp} ${period / 2} 0`;
  for (let x = period / 2; x < width; x += period / 2) d += ` t ${period / 2} 0`;
  return d;
}

/** Тонкие линии воды, медленно текут. */
export function WaterLines({
  className,
  lines = 4,
  tone = 'currentColor',
}: {
  className?: string;
  lines?: number;
  tone?: string;
}) {
  const W = 1600;
  return (
    <div className={cn('pointer-events-none overflow-hidden', className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <svg
          key={i}
          className="water-flow block"
          style={{ ['--dur' as string]: `${18 + i * 6}s`, marginTop: i ? 10 + i * 4 : 0, width: '200%', animationDirection: i % 2 ? 'reverse' : 'normal' }}
          viewBox={`0 0 ${W * 2} 24`}
          preserveAspectRatio="none"
          height="24"
          fill="none"
          stroke={tone}
          strokeWidth="1.2"
          opacity={0.9 - i * 0.18}
        >
          <path d={wave(W * 2, 7 - i, 160 + i * 40, 12)} vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
    </div>
  );
}

/** Разделитель секций: лебедь на волне. */
export function SwanDivider({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto flex max-w-[1280px] items-center gap-5 px-5 text-reed md:px-12', className)} aria-hidden>
      <span className="h-px flex-1 bg-current opacity-50" />
      <svg viewBox="0 0 60 24" className="h-6 w-[60px]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M2 18 q 7 -6 14 0 t 14 0 t 14 0 t 14 0" />
        <path d="M22 14 c -2 -6 4 -10 4 -4 c 0 3 -2 4 2 6 c 5 2 9 0 12 -4" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
