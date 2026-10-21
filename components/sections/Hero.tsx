import { site } from '@/content/site';
import { Swan } from '@/components/art/Swan';
import { Sky } from '@/components/art/Sky';
import { WaterLines } from '@/components/art/Water';
import { SplitHeading, Reveal } from '@/components/motion/Reveal';
import { HeroActions } from './HeroActions';
import { LiveStatus } from '@/components/widgets/LiveStatus';
import { Situation } from '@/components/widgets/Situation';

export function Hero() {
  return (
    <section className="grain relative isolate min-h-[100svh] overflow-hidden bg-[color:var(--sky-bg)] text-[color:var(--sky-ink)] transition-colors duration-[1200ms]">
      <Sky />

      {/* Лебедь и вода */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[170px] z-0 hidden md:block" aria-hidden>
        <div className="relative mx-auto max-w-[1600px]">
          <Swan className="absolute -right-[2%] bottom-[18px] w-[48%] text-[color:var(--sky-line)] opacity-90 lg:w-[44%]" delay={500} />
        </div>
        <WaterLines className="absolute inset-x-0 bottom-0 text-reed" lines={4} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] flex-col justify-between px-5 pb-8 pt-[100px] md:px-12 md:pt-[112px]">
        <div className="max-w-[860px]">
          <Reveal y={12} delay={0.1}>
            <p className="relative mb-6 grid text-[12.5px] uppercase tracking-[0.16em] text-[color:var(--sky-soft)]">
              <span className="sky-day col-start-1 row-start-1 flex items-center gap-3">
                <LiveStatus suffix="· Москва и Видное" />
              </span>
              <span className="sky-night col-start-1 row-start-1 flex items-center gap-3 text-aqua">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-60" /><span className="relative h-2 w-2 rounded-full bg-aqua" /></span>
                Дежурная смена принимает прямо сейчас
              </span>
            </p>
          </Reveal>
          <SplitHeading
            as="h1"
            immediate
            delay={0.15}
            text="Ветеринарная клиника, где *Вам* всё объясняют"
            className="font-display text-[clamp(44px,6.3vw,96px)] font-medium leading-[0.98] tracking-[-0.025em]"
          />
          <Reveal delay={0.7} y={20}>
            <p className="mt-7 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-[color:var(--sky-soft)]">
              С&nbsp;{site.since} года. Круглосуточно. Три клиники: Раменки, Олимпийская&nbsp;деревня и&nbsp;Видное.
            </p>
          </Reveal>
          <Reveal delay={0.85} y={20}>
            <HeroActions />
          </Reveal>
        </div>

        {/* Мобильная версия: лебедь на воде отдельной полосой */}
        <div className="pointer-events-none relative mt-6 h-[150px] md:hidden" aria-hidden>
          <Swan className="absolute -right-2 bottom-3 w-[68%] text-[color:var(--sky-line)] opacity-90" delay={500} />
          <WaterLines className="absolute inset-x-[-20px] bottom-0 text-reed" lines={3} />
        </div>

        <Reveal delay={1.1} y={28} className="relative mt-4 md:mt-10">
          <Situation />
        </Reveal>
      </div>
    </section>
  );
}
