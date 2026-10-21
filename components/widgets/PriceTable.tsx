'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Search } from 'lucide-react';
import { priceDisclaimer, priceGroups } from '@/content/prices';
import { formatPrice, cn } from '@/lib/utils';

type Branch = 'all' | 'moscow' | 'vidnoe' | 'online';
const branches: { id: Branch; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'moscow', label: 'Москва' },
  { id: 'vidnoe', label: 'Видное' },
  { id: 'online', label: 'Онлайн' },
];

export function PriceTable() {
  const [q, setQ] = useState('');
  const [branch, setBranch] = useState<Branch>('all');
  const [open, setOpen] = useState<Record<string, boolean>>({ general: true, special: false });

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase().replace(/ё/g, 'е');
    return priceGroups
      .map((g) => ({
        ...g,
        rows: g.rows.filter((r) => {
          const okBranch = branch === 'all' || !r.branch || r.branch === branch;
          const okQ = !needle || (r.name + ' ' + g.title).toLowerCase().replace(/ё/g, 'е').includes(needle);
          return okBranch && okQ;
        }),
      }))
      .filter((g) => g.rows.length);
  }, [q, branch]);

  const searching = q.trim().length > 0;

  return (
    <>
      <div className="sticky top-[64px] z-30 -mx-5 border-b border-ink/10 bg-milk/90 px-5 py-4 backdrop-blur-xl md:-mx-12 md:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <label className="relative">
            <span className="sr-only">Поиск по прайсу</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Найти услугу" className="min-h-12 w-full rounded-full border border-ink/15 bg-milk-2 pl-12 pr-4 text-[16px] focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/30" />
          </label>
          <div role="radiogroup" aria-label="Филиал" className="no-scrollbar flex gap-2 overflow-x-auto">
            {branches.map((b) => (
              <button key={b.id} role="radio" aria-checked={branch === b.id} onClick={() => setBranch(b.id)} className={cn('min-h-11 whitespace-nowrap rounded-full border px-4 text-[14.5px] transition-colors', branch === b.id ? 'border-lake bg-lake text-milk' : 'border-ink/15 hover:border-lake')}>{b.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4" aria-live="polite">
        {groups.map((g) => {
          const isOpen = searching || open[g.id];
          return (
            <section key={g.id} className="overflow-hidden rounded-[28px] border border-ink/10 bg-milk-2">
              <h2 className="font-sans text-base font-normal tracking-normal">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen({ ...open, [g.id]: !open[g.id] })} className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-7">
                  <span>
                    <span className="block font-display text-[clamp(26px,2.6vw,36px)] leading-tight">{g.title}</span>
                    {g.hint && <span className="mt-1 block text-[14px] text-ink-soft">{g.hint}</span>}
                  </span>
                  <span className="flex shrink-0 items-center gap-4">
                    <span className="tnum hidden text-[14px] text-ink-soft sm:block">{g.rows.length} поз.</span>
                    <span className={cn('grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition-all duration-500', isOpen && 'rotate-45 border-lake bg-lake text-milk')}><Plus size={18} /></span>
                  </span>
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <ul className="divide-y divide-ink/10 border-t border-ink/10 px-5 md:px-7">
                      {g.rows.map((r, i) => (
                        <li key={r.name + i} className="flex items-baseline justify-between gap-6 py-3.5">
                          <span className="text-[16px]">{r.name}{r.branch && <span className="ml-2 rounded-full bg-reed-pale px-2 py-0.5 text-[11.5px] text-lake-deep">{r.branch === 'moscow' ? 'Москва' : r.branch === 'vidnoe' ? 'Видное' : 'Онлайн'}</span>}</span>
                          <span className="tnum whitespace-nowrap font-display text-[26px] leading-none">{formatPrice(r.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
        {groups.length === 0 && <p className="rounded-[28px] bg-sand/60 p-8 text-lg">Такой услуги в выдержке нет. Позвоните, назовём стоимость.</p>}
      </div>
      <p className="mt-8 max-w-[720px] text-[14.5px] leading-relaxed text-ink-soft">{priceDisclaimer}</p>
    </>
  );
}
