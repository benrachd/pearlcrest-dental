"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { easing } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface StatCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function StatCounter({ value, suffix, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const locale = useLocale();
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [counting, setCounting] = useState(false);
  const count = useMotionValue(0);
  const format = (n: number) => (n >= 1000 ? n.toLocaleString(locale) : String(n));
  const display = useTransform(count, (v) => format(Math.round(v)));

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      count.set(value);
      return;
    }

    setCounting(true);
    const controls = animate(count, value, {
      duration: 1.8,
      ease: easing.luxury,
      onComplete: () => setCounting(false),
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, value, count]);

  return (
    <span
      ref={ref}
      className={cn(
        "tabular-nums transition-[color,text-shadow] duration-700 ease-luxury",
        counting
          ? "text-gold-300 drop-shadow-[0_0_28px_rgba(198,169,98,0.55)]"
          : "text-gold-300/95",
        className,
      )}
    >
      {reduceMotion ? (
        <>
          {format(value)}
          {suffix}
        </>
      ) : (
        <>
          <motion.span>{display}</motion.span>
          {suffix}
        </>
      )}
    </span>
  );
}
