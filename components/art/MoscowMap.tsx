'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { clinics } from '@/content/clinics';

const CENTER = { x: 54, y: 40 };

/** Схема, не в масштабе: МКАД, Москва-река, центр и три клиники. */
export function MoscowMap({ active, onPick }: { active: string | null; onPick: (id: string | null) => void }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const on = inView || reduce;
  return (
    <svg ref={ref} viewBox="0 0 100 100" className="h-full w-full" role="group" aria-label="Схема расположения клиник «Лебеди»: Раменки, Олимпийская деревня и Видное">
      <defs>
        <radialGradient id="mapglow" cx="50%" cy="45%" r="60%"><stop offset="0" stopColor="var(--color-reed-pale)" stopOpacity=".7" /><stop offset="1" stopColor="var(--color-reed-pale)" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#mapglow)" />
      {/* радиальные магистрали */}
      <g stroke="var(--color-reed)" strokeWidth=".18" opacity=".55" fill="none">
        {[[54, 40, 54, 2], [54, 40, 90, 14], [54, 40, 98, 44], [54, 40, 86, 80], [54, 40, 60, 98], [54, 40, 22, 90], [54, 40, 2, 52], [54, 40, 14, 14]].map(([a, b, c, d], i) => (
          <line key={i} x1={a} y1={b} x2={c} y2={d} />
        ))}
        <ellipse cx="54" cy="40" rx="14" ry="12" />
        <ellipse cx="54" cy="40" rx="25" ry="22" opacity=".6" />
      </g>
      {/* МКАД */}
      <motion.ellipse cx="54" cy="42" rx="37" ry="34" fill="none" stroke="var(--color-lake)" strokeWidth=".35" strokeDasharray="1.2 .8"
        initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} />
      {/* Москва-река */}
      <motion.path d="M6 30 C 18 38, 24 30, 30 40 S 40 62, 50 52 S 58 36, 66 44 S 84 62, 96 54" fill="none" stroke="#6fa6c0" strokeWidth=".7" strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} opacity=".7" />
      <text x="82" y="35" fontSize="2.2" fill="var(--color-lake)" opacity=".7" letterSpacing=".2">МКАД</text>
      {/* центр */}
      <circle cx={CENTER.x} cy={CENTER.y} r="1.1" fill="var(--color-ink)" />
      <text x={CENTER.x + 2} y={CENTER.y - 1.5} fontSize="2.4" fill="var(--color-ink)" opacity=".7">Центр</text>

      {clinics.map((c, i) => {
        const isActive = active === c.id;
        return (
          <g key={c.id}>
            <motion.line x1={CENTER.x} y1={CENTER.y} x2={c.pin.x} y2={c.pin.y} stroke="var(--color-lake)" strokeWidth={isActive ? 0.5 : 0.22} strokeDasharray=".8 .8"
              initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.2, delay: 0.8 + i * 0.35, ease: [0.22, 1, 0.36, 1] }} />
            <motion.g
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
              animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
              transition={{ delay: 1.2 + i * 0.35, type: 'spring', stiffness: 260, damping: 18 }}
              style={{ transformOrigin: `${c.pin.x}px ${c.pin.y}px`, transformBox: 'fill-box' }}
            >
              <g role="button" tabIndex={0} aria-label={c.name} onMouseEnter={() => onPick(c.id)} onMouseLeave={() => onPick(null)} onFocus={() => onPick(c.id)} onBlur={() => onPick(null)} style={{ cursor: 'pointer' }}>
                {isActive && <circle cx={c.pin.x} cy={c.pin.y} r="5" fill="var(--color-lake)" opacity=".15"><animate attributeName="r" values="3;7;3" dur="2.4s" repeatCount="indefinite" /></circle>}
                <circle cx={c.pin.x} cy={c.pin.y} r="3.4" fill="transparent" />
                <circle cx={c.pin.x} cy={c.pin.y} r={isActive ? 2.1 : 1.6} fill={isActive ? 'var(--color-lake)' : 'var(--color-milk)'} stroke="var(--color-lake)" strokeWidth=".5" style={{ transition: 'all .3s' }} />
                <text x={c.pin.x + (c.id === 'ramenki' ? 3 : c.id === 'olimp' ? 0 : 3.4)} y={c.pin.y + (c.id === 'ramenki' ? -2.6 : c.id === 'olimp' ? 5.2 : 0.8)} textAnchor={c.id === 'olimp' ? 'middle' : 'start'} fontSize="2.8" fill="var(--color-ink)" fontWeight={isActive ? 600 : 400}>{c.short}</text>
              </g>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}
