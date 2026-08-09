/**
 * Central contact & booking configuration — edit here before launch.
 * Used by all booking/contact CTAs, tel/mailto links, and WhatsApp actions.
 */
export const contactConfig = {
  phone: "[Clinic phone]",
  email: "[Clinic email]",
  whatsapp: "[Clinic WhatsApp]",
  /** E.164-style digits only, e.g. "971501234567" — enables wa.me links when set. */
  whatsappNumber: null as string | null,
  bookingUrl: "[Booking URL]",
  /** Optional inquiry API (Formspree, custom backend). Leave empty for demo confirmation. */
  inquiryEndpoint: "" as string,
} as const;

export type ContactConfig = typeof contactConfig;

export const CONTACT_SECTION_ID = "contact";

export function isPlaceholder(value: string): boolean {
  return value.includes("[") || value.trim().length === 0;
}

export function isConfiguredUrl(url: string): boolean {
  return !isPlaceholder(url) && /^https?:\/\//i.test(url);
}

export function isBookingUrlConfigured(): boolean {
  return isConfiguredUrl(contactConfig.bookingUrl);
}

export function getBookingHref(): string | null {
  return isBookingUrlConfigured() ? contactConfig.bookingUrl : null;
}

export function isInquiryEndpointConfigured(): boolean {
  return isConfiguredUrl(contactConfig.inquiryEndpoint);
}

export function getWhatsAppHrefWithText(text?: string): string | null {
  const base = getWhatsAppHref();
  if (!base) return null;
  if (!text?.trim()) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}text=${encodeURIComponent(text)}`;
}

export function getTelHref(): string | null {
  const { phone } = contactConfig;
  if (isPlaceholder(phone)) return null;
  const normalized = phone.replace(/[^\d+]/g, "");
  if (normalized.replace(/\D/g, "").length < 8) return null;
  return `tel:${normalized}`;
}

export function getMailtoHref(): string | null {
  const { email } = contactConfig;
  if (isPlaceholder(email)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return `mailto:${email}`;
}

export function getWhatsAppHref(): string | null {
  const { whatsappNumber, whatsapp, phone } = contactConfig;

  if (isConfiguredUrl(whatsapp) && /wa\.me|whatsapp\.com/i.test(whatsapp)) {
    return whatsapp;
  }

  const digits =
    extractWhatsAppDigits(whatsappNumber) ??
    extractWhatsAppDigits(whatsapp) ??
    extractWhatsAppDigits(phone);

  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

function extractWhatsAppDigits(value: string | null | undefined): string | null {
  if (!value || isPlaceholder(value)) return null;
  if (/X/i.test(value)) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return digits;
}
