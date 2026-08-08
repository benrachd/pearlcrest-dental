import type { Metadata } from "next";
import { seoDefaults } from "@/constants/seo";
import { siteConfig } from "@/constants/site";
import { routing } from "@/i18n/routing";
import type { PageSeo } from "@/types/seo";

/**
 * Builds a localized absolute path with the `/{locale}` prefix that
 * `routing.localePrefix: "always"` requires, e.g.
 * `localizedPath("fr", "/treatments") -> "/fr/treatments"`.
 */
function localizedPath(locale: string, path: string): string {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}

/**
 * Produces a complete, locale-aware `Metadata` object: title, description,
 * canonical URL, `hreflang` alternates for every supported locale (plus
 * `x-default`), Open Graph, and Twitter card data.
 *
 * Route `generateMetadata` functions should be thin wrappers around this:
 *
 *   export function generateMetadata({ params }): Promise<Metadata> {
 *     return buildMetadata({ locale: params.locale, path: "/treatments" });
 *   }
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex,
}: PageSeo): Metadata {
  const url = new URL(localizedPath(locale, path), siteConfig.url).toString();
  const resolvedTitle = title ?? siteConfig.name;
  const resolvedDescription = description ?? siteConfig.legalName;
  const ogImage = image ?? seoDefaults.ogImage;

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      new URL(localizedPath(loc, path), siteConfig.url).toString(),
    ]),
  );
  languages["x-default"] = new URL(
    localizedPath(routing.defaultLocale, path),
    siteConfig.url,
  ).toString();

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: seoDefaults.ogImageWidth,
          height: seoDefaults.ogImageHeight,
        },
      ],
    },
    twitter: {
      card: seoDefaults.twitterCard,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : seoDefaults.robots,
  };
}
