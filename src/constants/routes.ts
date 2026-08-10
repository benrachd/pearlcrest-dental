/**
 * Locale-agnostic route paths (no `/[locale]` prefix — that is added
 * automatically by `Link` / `redirect` from `@/i18n/navigation`).
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/#why-pearlcrest-heading",
  SERVICES: "/#services-heading",
  CONSULTATION: "/#contact",
  CONTACT: "/#contact",
  PRIVACY: "/#contact",
  TERMS: "/#contact",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
