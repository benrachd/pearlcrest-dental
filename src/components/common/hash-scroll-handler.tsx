"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/utils/scroll-to-section";

/** Scrolls to in-page section hashes on load (Lenis-safe). */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !document.getElementById(hash)) return;

    const timer = window.setTimeout(() => scrollToSection(hash), 150);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
