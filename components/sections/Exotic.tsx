import { Bird, Rabbit, Rat, Squirrel, Turtle, Snail } from 'lucide-react';
import { exoticGroups } from '@/content/prices';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';

const icons = [Bird, Rabbit, Rat, Squirrel, Turtle, Snail];

export function Exotic() {
  return (
    <section id="exotic" className="relative overflow-hidden bg-sand/55">
      <Section className="!bg-transparent">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <SectionHead eyebrow="Экзотика" title="Принимаем птиц, рептилий, грызунов" lead="Не все клиники берутся лечить хомяка, попугая или черепаху. У нас на это есть отдельные врачи. Приём экзотического питомца — 5 100 ₽ за 20 минут." />
            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {exoticGroups.map((g) => (
                  <li key={g} className="rounded-full border border-ink/15 bg-milk-2/70 px-4 py-2 text-[14.5px]">{g}</li>
                ))}
              </ul>
              <div className="mt-10"><Button href="/doctors/?s=Экзотические%20животные" variant="lake">Врачи по экзотике</Button></div>
            </Reveal>
          </div>
          <Reveal>
            <div className="grid grid-cols-3 gap-4" aria-hidden>
              {icons.map((Ic, i) => (
                <div key={i} className="grid aspect-square place-items-center rounded-[28px] border border-ink/10 bg-milk-2/60 text-lake transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-3deg]">
                  <Ic size={52} strokeWidth={0.9} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </section>
  );
}
