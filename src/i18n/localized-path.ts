import { routing } from "@/i18n/routing";

/**
 * Builds locale-aware paths for SEO and navigation.
 * English (default): `/`, French: `/fr`, Arabic: `/ar`.
 */
export function localizedPath(locale: string, path: string = "/"): string {
  const normalizedPath = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;

  if (locale === routing.defaultLocale) {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
}
