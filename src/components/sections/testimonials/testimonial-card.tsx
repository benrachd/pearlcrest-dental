"use client";

import { motion } from "framer-motion";
import { luxurySectionReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { LuxuryCard } from "@/components/common/luxury-card";
import { StarGlyph } from "@/components/sections/hero/hero-icons";
import { cardOnSurface } from "@/constants/surface-classes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  treatment: string;
  ratingLabel: string;
  index?: number;
}

export function TestimonialCard({
  quote,
  name,
  location,
  treatment,
  ratingLabel,
  index = 0,
}: TestimonialCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={luxurySectionReveal}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={viewportContent}
    >
      <motion.div
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -3, 0],
              transition: { duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" },
            }
      }
      >
        <LuxuryCard>
          <blockquote className={cn("relative flex h-full flex-col gap-10 p-10 sm:p-12", cardOnSurface)}>
            <span
              aria-hidden="true"
              className="font-heading text-gold-200/80 pointer-events-none absolute start-8 top-6 text-[5rem] leading-none italic select-none"
            >
              &ldquo;
            </span>

            <span className="text-gold-500 relative z-10 flex items-center gap-0.5" role="img" aria-label={ratingLabel}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarGlyph key={i} aria-hidden="true" className="size-3" />
              ))}
            </span>

            <p className="font-body text-heading-lg sm:text-heading-xl relative z-10 text-balance tracking-tight text-neutral-950 leading-[1.45]">
              {quote}
            </p>

            <footer className="relative z-10 mt-auto flex flex-col gap-2">
              <cite className="text-body-md text-foreground not-italic font-medium">{name}</cite>
              <span className="text-caption text-foreground-muted">{location}</span>
              <span className="text-caption text-gold-700 rtl:tracking-normal mt-1 uppercase tracking-[0.16em]">
                {treatment}
              </span>
            </footer>
          </blockquote>
        </LuxuryCard>
      </motion.div>
    </motion.div>
  );
}
