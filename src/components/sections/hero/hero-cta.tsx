"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { springs } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HeroCtaProps {
  children: ReactNode;
}

export function HeroCta({ children }: HeroCtaProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  if (reduceMotion) {
    return <div className="inline-block">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="group/cta inline-block"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * 0.16);
        y.set((event.clientY - (rect.top + rect.height / 2)) * 0.16);
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
