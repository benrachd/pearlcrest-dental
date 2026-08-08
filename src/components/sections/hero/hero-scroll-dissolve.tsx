"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HeroScrollDissolveProps {
  sectionRef: RefObject<HTMLElement | null>;
}

/**
 * Bottom dissolve wash into the next section — overlay only, never hides content.
 */
export function HeroScrollDissolve({ sectionRef }: HeroScrollDissolveProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const washOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="from-background/0 via-background/60 to-background pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[32vh] bg-gradient-to-b"
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="from-background/0 via-background/70 to-background pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[38vh] bg-gradient-to-b"
      style={{ opacity: washOpacity }}
    />
  );
}

/** Scroll-linked lift for hero foreground — opacity stays at 1. */
export function useHeroContentDissolve(sectionRef: RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0.6, 0.95], [0, -32]);
  const blur = useTransform(scrollYProgress, [0.7, 0.95], [0, 6]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  if (reduceMotion) {
    return { style: undefined as undefined };
  }

  return { style: { y, filter } };
}

/** Parallax for hero photography on scroll exit — never fully transparent. */
export function useHeroBackgroundDissolve(sectionRef: RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 1.04]);

  if (reduceMotion) {
    return { style: undefined as undefined };
  }

  return { style: { y, scale } };
}

/** Fade scroll indicator as user leaves the hero. */
export function useHeroIndicatorDissolve(sectionRef: RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  if (reduceMotion) {
    return { style: undefined as undefined };
  }

  return { style: { opacity } };
}
