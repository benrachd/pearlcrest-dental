"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { easing } from "@/animations/transitions";
import { HeroDustParticles } from "@/components/sections/hero/hero-dust-particles";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HERO_IMAGE = "/images/hero/hero-editorial-v2.png";
const PARALLAX_SPRING = { stiffness: 10, damping: 28, mass: 2.2 };

export interface HeroBackgroundProps {
  imageAlt: string;
  dissolveStyle?: Pick<MotionStyle, "opacity" | "y" | "scale" | "filter">;
}

function LightLeaks({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -start-[15%] -top-[20%] h-[55%] w-[45%] opacity-[0.12] mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,220,170,0.5), transparent 68%)",
        }}
        animate={{ x: [0, 28, 0], y: [0, 14, 0], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -end-[10%] top-[8%] h-[40%] w-[35%] opacity-[0.08] mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(198,169,98,0.45), transparent 70%)",
        }}
        animate={{ x: [0, -18, 0], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </>
  );
}

export function HeroBackground({ imageAlt, dissolveStyle }: HeroBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, PARALLAX_SPRING);
  const springY = useSpring(mouseY, PARALLAX_SPRING);

  const bgX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const subjectX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const subjectY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const subjectRotateY = useTransform(springX, [-0.5, 0.5], [-1, 1]);
  const subjectRotateX = useTransform(springY, [-0.5, 0.5], [0.6, -0.6]);
  const fgX = useTransform(springX, [-0.5, 0.5], [-32, 32]);
  const fgY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  const lightX = useTransform(springX, [-0.5, 0.5], [38, 62]);
  const lightY = useTransform(springY, [-0.5, 0.5], [32, 52]);
  const mouseLight = useMotionTemplate`radial-gradient(560px circle at ${lightX}% ${lightY}%, rgba(255,232,190,0.14), transparent 68%)`;

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mouseX, mouseY]);

  const kenBurns = reduceMotion ? { scale: 1 } : { scale: [1, 1.08] };
  const kenBurnsTransition = reduceMotion
    ? { duration: 2, ease: easing.luxury }
    : { duration: 48, repeat: Infinity, repeatType: "reverse" as const, ease: easing.luxury };

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-neutral-950 [perspective:1400px]"
      style={dissolveStyle}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[12%] scale-110 transform-gpu will-change-transform"
        style={reduceMotion ? undefined : { x: bgX, y: bgY }}
      >
        <motion.div
          className="relative h-full w-full transform-gpu will-change-transform"
          animate={kenBurns}
          transition={kenBurnsTransition}
          style={reduceMotion ? undefined : { y: scrollParallaxY }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_22%] blur-[2px] brightness-[0.85] saturate-[0.9] sm:object-[52%_30%]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 -inset-y-[8%] transform-gpu will-change-transform"
        style={
          reduceMotion
            ? undefined
            : {
                x: subjectX,
                y: subjectY,
                rotateX: subjectRotateX,
                rotateY: subjectRotateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        <motion.div
          className="relative h-full w-full transform-gpu will-change-transform"
          animate={kenBurns}
          transition={kenBurnsTransition}
          style={reduceMotion ? undefined : { y: scrollParallaxY }}
        >
          <Image
            src={HERO_IMAGE}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_22%] contrast-[1.06] saturate-[1.02] sm:object-[55%_28%]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transform-gpu"
        style={reduceMotion ? undefined : { x: fgX, y: fgY }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent sm:h-[45%] sm:from-neutral-950/50" />
        <div className="absolute bottom-[12%] start-[8%] size-32 rounded-full bg-gold-200/8 blur-3xl" />
        <div className="absolute bottom-[20%] end-[12%] size-40 rounded-full bg-neutral-50/6 blur-3xl" />
      </motion.div>

      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: mouseLight }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[20%] mix-blend-soft-light opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(255,235,200,0.1), transparent 65%)",
            }}
            animate={{ x: [0, 48, 0], y: [0, 28, 0] }}
            transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 42% 18%, rgba(255,248,235,0.12), transparent 62%)",
            }}
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <LightLeaks active={!reduceMotion} />
      <HeroDustParticles />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_78%_at_50%_38%,transparent_22%,rgba(8,6,5,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="from-neutral-950/95 via-neutral-950/45 pointer-events-none absolute inset-0 bg-gradient-to-t from-15% via-50% to-transparent"
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light transform-gpu"
          style={{
            background:
              "linear-gradient(105deg, transparent 34%, rgba(255,230,180,0.09) 46%, rgba(255,250,240,0.07) 50%, rgba(198,169,98,0.06) 54%, transparent 66%)",
          }}
          animate={{ x: ["-130%", "130%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />
    </motion.div>
  );
}
