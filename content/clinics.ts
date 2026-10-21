export type Hours = { kind: '24/7' } | { kind: 'range'; from: string; to: string };

export interface Clinic {
  id: 'ramenki' | 'olimp' | 'vidnoe';
  name: string;
  short: string;
  address: string;
  note?: string;
  hours: Hours;
  hoursLabel: string;
  mapsUrl: string;
  routeUrl: string;
  rating: number;
  ratings: number;
  /** Положение на схеме 0..100 (условное, не в масштабе) */
  pin: { x: number; y: number };
  flagship?: boolean;
}

const route = (a: string) => `https://yandex.ru/maps/?text=${encodeURIComponent('Лебеди ветклиника, ' + a)}`;

export const clinics: Clinic[] = [
  {
    id: 'ramenki',
    name: 'Раменки',
    short: 'Раменки',
    address: 'Москва, ул. Раменки, 23',
    hours: { kind: '24/7' },
    hoursLabel: 'Круглосуточно',
    mapsUrl: 'https://yandex.com/maps/org/lebedi/1352687994/reviews/',
    routeUrl: '',
    rating: 5.0,
    ratings: 1758,
    pin: { x: 40, y: 46 },
    flagship: true,
  },
  {
    id: 'olimp',
    name: 'Олимпийская деревня',
    short: 'Олимпийская деревня',
    address: 'Москва, Мичуринский пр-т, Олимпийская деревня, 4к2',
    note: 'Вход со стороны площади, 1 этаж',
    hours: { kind: '24/7' },
    hoursLabel: 'Круглосуточно',
    mapsUrl: 'https://yandex.com/maps/org/lebedi/1295402604/reviews/',
    routeUrl: '',
    rating: 4.8,
    ratings: 1547,
    pin: { x: 29, y: 60 },
  },
  {
    id: 'vidnoe',
    name: 'Видное',
    short: 'Видное',
    address: 'Московская область, г. Видное, ул. Советская, 6Б',
    hours: { kind: 'range', from: '08:00', to: '23:00' },
    hoursLabel: '8:00–23:00',
    mapsUrl: 'https://yandex.com/maps/org/veterinary_center_lebedi/1077259523/reviews/',
    routeUrl: '',
    rating: 5.0,
    ratings: 1102,
    pin: { x: 66, y: 86 },
  },
];

for (const c of clinics) c.routeUrl = route(c.address);
