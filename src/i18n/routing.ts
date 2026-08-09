import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for every locale-aware routing decision in the app
 * (middleware, navigation helpers, `<html lang>` generation, hreflang tags).
 *
 * Adding a market later (e.g. Saudi Arabia gets its own Arabic dialect, or a
 * German site is launched) means updating this file only — every consumer
 * (`middleware.ts`, `src/i18n/navigation.ts`, metadata builders) reacts
 * automatically.
 */
export const routing = defineRouting({
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",

  // English at `/`; French and Arabic at `/fr` and `/ar`.
  localePrefix: "as-needed",

  // Keep `/` in English unless the visitor explicitly chooses FR or AR.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
