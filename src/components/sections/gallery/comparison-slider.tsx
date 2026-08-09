"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

/** Matched pairs share identical dimensions, angle, and crop — center both layers. */
const IMAGE_POSITION = "object-cover object-center";

const RELEASE_SPRING = { stiffness: 280, damping: 32, mass: 0.8 };

export interface ComparisonSliderProps {
  title: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  treatmentName: string;
  duration: string;
  patientAge: string;
  recovery: string;
  durationLabel: string;
  ageLabel: string;
  recoveryLabel: string;
  treatmentLabel: string;
  sliderAriaLabel: string;
  priority?: boolean;
  featured?: boolean;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-3.5">
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-3.5">
      <path
        d="M9.5 6.5 15 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Before/after comparison with zero-lag drag, touch momentum, and
 * spring-settle on release. Pointer and touch share one code path.
 */
export function ComparisonSlider({
  title,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  treatmentName,
  duration,
  patientAge,
  recovery,
  durationLabel,
  ageLabel,
  recoveryLabel,
  treatmentLabel,
  sliderAriaLabel,
  priority = false,
  featured = false,
}: ComparisonSliderProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState({ before: false, after: false });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const position = useMotionValue(50);
  const springPosition = useSpring(
    position,
    isDragging ? { stiffness: 900, damping: 45, mass: 0.2 } : RELEASE_SPRING,
  );
  const clipPath = useTransform(springPosition, (value) => `inset(0 ${100 - value}% 0 0)`);
  const handleLeft = useTransform(springPosition, (value) => `${value}%`);
  const [sliderValue, setSliderValue] = useState(50);

  const lastMoveRef = useRef({ x: 0, time: 0 });
  const velocityRef = useRef(0);

  useMotionValueEvent(springPosition, "change", (value) => {
    setSliderValue(Math.round(value));
  });

  const isReady = loaded.before && loaded.after;
  const handleActive = isDragging || isHovering;

  const updateFromClientX = useCallback(
    (clientX: number, trackVelocity = false) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      if (trackVelocity) {
        const now = performance.now();
        const elapsed = now - lastMoveRef.current.time;
        if (elapsed > 0) {
          velocityRef.current = ((clientX - lastMoveRef.current.x) / elapsed) * 16;
        }
        lastMoveRef.current = { x: clientX, time: now };
      }

      const isRtl = getComputedStyle(containerRef.current!).direction === "rtl";
      const ratio = (clientX - rect.left) / rect.width;
      const pct = isRtl ? (1 - ratio) * 100 : ratio * 100;
      position.set(Math.max(4, Math.min(96, pct)));
    },
    [position],
  );

  const applyMomentum = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const velocityPct = (velocityRef.current / rect.width) * 100 * 12;
    if (Math.abs(velocityPct) < 0.4) return;

