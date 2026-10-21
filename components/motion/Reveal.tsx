'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Заголовок: слова выезжают из-под маски. Курсив — `*слово*`. */
export function SplitHeading({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  /** true — анимация при загрузке (hero), иначе при входе во вьюпорт */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const shown = immediate || seen;
  const words = text.split(/\s+/);
  return (
    <Tag ref={ref as never} className={className} aria-label={text.replace(/\*/g, '')}>
      {words.map((w, i) => {
        const em = w.startsWith('*') || w.endsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
            {immediate ? (
              <span className={`word-rise ${em ? 'italic' : ''}`} style={{ ['--wd' as string]: `${delay + i * 0.055}s` }}>{clean}</span>
            ) : (
              <motion.span
                className={`inline-block ${em ? 'italic' : ''}`}
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: shown ? 0 : '112%' }}
                transition={{ duration: 0.95, ease: EASE, delay: delay + i * 0.055 }}
              >
                {clean}
              </motion.span>
            )}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </Tag>
  );
}
