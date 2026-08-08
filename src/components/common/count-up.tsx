"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { easing } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface CountUpProps {
  value: string;
  className?: string;
}

/**
 * Cinematic number count — slow, elegant, once on scroll.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const target = Number.parseInt(value, 10);
  const padLength = value.length;
  const count = useMotionValue(reduceMotion ? target : 0);
  const display = useTransform(count, (v) => String(Math.round(v)).padStart(padLength, "0"));

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(count, target, {
      duration: 1.1,
      ease: easing.luxury,
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, target, count]);

  if (reduceMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
