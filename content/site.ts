export const site = {
  name: 'Лебеди',
  legalName: 'ООО КВМ «Лебеди»',
  fullName: 'Ветеринарные центры малотравматичной хирургии и комплексного восстановления «Лебеди»',
  since: 2006,
  phone: '+7 (499) 272-48-82',
  phoneHref: 'tel:+74992724882',
  email: 'vetlebedi@vetlebedi.ru',
  qualityEmail: 'control@vetlebedi.ru',
  messenger: {
    // [номер WhatsApp/Telegram — от клиента]. Пока пусто: формы ведут на звонок.
    whatsapp: '',
    telegram: '',
  },
  rating: { value: 5.0, count: 1758, reviews: 1097, totalCount: 4407 },
  mapsReviewsUrl: 'https://yandex.com/maps/org/lebedi/1352687994/reviews/',
  conceptStudio: 'Kovagor',
  // Тёмная тема: с 23:00 до 05:00 по Москве
  nightShift: { from: 23, to: 5 },
} as const;

export const nav = [
  { label: 'Срочно', href: '/emergency/', tone: 'alert' as const },
  { label: 'Клиники', href: '/clinics/' },
  { label: 'Врачи', href: '/doctors/' },
  { label: 'Хирургия', href: '/surgery/' },
  { label: 'Цены', href: '/prices/' },
  { label: 'Зоотакси', href: '/#taxi' },
];
