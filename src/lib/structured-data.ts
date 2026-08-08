import { siteConfig } from "@/constants/site";
import type { BreadcrumbItem } from "@/types/seo";

/**
 * schema.org JSON-LD builders. Each function returns a plain object — pass
 * it to the `<JsonLd>` component (`src/components/common/json-ld.tsx`) to
 * render it as a `<script type="application/ld+json">` tag.
 *
 * Structured data is one of the highest-leverage, lowest-effort SEO wins
 * available to a dental practice: it powers rich results (star ratings,
 * opening hours, breadcrumbs) directly in Google search.
 */

/** `Dentist` (a subtype of `MedicalBusiness`) describing the practice itself. */
export function getDentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    areaServed: siteConfig.markets,
    // Populate once available: address, geo, openingHoursSpecification,
    // telephone, priceRange, sameAs (social profiles).
  };
}

/** `BreadcrumbList` for the current page's navigation trail. */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
