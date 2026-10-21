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
