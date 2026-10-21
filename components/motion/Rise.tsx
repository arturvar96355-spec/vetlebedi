import type { CSSProperties, ReactNode } from 'react';

/** Появление при загрузке на чистом CSS (для первого экрана). */
export function Rise({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <div className={`rise ${className}`} style={{ ['--rd' as string]: `${delay}s`, ['--ry' as string]: `${y}px` } as CSSProperties}>
      {children}
    </div>
  );
}
