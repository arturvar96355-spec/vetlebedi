'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Phone, X } from 'lucide-react';
import { clinics } from '@/content/clinics';
import { site } from '@/content/site';
import { buildBookingText, messengerUrl, validPhone, type BookingData } from '@/lib/booking';
import { Button } from '@/components/ui/Button';
import { Ph } from '@/components/ui/Placeholder';
import { cn } from '@/lib/utils';

const pets = ['Собака', 'Кошка', 'Грызун', 'Птица', 'Рептилия', 'Другое'];
const times = ['Как можно скорее', 'Сегодня', 'Завтра', 'В выходные', 'Другое время'];

const field =
  'w-full min-h-12 rounded-2xl border border-ink/15 bg-milk-2 px-4 text-[16px] text-ink placeholder:text-ink-soft/60 transition-shadow focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/30';

function Chips({ value, onChange, items, label }: { value: string; onChange: (v: string) => void; items: string[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it}
          type="button"
          role="radio"
          aria-checked={value === it}
          onClick={() => onChange(it)}
          className={cn(
            'min-h-11 rounded-full border px-4 text-[15px] transition-colors',
            value === it ? 'border-lake bg-lake text-milk' : 'border-ink/20 text-ink hover:border-lake',
          )}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

export function BookingDialog({ open, onClose, prefill }: { open: boolean; onClose: () => void; prefill: { clinic?: string; reason?: string; doctor?: string } }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<BookingData>({ clinic: clinics[0].name, pet: 'Собака', reason: '', time: 'Как можно скорее', name: '', phone: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState<null | { url: string | null; text: string }>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setSent(null);
      setErrors({});
      setData((s) => ({
        ...s,
        clinic: prefill.clinic ?? s.clinic,
        reason: [prefill.reason, prefill.doctor && `К врачу: ${prefill.doctor}`].filter(Boolean).join('. ') || s.reason,
      }));
      d.showModal();
      window.__lenis?.stop();
    }
    if (!open && d.open) {
      d.close();
    }
  }, [open, prefill]);

  const close = () => {
    window.__lenis?.start();
    onClose();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (data.name.trim().length < 2) err.name = 'Подскажите, как к Вам обращаться';
    if (!validPhone(data.phone)) err.phone = 'Укажите телефон полностью, например +7 900 000-00-00';
    setErrors(err);
    if (Object.keys(err).length) return;
    const text = buildBookingText(data);
    const url = messengerUrl(text);
    setSent({ url, text });
    if (url) window.open(url, '_blank', 'noopener');
  };

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="booking-title"
      className="m-auto w-[min(640px,calc(100vw-24px))] max-h-[92svh] overflow-y-auto overscroll-contain rounded-[28px] bg-milk p-0 text-ink shadow-[0_40px_120px_-20px_rgb(0_0_0/.5)] backdrop:bg-night/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 md:p-9">
        <button type="button" onClick={close} aria-label="Закрыть" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-milk">
          <X size={18} />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-lake text-milk"><Check /></span>
              <h2 id="booking-title" className="mt-6 text-4xl">Заявка готова</h2>
              <p className="mt-3 text-ink-soft">
                {sent.url
                  ? 'Мы открыли мессенджер с готовым текстом. Отправьте сообщение, и администратор свяжется с Вами.'
                  : <>Мессенджер для заявок ещё не подключён <Ph>номер WhatsApp — от клиента</Ph>. Скопируйте текст ниже и позвоните, администратор запишет Вас по телефону.</>}
              </p>
              <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-sand/60 p-4 font-sans text-[15px] leading-relaxed">{sent.text}</pre>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={site.phoneHref} variant="alert"><Phone size={18} />Позвонить {site.phone}</Button>
                <Button variant="ghost" onClick={() => navigator.clipboard?.writeText(sent.text)}>Скопировать текст</Button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5">
              <div>
                <p className="text-[12.5px] uppercase tracking-[0.14em] text-ink-soft">Запись на приём</p>
                <h2 id="booking-title" className="mt-1 text-4xl md:text-5xl">Расскажите, что случилось</h2>
                <p className="mt-2 text-ink-soft">Если нужна помощь прямо сейчас, лучше позвонить: <a className="underline underline-offset-4" href={site.phoneHref}>{site.phone}</a></p>
              </div>
              <fieldset className="grid gap-2"><legend className="mb-1 text-sm font-medium">Клиника</legend>
                <Chips label="Клиника" value={data.clinic} onChange={(v) => setData({ ...data, clinic: v })} items={clinics.map((c) => c.name)} />
              </fieldset>
              <fieldset className="grid gap-2"><legend className="mb-1 text-sm font-medium">Питомец</legend>
                <Chips label="Питомец" value={data.pet} onChange={(v) => setData({ ...data, pet: v })} items={pets} />
              </fieldset>
              <label className="grid gap-1.5 text-sm font-medium">Причина обращения
                <textarea rows={2} value={data.reason} onChange={(e) => setData({ ...data, reason: e.target.value })} placeholder="Например: вакцинация, рвота второй день" className={cn(field, 'py-3 font-normal')} />
              </label>
              <fieldset className="grid gap-2"><legend className="mb-1 text-sm font-medium">Удобное время</legend>
                <Chips label="Время" value={data.time} onChange={(v) => setData({ ...data, time: v })} items={times} />
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-medium">Ваше имя
                  <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} className={cn(field, 'font-normal')} />
                  {errors.name && <span id="err-name" className="text-[13px] font-normal text-alert">{errors.name}</span>}
                </label>
                <label className="grid gap-1.5 text-sm font-medium">Телефон
                  <input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} type="tel" inputMode="tel" autoComplete="tel" placeholder="+7" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} className={cn(field, 'font-normal')} />
                  {errors.phone && <span id="err-phone" className="text-[13px] font-normal text-alert">{errors.phone}</span>}
                </label>
              </div>
              <Button type="submit" size="lg" className="w-full">Отправить заявку</Button>
              <p className="text-[13px] leading-snug text-ink-soft">Нажимая кнопку, Вы соглашаетесь на обработку персональных данных. <Link href="/privacy/" className="underline underline-offset-4">Политика</Link></p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </dialog>
  );
}
