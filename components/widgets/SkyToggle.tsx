'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function SkyToggle({ className }: { className?: string }) {
  const [sky, setSky] = useState<'day' | 'night'>('day');
  useEffect(() => setSky((document.documentElement.dataset.sky as 'day' | 'night') ?? 'day'), []);

  const toggle = () => {
    const next = sky === 'day' ? 'night' : 'day';
    const auto = document.documentElement.dataset.auto;
    document.documentElement.dataset.sky = next;
    setSky(next);
    try {
      if (next === auto) localStorage.removeItem('sky');
      else localStorage.setItem('sky', next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={sky === 'day' ? 'Включить ночной режим' : 'Включить дневной режим'}
      title={sky === 'day' ? 'Ночной режим' : 'Дневной режим'}
      className={`grid h-11 w-11 place-items-center rounded-full border border-current/25 transition-colors hover:bg-current/10 ${className ?? ''}`}
    >
      {sky === 'day' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
