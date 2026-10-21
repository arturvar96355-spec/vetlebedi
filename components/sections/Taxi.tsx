import { Phone } from 'lucide-react';
import { site } from '@/content/site';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Ph } from '@/components/ui/Placeholder';
import { WaterLines } from '@/components/art/Water';

function Van() {
  return (
    <svg viewBox="0 0 520 260" className="w-full text-lake" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M26 186 V104 C26 90 36 80 50 80 H296 C312 80 324 86 334 98 L376 144 H446 C464 144 478 154 478 172 V196 H26 Z" />
      <path d="M298 96 L342 144 H290 Z" />
      <path d="M70 104 H250 V160 H70 Z" opacity=".5" />
      <path d="M160 118 v34 M143 135 h34" strokeWidth="2.2" />
      <path d="M26 196 H478" opacity="0" />
      {[[120, 204], [388, 204]].map(([x, y]) => (
        <g key={x}><circle cx={x} cy={y} r="30" fill="#f6f2ea" /><circle cx={x} cy={y} r="12" /></g>
      ))}
      <path d="M0 238 C80 228 140 246 220 238 S380 228 520 238" stroke="#8fb3a5" strokeWidth="1.2" />
    </svg>
  );
}

export function Taxi() {
  return (
    <Section id="taxi" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative rounded-[36px] bg-reed-pale/50 px-6 pb-8 pt-12 md:px-12">
            <Van />
            <WaterLines className="absolute inset-x-0 bottom-3 text-reed" lines={2} />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHead eyebrow="Зоотакси" title="Приедем за Вами и питомцем" lead="Зоотакси доставит питомца в клинику и вернёт домой после лечения. В машине есть кислородное оборудование, опытный ассистент и приспособления для перевозки, поэтому можно возить питомцев в любом состоянии." />
          <Reveal delay={0.25}>
            <p className="mt-6 text-ink-soft">Стоимость и зона выезда: <Ph>цена и зона Зоотакси — уточнить</Ph></p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.phoneHref} variant="lake" size="lg"><Phone size={18} /> Вызвать Зоотакси</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
