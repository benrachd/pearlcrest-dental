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

export function getHashIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const id = href.slice(hashIndex + 1);
  return id || null;
}

/** Lenis-safe in-page hash navigation for footer, cards, and CTAs. */
export function handleHashLinkClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
): void {
  const id = getHashIdFromHref(href);
  if (!id || !document.getElementById(id)) return;

  event.preventDefault();
  scrollToSection(id);

  const path = href.slice(0, href.indexOf("#")) || window.location.pathname;
  window.history.replaceState(null, "", `${path}#${id}`);
}
