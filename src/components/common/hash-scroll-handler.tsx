"use client";

import { useEffect } from "react";
import { CONTACT_SECTION_ID } from "@/constants/contact-config";
import { scrollToSection } from "@/utils/scroll-to-section";

/** Scrolls to #contact when the page loads with a contact hash (Lenis-safe). */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash !== CONTACT_SECTION_ID && hash !== "contact-cta-heading") return;

    const timer = window.setTimeout(() => scrollToSection(CONTACT_SECTION_ID), 150);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
