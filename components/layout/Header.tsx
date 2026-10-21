'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import { nav, site } from '@/content/site';
import { cn } from '@/lib/utils';
import { SwanMark } from '@/components/art/Swan';
import { Button } from '@/components/ui/Button';
import { LiveStatus } from '@/components/widgets/LiveStatus';
import { SkyToggle } from '@/components/widgets/SkyToggle';
import { useUI } from './UIProvider';

export function Header() {
  const path = usePathname();
  const home = path === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { openBooking } = useUI();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  const solid = scrolled || !home;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter,color,height] duration-500',
          solid ? 'h-[64px] bg-milk/80 text-ink shadow-[0_1px_0_rgb(16_48_46/.08)] backdrop-blur-xl' : 'h-[84px] text-[color:var(--sky-ink)]',
        )}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4 px-5 md:px-12">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Лебеди — на главную">
            <SwanMark className="h-8 w-9" />
            <span className="font-display text-[30px] font-semibold leading-none tracking-[-0.01em]">Лебеди</span>
          </Link>
          <span className="hidden text-[13px] 2xl:block"><LiveStatus /></span>
          <nav aria-label="Основное" className="ml-auto hidden items-center gap-1 xl:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'group relative whitespace-nowrap rounded-full px-3.5 py-2.5 text-[15px] transition-colors',
                  n.tone === 'alert' ? 'text-alert hover:bg-alert/10' : 'hover:bg-current/10',
                )}
              >
                {n.tone === 'alert' && <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-alert align-middle" />}
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            <a href={site.phoneHref} className="tnum hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[17px] font-medium hover:bg-current/10 md:inline-flex">
              <Phone size={17} /> {site.phone}
            </a>
            <SkyToggle />
            <span className="hidden md:block">
              <Button onClick={() => openBooking()} className="min-h-11 px-6">Записаться</Button>
            </span>
            <button type="button" aria-label="Меню" aria-expanded={menu} onClick={() => setMenu(true)} className="grid h-11 w-11 place-items-center rounded-full border border-current/25 xl:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            data-dark
            className="fixed inset-0 z-[60] flex flex-col bg-night px-6 pb-8 pt-5 text-moon"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-semibold">Лебеди</span>
              <button type="button" aria-label="Закрыть меню" onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full border border-moon/30"><X size={20} /></button>
            </div>
            <nav className="mt-10 flex flex-1 flex-col gap-1">
              {[...nav, { label: 'Главная', href: '/' }].map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={n.href} onClick={() => setMenu(false)} className={cn('block border-b border-moon/10 py-3 font-display text-[40px] leading-tight', 'tone' in n && n.tone === 'alert' && 'text-[#ff8b73]')}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="grid gap-3">
              <Button href={site.phoneHref} variant="alert" size="lg" magnetic={false}><Phone size={18} /> {site.phone}</Button>
              <Button variant="ghost-dark" size="lg" magnetic={false} onClick={() => { setMenu(false); openBooking(); }}>Записаться</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
