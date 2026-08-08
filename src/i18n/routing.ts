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

  // Every locale is always present in the URL (e.g. `/en`, `/ar`, `/fr`).
  // This keeps canonical URLs unambiguous, which is important for
  // multi-market SEO (Google Search Console properties, hreflang mapping).
  localePrefix: "always",

  // Locale is never inferred from the `Accept-Language` header once a
  // visitor has explicitly chosen one — avoids surprising redirects for
  // returning visitors. See `src/i18n/request.ts` / middleware config.
  localeDetection: true,
});

export type AppLocale = (typeof routing.locales)[number];
