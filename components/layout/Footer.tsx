import Link from 'next/link';
import { clinics } from '@/content/clinics';
import { site } from '@/content/site';
import { SwanMark } from '@/components/art/Swan';
import { WaterLines } from '@/components/art/Water';

export function Footer() {
  return (
    <footer data-dark className="relative overflow-hidden bg-night pb-28 pt-24 text-moon md:pb-16">
      <WaterLines className="absolute inset-x-0 top-6 text-reed/40" lines={3} />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-5 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <SwanMark className="h-10 w-11" />
            <span className="font-display text-4xl font-semibold">Лебеди</span>
          </div>
          <p className="mt-5 max-w-sm text-moon/70">Ветеринарные центры малотравматичной хирургии и комплексного восстановления. С {site.since} года.</p>
          <a href={site.phoneHref} className="tnum mt-8 block font-display text-4xl hover:text-aqua">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="mt-1 block text-moon/80 hover:text-aqua">{site.email}</a>
          <p className="mt-4 text-sm text-moon/75">
            Контроль качества: <a href={`mailto:${site.qualityEmail}`} className="underline underline-offset-4 hover:text-aqua">{site.qualityEmail}</a>
            <br />Письма уходят владельцу клиник и врачебной комиссии.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 md:col-span-8">
          {clinics.map((c) => (
            <div key={c.id}>
              <h2 className="font-display text-2xl">{c.name}</h2>
              <p className="mt-2 text-[15px] text-moon/75">{c.address}</p>
              <p className="mt-1 text-[15px] text-moon/75">{c.hoursLabel}</p>
              <a href={c.routeUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[15px] underline underline-offset-4 hover:text-aqua">Маршрут</a>
            </div>
          ))}
          <nav aria-label="Разделы" className="sm:col-span-3 grid grid-cols-2 gap-x-8 gap-y-2 border-t border-moon/10 pt-8 text-[15px] sm:grid-cols-4">
            <Link href="/emergency/" className="hover:text-aqua">Если срочно</Link>
            <Link href="/clinics/" className="hover:text-aqua">Клиники</Link>
            <Link href="/doctors/" className="hover:text-aqua">Врачи</Link>
            <Link href="/surgery/" className="hover:text-aqua">Хирургия</Link>
            <Link href="/prices/" className="hover:text-aqua">Цены</Link>
            <Link href="/#taxi" className="hover:text-aqua">Зоотакси</Link>
            <a href="https://vetlebedi.ru/shop/" className="hover:text-aqua" rel="noopener noreferrer">Зоомагазин в клинике</a>
            <Link href="/privacy/" className="hover:text-aqua">Политика данных</Link>
          </nav>
        </div>
      </div>
      <div className="relative mx-auto mt-16 max-w-[1280px] border-t border-moon/10 px-5 pt-6 text-[13px] leading-relaxed text-moon/70 md:px-12">
        <p>
          Концепт сайта, подготовлен для ООО КВМ «Лебеди» студией {site.conceptStudio}. Не является официальным сайтом компании. Фото и часть сведений будут заменены данными клиента.
        </p>
      </div>
    </footer>
  );
}
