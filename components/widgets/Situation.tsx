'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Activity, BedDouble, CalendarCheck, Phone, Siren, X } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { site } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { scrollToId } from '@/components/motion/SmoothScroll';
import { useUI } from '@/components/layout/UIProvider';
import { cn } from '@/lib/utils';

const urgent = [
  'Отравление: питомец съел что-то опасное',
  'Травма, падение с высоты, укус',
  'Не дышит или тяжело дышит',
  'Судороги, потеря сознания',
  'Сильное кровотечение',
  'Не может помочиться',
  'Роды с осложнениями',
];
const onTheWay = [
  'Не давайте лекарства из домашней аптечки без консультации.',
  'Везите в переноске или на ровной поверхности, лучше вдвоём.',
  'Если подозреваете отравление, возьмите упаковку или остатки.',
  'Позвоните заранее: мы подготовимся к приезду.',
];

type Id = 'urgent' | 'plan' | 'surgery' | 'hospital';

const tiles: { id: Id; title: string; hint: string; icon: typeof Siren }[] = [
  { id: 'urgent', title: 'Срочно', hint: 'Что делать прямо сейчас', icon: Siren },
  { id: 'plan', title: 'Плановый приём', hint: 'Осмотр, прививка, анализы', icon: CalendarCheck },
  { id: 'surgery', title: 'Операция', hint: 'Как это устроено у нас', icon: Activity },
  { id: 'hospital', title: 'Стационар', hint: 'Реанимация и наблюдение', icon: BedDouble },
];

export function Situation() {
  const [open, setOpen] = useState<Id | null>(null);
  const { openBooking } = useUI();

  const pick = (id: Id) => {
    if (id === 'urgent') return setOpen(open === 'urgent' ? null : 'urgent');
    setOpen(null);
    if (id === 'plan') return openBooking();
    scrollToId(id === 'surgery' ? 'surgery' : 'hospital');
  };

  return (
    <div>
      <p className="mb-3 flex items-center gap-3 text-[12.5px] uppercase tracking-[0.14em] text-[color:var(--sky-soft)]">
        <span className="h-px w-8 bg-current opacity-50" /> Что случилось?
      </p>
      <LayoutGroup>
        <div
          role="group"
          aria-label="Выберите ситуацию"
          className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(null);
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
              const btns = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button[data-tile]'));
              const i = btns.indexOf(document.activeElement as HTMLButtonElement);
              if (i > -1) btns[(i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length].focus();
            }
          }}
        >
          {tiles.map((t) => {
            const Icon = t.icon;
            const isUrgent = t.id === 'urgent';
            const active = open === t.id;
            return (
              <motion.button
                key={t.id}
                data-tile
                type="button"
                onClick={() => pick(t.id)}
                aria-expanded={isUrgent ? active : undefined}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className={cn(
                  'group relative flex min-h-[104px] flex-col justify-between overflow-hidden rounded-[22px] border p-4 text-left backdrop-blur-md transition-colors md:min-h-[128px] md:p-5',
                  isUrgent
                    ? 'border-alert/40 bg-alert text-white shadow-[0_20px_40px_-16px_rgb(194_65_45/.7)]'
                    : 'border-ink/10 bg-milk-2/75 text-ink hover:border-lake/50 hover:bg-milk-2 [html[data-sky=night]_&]:border-moon/15 [html[data-sky=night]_&]:bg-night-2/70 [html[data-sky=night]_&]:text-moon [html[data-sky=night]_&]:hover:bg-night-2',
                )}
              >
                <span className="flex items-start justify-between">
                  <Icon size={24} strokeWidth={1.5} />
                  <span aria-hidden className="text-lg opacity-60 transition-transform duration-300 group-hover:translate-x-1">{isUrgent ? (active ? '–' : '+') : '→'}</span>
                </span>
                <span>
                  <span className="block font-display text-[26px] font-semibold leading-none md:text-[30px]">{t.title}</span>
                  <span className="mt-1.5 hidden text-[13.5px] opacity-75 md:block">{t.hint}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {open === 'urgent' && (
            <motion.div
              key="urgent"
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative mt-3 grid gap-6 rounded-[28px] border border-alert/30 bg-milk-2 p-5 text-ink shadow-[0_30px_70px_-30px_rgb(194_65_45/.5)] md:grid-cols-[1.15fr_1fr] md:p-7">
                <button type="button" aria-label="Закрыть" onClick={() => setOpen(null)} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"><X size={18} /></button>
                <div>
                  <h3 className="text-3xl md:text-4xl">Езжайте сразу, если…</h3>
                  <ul className="mt-4 grid gap-2 text-[16px]">
                    {urgent.map((u) => (
                      <li key={u} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-alert" />{u}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[14px] text-ink-soft">Это не диагноз. Если сомневаетесь — позвоните, подскажем, нужно ли ехать прямо сейчас.</p>
                </div>
                <div className="grid content-start gap-5">
                  <Button href={site.phoneHref} variant="alert" size="lg" className="w-full md:mt-8"><Phone size={19} /> {site.phone}</Button>
                  <div>
                    <p className="text-sm font-medium">Работаем круглосуточно</p>
                    <ul className="mt-2 grid gap-1.5 text-[15px] text-ink-soft">
                      {clinics.filter((c) => c.hours.kind === '24/7').map((c) => (
                        <li key={c.id}><a href={c.routeUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-4 hover:decoration-lake">{c.name}</a>: {c.address.replace('Москва, ', '')}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Что сделать по дороге</p>
                    <ul className="mt-2 grid gap-1.5 text-[15px] text-ink-soft">
                      {onTheWay.map((o) => <li key={o}>— {o}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
