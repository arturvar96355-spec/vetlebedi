'use client';

import { useEffect, useState } from 'react';
import { moscowParts } from '@/lib/utils';

export function LiveStatus({ className, suffix }: { className?: string; suffix?: string }) {
  const [t, setT] = useState('');
  useEffect(() => {
    const u = () => setT(moscowParts().label);
    u();
    const id = setInterval(u, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className ?? ''}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fbf7f] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fbf7f]" />
      </span>
      <span>Открыто сейчас</span>
      <span className="tnum opacity-70" suppressHydrationWarning>{t ? `· ${t}` : ''}</span>
      {suffix && <span className="hidden opacity-70 sm:inline">{suffix}</span>}
    </span>
  );
}
