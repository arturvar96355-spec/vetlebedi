'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function Counter({
  to,
  decimals = 0,
  duration = 1.6,
  className,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, reduce, to, duration]);

  const s = v.toFixed(decimals);
  const [i, f] = s.split('.');
  const int = Number(i).toLocaleString('ru-RU').replace(/\s/g, ' ');
  return (
    <span ref={ref} className={`tnum ${className ?? ''}`}>
      {int}
      {f ? `,${f}` : ''}
    </span>
  );
}
