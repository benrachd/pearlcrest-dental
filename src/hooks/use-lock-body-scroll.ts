"use client";

import { useEffect } from "react";

/**
 * Prevents the page behind an overlay (mobile navigation, modal, dialog)
 * from scrolling while `locked` is true, and restores the previous value on
 * cleanup so nested/successive locks don't clobber each other.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
