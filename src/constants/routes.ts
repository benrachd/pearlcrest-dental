/**
 * Locale-agnostic route paths (no `/[locale]` prefix — that is added
 * automatically by `Link` / `redirect` from `@/i18n/navigation`).
 *
 * Centralizing paths here means renaming a route later is a one-line change
 * instead of a project-wide find-and-replace, and prevents typo'd string
 * literals from spreading through the codebase.
 *
 * Most of these routes are not implemented yet — they are placeholders for
 * the information architecture to be built on top of this foundation, so
 * that components (e.g. the Hero's CTAs) can already link to their intended
 * destination.
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  CONSULTATION: "/consultation",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
