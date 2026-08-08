"use client";

import { motion } from "framer-motion";
import { wordByWordReveal } from "@/animations/variants";
import { cn } from "@/utils/cn";

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  startDelay?: number;
  stagger?: number;
}

export function WordReveal({
  text,
  className,
  wordClassName,
  startDelay = 0,
  stagger = 0.14,
}: WordRevealProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-[0.18em] gap-y-2", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          custom={startDelay + index * stagger}
          variants={wordByWordReveal}
          initial="hidden"
          animate="visible"
          className={cn("inline-block", wordClassName)}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
