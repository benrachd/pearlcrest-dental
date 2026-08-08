"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COUNT = 22;

/**
 * Floating dust — visible only in the upper bright region via CSS mask.
 * Pure transform/opacity; no layout thrashing.
 */
export function HeroDustParticles() {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, index) => ({
        id: index,
        x: 8 + ((index * 17) % 84),
        y: 5 + ((index * 23) % 38),
        size: 1 + (index % 3) * 0.5,
        duration: 18 + (index % 5) * 4,
        delay: (index % 7) * 1.2,
        drift: index % 2 === 0 ? 12 : -10,
      })),
    [],
  );

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_68%)]"
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-neutral-50/35"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -particle.drift, 0],
            x: [0, particle.drift * 0.3, 0],
            opacity: [0.06, 0.2, 0.06],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
