import type { SVGProps } from "react";
import { cn } from "@/utils/cn";

/**
 * Standardized icon sizing so every icon in the product — regardless of
 * which icon set or hand-drawn SVG eventually supplies it — renders at one
 * of a fixed set of sizes instead of arbitrary one-off dimensions.
 */
export const ICON_SIZES = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

export type IconSize = keyof typeof ICON_SIZES;

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** The icon to render — any component accepting standard SVG props. */
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  size?: IconSize;
}

/**
 * Wraps an arbitrary SVG icon component with consistent sizing, a sane
 * `shrink-0` default (icons should never be squashed by flex/grid
 * siblings), and `aria-hidden` since icons are almost always paired with
 * visible or `sr-only` text and are therefore decorative.
 *
 * Usage: `<Icon icon={ArrowRightIcon} size="sm" />`
 */
export function Icon({ icon: IconComponent, size = "md", className, ...props }: IconProps) {
  return (
    <IconComponent
      aria-hidden="true"
      className={cn(ICON_SIZES[size], "shrink-0", className)}
      {...props}
    />
  );
}
