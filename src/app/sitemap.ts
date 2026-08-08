import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { routing } from "@/i18n/routing";

/**
 * Generates `/sitemap.xml` at build time. One entry per locale home page,
 * each carrying `alternates.languages` so search engines understand the
 * pages are translations of each other rather than duplicate content.
 *
 * Extend this as real routes are added (map over a route list the same way
 * `robots.ts` / `constants/routes.ts` do).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
