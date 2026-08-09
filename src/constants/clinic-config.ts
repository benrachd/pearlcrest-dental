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
  isBookingUrlConfigured,
} from "@/constants/contact-config";

/**
 * Central clinic configuration — replace placeholders before production launch.
 * Contact/booking fields live in `contactConfig`; location & map fields here.
 */
export const clinicConfig = {
  ...contactConfig,
  address: "[Clinic address]",
  openingHours: "[Opening hours]",
  /** Set when the client provides coordinates (e.g. 25.2048). */
  latitude: null as number | null,
  /** Set when the client provides coordinates (e.g. 55.2708). */
  longitude: null as number | null,
  /** Full Google Maps link — used by “Open in Google Maps”. */
  googleMapsUrl: "[Google Maps URL]",
  /**
   * Optional iframe embed URL (from Google Maps → Share → Embed a map).
   * Used when latitude/longitude are not set.
   */
  googleMapsEmbedUrl: "" as string,
} as const;

export type ClinicConfig = typeof clinicConfig;

export function isClinicUrlConfigured(url: string): boolean {
  return isConfiguredUrl(url);
}

export function getMapEmbedSrc(): string | null {
  const { latitude, longitude, googleMapsEmbedUrl, googleMapsUrl } = clinicConfig;

  if (latitude != null && longitude != null) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  }

  if (isClinicUrlConfigured(googleMapsEmbedUrl)) {
    return googleMapsEmbedUrl;
  }

  if (isClinicUrlConfigured(googleMapsUrl) && googleMapsUrl.includes("/embed")) {
    return googleMapsUrl;
  }

  return null;
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
