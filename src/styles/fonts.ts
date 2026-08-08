import { Amiri, IBM_Plex_Sans_Arabic, Inter, Playfair_Display } from "next/font/google";

/**
 * Font configuration for Aurea Dental.
 *
 * Two typographic roles are defined — `heading` (editorial, luxury display
 * type) and `body` (highly legible UI/reading type) — and each role has one
 * Latin-script family (serves English + French) and one Arabic-script
 * family (serves Arabic).
 *
 * All four fonts are loaded once, as CSS variables, on the root `<html>`
 * element (see `src/app/[locale]/layout.tsx`). The Tailwind theme
 * (`src/app/globals.css`) then stacks the Latin and Arabic variable for each
 * role into a single `font-heading` / `font-body` utility, e.g.:
 *
 *   font-family: var(--font-heading-latin), var(--font-heading-arabic), serif;
 *
 * Because the two scripts share no glyphs, the browser's normal font
 * fallback-by-coverage behavior automatically renders Latin characters in
 * the Latin family and Arabic characters in the Arabic family — no
 * conditional loading or locale branching required at runtime, and no
 * layout shift when switching locales.
 */

export const headingLatin = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-heading-latin",
  display: "swap",
});

export const bodyLatin = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-latin",
  display: "swap",
});

export const headingArabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-heading-arabic",
  display: "swap",
});

export const bodyArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-arabic",
  display: "swap",
});

/**
 * Combined class name applied once to `<html>` so every font CSS variable
 * is available everywhere in the tree, regardless of the active locale.
 */
export const fontVariables = [
  headingLatin.variable,
  bodyLatin.variable,
  headingArabic.variable,
  bodyArabic.variable,
].join(" ");
