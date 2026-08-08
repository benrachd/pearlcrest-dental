"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: `${8 + ((i * 17) % 84)}%`,
  y: `${6 + ((i * 23) % 88)}%`,
  size: 1 + (i % 3),
  duration: 18 + i * 2.4,
  delay: i * 0.8,
}));

/**
 * Sitewide floating dust — extremely subtle, never distracting.
 */
export function AmbientParticles() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-neutral-50/25"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, particle.id % 2 === 0 ? 8 : -8, 0],
            opacity: [0.08, 0.22, 0.08],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
