'use client';

import { CalendarCheck, MapPin, Phone } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { site } from '@/content/site';
import { useUI } from './UIProvider';

/** Мобильная нижняя панель: всегда видна. */
export function BottomBar() {
  const { openBooking } = useUI();
  const item = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[13px] font-medium';
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-milk/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-[560px] items-stretch gap-2 p-2">
        <a href={site.phoneHref} className={`${item} rounded-2xl bg-alert text-white`}>
          <Phone size={19} /> Позвонить
        </a>
        <a href={clinics[0].routeUrl} target="_blank" rel="noopener noreferrer" className={`${item} rounded-2xl text-ink`}>
          <MapPin size={19} /> Маршрут
        </a>
        <button type="button" onClick={() => openBooking()} className={`${item} rounded-2xl bg-lake text-milk`}>
          <CalendarCheck size={19} /> Записаться
        </button>
      </div>
    </div>
  );
}
