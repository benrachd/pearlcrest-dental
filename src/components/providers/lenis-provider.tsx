"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { WithChildren } from "@/types";

/**
 * Ultra-smooth Lenis scrolling — 60fps, disabled under reduced motion.
 */
export function LenisProvider({ children }: WithChildren) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reduceMotion]);

  return children;
}
