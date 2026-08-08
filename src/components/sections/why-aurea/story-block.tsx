"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { clipImageReveal, luxurySectionReveal, luxuryStagger, paragraphReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { EditorialImage } from "@/components/common/editorial-image";
import { ScrollParallax } from "@/components/common/scroll-parallax";
import { editorialIndexLine } from "@/constants/surface-classes";

export interface StoryBlockProps {
  number: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  priority?: boolean;
}

export function StoryBlock({
  number,
  title,
  paragraph1,
  paragraph2,
  imageSrc,
  imageAlt,
  reverse = false,
  priority = false,
}: StoryBlockProps) {
  const [imageRevealed, setImageRevealed] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
      <motion.div
        variants={clipImageReveal}
        initial={imageRevealed ? "visible" : "hidden"}
        whileInView="visible"
        viewport={viewportContent}
        onViewportEnter={() => setImageRevealed(true)}
        className={`group ${reverse ? "lg:order-2" : ""}`}
        data-cursor="interactive"
      >
        <ScrollParallax offset={24} className="relative aspect-[4/5] overflow-hidden rounded-card shadow-lg transition-shadow duration-700 group-hover:shadow-xl">
          <EditorialImage
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            revealOnScroll={false}
            sizes="(min-width: 1024px) 44vw, 92vw"
            className="ease-luxury transition-transform duration-[var(--motion-duration-slower)] group-hover:scale-[1.05]"
          />
        </ScrollParallax>
      </motion.div>

      <motion.div
        variants={luxuryStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportContent}
        className={`flex max-w-xl flex-col items-start gap-8 ${reverse ? "lg:order-1 lg:justify-self-end" : ""}`}
      >
        <motion.p variants={luxurySectionReveal} className="flex items-center gap-4">
          <span className="font-heading text-heading-md text-gold-700 italic">{number}</span>
          <span aria-hidden="true" className={editorialIndexLine} />
        </motion.p>

        <motion.h3
          variants={luxurySectionReveal}
          className="font-body text-display-sm sm:text-display-md text-balance tracking-tight text-neutral-950"
        >
          {title}
        </motion.h3>

        <div className="flex flex-col gap-5">
          <motion.p variants={paragraphReveal} className="text-body-lg text-foreground-muted max-w-[48ch] leading-relaxed">
            {paragraph1}
          </motion.p>
          <motion.p variants={paragraphReveal} custom={0.08} className="text-body-md text-foreground-muted max-w-[48ch] leading-relaxed">
            {paragraph2}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
