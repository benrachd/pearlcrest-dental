import type { Variants } from "framer-motion";
import { duration, easing } from "@/animations/transitions";

const REVEAL = { duration: 1, ease: easing.luxury };
const CINEMATIC = { duration: duration.slower, ease: easing.luxury };

/** Premium section entrance — fade, blur, translate (scale always ≥ 1). */
export const luxurySectionReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...REVEAL, delay },
  }),
};

export const luxuryStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.14 },
  },
};

export const paragraphReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.base, ease: easing.luxury, delay },
  }),
};

export const labelReveal: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.36em", filter: "blur(2px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    letterSpacing: "0.28em",
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.luxury, delay },
  }),
};

export const wordByWordReveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slower, ease: easing.luxury, delay: index * 0.14 },
  }),
};

export const clipImageReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: CINEMATIC,
  },
};

/** Gallery case study — slow cinematic entrance. */
export const galleryReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: duration.cinematic, ease: easing.luxury, delay },
  }),
};

export const cinematicReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(5px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...CINEMATIC, delay },
  }),
};

export const sectionReveal: Variants = luxurySectionReveal;

export const editorialReveal: Variants = galleryReveal;

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: CINEMATIC,
  },
};

export const heroChoreography: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

export const imageReveal: Variants = clipImageReveal;

export const textReveal: Variants = paragraphReveal;

export const staggerContainer: Variants = luxuryStagger;

export const cinematicStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

export const floatReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...REVEAL, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: easing.luxury } },
};

export const fadeInUp: Variants = luxurySectionReveal;

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: duration.base, ease: easing.luxury } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, filter: "blur(3px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: REVEAL },
};

/** Page route transition. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.cinematic, ease: easing.luxury },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(3px)",
    transition: { duration: duration.base, ease: easing.luxury },
  },
};
