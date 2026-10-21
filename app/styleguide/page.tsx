import type { Metadata } from 'next';
import { Swan } from '@/components/art/Swan';
import { WaterLines, SwanDivider } from '@/components/art/Water';
import { Button } from '@/components/ui/Button';
import { Ph } from '@/components/ui/Placeholder';
import { Monogram } from '@/components/ui/Monogram';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/SectionHead';

export const metadata: Metadata = { title: 'Дизайн-система — Лебеди' };

const colors = [
  ['milk', '#F6F2EA', 'Фон'], ['milk-2', '#FBF8F2', 'Поля, карточки'], ['ink', '#10302E', 'Текст'], ['ink-soft', '#3C5A57', 'Второй текст'],
  ['lake', '#1F5A55', 'Кнопки'], ['lake-deep', '#163F3C', 'Hover'], ['reed', '#8FB3A5', 'Линии'], ['reed-pale', '#CFE0D7', 'Заливки'],
  ['sand', '#E6DCCB', 'Карточки'], ['alert', '#C2412D', 'Только «Срочно»'], ['night', '#0E2624', 'Тёмные секции'], ['moon', '#EDE7DC', 'Текст на тёмном'], ['aqua', '#4FD1C5', 'Свечение'],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Дизайн-система" title="Тихая вода" lead="Палитра, типографика, компоненты и фирменные элементы сайта." />
      <Section>
        <h2 className="text-4xl">Палитра</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colors.map(([n, h, d]) => (
            <li key={n}><div className="h-24 rounded-2xl border border-ink/10" style={{ background: h }} /><p className="mt-2 font-medium">{n}</p><p className="tnum text-sm text-ink-soft">{h} · {d}</p></li>
          ))}
        </ul>

        <h2 className="mt-24 text-4xl">Типографика</h2>
        <div className="mt-8 grid gap-6">
          <p className="font-display text-[clamp(44px,6.3vw,96px)] leading-none">Где Вам всё <em>объясняют</em></p>
          <p className="font-display text-5xl">Заголовок второго уровня</p>
          <p className="font-display text-3xl">Заголовок третьего уровня</p>
          <p className="max-w-[640px]">Основной текст — Onest, 17 px, межстрочный 1,6. Цифры в прайсе и рейтинге — табличные: <span className="tnum">3 900 ₽ · 5,0 · 1 758</span>.</p>
          <p className="text-[12.5px] uppercase tracking-[0.16em] opacity-70">Оверлайн · капс · 12,5 px</p>
        </div>

        <h2 className="mt-24 text-4xl">Кнопки</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="lake">Записаться</Button><Button variant="ghost">Вторичная</Button><Button variant="alert">Позвонить</Button>
          <span className="rounded-3xl bg-night p-4"><Button variant="moon">На тёмном</Button> <Button variant="ghost-dark">Контур</Button></span>
        </div>

        <h2 className="mt-24 text-4xl">Фирменные элементы</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-[28px] bg-milk-2 p-8 text-lake"><Swan /><WaterLines className="text-reed" lines={3} /></div>
          <div className="grid content-start gap-6">
            <SwanDivider />
            <div className="flex gap-4"><Monogram name="Лебедько Евгений" className="h-28 w-28 rounded-3xl" /><Monogram name="Козлова Светлана" index={1} className="h-28 w-28 rounded-3xl" /><Monogram name="Аксенов Алексей" index={2} className="h-28 w-28 rounded-3xl" /></div>
            <p>Заглушка для данных клиента: <Ph>порядок связи — уточнить</Ph></p>
          </div>
        </div>
      </Section>
    </>
  );
}
