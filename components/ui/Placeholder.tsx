/** Видимая заглушка для данных, которые нужно получить от клиента. */
export function Ph({ children }: { children: string }) {
  return <span className="ph">[{children}]</span>;
}
