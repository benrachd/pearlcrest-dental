"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Facade around Framer Motion's `useReducedMotion`, which reads the
 * `prefers-reduced-motion` media query. Every animation in the codebase
 * should be authored to respect this (e.g. by swapping a slide-in variant
 * for a plain fade, or disabling motion entirely) — see
 * `src/animations/variants.ts`.
 *
 * Wrapping it here (instead of importing from `framer-motion` directly
 * everywhere) means the implementation can change later without touching
 * every call site.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
