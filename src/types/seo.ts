import type { Locale } from "@/types/i18n";

/**
 * Input contract for `buildMetadata()` (see `src/lib/metadata.ts`). Every
 * route that needs custom SEO metadata depends on this shape instead of the
 * raw Next.js `Metadata` type, keeping route files declarative and free of
 * boilerplate (canonical URLs, hreflang alternates, Open Graph, Twitter
 * cards are all derived automatically).
 */
export interface PageSeo {
  /** Locale the page is being rendered for. */
  locale: Locale;
  /** Route pathname *without* the locale prefix, e.g. "/", "/treatments". */
  path: string;
  /** Page-specific title. Falls back to the site default title. */
  title?: string;
  /** Page-specific description. Falls back to the site default description. */
  description?: string;
  /** Absolute or root-relative path to a dedicated Open Graph image. */
  image?: string;
  /** Excludes the page from search engine indexing when true. */
  noIndex?: boolean;
}

/** A single node in a breadcrumb / `BreadcrumbList` structured data trail. */
export interface BreadcrumbItem {
  name: string;
  path: string;
}
