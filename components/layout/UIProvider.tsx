'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { BookingDialog } from '@/components/widgets/BookingDialog';

interface Prefill {
  clinic?: string;
  reason?: string;
  doctor?: string;
}
interface Ctx {
  openBooking: (p?: Prefill) => void;
}
const UI = createContext<Ctx>({ openBooking: () => {} });
export const useUI = () => useContext(UI);

export function UIProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>({});
  const openBooking = useCallback((p: Prefill = {}) => {
    setPrefill(p);
    setOpen(true);
  }, []);
  return (
    <UI.Provider value={{ openBooking }}>
      {children}
      <BookingDialog open={open} onClose={() => setOpen(false)} prefill={prefill} />
    </UI.Provider>
  );
}
