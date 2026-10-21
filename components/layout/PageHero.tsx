import { SplitHeading, Reveal } from '@/components/motion/Reveal';
import { Swan } from '@/components/art/Swan';
import { WaterLines } from '@/components/art/Water';
import { cn } from '@/lib/utils';

export function PageHero({ eyebrow, title, lead, tone = 'day', children }: { eyebrow: string; title: string; lead?: React.ReactNode; tone?: 'day' | 'alert'; children?: React.ReactNode }) {
  return (
    <section className={cn('grain relative isolate overflow-hidden', tone === 'alert' ? 'bg-[#f3e4dc]' : 'bg-milk')}>
      <div className="pointer-events-none absolute -right-10 bottom-6 hidden w-[38%] text-lake/30 lg:block" aria-hidden><Swan delay={300} /></div>
      <WaterLines className="absolute inset-x-0 bottom-0 text-reed" lines={2} />
      <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-36 md:px-12 md:pb-24 md:pt-44">
        <Reveal y={10}><p className={cn('mb-6 flex items-center gap-3 text-[12.5px] uppercase tracking-[0.16em]', tone === 'alert' ? 'text-[#a93625]' : 'opacity-70')}><span className="h-px w-8 bg-current" /> {eyebrow}</p></Reveal>
        <SplitHeading as="h1" immediate text={title} className="max-w-[900px] text-[clamp(42px,6.4vw,96px)] font-medium leading-[0.98]" />
        {lead && <Reveal delay={0.4}><div className="mt-7 max-w-[600px] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-ink-soft">{lead}</div></Reveal>}
        {children && <Reveal delay={0.55}><div className="mt-9">{children}</div></Reveal>}
      </div>
    </section>
  );
}
