'use client';

import { useRef, type ReactNode } from 'react';

/** Магнитный эффект ≤ 8 px, только для мыши. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out ${className ?? ''}`}
      onPointerMove={(e) => {
        if (!fine() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 12;
        ref.current.style.transform = `translate(${Math.max(-8, Math.min(8, x))}px, ${Math.max(-8, Math.min(8, y))}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
    >
      {children}
    </span>
  );
}
