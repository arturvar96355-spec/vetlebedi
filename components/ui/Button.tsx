'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/motion/Magnetic';

type Variant = 'lake' | 'ghost' | 'alert' | 'moon' | 'ghost-dark';

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-[15px] font-medium tracking-[0.01em] transition-[background,color,box-shadow,transform] duration-300 select-none';

const variants: Record<Variant, string> = {
  lake: 'bg-lake text-milk hover:bg-lake-deep shadow-[0_14px_30px_-14px_rgb(31_90_85/.7)]',
  ghost: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-milk',
  alert: 'bg-alert text-white hover:bg-[#a53623] shadow-[0_14px_30px_-12px_rgb(194_65_45/.65)]',
  moon: 'bg-moon text-night hover:bg-white',
  'ghost-dark': 'border border-moon/30 text-moon hover:border-moon hover:bg-moon hover:text-night',
};

interface Common {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
  size?: 'md' | 'lg';
}

type AnchorProps = Common & { href: string } & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>;
type ButtonProps = Common & { href?: undefined } & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = 'lake', className, children, magnetic = true, size = 'md', ...rest } = props as Common & Record<string, unknown>;
  const cls = cn(base, variants[variant], size === 'lg' && 'min-h-14 px-9 text-base', className);
  let el: ReactNode;
  if ('href' in props && props.href) {
    const href = props.href;
    const external = /^(https?:|tel:|mailto:)/.test(href);
    const { href: _h, ...anchorRest } = rest as Record<string, unknown>;
    void _h;
    el = external ? (
      <a href={href} className={cls} {...(anchorRest as object)} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls} {...(anchorRest as object)}>
        {children}
      </Link>
    );
  } else {
    el = (
      <button type="button" className={cls} {...(rest as object)}>
        {children}
      </button>
    );
  }
  return magnetic ? <Magnetic className={className?.includes('w-full') ? '!block w-full sm:!inline-block sm:w-auto' : ''}>{el}</Magnetic> : el;
}
