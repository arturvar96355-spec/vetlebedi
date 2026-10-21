// Источники материалов.
export const credits = {
  photos: 'Стоковые и клиентские фото не используются: в концепте только собственные линейные иллюстрации и монограммы. Слоты `[фото — от клиента]` подключаются заменой файла.',
  fonts: [
    { name: 'Cormorant', license: 'SIL OFL 1.1', source: 'https://fontsource.org/fonts/cormorant' },
    { name: 'Onest', license: 'SIL OFL 1.1', source: 'https://fontsource.org/fonts/onest' },
  ],
  icons: { name: 'Lucide', license: 'ISC', source: 'https://lucide.dev' },
  reviews: 'Цитаты — дословные отзывы на Яндекс Картах (20–21.10.2026). Перед публикацией сверить с оригиналами.',
} as const;
