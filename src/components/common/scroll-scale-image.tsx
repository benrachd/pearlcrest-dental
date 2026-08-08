"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface ScrollScaleImageProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
}

/** Subtle scroll-driven scale — GPU transform only. */
export function ScrollScaleImage({
  children,
  className,
  scaleRange = [1, 1.06],
}: ScrollScaleImageProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className="h-full w-full transform-gpu will-change-transform"
        style={{ scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
