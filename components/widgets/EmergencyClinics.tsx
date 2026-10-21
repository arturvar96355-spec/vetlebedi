'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { isOpenNow, cn } from '@/lib/utils';

export function EmergencyClinics() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const u = () => setOpen(Object.fromEntries(clinics.map((c) => [c.id, isOpenNow(c.hours)])));
    u();
    const id = setInterval(u, 60_000);
    return () => clearInterval(id);
  }, []);
  const sorted = [...clinics].sort((a, b) => Number(open[b.id] ?? 1) - Number(open[a.id] ?? 1));
  return (
    <ul className="mt-6 grid gap-3">
      {sorted.map((c) => {
        const o = open[c.id];
        return (
          <li key={c.id}>
            <a href={c.routeUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-[22px] border border-ink/10 bg-milk-2 p-5 transition-all hover:-translate-y-0.5 hover:border-lake/50">
              <span>
                <span className="block font-display text-[26px] leading-none">{c.name}</span>
                <span className="mt-1.5 block text-[14.5px] text-ink-soft">{c.address.replace('Москва, ', '').replace('Московская область, ', '')}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-2">
                <span className={cn('rounded-full px-3 py-1 text-[12.5px] font-medium', o === false ? 'bg-sand text-ink-soft' : 'bg-reed-pale text-lake-deep')}>{o === false ? `Закрыто · ${c.hoursLabel}` : c.hours.kind === '24/7' ? 'Открыто 24/7' : `Открыто · ${c.hoursLabel}`}</span>
                <span className="inline-flex items-center gap-1 text-[13.5px] text-lake"><MapPin size={14} /> Маршрут</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
