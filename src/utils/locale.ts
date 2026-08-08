import type { Locale, TextDirection } from "@/types/i18n";

const RTL_LOCALES: ReadonlySet<Locale> = new Set(["ar"]);

/** Whether a given locale is written right-to-left. */
export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

/** The `dir` attribute value that must be set on `<html>` for a locale. */
export function getDirection(locale: Locale): TextDirection {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}
