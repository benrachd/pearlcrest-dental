import {
  contactConfig,
  isConfiguredUrl,
} from "@/constants/contact-config";

export { contactConfig, CONTACT_SECTION_ID } from "@/constants/contact-config";
export {
  getBookingHref,
  getMailtoHref,
  getTelHref,
  getWhatsAppHref,
  getWhatsAppHrefWithText,
  isBookingUrlConfigured,
  isInquiryEndpointConfigured,
} from "@/constants/contact-config";

/**
 * Pearlcrest Dental Clinic — Hor Al Anz East, Dubai.
 */
const CLINIC_ADDRESS = "Office 102, Dar Al Nahda Building, Hor Al Anz East, Dubai, UAE";

export const clinicConfig = {
  ...contactConfig,
  address: CLINIC_ADDRESS,
  locationLabel: "Dubai · Hor Al Anz East · UAE",
  website: "https://pearlcrest.ae",
  latitude: null as number | null,
  longitude: null as number | null,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_ADDRESS)}`,
  googleMapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(CLINIC_ADDRESS)}&z=15&output=embed`,
} as const;

export type ClinicConfig = typeof clinicConfig;

export function isClinicUrlConfigured(url: string): boolean {
  return isConfiguredUrl(url);
}

function extractMapsQuery(url: string): string | null {
  if (!isClinicUrlConfigured(url)) return null;

  try {
    const parsed = new URL(url);
    const query = parsed.searchParams.get("query") ?? parsed.searchParams.get("q");
    if (query?.trim()) return query.trim();
  } catch {
    return null;
  }

  return null;
}

export function getMapEmbedSrc(): string | null {
  const { latitude, longitude, googleMapsEmbedUrl, googleMapsUrl, address } = clinicConfig;

  if (latitude != null && longitude != null) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  }

  if (isClinicUrlConfigured(googleMapsEmbedUrl)) {
    return googleMapsEmbedUrl;
  }

  if (isClinicUrlConfigured(googleMapsUrl) && googleMapsUrl.includes("/embed")) {
    return googleMapsUrl;
  }

  const query = extractMapsQuery(googleMapsUrl) ?? address.trim();
  if (!query) return null;

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

export function getGoogleMapsLink(): string | null {
  const { googleMapsUrl, latitude, longitude } = clinicConfig;

  if (isClinicUrlConfigured(googleMapsUrl)) {
    return googleMapsUrl;
  }

  if (latitude != null && longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  return null;
}
