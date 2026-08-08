"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the vertical scroll position of the window. Intended for future
 * scroll-reactive UI (e.g. a header that condenses after scrolling past a
 * threshold). Listens with `{ passive: true }` to avoid blocking scrolling.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
