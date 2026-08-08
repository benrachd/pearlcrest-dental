import type { Transition } from "framer-motion";

/**
 * Shared easing curves, durations, and spring presets — slow, cinematic, luxury.
 */
export const easing = {
  luxury: [0.16, 1, 0.3, 1] as const,
  signature: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 0.9,
  slower: 1.1,
  cinematic: 1.2,
} as const;

export const luxuryTransition: Transition = {
  duration: duration.slow,
  ease: easing.luxury,
};

export const cinematicTransition: Transition = {
  duration: duration.slower,
  ease: easing.luxury,
};

export const signatureTransition: Transition = {
  duration: duration.base,
  ease: easing.signature,
};

/** Soft springs — no harsh snap. */
export const springs = {
  magnetic: { type: "spring", stiffness: 110, damping: 22, mass: 0.9 } satisfies Transition,
  smooth: { type: "spring", stiffness: 160, damping: 28, mass: 1.05 } satisfies Transition,
  /** @deprecated use `magnetic` */
  snappy: { type: "spring", stiffness: 110, damping: 22, mass: 0.9 } satisfies Transition,
} as const;
