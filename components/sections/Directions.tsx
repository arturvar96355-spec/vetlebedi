import Link from 'next/link';
import { ArrowUpRight, Bird, Brain, Eye, HeartPulse, ScanLine, ShieldAlert, Siren, Smile, Stethoscope, Syringe } from 'lucide-react';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';

const items = [
  { icon: Stethoscope, title: 'Терапия', text: 'Осмотр, диагноз и лечение. От первой прививки до сложных хронических случаев.', q: 'Терапия' },
  { icon: Syringe, title: 'Хирургия', text: 'Плановые и экстренные операции, в том числе лапароскопические.', q: 'Хирургия', href: '/surgery/' },
  { icon: HeartPulse, title: 'Кардиология', text: 'УЗИ сердца, ЭКГ и подбор лечения при болезнях сердца.', q: 'Кардиология' },
  { icon: Brain, title: 'Неврология', text: 'Приём невролога, операции на позвоночнике и головном мозге.', q: 'Неврология' },
  { icon: Siren, title: 'Реанимация', text: 'Отделение реанимации и интенсивной терапии, кислородная камера.', q: 'Реанимация' },
  { icon: Bird, title: 'Экзотические питомцы', text: 'Птицы, грызуны, кролики, хорьки, рептилии.', q: 'Экзотические животные' },
  { icon: ScanLine, title: 'Диагностика', text: 'Рентген, УЗИ, ЭКГ, эндоскопия и собственная лаборатория.', q: 'УЗИ' },
  { icon: Smile, title: 'Стоматология', text: 'Осмотр и лечение зубов, в том числе под наркозом.', q: 'Стоматология' },
  { icon: Eye, title: 'Офтальмология', text: 'Лечение глаз, в том числе микрохирургия.', q: 'Офтальмология' },
  { icon: ShieldAlert, title: 'Инфекционное отделение', text: 'Отдельные боксы в изолированном помещении.', q: 'Инфекционные болезни' },
];

export function Directions() {
  return (
    <Section id="directions" className="bg-milk">
      <SectionHead eyebrow="Направления" title="Всё, что нужно питомцу, в одном месте" lead="Врачи по узким направлениям и оборудование для диагностики работают в одной клинике. Не нужно ездить по разным адресам." />
      <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 md:grid-cols-3 lg:grid-cols-5">
        {items.map((it, i) => (
          <Reveal as="li" key={it.title} delay={(i % 5) * 0.06} className="bg-milk">
            <Link
              href={it.href ?? `/doctors/?s=${encodeURIComponent(it.q)}`}
              className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden p-4 sm:min-h-[260px] sm:p-6 transition-colors duration-500 hover:bg-lake hover:text-milk"
            >
              <div className="flex items-start justify-between">
                <it.icon size={30} strokeWidth={1.25} className="text-lake transition-colors duration-500 group-hover:text-reed-pale" />
                <span className="tnum font-display text-[22px] text-lake">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <h3 className="text-[22px] leading-[1.05] sm:text-[27px]">{it.title}</h3>
                <p className="mt-2 text-[13.5px] leading-snug sm:mt-3 sm:text-[14.5px] text-ink-soft transition-colors duration-500 group-hover:text-milk/80">{it.text}</p>
                <ArrowUpRight size={18} className="mt-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
