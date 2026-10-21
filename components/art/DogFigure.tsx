import { cn } from '@/lib/utils';

const DOG = [
  'M150 104 C176 90 196 112 202 142 C262 130 346 128 414 142',
  'M414 142 C444 136 462 116 474 96 C484 80 506 74 528 80 C556 88 590 108 604 130 C610 142 602 152 590 152 L546 154 C528 158 518 168 516 184',
  'M474 96 C458 90 446 106 450 128 C454 142 470 142 480 128',
  'M516 184 C508 208 502 234 496 262 L492 322 L514 328 L510 264',
  'M510 264 C514 236 520 218 530 204',
  'M496 262 C456 280 386 284 334 276 C300 270 272 266 254 264',
  'M202 142 C176 172 178 216 204 238 C216 250 222 270 224 298 L220 322 L244 328 L250 300 C252 282 256 270 254 264',
];
const FAR = ['M432 272 L430 322 L452 326 L454 274', 'M290 270 L292 322 L314 326 L316 272'];
const PORTS: [number, number][] = [[300, 222], [346, 212], [392, 222], [436, 212]];

/**
 * Схема собаки для сцены «Лапароскопия».
 * Классы .inc .ports .ring .capsule .dogwrap — цели для GSAP.
 * `step` задаёт статичное состояние (мобильная версия, reduced-motion).
 */
export function DogFigure({ step, className }: { step?: 1 | 2 | 3 | 4; className?: string }) {
  const s = step ?? 0;
  return (
    <svg viewBox="40 20 640 380" className={cn('overflow-visible', className)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* капсула кислородной камеры */}
      <g className="capsule" style={{ opacity: s === 4 ? 1 : undefined }} opacity={s === 0 ? 0 : s === 4 ? 1 : 0}>
        <rect x="96" y="40" width="560" height="330" rx="165" stroke="#4fd1c5" strokeWidth="1.2" pathLength={1} strokeDasharray="1" strokeDashoffset={s === 4 ? 0 : 1} className="capsule-line" />
        {[[160, 300], [190, 330], [560, 330], [600, 290], [140, 120], [620, 90], [220, 350]].map(([x, y], i) => (
          <circle key={i} className="bubble" cx={x} cy={y} r={3 + (i % 3) * 1.5} stroke="#4fd1c5" strokeWidth="1" />
        ))}
      </g>
      {/* кольцо наркоза */}
      <g className="ring" opacity={s === 3 ? 1 : 0} style={{ transformOrigin: '380px 210px' }}>
        <ellipse cx="380" cy="210" rx="290" ry="170" stroke="#4fd1c5" strokeWidth="1" />
        <ellipse cx="380" cy="210" rx="320" ry="190" stroke="#4fd1c5" strokeWidth=".6" opacity=".5" />
      </g>
      <g className="dogwrap" style={{ transformOrigin: '380px 210px', transform: s === 4 ? 'scale(.82)' : undefined }}>
        <g opacity=".45">{FAR.map((d, i) => <path key={i} d={d} />)}</g>
        {DOG.map((d, i) => <path key={i} d={d} className="dogline" />)}
        <circle cx="526" cy="104" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="602" cy="132" r="3.2" fill="currentColor" stroke="none" />
        {/* большой разрез */}
        <path className="inc" d="M246 196 C300 190 380 190 466 198" stroke="#ff8b73" strokeWidth="2.2" strokeDasharray={s === 1 ? '6 7' : '1'} pathLength={s === 1 ? undefined : 1} strokeDashoffset={s === 1 ? 0 : 1} opacity={s === 1 ? 1 : 0} />
        {/* проколы */}
        <g className="ports" opacity={s === 2 ? 1 : 0}>
          {PORTS.map(([x, y], i) => (
            <g key={i} className="port" style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="9" stroke="#4fd1c5" strokeWidth="1" opacity=".5" />
              <circle cx={x} cy={y} r="3.5" fill="#4fd1c5" stroke="none" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
