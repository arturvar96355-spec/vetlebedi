import { Droplets, ShieldPlus, Wind, ArrowRight } from 'lucide-react';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Ph } from '@/components/ui/Placeholder';
import { quotes } from '@/content/quotes';

const cols = [
  { icon: Droplets, t: 'Реанимация', d: 'Отделение реанимации и интенсивной терапии. Круглосуточное наблюдение за показателями и корректировка лечения.' },
  { icon: ShieldPlus, t: 'Инфекционные боксы', d: 'Инфекционные пациенты содержатся в индивидуальных боксах в отдельном изолированном помещении.' },
  { icon: Wind, t: 'Кислородная камера', d: 'Кислородная среда после операции и в тяжёлых состояниях помогает пациентам восстанавливаться.' },
];

const steps = [
  { t: 'Врач говорит, что можно забирать', d: 'И объясняет, что произошло и как прошло лечение.' },
  { t: 'Вам объясняют уход дома', d: 'Питание, лекарства, когда приехать на контроль.' },
  { t: 'Вы получаете выписку и результаты', d: 'Снимки и анализы можно взять с собой.', ph: 'порядок выдачи копий — уточнить' },
  { t: 'Врач остаётся на связи', d: 'Если после выписки появились вопросы.', ph: 'канал связи — уточнить' },
];

const reports = quotes.filter((q) => q.topic === 'Стационар');

export function Hospital() {
  return (
    <Section id="hospital">
      <SectionHead eyebrow="Стационар и реанимация" title="Когда питомец остаётся у нас, Вы знаете, что с ним" lead="Мы понимаем, как тяжело оставлять питомца. Поэтому объясняем, что происходит, и держим Вас в курсе." />
      <ul className="mt-16 grid gap-5 md:grid-cols-3">
        {cols.map((c, i) => (
          <Reveal as="li" key={c.t} delay={i * 0.1}>
            <div className="group h-full rounded-[28px] border border-ink/10 bg-milk-2 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-lake/40 hover:shadow-[var(--shadow-lift)]">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-reed-pale text-lake transition-colors duration-500 group-hover:bg-lake group-hover:text-milk"><c.icon size={26} strokeWidth={1.3} /></span>
              <h3 className="mt-8 text-[32px]">{c.t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-24 grid gap-14 lg:grid-cols-2">
        <div>
          <Reveal><h3 className="text-[clamp(30px,3.2vw,44px)]">Как мы держим Вас в курсе</h3></Reveal>
          <Reveal delay={0.1}><p className="mt-4 max-w-[480px] text-ink-soft">Порядок связи со стационаром: <Ph>порядок связи с владельцем — уточнить</Ph>. Вот как это описывают сами клиенты:</p></Reveal>
          <ul className="mt-8 grid gap-4">
            {reports.map((q, i) => (
              <Reveal as="li" key={q.text} delay={0.1 + i * 0.1}>
                <figure className="rounded-[24px] bg-sand/60 p-6">
                  <blockquote className="font-display text-[26px] leading-snug">«{q.text}»</blockquote>
                  <figcaption className="mt-3 text-[13px] text-ink-soft">{q.author} · отзыв на Яндекс Картах</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal><h3 className="text-[clamp(30px,3.2vw,44px)]">Как проходит выписка</h3></Reveal>
          <Reveal delay={0.1}><p className="mt-4 text-ink-soft"><Ph>порядок выписки — подтвердить у клиники</Ph></p></Reveal>
          <ol className="mt-8 grid gap-0">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={0.1 + i * 0.1}>
                <div className="relative flex gap-5 pb-8">
                  {i < steps.length - 1 && <span className="absolute left-[19px] top-11 h-[calc(100%-2.25rem)] w-px bg-reed" aria-hidden />}
                  <span className="tnum relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lake bg-milk font-display text-xl text-lake">{i + 1}</span>
                  <div>
                    <p className="flex items-center gap-2 font-display text-[26px] leading-tight">{s.t}{i < steps.length - 1 && <ArrowRight size={16} className="text-reed" />}</p>
                    <p className="mt-1 text-[15.5px] text-ink-soft">{s.d} {s.ph && <Ph>{s.ph}</Ph>}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
