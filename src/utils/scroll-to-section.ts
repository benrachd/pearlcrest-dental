import type Lenis from "lenis";
import { CONTACT_SECTION_ID } from "@/constants/contact-config";

const SCROLL_OFFSET = -96;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToSection(id: string = CONTACT_SECTION_ID): void {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: SCROLL_OFFSET });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
