"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { springs } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT = 2.8;

export function LuxuryCard({ children, className }: LuxuryCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springs.smooth);
  const springRotateY = useSpring(rotateY, springs.smooth);

  if (reduceMotion) {
    return (
      <div className={className} data-cursor="interactive">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-cursor="interactive"
      className={cn("glass-reflection group/card relative overflow-hidden [perspective:1200px] transform-gpu", className)}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(x * MAX_TILT * 2);
        rotateX.set(-y * MAX_TILT * 2);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <span
        aria-hidden="true"
        className="glass-reflection-sweep pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-700 group-hover/card:opacity-100"
      />
      <motion.div className="relative z-[1] h-full w-full transition-shadow duration-700 ease-luxury group-hover/card:shadow-[0_28px_56px_-14px_rgba(20,20,20,0.16),0_0_48px_rgba(198,169,98,0.1)]">
        {children}
      </motion.div>
    </motion.div>
  );
}
