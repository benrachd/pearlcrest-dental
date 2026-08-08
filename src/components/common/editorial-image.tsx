"use client";

import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { imageReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

export interface EditorialImageProps extends Omit<ImageProps, "onLoad"> {
  onLoad?: ImageProps["onLoad"];
  revealOnScroll?: boolean;
  kenBurns?: boolean;
}

export function EditorialImage({
  className,
  onLoad,
  alt,
  revealOnScroll = false,
  kenBurns = true,
  ...props
}: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  const image = (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="relative h-full w-full transform-gpu"
        animate={
          loaded && kenBurns && !reduceMotion
            ? { scale: [1, 1.04] }
            : undefined
        }
        transition={
          loaded && kenBurns && !reduceMotion
            ? { duration: 32, repeat: Infinity, repeatType: "reverse", ease: [0.16, 1, 0.3, 1] }
            : undefined
        }
      >
        {!loaded && (
          <div
            aria-hidden="true"
            className="from-neutral-100 via-gold-100/25 to-neutral-100 absolute inset-0 z-10 animate-pulse bg-gradient-to-br"
          />
        )}
        <Image
          alt={alt}
          {...props}
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          data-cursor="interactive"
          className={cn(
            "ease-luxury object-cover transition-[opacity,transform,filter] duration-[var(--motion-duration-slower)]",
            loaded ? "opacity-100 contrast-[1.03] saturate-[1.02]" : "opacity-0",
            "group-hover:scale-[1.05] group-hover/contrast:contrast-[1.06]",
            className,
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_78%_at_50%_42%,transparent_42%,rgba(12,10,8,0.18)_100%)] opacity-60 transition-opacity duration-700 group-hover:opacity-40"
        />
      </motion.div>
    </div>
  );

  if (!revealOnScroll || reduceMotion) {
    return image;
  }

  return (
    <motion.div
      variants={imageReveal}
      initial={hasRevealed ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportContent}
      onViewportEnter={() => setHasRevealed(true)}
      className="relative h-full w-full"
      style={hasRevealed ? { opacity: 1, filter: "blur(0px)" } : undefined}
    >
      {image}
    </motion.div>
  );
}
