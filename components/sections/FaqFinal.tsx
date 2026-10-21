'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, Plus } from 'lucide-react';
import { faq } from '@/content/faq';
import { site } from '@/content/site';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Ph } from '@/components/ui/Placeholder';
import { WaterLines } from '@/components/art/Water';
import { Swan } from '@/components/art/Swan';
import { useUI } from '@/components/layout/UIProvider';
import { cn } from '@/lib/utils';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHead eyebrow="Вопросы" title="Частые вопросы" lead="Не нашли ответ? Позвоните, мы всё объясним." />
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.05}>
                <h3 className="font-sans text-base font-normal tracking-normal">
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className="font-display text-[clamp(24px,2.4vw,32px)] leading-tight">{f.q}</span>
                    <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500', isOpen && 'rotate-45 border-lake bg-lake text-milk')}><Plus size={18} /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="max-w-[620px] pb-7 text-[16.5px] leading-relaxed text-ink-soft">{f.a} {f.ph && <Ph>{f.ph}</Ph>}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function FinalCta() {
  const { openBooking } = useUI();
  return (
    <section data-dark className="relative overflow-hidden bg-night text-moon">
      <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(60% 80% at 20% 100%, #1b4743 0%, rgba(14,38,36,0) 70%)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-night" />
      <Swan className="absolute -right-10 bottom-16 hidden w-[44%] text-moon/25 lg:block" breathe={false} delay={0} />
      <WaterLines className="absolute inset-x-0 bottom-10 text-reed/50" lines={3} />
      <div className="relative mx-auto max-w-[1280px] px-5 pb-40 pt-28 md:px-12 md:pb-44 md:pt-40">
        <Reveal><p className="mb-6 flex items-center gap-3 text-[12.5px] uppercase tracking-[0.16em] text-aqua"><span className="h-px w-8 bg-current" /> Если сомневаетесь</p></Reveal>
        <h2 className="max-w-[900px] font-display text-[clamp(38px,5.6vw,84px)] font-medium leading-[1]">Позвоните. Подскажем, нужно&nbsp;ли ехать <em>прямо сейчас</em></h2>
        <Reveal delay={0.2}>
          <a href={site.phoneHref} className="tnum mt-12 block w-fit font-display text-[clamp(44px,9.4vw,148px)] leading-none transition-colors hover:text-aqua">{site.phone}</a>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href={site.phoneHref} variant="alert" size="lg"><Phone size={19} /> Позвонить</Button>
            <Button variant="ghost-dark" size="lg" onClick={() => openBooking()}>Записаться онлайн</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
