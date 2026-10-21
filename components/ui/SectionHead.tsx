import { SplitHeading, Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('max-w-[880px]', center && 'mx-auto text-center', className)}>
      <Reveal y={10}>
        <p className={cn('mb-5 flex items-center gap-3 text-[12.5px] uppercase tracking-[0.16em] opacity-70', center && 'justify-center')}>
          <span className="h-px w-8 bg-current opacity-60" /> {eyebrow}
        </p>
      </Reveal>
      <SplitHeading text={title} className="text-[clamp(36px,5vw,72px)] font-medium" />
      {lead && (
        <Reveal delay={0.25} y={18}>
          <div className={cn('mt-6 max-w-[640px] text-[clamp(17px,1.3vw,19px)] leading-relaxed opacity-80', center && 'mx-auto')}>{lead}</div>
        </Reveal>
      )}
    </div>
  );
}

export function Section({ id, className, children, dark }: { id?: string; className?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section id={id} data-dark={dark ? '' : undefined} className={cn('relative scroll-mt-16', dark && 'bg-night text-moon', className)}>
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-12 md:py-32">{children}</div>
    </section>
  );
}
