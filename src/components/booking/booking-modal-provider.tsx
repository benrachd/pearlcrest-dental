"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingModal } from "@/components/booking/booking-modal";
import type { WithChildren } from "@/types";

type BookingModalContextValue = {
  isOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: WithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = useCallback(() => setIsOpen(true), []);
  const closeBookingModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openBookingModal, closeBookingModal }),
    [isOpen, openBookingModal, closeBookingModal],
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return context;
}
