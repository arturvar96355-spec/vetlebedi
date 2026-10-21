'use client';

import { Phone, Star } from 'lucide-react';
import { site } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { Counter } from '@/components/motion/Counter';
import { useUI } from '@/components/layout/UIProvider';

export function HeroActions() {
  const { openBooking } = useUI();
  return (
    <div className="mt-7 grid grid-cols-2 items-center gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-y-4">
      <Button href={site.phoneHref} variant="alert" size="lg" className="w-full px-5 sm:w-auto sm:px-9"><Phone size={19} /> Позвонить</Button>
      <Button size="lg" variant="lake" className="w-full px-5 sm:w-auto sm:px-9" onClick={() => openBooking()}><span>Записаться<span className="hidden sm:inline">&nbsp;на приём</span></span></Button>
      <a
        href={site.mapsReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-2 inline-flex items-center justify-center gap-3 rounded-full border border-current/15 bg-[color:var(--sky-bg)]/50 py-2.5 pl-4 pr-5 text-[13px] sm:justify-start sm:text-[14px] backdrop-blur transition-colors hover:border-current/40 sm:ml-3"
      >
        <span className="flex items-center gap-0.5 text-[#e0a526]">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
        </span>
        <span><Counter to={site.rating.value} decimals={1} className="font-semibold" /> · <Counter to={site.rating.count} /> оценок на&nbsp;Яндекс&nbsp;Картах</span>
      </a>
    </div>
  );
}
