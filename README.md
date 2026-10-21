# Лебеди · сайт-концепт

Статический сайт (Next.js 16, `output: 'export'`) для сети ветклиник «Лебеди». Концепт, не индексируется.

```bash
npm i
npm run dev          # разработка
npm run build        # статика в out/
node scripts/shot.mjs / name --night --w=390 --h=844   # скриншот собранного сайта в shots/
```

Документация: `docs/00-PLAN.md` (план), `docs/01-DESIGN.md` (дизайн-система), `docs/02-CONTENT.md` (контент и факты), `DECISIONS.md`.
Весь контент — в `/content`. Заглушки для данных клиента — `[...]` (стиль `.ph`).

## Скрипты

| Команда | Что делает |
|---|---|
| `npm run build` | Статика в `out/` |
| `node scripts/serve.mjs 4173` | Сервер для `out/` с gzip |
| `node scripts/shot.mjs / имя [--night\|--day] [--w= --h=] [--scroll=] [--click=текст] [--reduced]` | Скриншот в `shots/` |
| `node scripts/tour.mjs / префикс [--w= --h=]` | Прокрутка страницы экран за экраном |
| `node scripts/a11y.mjs` | Аудит axe-core по всем страницам, день и ночь |
| `npm run placeholders` | Список всех видимых заглушек для данных клиента |

## Деплой

Cloudflare Pages: build `npm run build`, output `out`. GitHub Pages: `.github/workflows/pages.yml`; для адреса вида `user.github.io/repo` задайте переменную репозитория `BASE_PATH=/repo`.
Перед показом клиенту: проверить цитаты в `content/quotes.ts` с оригиналами на Яндекс Картах, подставить номер мессенджера в `content/site.ts`, заменить `metadataBase` в `app/layout.tsx` на боевой домен.
