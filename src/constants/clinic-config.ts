/**
 * Central clinic configuration — replace placeholders before production launch.
 * All location, contact, and map values are edited here only.
 */
export const clinicConfig = {
  address: "[Clinic address]",
  phone: "[Clinic phone]",
  email: "[Clinic email]",
  whatsapp: "[Clinic WhatsApp]",
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

function isPlaceholder(value: string): boolean {
  return value.includes("[") || value.trim().length === 0;
}

export function isClinicUrlConfigured(url: string): boolean {
  return !isPlaceholder(url) && /^https?:\/\//i.test(url);
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
