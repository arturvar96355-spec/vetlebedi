'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DogFigure } from '@/components/art/DogFigure';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { useUI } from '@/components/layout/UIProvider';
import { cn } from '@/lib/utils';

export const surgerySteps = [
  { k: 'Открытая операция', t: 'Большой разрез', d: 'Хирург получает прямой доступ, но тканям приходится тяжелее, а восстановление обычно дольше.' },
  { k: 'Лапароскопия', t: 'Несколько небольших проколов', d: 'Камера и инструменты работают внутри. Сколько проколов и какого размера — расскажет хирург на консультации.' },
  { k: 'Газовый наркоз', t: 'Контроль состояния всё время', d: 'Ингаляционный наркоз. Все эндоскопические манипуляции выполняет хирургическая бригада под строгим контролем анестезиолога.' },
  { k: 'После операции', t: 'Кислородная камера', d: 'Пациент восстанавливается в кислородной среде под наблюдением. Это помогает даже самым тяжёлым питомцам.' },
] as const;

export function SurgeryScene() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const { openBooking } = useUI();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const q = (s: string) => el.querySelectorAll(s);
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: el.querySelector('.pin'),
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => { const t = self.animation?.time() ?? 0; setStep(t >= 3 ? 3 : t >= 2 ? 2 : t >= 1 ? 1 : 0); },
        },
      });
      gsap.set(q('.inc'), { strokeDasharray: '1', strokeDashoffset: 1, opacity: 1 });
      gsap.set(q('.port'), { scale: 0, opacity: 0 });
      gsap.set(q('.ports'), { opacity: 1 });
      gsap.set(q('.ring'), { opacity: 0, scale: 0.85 });
      gsap.set(q('.capsule'), { opacity: 1 });
      gsap.set(q('.capsule-line'), { strokeDashoffset: 1 });
      gsap.set(q('.bubble'), { opacity: 0 });
      gsap.set(q('.stepcopy'), { opacity: 0, y: 24 });
      gsap.set(q('.stepcopy-0'), { opacity: 1, y: 0 });

      // шаг 1: большой разрез рисуется
      tl.to(q('.inc'), { strokeDashoffset: 0, duration: 1 }, 0)
        // шаг 2: разрез стирается, появляются проколы
        .to(q('.stepcopy-0'), { opacity: 0, y: -24, duration: 0.4 }, 1)
        .set(q('.inc'), { strokeDasharray: '6 7' }, 0.95)
        .to(q('.inc'), { opacity: 0, duration: 0.5 }, 1)
        .to(q('.stepcopy-1'), { opacity: 1, y: 0, duration: 0.5 }, 1.3)
        .to(q('.port'), { scale: 1, opacity: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(2)' }, 1.2)
        // шаг 3: кольцо
        .to(q('.stepcopy-1'), { opacity: 0, y: -24, duration: 0.4 }, 2)
        .to(q('.ring'), { opacity: 1, scale: 1, duration: 0.8 }, 2.1)
        .to(q('.ring'), { scale: 1.07, duration: 0.5, yoyo: true, repeat: 1 }, 2.6)
        .to(q('.stepcopy-2'), { opacity: 1, y: 0, duration: 0.5 }, 2.3)
        // шаг 4: капсула
        .to(q('.stepcopy-2'), { opacity: 0, y: -24, duration: 0.4 }, 3)
        .to(q('.ring, .ports'), { opacity: 0, duration: 0.4 }, 3)
        .to(q('.dogwrap'), { scale: 0.82, transformOrigin: '50% 50%', duration: 0.9 }, 3.1)
        .to(q('.capsule-line'), { strokeDashoffset: 0, duration: 0.9 }, 3.1)
        .to(q('.bubble'), { opacity: 1, y: -30, stagger: 0.08, duration: 0.8 }, 3.5)
        .to(q('.stepcopy-3'), { opacity: 1, y: 0, duration: 0.5 }, 3.4)
        .to({}, { duration: 0.4 });
      return () => tl.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="surgery" data-dark className="relative bg-night text-moon">
      {/* Десктоп: pin + scrub */}
      <div className="pin relative hidden h-[100svh] overflow-hidden md:motion-safe:block">
        <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(70% 60% at 62% 50%, #1b4743 0%, rgba(14,38,36,0) 70%)' }} />
        <div className="relative mx-auto grid h-full max-w-[1280px] grid-cols-12 items-center gap-8 px-12">
          <div className="col-span-5">
            <p className="mb-6 flex items-center gap-3 text-[12.5px] uppercase tracking-[0.16em] text-aqua"><span className="h-px w-8 bg-current" /> Лапароскопия</p>
            <h2 className="font-display text-[clamp(40px,4.6vw,68px)] font-medium leading-[1]">Меньше разрезов. <em>Больше</em> спокойствия</h2>
            <div className="relative mt-10 h-[210px]">
              {surgerySteps.map((s, i) => (
                <div key={i} className={`stepcopy stepcopy-${i} absolute inset-0`}>
                  <p className="text-[12.5px] uppercase tracking-[0.14em] text-aqua">{s.k}</p>
                  <p className="mt-2 font-display text-[34px] leading-tight">{s.t}</p>
                  <p className="mt-3 max-w-[460px] text-[16.5px] leading-relaxed text-moon/75">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3">
              <Button variant="moon" onClick={() => openBooking({ reason: 'Консультация хирурга' })}>Консультация хирурга</Button>
              <Button href="/surgery/" variant="ghost-dark">Подробнее</Button>
            </div>
          </div>
          <div className="relative col-span-7">
            <DogFigure className="w-full text-moon" />
          </div>
        </div>
        <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3" aria-hidden>
          {surgerySteps.map((_, i) => (
            <span key={i} className={cn('h-8 w-px transition-all duration-500', i === step ? 'h-14 bg-aqua' : 'bg-moon/25')} />
          ))}
        </div>
        <p className="tnum absolute bottom-8 right-12 font-display text-3xl text-moon/60">{step + 1}<span className="text-moon/30"> / 4</span></p>
      </div>

      {/* Мобильная версия и reduced-motion: четыре карточки */}
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:motion-safe:hidden">
        <p className="mb-5 flex items-center gap-3 text-[12.5px] uppercase tracking-[0.16em] text-aqua"><span className="h-px w-8 bg-current" /> Лапароскопия</p>
        <h2 className="font-display text-[44px] font-medium leading-[1]">Меньше разрезов. <em>Больше</em> спокойствия</h2>
        <ol className="mt-12 grid gap-5">
          {surgerySteps.map((s, i) => (
            <Reveal as="li" key={i}>
              <div className="rounded-[28px] border border-moon/10 bg-night-2 p-5">
                <DogFigure step={(i + 1) as 1 | 2 | 3 | 4} className="mb-4 w-full text-moon" />
                <p className="text-[12.5px] uppercase tracking-[0.14em] text-aqua">{i + 1} / 4 · {s.k}</p>
                <p className="mt-2 font-display text-[30px] leading-tight">{s.t}</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-moon/75">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 grid gap-3">
          <Button variant="moon" size="lg" magnetic={false} onClick={() => openBooking({ reason: 'Консультация хирурга' })}>Консультация хирурга</Button>
          <Link href="/surgery/" className="text-center text-moon/70 underline underline-offset-4">Подробнее о хирургии</Link>
        </div>
      </div>
    </section>
  );
}
