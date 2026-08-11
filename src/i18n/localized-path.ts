import { routing } from "@/i18n/routing";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

/**
 * Builds locale-aware paths for SEO and navigation.
 * English (default): `/`, French: `/fr`, Arabic: `/ar`.
 * GitHub Pages static export: `/en`, `/fr`, `/ar` (optionally under basePath).
 */
export function localizedPath(locale: string, path: string = "/"): string {
  const normalizedPath = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;

  let localePath: string;

  if (process.env.GITHUB_PAGES === "true") {
    localePath = `/${locale}${normalizedPath}`;
  } else if (locale === routing.defaultLocale) {
    localePath = normalizedPath || "/";
  } else {
    localePath = `/${locale}${normalizedPath}`;
  }

  if (!basePath) {
    return localePath;
  }

  return `${basePath}${localePath === "/" ? "" : localePath}`;
}
