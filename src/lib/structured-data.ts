import { clinicConfig } from "@/constants/clinic-config";
import { siteConfig } from "@/constants/site";
import type { BreadcrumbItem } from "@/types/seo";

/**
 * schema.org JSON-LD builders.
 */

export function getDentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinicConfig.address,
      addressLocality: "Dubai",
      addressRegion: "Hor Al Anz East",
      addressCountry: "AE",
    },
    areaServed: siteConfig.markets,
    sameAs: [clinicConfig.website, siteConfig.social.whatsapp].filter(Boolean),
  };
}

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
