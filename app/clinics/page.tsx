import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Clinics } from '@/components/sections/Clinics';
import { FinalCta } from '@/components/sections/FaqFinal';
import { Section } from '@/components/ui/SectionHead';
import { Ph } from '@/components/ui/Placeholder';

export const metadata: Metadata = { title: 'Клиники — Лебеди' };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Клиники" title="Три клиники и лаборатория" lead="Телефон один на всех: +7 (499) 272-48-82. Администратор подскажет, куда ехать." />
      <Clinics />
      <Section className="!pt-0">
        <div className="rounded-[32px] border border-dashed border-ink/20 p-8 md:p-12">
          <h2 className="text-[clamp(30px,3.4vw,48px)]">Ветеринарная лаборатория</h2>
          <p className="mt-4 max-w-[600px] text-ink-soft">Собственная лаборатория работает при клиниках: анализы делают на месте. Адрес и режим: <Ph>уточнить</Ph></p>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
