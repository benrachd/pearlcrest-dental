"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { springs } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Premium magnetic pull — soft spring, slow settle, never harsh.
 */
export function MagneticWrap({ children, className, strength = 0.14 }: MagneticWrapProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={className}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * strength);
        y.set((event.clientY - centerY) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
