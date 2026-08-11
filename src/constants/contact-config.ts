/**
 * Central contact & booking configuration — Pearlcrest Dental Clinic, Dubai.
 * Used by all booking/contact CTAs, tel/mailto links, and WhatsApp actions.
 */
export const contactConfig = {
  email: "hr@pearlcrest.ae",
  /** Primary clinic line. */
  phone: "04 272 6416",
  /** Mobile / WhatsApp line. */
  mobile: "+971 52 851 6434",
  whatsapp: "WhatsApp",
  /** E.164 digits only — +971 52 851 6434 */
  whatsappNumber: "971528516434",
  phones: [
    { display: "04 272 6416", tel: "+97142726416" },
    { display: "+971 52 851 6434", tel: "+971528516434" },
  ] as const,
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

export function getTelHref(phone?: string): string | null {
  if (!phone) {
    const primary = contactConfig.phones[0]?.tel;
    return primary ? `tel:${primary}` : null;
  }

  const matched = contactConfig.phones.find((entry) => entry.display === phone || entry.tel === phone);
  if (matched) return `tel:${matched.tel}`;

  if (isPlaceholder(phone)) return null;

  const normalized = phone.replace(/[^\d+]/g, "");
  if (normalized.replace(/\D/g, "").length < 8) return null;

  return normalized.startsWith("+") ? `tel:${normalized}` : `tel:${normalized}`;
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
