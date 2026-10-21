const STARS = Array.from({ length: 38 }).map((_, i) => {
  // детерминированный псевдослучайный разброс
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 100, y: r(2) * 70, s: 1 + r(3) * 1.8, t: 3 + r(4) * 4, d: r(5) * 4 };
});

/** День: бледное солнце с кольцами. Ночь: луна, звёзды. Переключаются CSS по data-sky. */
export function Sky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* День */}
      <div className="sky-day absolute inset-0">
        <div className="absolute -right-[8%] top-[6%] h-[70vmin] w-[70vmin] rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, #fff9ec 0%, #f1e7d0 38%, rgba(207,224,215,.55) 62%, rgba(207,224,215,0) 72%)' }} />
        <svg className="absolute -right-[8%] top-[6%] h-[70vmin] w-[70vmin] text-reed" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth=".12" opacity=".7">
          <circle cx="50" cy="50" r="34" />
          <circle cx="50" cy="50" r="42" opacity=".6" />
          <circle cx="50" cy="50" r="49" opacity=".35" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(143,179,165,.28), rgba(143,179,165,0))' }} />
      </div>
      {/* Ночь */}
      <div className="sky-night absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 80% 10%, #1d4a46 0%, #0e2624 55%, #091a19 100%)' }}>
        {STARS.map((s, i) => (
          <span key={i} className="star absolute rounded-full bg-moon" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, ['--t' as string]: `${s.t}s`, ['--dl' as string]: `${s.d}s` }} />
        ))}
        <div className="absolute right-[10%] top-[12%] h-[22vmin] w-[22vmin] rounded-full" style={{ background: 'radial-gradient(circle at 38% 36%, #fffaf0 0%, #ece3cf 55%, #d9ceb6 100%)', boxShadow: '0 0 0 1.5vmin rgba(237,231,220,.06), 0 0 0 4vmin rgba(237,231,220,.04), 0 0 12vmin 4vmin rgba(79,209,197,.22)' }}>
          <span className="absolute left-[30%] top-[34%] h-[16%] w-[16%] rounded-full bg-black/5" />
          <span className="absolute left-[56%] top-[52%] h-[22%] w-[22%] rounded-full bg-black/5" />
          <span className="absolute left-[40%] top-[68%] h-[10%] w-[10%] rounded-full bg-black/5" />
        </div>
      </div>
    </div>
  );
}
