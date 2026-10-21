import { Star } from 'lucide-react';
import { quotes } from '@/content/quotes';
import { clinics } from '@/content/clinics';
import { site } from '@/content/site';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

const show = quotes.slice(0, 12);
const clinicName = (id: string) => clinics.find((c) => c.id === id)?.short;

function Card({ q }: { q: (typeof quotes)[number] }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col justify-between rounded-[28px] border border-moon/10 bg-night-2 p-6 md:w-[380px]">
      <div>
        <div role="img" className="flex gap-0.5 text-[#e0a526]" aria-label="5 из 5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}</div>
        <blockquote className="mt-4 font-display text-[26px] leading-[1.15] text-moon">«{q.text}»</blockquote>
      </div>
      <figcaption className="mt-6 text-[13px] text-moon/60">{q.author} · {clinicName(q.clinic)} · отзыв на Яндекс Картах</figcaption>
    </figure>
  );
}

export function Reviews() {
  return (
    <Section id="reviews" dark className="overflow-hidden">
      <div className="grid items-end gap-12 lg:grid-cols-[1fr_1fr]">
        <SectionHead eyebrow="Отзывы" title="Что говорят те, кто к нам приезжал" lead="Это дословные отзывы с Яндекс Карт. Мы ничего не правили." />
        <Reveal>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <div>
              <div className="tnum font-display text-[clamp(72px,9vw,128px)] leading-[0.85]"><Counter to={5} decimals={1} /></div>
              <div role="img" aria-label="5 из 5" className="mt-6 flex gap-0.5 text-[#e0a526]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}</div>
            </div>
            <ul className="grid gap-1.5 text-[14.5px] text-moon/75">
              {clinics.map((c) => (
                <li key={c.id} className="flex items-center gap-3"><span className="tnum w-8 font-semibold text-moon">{c.rating.toFixed(1).replace('.', ',')}</span> {c.short} <span className="tnum text-moon/70">{c.ratings.toLocaleString('ru-RU')} оценок</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="relative -mx-5 mt-16 overflow-hidden md:-mx-12" style={{ maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
        <div className="marquee gap-5 px-3 [animation-duration:90s] motion-reduce:overflow-x-auto" style={{ ['--dur' as string]: '90s' }}>
          <div className={cn('flex gap-5 pr-5')}>{show.map((q) => <Card key={q.text} q={q} />)}</div>
          <div className="flex gap-5 pr-5" aria-hidden>{show.map((q) => <Card key={q.text + '2'} q={q} />)}</div>
        </div>
      </div>

      <Reveal>
        <p className="mt-12 text-[15px] text-moon/70">
          Более {(Math.floor(site.rating.totalCount / 100) * 100).toLocaleString('ru-RU').replace(/\s/g, '\u00A0')} оценок на Яндекс Картах по трём клиникам.
          <a href={site.mapsReviewsUrl} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-1 text-aqua underline underline-offset-4">Все {site.rating.reviews.toLocaleString('ru-RU')} отзывов на Яндекс Картах →</a>
        </p>
      </Reveal>
    </Section>
  );
}
