import { site } from '@/content/site';

export interface BookingData {
  clinic: string;
  pet: string;
  reason: string;
  time: string;
  name: string;
  phone: string;
}

export function buildBookingText(d: BookingData) {
  return [
    'Здравствуйте! Хочу записаться в «Лебеди».',
    `Клиника: ${d.clinic}`,
    `Питомец: ${d.pet}`,
    `Причина: ${d.reason || 'не указана'}`,
    `Удобное время: ${d.time || 'не указано'}`,
    `Имя: ${d.name}`,
    `Телефон: ${d.phone}`,
  ].join('\n');
}

/** Ссылка в мессенджер; null, если номер клиента ещё не задан. */
export function messengerUrl(text: string): string | null {
  const q = encodeURIComponent(text);
  if (site.messenger.whatsapp) return `https://wa.me/${site.messenger.whatsapp}?text=${q}`;
  if (site.messenger.telegram) return `https://t.me/${site.messenger.telegram}?text=${q}`;
  return null;
}

export function validPhone(v: string) {
  return v.replace(/\D/g, '').length >= 10;
}
