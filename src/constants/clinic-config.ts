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
export const clinicConfig = {
  ...contactConfig,
  address: "Office 102, Dar Al Nahda Building, Hor Al Anz East, Dubai, UAE",
  locationLabel: "Dubai · Hor Al Anz East · UAE",
  website: "https://pearlcrest.ae",
  latitude: null as number | null,
  longitude: null as number | null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Office+102,+Dar+Al+Nahda+Building,+Hor+Al+Anz+East,+Dubai,+UAE",
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
