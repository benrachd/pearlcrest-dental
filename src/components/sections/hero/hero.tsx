"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { easing } from "@/animations/transitions";
import { HeroBackground } from "@/components/sections/hero/hero-background";
import { HeroCta } from "@/components/sections/hero/hero-cta";
import { getHeroCtaDelay, HeroHeadline } from "@/components/sections/hero/hero-headline";
import {
  HeroScrollDissolve,
  useHeroBackgroundDissolve,
  useHeroContentDissolve,
  useHeroIndicatorDissolve,
} from "@/components/sections/hero/hero-scroll-dissolve";
import { ArrowRightGlyph } from "@/components/sections/hero/hero-icons";
import { ScrollIndicator } from "@/components/sections/hero/scroll-indicator";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Hero");
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const ctaDelay = getHeroCtaDelay(t("headlineLead"), t("headlineEmphasis"));
  const sectionRef = useRef<HTMLElement>(null);
  const contentDissolve = useHeroContentDissolve(sectionRef);
  const backgroundDissolve = useHeroBackgroundDissolve(sectionRef);
  const indicatorDissolve = useHeroIndicatorDissolve(sectionRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ctaReveal: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: easing.luxury, delay: ctaDelay },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-label={t("ariaLabel")}
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <HeroBackground imageAlt={t("imageAlt")} dissolveStyle={backgroundDissolve.style} />
      <HeroScrollDissolve sectionRef={sectionRef} />

      <motion.div
        style={contentDissolve.style}
        className="px-gutter lg:px-gutter-lg pointer-events-none relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end overflow-hidden pb-4 pt-24 md:px-10 md:pb-32 md:pt-36 lg:pb-40"
      >
        <div className="pointer-events-auto flex w-full min-w-0 max-w-full flex-col items-stretch gap-8 md:max-w-4xl md:items-start md:gap-16 lg:gap-[4.75rem]">
          <HeroHeadline />

          <motion.div variants={ctaReveal} initial="hidden" animate="visible" className="w-full min-w-0 md:w-auto">
            <HeroCta>
              <Button
                asChild
                variant="accent"
                size="xl"
                endIcon={ArrowRightGlyph}
                className="group-hover/cta:shadow-[0_4px_32px_rgba(198,169,98,0.32),0_0_60px_rgba(198,169,98,0.18)] relative box-border h-14 min-h-14 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-full px-4 text-body-sm leading-snug shadow-[0_2px_20px_rgba(198,169,98,0.2)] duration-700 md:h-15 md:min-h-12 md:w-auto md:max-w-none md:px-10 md:text-body-lg md:leading-normal md:whitespace-nowrap group-hover/cta:-translate-y-0.5"
              >
                <Link href={ROUTES.CONSULTATION}>
                  {mounted && !reduceMotion ? (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ["-120%", "220%"], opacity: [0, 0.85, 0] }}
                      transition={{
                        duration: 1.4,
                        ease: easing.luxury,
                        repeat: Infinity,
                        repeatDelay: 3.6,
                      }}
                    />
                  ) : null}
                  {t("ctaPrimary")}
                </Link>
              </Button>
            </HeroCta>
          </motion.div>

          <ScrollIndicator
            label={t("scrollHint")}
            dissolveStyle={indicatorDissolve}
            placement="inline"
            className="md:hidden"
          />
        </div>
      </motion.div>

      <ScrollIndicator
        label={t("scrollHint")}
        dissolveStyle={indicatorDissolve}
        placement="fixed"
        className="hidden md:flex"
      />
    </section>
  );
}
