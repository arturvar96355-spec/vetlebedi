import type { Metadata } from 'next';
import { Phone } from 'lucide-react';
import { site } from '@/content/site';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Ph } from '@/components/ui/Placeholder';
import { EmergencyClinics } from '@/components/widgets/EmergencyClinics';
import { FinalCta } from '@/components/sections/FaqFinal';

export const metadata: Metadata = { title: 'Если срочно — Лебеди' };

const signs = [
  ['Отравление', 'Питомец съел что-то опасное: таблетки, химию, незнакомую еду.'],
  ['Травма', 'Падение с высоты, удар, укус, подозрение на перелом.'],
  ['Дыхание', 'Не дышит, тяжело дышит, дышит с открытым ртом.'],
  ['Судороги', 'Судороги или потеря сознания.'],
  ['Кровотечение', 'Сильное кровотечение, которое не останавливается.'],
  ['Не может помочиться', 'Часто пытается, но не получается.'],
  ['Роды', 'Роды с осложнениями.'],
];
const road = [
  'Не давайте лекарства из домашней аптечки без консультации.',
  'Везите в переноске или на ровной поверхности, лучше вдвоём.',
  'Если подозреваете отравление, возьмите упаковку или остатки.',
  'Позвоните заранее: мы подготовимся к приезду.',
];

export default function Page() {
  return (
    <>
      <PageHero tone="alert" eyebrow="Если срочно" title="Позвоните. Мы объясним, что делать" lead="Не ждите утра. Раменки и Олимпийская деревня работают круглосуточно, с 21:00 до 9:00 принимает дежурная смена.">
        <Button href={site.phoneHref} variant="alert" size="lg"><Phone size={20} /> {site.phone}</Button>
      </PageHero>
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal><h2 className="text-[clamp(32px,4vw,56px)]">Езжайте сразу, если…</h2></Reveal>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {signs.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 0.05}>
                  <div className="h-full rounded-[24px] border border-alert/20 bg-milk-2 p-5">
                    <p className="font-display text-[26px] leading-tight">{t}</p>
                    <p className="mt-1.5 text-[15px] text-ink-soft">{d}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal><p className="mt-6 text-[15px] text-ink-soft">Это не диагноз. Если сомневаетесь — позвоните, подскажем, нужно ли ехать прямо сейчас.</p></Reveal>
          </div>
          <div className="grid content-start gap-10">
            <Reveal>
              <h2 className="text-[clamp(28px,3vw,40px)]">Что сделать по дороге</h2>
              <ol className="mt-6 grid gap-3">
                {road.map((r, i) => (
                  <li key={r} className="flex gap-4"><span className="tnum grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lake font-display text-lg text-lake">{i + 1}</span><span className="pt-1 text-[16.5px]">{r}</span></li>
                ))}
              </ol>
            </Reveal>
            <Reveal><div><h2 className="text-[clamp(28px,3vw,40px)]">Куда ехать</h2><EmergencyClinics /></div></Reveal>
            <Reveal><p className="text-[14.5px] text-ink-soft">Ночью цены те же: об этом пишут клиенты на Яндекс Картах. Порядок приёма в дежурную смену: <Ph>уточнить: полный ли приём ночью</Ph></p></Reveal>
          </div>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
