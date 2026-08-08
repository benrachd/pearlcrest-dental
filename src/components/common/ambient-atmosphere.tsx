"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Sitewide ambient atmosphere — barely perceptible moving gradients + vignette.
 */
export function AmbientAtmosphere() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_50%,rgba(20,18,16,0.03)_100%)]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -start-1/4 -top-1/4 h-[60%] w-[60%] opacity-[0.35]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(198,169,98,0.06), transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -end-1/4 top-1/3 h-[50%] w-[50%] opacity-[0.25]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,248,240,0.08), transparent 68%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_50%,rgba(20,18,16,0.035)_100%)]" />
    </div>
  );
}