    const target = Math.max(4, Math.min(96, position.get() + velocityPct));
    animate(position, target, {
      type: "spring",
      ...RELEASE_SPRING,
      velocity: velocityPct,
    });
  }, [position]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 4;
    const current = position.get();

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      animate(position, Math.max(4, current - step), RELEASE_SPRING);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      animate(position, Math.min(96, current + step), RELEASE_SPRING);
    }
  };

  useEffect(() => {
    if (reduceMotion) position.set(50);
  }, [reduceMotion, position]);

  const metadata = [
    { label: treatmentLabel, value: treatmentName },
    { label: durationLabel, value: duration },
    { label: ageLabel, value: patientAge },
    { label: recoveryLabel, value: recovery },
  ];

  return (
    <article className="flex w-full min-w-0 max-w-full flex-col gap-10 lg:gap-12">
      <h3 className="font-body min-w-0 break-words text-heading-xl tracking-tight text-neutral-950 sm:text-display-sm rtl:text-end">
        {title}
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -32px 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label={sliderAriaLabel}
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={sliderValue}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative aspect-[16/10] touch-none select-none overflow-hidden rounded-2xl",
          featured ? "shadow-2xl" : "shadow-lg",
          "border-border/50 border outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
          isReady ? "bg-neutral-100" : "bg-neutral-100/80",
          isDragging ? "cursor-ew-resize" : isHovering ? "cursor-ew-resize" : "cursor-default",
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onPointerDown={(event) => {
          if (!isReady) return;
          setIsDragging(true);
          velocityRef.current = 0;
          lastMoveRef.current = { x: event.clientX, time: performance.now() };
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (!isDragging) return;
          updateFromClientX(event.clientX, true);
        }}
        onPointerUp={(event) => {
          setIsDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
          applyMomentum();
        }}
        onPointerCancel={(event) => {
          setIsDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        {!isReady && (
          <div
            aria-hidden="true"
            className="from-neutral-100 via-gold-100/40 to-neutral-100 absolute inset-0 animate-pulse bg-gradient-to-r"
          />
        )}

        <div
          className={cn(
            "absolute inset-0 transition-transform duration-[1400ms] ease-luxury",
            isHovering && !isDragging && isReady && "scale-[1.03]",
          )}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(min-width: 1024px) 1200px, 92vw"
            className={cn(IMAGE_POSITION, "transition-opacity duration-700", isReady ? "opacity-100" : "opacity-0")}
            onLoad={() => setLoaded((state) => ({ ...state, before: true }))}
            priority={priority}
          />

          <motion.div className="absolute inset-0" style={{ clipPath }}>
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              sizes="(min-width: 1024px) 1200px, 92vw"
              className={cn(IMAGE_POSITION, "transition-opacity duration-700", isReady ? "opacity-100" : "opacity-0")}
              onLoad={() => setLoaded((state) => ({ ...state, after: true }))}
              priority={priority}
            />
          </motion.div>
        </div>

        {isReady && (
          <>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-caption bg-neutral-950/45 text-neutral-50 rtl:tracking-normal pointer-events-none absolute end-5 top-5 rounded-full px-4 py-1.5 uppercase tracking-[0.2em] backdrop-blur-md"
            >
              {beforeLabel}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-caption bg-gold-600/80 text-neutral-50 rtl:tracking-normal pointer-events-none absolute start-5 top-5 rounded-full px-4 py-1.5 uppercase tracking-[0.2em] backdrop-blur-md"
            >
              {afterLabel}
            </motion.span>
          </>
        )}

        {isReady && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-10 flex w-14 -translate-x-1/2 items-center justify-center will-change-[left]"
            style={{ left: handleLeft }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-neutral-50/95 shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_20px_rgba(198,169,98,0.45)]"
            />

            <span
              aria-hidden="true"
              className={cn(
                "glass-strong border-neutral-50/25 text-gold-700 ease-luxury flex size-12 items-center justify-center gap-0.5 rounded-full border shadow-[0_8px_32px_rgba(20,20,20,0.12),0_0_24px_rgba(198,169,98,0.18)] backdrop-blur-[24px] transition-[transform,box-shadow] duration-300",
                handleActive && "scale-[1.12] shadow-[0_12px_40px_rgba(20,20,20,0.16),0_0_32px_rgba(198,169,98,0.28)]",
              )}
            >
              <ChevronLeftIcon />
              <ChevronRightIcon />
            </span>
          </motion.div>
        )}
      </motion.div>

      <dl className="border-border grid w-full min-w-0 max-w-full grid-cols-2 gap-x-4 gap-y-7 border-t pt-10 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-10 rtl:text-end">
        {metadata.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col gap-2">
            <dt className="text-caption text-foreground-muted break-words uppercase tracking-[0.16em] rtl:tracking-normal">
              {item.label}
            </dt>
            <dd className="font-body text-body-md min-w-0 break-words font-medium leading-[1.65] text-neutral-950 [overflow-wrap:anywhere]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
