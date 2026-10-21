import { CalendarDays, Clock, HeartPulse, Stethoscope } from 'lucide-react';
import { doctors } from '@/content/doctors';
import { site } from '@/content/site';
import { Reveal } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';

export function TrustStrip() {
  const items = [
    { icon: CalendarDays, big: <>С&nbsp;{site.since}</>, small: 'года помогаем питомцам' },
    { icon: Clock, big: '24/7', small: 'Раменки и Олимпийская деревня' },
    { icon: Stethoscope, big: <Counter to={doctors.length} />, small: 'врачей и специалистов' },
    { icon: HeartPulse, big: 'ОРИТ', small: 'реанимация и стационар' },
  ];
  return (
    <section aria-label="Коротко о нас" className="relative border-y border-ink/10 bg-milk-2">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 py-12 md:grid-cols-4 md:px-12 md:py-14">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.08} className="flex items-start gap-4 md:border-l md:border-ink/10 md:pl-8 md:first:border-0 md:first:pl-0">
            <it.icon className="mt-1.5 shrink-0 text-lake" size={26} strokeWidth={1.4} />
            <div>
              <div className="tnum font-display text-[clamp(34px,3.4vw,48px)] leading-none">{it.big}</div>
              <div className="mt-2 text-[14px] leading-snug text-ink-soft">{it.small}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
