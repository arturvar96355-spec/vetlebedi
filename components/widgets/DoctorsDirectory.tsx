'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { allSpecialties, doctors, labDoctors, type ClinicId } from '@/content/doctors';
import { staff } from '@/content/staff';
import { DoctorCard } from '@/components/sections/DoctorsStrip';
import { Reveal } from '@/components/motion/Reveal';
import { Ph } from '@/components/ui/Placeholder';
import { cn } from '@/lib/utils';

const chip = (active: boolean) =>
  cn('min-h-11 whitespace-nowrap rounded-full border px-4 text-[14.5px] transition-colors', active ? 'border-lake bg-lake text-milk' : 'border-ink/15 hover:border-lake');

export function DoctorsDirectory() {
  const [clinic, setClinic] = useState<ClinicId | 'all'>('all');
  const [spec, setSpec] = useState('all');
  const [q, setQ] = useState('');

  // состояние фильтров живёт в адресе: ?c=ramenki&s=Хирургия&q=...
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get('c');
    if (c && clinics.some((x) => x.id === c)) setClinic(c as ClinicId);
    const s = p.get('s');
    if (s && allSpecialties.includes(s)) setSpec(s);
    setQ(p.get('q') ?? '');
  }, []);
  useEffect(() => {
    const p = new URLSearchParams();
    if (clinic !== 'all') p.set('c', clinic);
    if (spec !== 'all') p.set('s', spec);
    if (q) p.set('q', q);
    const qs = p.toString();
    window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : ''));
  }, [clinic, spec, q]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase().replace(/ё/g, 'е');
    return doctors
      .filter((d) => (clinic === 'all' || d.clinics.includes(clinic)) && (spec === 'all' || d.specialties.includes(spec)) && (!needle || d.name.toLowerCase().replace(/ё/g, 'е').includes(needle)))
      .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
  }, [clinic, spec, q]);

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-5 border-b border-ink/10 bg-milk/90 px-5 py-4 backdrop-blur-xl md:-mx-12 md:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div role="radiogroup" aria-label="Клиника" className="no-scrollbar flex gap-2 overflow-x-auto">
            <button role="radio" aria-checked={clinic === 'all'} className={chip(clinic === 'all')} onClick={() => setClinic('all')}>Все клиники</button>
            {clinics.map((c) => <button key={c.id} role="radio" aria-checked={clinic === c.id} className={chip(clinic === c.id)} onClick={() => setClinic(c.id)}>{c.short}</button>)}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 lg:w-[260px]">
              <span className="sr-only">Поиск по фамилии</span>
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Фамилия врача" className="min-h-11 w-full rounded-full border border-ink/15 bg-milk-2 pl-11 pr-4 text-[15px] focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/30" />
            </label>
            <label className="flex-1 lg:w-[220px]">
              <span className="sr-only">Направление</span>
              <select value={spec} onChange={(e) => setSpec(e.target.value)} className="min-h-11 w-full rounded-full border border-ink/15 bg-milk-2 px-4 text-[15px] focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/30">
                <option value="all">Все направления</option>
                {allSpecialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <h2 className="sr-only">Список врачей</h2>
      <p className="mt-8 text-[15px] text-ink-soft" aria-live="polite">Найдено врачей: {list.length}</p>
      <motion.ul layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((d, i) => <li key={d.id} className="contents"><DoctorCard doc={d} i={i} fluid /></li>)}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="mt-8 rounded-[28px] bg-sand/60 p-8 text-lg">По этому запросу врачей не нашлось. Позвоните, подскажем, к кому записаться.</p>}

      <div className="mt-24 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-[clamp(30px,3.2vw,44px)]">Ветеринарная лаборатория</h2>
          <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {labDoctors.map((l) => <li key={l.name} className="flex flex-wrap justify-between gap-2 py-4"><span className="font-display text-[24px]">{l.name}</span><span className="text-ink-soft">{l.role}</span></li>)}
          </ul>
          <p className="mt-4 text-[14.5px] text-ink-soft">Адрес и режим лаборатории: <Ph>уточнить</Ph></p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-[clamp(30px,3.2vw,44px)]">Интерны, ассистенты, операционная сестра</h2>
          <p className="mt-6 text-[15.5px] leading-relaxed text-ink-soft">
            Операционная сестра: {staff.surgicalNurse.join(', ')}. Интерны: {staff.interns.join(', ')}. Ассистенты: {staff.assistants.join(', ')}.
          </p>
        </Reveal>
      </div>
    </>
  );
}
