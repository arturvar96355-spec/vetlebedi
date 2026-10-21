'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis и GSAP подгружаются отдельными чанками после первой отрисовки. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let off: (() => void) | undefined;
    let dead = false;
    (async () => {
      const [{ default: LenisCls }, { gsap }, { ScrollTrigger }] = await Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]);
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new LenisCls({ lerp: 0.1, wheelMultiplier: 0.95, anchors: false });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      off = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    })();
    return () => {
      dead = true;
      off?.();
    };
  }, []);
  return null;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}
