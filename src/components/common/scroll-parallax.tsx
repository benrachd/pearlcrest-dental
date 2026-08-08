"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in pixels — subtle by default. */
  offset?: number;
}

/**
 * Micro parallax on scroll — GPU-accelerated transform only.
 */
export function ScrollParallax({ children, className, offset = 32 }: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y, scale }} className="relative h-full w-full transform-gpu will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
