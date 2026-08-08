"use client";

import { motion } from "framer-motion";
import { easing } from "@/animations/transitions";
import { StarGlyph } from "@/components/sections/hero/hero-icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface HeroTrustBadgeProps {
  rating: string;
  label: string;
  cities: string;
}

/**
 * A small floating frosted-glass card — five stars and the rating,
 * one line of reassurance, one whispered line of places.
 */
export function HeroTrustBadge({ rating, label, cities }: HeroTrustBadgeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="glass-strong flex w-fit flex-col gap-1.5 rounded-card px-6 py-4 shadow-md"
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: easing.signature }}
    >
      <div className="flex items-center gap-2">
        <span className="text-gold-500 flex items-center gap-0.5" role="img" aria-label={`${rating} / 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <StarGlyph key={index} aria-hidden="true" className="size-2.5" />
          ))}
        </span>
        <span className="text-caption text-foreground font-semibold">{rating}</span>
      </div>

      <p className="text-caption text-foreground font-medium">{label}</p>
      <p className="text-caption text-foreground-muted">{cities}</p>
    </motion.div>
  );
}
