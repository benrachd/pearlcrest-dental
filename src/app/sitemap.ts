import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { localizedPath } from "@/i18n/localized-path";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

/**
 * Generates `/sitemap.xml` at build time. One entry per locale home page,
 * each carrying `alternates.languages` so search engines understand the
 * pages are translations of each other rather than duplicate content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      new URL(localizedPath(locale, "/"), siteConfig.url).toString(),
    ]),
  );

  return routing.locales.map((locale) => ({
    url: new URL(localizedPath(locale, "/"), siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
