"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const CURSOR_SPRING = { stiffness: 95, damping: 22, mass: 0.85 };
const MAGNETIC_STRENGTH = 0.38;

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, CURSOR_SPRING);
  const springY = useSpring(cursorY, CURSOR_SPRING);

  useEffect(() => {
    if (reduceMotion || isTouch) return;

    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        "[data-cursor='interactive'], button, a, [role='button']",
      );

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        cursorX.set(event.clientX + (centerX - event.clientX) * MAGNETIC_STRENGTH);
        cursorY.set(event.clientY + (centerY - event.clientY) * MAGNETIC_STRENGTH);
        setHovering(true);
      } else {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
        setHovering(false);
      }

      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [reduceMotion, isTouch, cursorX, cursorY, visible]);

  if (reduceMotion || isTouch) return null;

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed start-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.85 : 0.65 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -start-[16px] -top-[16px] size-8 rounded-full border border-white bg-transparent"
        />
        <div className="absolute -start-[4px] -top-[4px] size-2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)]" />
      </motion.div>
    </>
  );
}
