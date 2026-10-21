import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/SectionHead';
import { PriceTable } from '@/components/widgets/PriceTable';
import { FinalCta } from '@/components/sections/FaqFinal';

export const metadata: Metadata = { title: 'Цены — Лебеди' };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Цены" title="Цены на услуги" lead="Выдержка из утверждённого прейскуранта. Найдите нужную услугу или выберите филиал. Ночью стоимость не повышается." />
      <Section className="!pt-0"><PriceTable /></Section>
      <FinalCta />
    </>
  );
}
