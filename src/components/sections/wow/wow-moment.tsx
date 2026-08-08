"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { easing } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STORY_IMAGE = "/images/hero/hero-editorial-v2.png";

export function WowMoment() {
  const t = useTranslations("Wow");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [1, 1, 0.35, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.72, 0.88]);

  return (
    <section
      ref={sectionRef}
      aria-label={t("ariaLabel")}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-neutral-950"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 transform-gpu will-change-transform"
        style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
      >
        <Image
          src={STORY_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[55%_28%] brightness-[0.48] contrast-[1.06] saturate-[0.9]"
          priority={false}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-neutral-950"
        style={reduceMotion ? { opacity: 0.72 } : { opacity: overlayOpacity }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_42%,transparent_20%,rgba(8,6,5,0.5)_100%)]"
      />
      <div
        aria-hidden="true"
        className="from-neutral-950 pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t to-transparent"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
        className="px-gutter lg:px-gutter-lg relative z-10 mx-auto max-w-[1200px] text-center sm:px-10"
      >
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.3, ease: easing.luxury }}
          className="font-body text-display-xl xs:text-display-2xl sm:text-[clamp(3rem,6.5vw,5.5rem)] text-balance tracking-[-0.035em] text-neutral-50 leading-[1.04]"
        >
          <span className="block">{t("line1")}</span>
          <span className="text-gold-200/90 mt-2 block font-light italic">{t("line2")}</span>
        </motion.h2>
        <motion.div
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: easing.luxury, delay: 0.4 }}
          className="via-gold-400/50 mx-auto mt-14 h-px w-20 origin-center bg-gradient-to-r from-transparent to-transparent sm:mt-16 sm:w-28"
        />
      </motion.div>
    </section>
  );
}
