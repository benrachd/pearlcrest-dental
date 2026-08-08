"use client";

import { MotionConfig } from "framer-motion";
import type { WithChildren } from "@/types";

/**
 * App-wide Framer Motion configuration. Wrapping the tree once here (in
 * `src/app/[locale]/layout.tsx`) means every animation automatically
 * respects the visitor's OS-level "reduce motion" accessibility setting,
 * without each component having to opt in individually.
 */
export function MotionProvider({ children }: WithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
