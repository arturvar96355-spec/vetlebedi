'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { allSpecialties, doctors, featuredDoctors, type ClinicId } from '@/content/doctors';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Monogram } from '@/components/ui/Monogram';
import { Ph } from '@/components/ui/Placeholder';
import { useUI } from '@/components/layout/UIProvider';
import { cn } from '@/lib/utils';

const quickSpecs = ['Терапия', 'Хирургия', 'Кардиология', 'Неврология', 'Реанимация', 'Дерматология', 'Офтальмология', 'Экзотические животные'].filter((s) => allSpecialties.includes(s));

export function DoctorCard({ doc, i, fluid }: { doc: (typeof doctors)[number]; i: number; fluid?: boolean }) {
  const { openBooking } = useUI();
  const cl = doc.clinics.map((c) => clinics.find((x) => x.id === c)?.short).filter(Boolean);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group flex flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-milk-2 shadow-[0_10px_28px_-18px_rgb(16_48_46/.35)] transition-shadow duration-500 hover:shadow-[0_18px_36px_-18px_rgb(16_48_46/.45)]', fluid ? 'w-full' : 'w-[280px] shrink-0 snap-start sm:w-[300px]')}
    >
      <div className="relative">
        <Monogram name={doc.name} index={i} className="aspect-[4/3.2]" />
        <span className="ph absolute bottom-3 left-3 !border-0 !bg-milk/70 !px-2 !py-0 !text-[11px] text-ink-soft backdrop-blur">[фото — от клиента]</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="min-h-[18px] text-[12.5px] uppercase tracking-[0.12em] text-lake">{[doc.role, doc.degree].filter(Boolean).join(' · ')}</p>
        <h3 className="mt-1.5 text-[26px] leading-[1.05]">{doc.name}</h3>
        <p className="mt-3 flex flex-wrap gap-1.5">
          {cl.length ? cl.map((c) => <span key={c} className="rounded-full bg-reed-pale px-2.5 py-0.5 text-[12px] text-lake-deep">{c}</span>) : <Ph>клиника — уточнить</Ph>}
        </p>
        <p className="mt-3 line-clamp-2 text-[14px] leading-snug text-ink-soft">{doc.specialties.length ? doc.specialties.slice(0, 4).join(' · ') : <Ph>специализации — уточнить</Ph>}</p>
        <div className="mt-auto pt-5"><button
          type="button"
          onClick={() => openBooking({ doctor: doc.name, clinic: doc.clinics[0] ? clinics.find((c) => c.id === doc.clinics[0])?.name : undefined })}
          className="min-h-11 w-full rounded-full border border-ink/20 text-[14.5px] font-medium transition-colors hover:border-lake hover:bg-lake hover:text-milk"
        >
          Записаться к врачу
        </button></div>
      </div>
    </motion.article>
  );
}

export function DoctorsStrip() {
  const [clinic, setClinic] = useState<ClinicId | 'all'>('all');
  const [spec, setSpec] = useState<string | 'all'>('all');
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const list = useMemo(() => {
    const base = clinic === 'all' && spec === 'all' ? featuredDoctors : doctors;
    return base
      .filter((d) => (clinic === 'all' || d.clinics.includes(clinic)) && (spec === 'all' || d.specialties.includes(spec)))
      .slice()
      .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
  }, [clinic, spec]);

  const move = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  const chip = (active: boolean) =>
    cn('min-h-11 whitespace-nowrap rounded-full border px-4 text-[14.5px] transition-colors', active ? 'border-lake bg-lake text-milk' : 'border-ink/15 hover:border-lake');

  return (
    <Section id="doctors">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead eyebrow="Врачи" title="Те, кому доверяют питомцев" lead={<>Врачи высшей категории, кандидаты ветеринарных и биологических наук. Выберите клинику или направление, и мы покажем, к кому записаться.</>} />
        <div className="hidden gap-2 md:flex">
          <button type="button" aria-label="Назад" onClick={() => move(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-milk"><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Вперёд" onClick={() => move(1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-milk"><ArrowRight size={18} /></button>
        </div>
      </div>

      <div className="mt-12 grid gap-3">
        <div role="radiogroup" aria-label="Клиника" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          <button role="radio" aria-checked={clinic === 'all'} className={chip(clinic === 'all')} onClick={() => setClinic('all')}>Все клиники</button>
          {clinics.map((c) => <button key={c.id} role="radio" aria-checked={clinic === c.id} className={chip(clinic === c.id)} onClick={() => setClinic(c.id)}>{c.short}</button>)}
        </div>
        <div role="radiogroup" aria-label="Направление" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          <button role="radio" aria-checked={spec === 'all'} className={chip(spec === 'all')} onClick={() => setSpec('all')}>Все направления</button>
          {quickSpecs.map((s) => <button key={s} role="radio" aria-checked={spec === s} className={chip(spec === s)} onClick={() => setSpec(s)}>{s}</button>)}
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-5 -mb-4 mt-8 flex cursor-grab snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-10 md:scroll-px-12 active:cursor-grabbing md:-mx-12 md:px-12"
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') return;
          drag.current = { down: true, x: e.clientX, left: scroller.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          if (!drag.current.down) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 4) drag.current.moved = true;
          scroller.current!.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((d, i) => <DoctorCard key={d.id} doc={d} i={i} />)}
        </AnimatePresence>
        {list.length === 0 && (
          <p className="rounded-[28px] bg-sand/60 p-8 text-lg">По этому запросу врачей не нашлось. Позвоните, подскажем, к кому записаться.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[15px] text-ink-soft">Показано {list.length} из {doctors.length}</p>
        <Link href="/doctors/" className="inline-flex items-center gap-2 text-[16px] font-medium underline decoration-lake/40 underline-offset-[6px] transition-colors hover:decoration-lake">Все врачи <ArrowRight size={16} /></Link>
      </div>
    </Section>
  );
}
