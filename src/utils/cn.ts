import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names (`clsx`) and then resolves conflicting
 * Tailwind utility classes so the last one wins (`tailwind-merge`), e.g.
 * `cn("px-2", condition && "px-4")` correctly yields `"px-4"` instead of
 * emitting both classes. This is the single class-name helper for the whole
 * codebase — every component should use it instead of template strings.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
