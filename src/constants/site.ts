import { routing } from "@/i18n/routing";

/**
 * Canonical, environment-independent facts about the brand. Every piece of
 * copy that is repeated across metadata, structured data, and (later) UI —
 * the site name, URL, supported locales — is defined exactly once here.
 *
 * `url` falls back to a placeholder in local development; set
 * `NEXT_PUBLIC_SITE_URL` in production (see `.env.example`).
 */
export const siteConfig = {
  name: "Aurea Dental",
  legalName: "Aurea Dental Clinics",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,

  // Markets the brand currently operates in. Used for structured data
  // (`areaServed`) and can drive future market-specific logic (currency,
  // phone formats, regulatory copy).
  markets: ["AE", "SA", "US", "FR"] as const,

  themeColor: "#0b0b0b",

  /** Populate once official handles / links exist. */
  social: {
    instagram: "",
    linkedin: "",
    x: "",
    whatsapp: "",
  },

  /** Populate once provisioned; kept centralized for structured data + footer. */
  contact: {
    email: "",
    phone: "",
  },
} as const;

export type Market = (typeof siteConfig.markets)[number];
