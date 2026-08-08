"use client";

import { motion, type MotionStyle } from "framer-motion";
import { duration, easing } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ScrollIndicatorProps {
  label: string;
  dissolveStyle?: { style?: { opacity?: MotionStyle["opacity"] } };
}

export function ScrollIndicator({ label, dissolveStyle }: ScrollIndicatorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: duration.slower, delay: 2.6, ease: easing.luxury }}
      style={dissolveStyle?.style}
      className="group absolute inset-x-0 bottom-3 z-10 mx-auto flex w-fit flex-col items-center gap-3 sm:bottom-10 sm:gap-5"
      aria-label={label}
    >
      <motion.span
        className="text-caption text-neutral-50/40 group-hover:text-neutral-50/70 rtl:tracking-normal uppercase tracking-[0.28em] transition-colors duration-700 sm:text-neutral-50/45 sm:tracking-[0.34em]"
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.span>

      <span className="relative flex h-12 w-px items-start justify-center overflow-hidden sm:h-16">
        <span aria-hidden="true" className="bg-neutral-50/15 absolute inset-0 w-px" />
        <motion.span
          aria-hidden="true"
          className="from-gold-400/80 to-gold-400/0 absolute top-0 w-px bg-gradient-to-b"
          initial={{ height: "0%" }}
          animate={{ height: reduceMotion ? "50%" : ["0%", "50%", "0%"] }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 3.2, repeat: Infinity, ease: easing.signature }
          }
        />
        <motion.span
          aria-hidden="true"
          className="bg-neutral-50/95 absolute top-0 size-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.45),0_0_20px_rgba(198,169,98,0.25)]"
          animate={reduceMotion ? undefined : { y: [0, 52, 0], opacity: [1, 0.25, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: easing.signature }}
        />
      </span>
    </motion.button>
  );
}
