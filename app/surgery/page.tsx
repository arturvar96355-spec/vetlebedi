import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { SurgeryScene } from '@/components/sections/SurgeryScene';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Ph } from '@/components/ui/Placeholder';
import { Button } from '@/components/ui/Button';
import { DoctorCard } from '@/components/sections/DoctorsStrip';
import { FinalCta } from '@/components/sections/FaqFinal';
import { doctors } from '@/content/doctors';
import { priceGroups } from '@/content/prices';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = { title: 'Хирургия и лапароскопия — Лебеди' };

const surgeons = ['lebedko', 'aksenov', 'denisenko', 'belimova', 'feraybert', 'skorobogatiy'].map((id) => doctors.find((d) => d.id === id)!);
const lap = priceGroups.find((g) => g.id === 'lap')!;
const std = priceGroups.find((g) => g.id === 'sterilization')!;

const facts = [
  ['Лапароскопия', 'Малотравматичная хирургия: операцию выполняют через небольшие проколы с камерой и инструментами. Это меньше боли и ущерба организму.'],
  ['Бригада и наркоз', 'Эндоскопические манипуляции выполняет хирургическая бригада под строгим контролем анестезиолога. Используется газовый наркоз.'],
  ['После операции', 'Содержание в кислородной камере и наблюдение помогают пациентам восстанавливаться. Тяжёлых пациентов принимаем и по направлению других клиник.'],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Хирургия" title="Операции, после которых питомец быстрее встаёт на лапы" lead="От стерилизации до неврологических операций на позвоночнике и головном мозге. Лапароскопию выполняем в клиниках сети." />
      <SurgeryScene />
      <Section>
        <SectionHead eyebrow="Как это устроено" title="Малотравматичная хирургия" />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {facts.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.1}><div className="h-full rounded-[28px] border border-ink/10 bg-milk-2 p-7"><h3 className="text-[32px]">{t}</h3><p className="mt-3 text-ink-soft">{d}</p></div></Reveal>
          ))}
        </ul>
        <Reveal><p className="mt-8 max-w-[640px] text-[15px] text-ink-soft">Сколько проколов и какого размера, подойдёт ли лапароскопия именно Вашему питомцу — решает хирург на консультации. Результаты и сроки восстановления мы не обещаем заранее.</p></Reveal>
      </Section>
      <Section className="bg-milk-2">
        <SectionHead eyebrow="Хирурги" title="Кто оперирует" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {surgeons.map((d, i) => <li key={d.id} className="contents"><DoctorCard doc={d} i={i} fluid /></li>)}
        </ul>
      </Section>
      <Section>
        <SectionHead eyebrow="Цены" title="Лапароскопия и стандартная операция" lead="Комплекс для здорового питомца. Точную стоимость определяет врач после осмотра." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[lap, std].map((g) => (
            <Reveal key={g.id}>
              <div className="rounded-[28px] border border-ink/10 bg-milk-2 p-6 md:p-8">
                <h3 className="text-[28px] leading-tight">{g.title}</h3>
                <ul className="mt-5 divide-y divide-ink/10">
                  {g.rows.slice(0, g.id === 'lap' ? 99 : 10).map((r) => <li key={r.name} className="flex justify-between gap-4 py-3"><span>{r.name}</span><span className="tnum whitespace-nowrap font-display text-[24px] leading-none">{formatPrice(r.price)}</span></li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8"><Button href="/prices/" variant="ghost">Весь прайс</Button></div>
        <p className="mt-6 text-[14.5px] text-ink-soft">Порядок подготовки к операции и выписки: <Ph>подтвердить у клиники</Ph></p>
      </Section>
      <FinalCta />
    </>
  );
}
