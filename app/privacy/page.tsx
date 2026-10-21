import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/SectionHead';
import { Ph } from '@/components/ui/Placeholder';

export const metadata: Metadata = { title: 'Политика обработки персональных данных — Лебеди' };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Документы" title="Политика обработки персональных данных" />
      <Section>
        <div className="max-w-[720px] text-[17px] leading-relaxed">
          <p><Ph>текст политики — от клиента</Ph></p>
          <p className="mt-5 text-ink-soft">На действующем сайте клиники политика опубликована в PDF. Здесь будет её текст и данные оператора: <Ph>данные юрлица — от клиента</Ph></p>
        </div>
      </Section>
    </>
  );
}
