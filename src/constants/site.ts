import { routing } from "@/i18n/routing";

/**
 * Canonical, environment-independent facts about Pearlcrest Dental Clinic.
 */
export const siteConfig = {
  name: "Pearlcrest Dental",
  legalName: "Pearlcrest Dental Clinic",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  markets: ["AE"] as const,
  themeColor: "#0b0b0b",
  social: {
    website: "https://pearlcrest.ae",
    instagram: "",
    linkedin: "",
    x: "",
    whatsapp: "https://wa.me/971528516434",
  },
  contact: {
    email: "hr@pearlcrest.ae",
    phone: "+97142726416",
  },
} as const;

export type Market = (typeof siteConfig.markets)[number];
