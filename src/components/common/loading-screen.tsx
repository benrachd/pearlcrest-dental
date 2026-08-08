"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { easing } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Cinematic intro — white canvas, AUREA fade, gold line draw, 1.5s exit.
 */
export function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!reduceMotion);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reduceMotion) return;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1500);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  if (!mounted || reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: easing.luxury }}
          className="bg-background fixed inset-0 z-[10000] flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easing.luxury, delay: 0.1 }}
              className="font-heading text-foreground text-3xl font-medium tracking-[0.24em] sm:text-4xl"
            >
              AUREA
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: easing.luxury, delay: 0.35 }}
              className="bg-gold-500/70 h-px w-24 origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
