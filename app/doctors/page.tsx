import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/SectionHead';
import { DoctorsDirectory } from '@/components/widgets/DoctorsDirectory';

export const metadata: Metadata = { title: 'Врачи — Лебеди' };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Врачи" title="Команда экспертов" lead="Врачи высшей категории, кандидаты ветеринарных и биологических наук. Выберите клинику или направление, чтобы найти нужного специалиста." />
      <Section className="!pt-0"><div className="-mt-px"><DoctorsDirectory /></div></Section>
    </>
  );
}
