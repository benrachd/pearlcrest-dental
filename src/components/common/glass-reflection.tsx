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
    <div className={cn("glass-reflection relative box-border w-full min-w-0 max-w-full", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        {!reduceMotion && <span className="glass-reflection-sweep absolute inset-0" />}
      </div>
      <div className="relative z-[1] box-border w-full min-w-0 max-w-full overflow-visible">{children}</div>
    </div>
  );
}
