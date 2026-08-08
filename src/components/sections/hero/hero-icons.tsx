import type { SVGProps } from "react";

/**
 * Minimal glyphs used only within the Hero section — hairline 1.5px
 * strokes, rounded caps, abstract over literal, per the creative
 * direction's icon philosophy. Kept local to this section rather than
 * `components/ui` since they are not yet part of a sitewide icon set.
 */

export function ArrowRightGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 12h16m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The only filled glyph in the set — a star reads as a rating, not an icon. */
export function StarGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.75l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 17.21l-5.66 2.98 1.08-6.31-4.59-4.47 6.34-.92L12 2.75Z" />
    </svg>
  );
}
