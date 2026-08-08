import type { AppLocale } from "@/i18n/routing";

/**
 * Re-exported for ergonomics so feature code can `import type { Locale }
 * from "@/types"` without knowing it originates from the routing config.
 */
export type Locale = AppLocale;

export type TextDirection = "ltr" | "rtl";
