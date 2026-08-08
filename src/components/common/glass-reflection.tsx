"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface GlassReflectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Slow travelling glass highlight — premium surfaces only.
 */
export function GlassReflection({ children, className }: GlassReflectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("glass-reflection relative overflow-hidden", className)}>
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="glass-reflection-sweep pointer-events-none absolute inset-0"
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
