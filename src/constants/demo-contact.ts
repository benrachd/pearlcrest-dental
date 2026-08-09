import { clinicConfig } from "@/constants/clinic-config";

/**
 * @deprecated Prefer `clinicConfig` — re-exported for existing footer usage.
 */
export const demoContact = {
  email: clinicConfig.email,
  phone: clinicConfig.phone,
  whatsapp: clinicConfig.whatsapp,
} as const;
