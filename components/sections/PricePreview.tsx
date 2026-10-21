import { pricePreview, priceDisclaimer } from '@/content/prices';
import { formatPrice } from '@/lib/utils';
import { Section, SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';

export function PricePreview() {
  return (
    <Section id="prices" className="bg-milk-2">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <SectionHead eyebrow="Цены" title="Сколько это стоит. Без сюрпризов" lead="Цены на частые услуги мы публикуем открыто. Ночью стоимость не повышается — об этом пишут сами клиенты." />
          <Reveal delay={0.2}><div className="mt-10"><Button href="/prices/" variant="lake">Все цены</Button></div></Reveal>
        </div>
        <Reveal>
          <ul className="divide-y divide-ink/10 rounded-[32px] border border-ink/10 bg-milk p-3 shadow-[var(--shadow-soft)] md:p-5">
            {pricePreview.map((r) => (
              <li key={r.name} className="flex items-baseline justify-between gap-6 px-3 py-4 md:px-4">
                <span className="text-[16.5px]">{r.name}</span>
                <span className="tnum whitespace-nowrap font-display text-[28px] leading-none">{formatPrice(r.price)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 px-2 text-[13.5px] leading-snug text-ink-soft">{priceDisclaimer}</p>
        </Reveal>
      </div>
    </Section>
  );
}
