'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Star } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { site } from '@/content/site';
import { isOpenNow } from '@/lib/utils';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { MoscowMap } from '@/components/art/MoscowMap';
import { cn } from '@/lib/utils';

export function Clinics() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const u = () => setOpen(Object.fromEntries(clinics.map((c) => [c.id, isOpenNow(c.hours)])));
    u();
    const id = setInterval(u, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <Section id="clinics">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <SectionHead eyebrow="Клиники" title="Три клиники. Одна команда" lead="Раменки и Олимпийская деревня работают круглосуточно. Видное принимает с 8:00 до 23:00. Телефон один на всех: администратор подскажет, куда ехать." />
          <ul className="mt-12 grid gap-4">
            {clinics.map((c, i) => {
              const isOpen = open[c.id];
              return (
                <Reveal as="li" key={c.id} delay={i * 0.08}>
                  <article
                    onMouseEnter={() => setActive(c.id)}
                    onMouseLeave={() => setActive(null)}
                    className={cn('rounded-[28px] border bg-milk-2 p-6 transition-all duration-300 md:p-7', active === c.id ? 'border-lake shadow-[var(--shadow-lift)] -translate-y-1' : 'border-ink/10 shadow-[var(--shadow-soft)]')}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[34px]">{c.name}</h3>
                        <p className="mt-1.5 text-[16px] text-ink-soft">{c.address}</p>
                        {c.note && <p className="text-[14px] text-ink-soft">{c.note}</p>}
                      </div>
                      <span className={cn('inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium', isOpen === false ? 'bg-sand text-ink-soft' : 'bg-reed-pale text-lake-deep')}>
                        <span className={cn('h-2 w-2 rounded-full', isOpen === false ? 'bg-ink-soft/50' : 'bg-[#2fa86a]')} />
                        {isOpen === undefined ? c.hoursLabel : c.hours.kind === '24/7' ? 'Открыто 24/7' : isOpen ? `Открыто · ${c.hoursLabel}` : `Закрыто · ${c.hoursLabel}`}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button href={c.routeUrl} variant="lake" className="min-h-11 px-5"><MapPin size={17} /> Маршрут</Button>
                      <Button href={site.phoneHref} variant="ghost" className="min-h-11 px-5"><Phone size={16} /> Позвонить</Button>
                      <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-[14px] text-ink-soft hover:text-ink">
                        <Star size={14} className="fill-[#e0a526] text-[#e0a526]" /> <span className="tnum">{c.rating.toFixed(1).replace('.', ',')} · {c.ratings.toLocaleString('ru-RU')}</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[36px] border border-ink/10 bg-milk-2 shadow-[var(--shadow-soft)]">
            <MoscowMap active={active} onPick={setActive} />
            <p className="absolute bottom-4 left-5 text-[12px] text-ink-soft">Схема, не в масштабе</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
