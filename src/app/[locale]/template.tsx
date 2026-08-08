"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/animations/variants";
import type { WithChildren } from "@/types";

/**
 * Cinematic page transition — slow fade, soft blur, gentle slide.
 */
export default function LocaleTemplate({ children }: WithChildren) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className="will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.div>
  );
}
