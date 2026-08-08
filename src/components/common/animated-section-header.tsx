"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { labelReveal, luxurySectionReveal, luxuryStagger, paragraphReveal } from "@/animations/variants";
import { viewportHeader } from "@/animations/viewport";
import { editorialIndexLine } from "@/constants/surface-classes";
import { cn } from "@/utils/cn";

export interface AnimatedSectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  className?: string;
  centered?: boolean;
  dramatic?: boolean;
}

function splitIntroLines(text: string): string[] {
  const lines = text
    .split(/(?<=[.!?])\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : [text];
}

export function AnimatedSectionHeader({
  id,
  eyebrow,
  title,
  intro,
  className = "",
  centered = false,
  dramatic = false,
}: AnimatedSectionHeaderProps) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const introLines = intro ? splitIntroLines(intro) : [];

  return (
    <motion.div
      variants={luxuryStagger}
      initial={hasRevealed ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportHeader}
      onViewportEnter={() => setHasRevealed(true)}
      className={cn(
        "flex max-w-3xl flex-col gap-7 lg:gap-8",
        centered ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <motion.p
        variants={labelReveal}
        className={cn(
          "text-caption text-gold-700 rtl:tracking-normal flex items-center gap-4 uppercase tracking-[0.24em]",
          centered && "justify-center",
        )}
      >
        <span aria-hidden="true" className={editorialIndexLine} />
        {eyebrow}
        {centered ? <span aria-hidden="true" className={editorialIndexLine} /> : null}
      </motion.p>

      <motion.h2
        id={id}
        variants={luxurySectionReveal}
        className={cn(
          "font-body text-balance tracking-[-0.02em] text-neutral-950",
          dramatic
            ? "text-display-lg sm:text-display-xl leading-[1.06]"
            : "text-display-md sm:text-display-lg leading-[1.08]",
        )}
      >
        {title}
      </motion.h2>

      {introLines.length > 0 ? (
        <span
          className={cn(
            "flex flex-col gap-3 text-body-lg text-foreground-muted max-w-[54ch] leading-[1.8] tracking-[0.01em]",
            centered && "items-center text-center",
          )}
        >
          {introLines.map((line, index) => (
            <motion.span
              key={`${line}-${index}`}
              variants={paragraphReveal}
              custom={0.28 + index * 0.18}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </span>
      ) : null}
    </motion.div>
  );
}
