import { contactConfig } from "@/constants/contact-config";

/**
 * @deprecated Prefer `contactConfig` — re-exported for existing footer usage.
 */
export const demoContact = {
  email: contactConfig.email,
  phone: contactConfig.phone,
  whatsapp: contactConfig.whatsapp,
} as const;
