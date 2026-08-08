import type { SVGProps } from "react";

/**
 * Hairline glyphs local to the Services section — 1.5px stroke, rounded
 * caps, per the creative direction. No generic medical iconography.
 */

/** Editorial diagonal arrow — reads "enter", not "submit". */
export function ArrowUpRightGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 17 17 7m0 0H8.5M17 7v8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
