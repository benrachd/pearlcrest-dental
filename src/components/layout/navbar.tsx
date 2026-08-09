"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { duration, easing } from "@/animations/transitions";
import { MagneticWrap } from "@/components/common/magnetic-wrap";
import { BookingCtaLink } from "@/components/common/contact-links";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

export function Navbar() {
  const t = useTranslations("Navbar");
  const { scrollY } = useScroll();

  const blur = useTransform(scrollY, [0, 40, 200], [24, 32, 44]);
  const saturation = useTransform(scrollY, [0, 40, 200], [170, 185, 200]);
  const bgAlpha = useTransform(scrollY, [0, 40, 200], [0.16, 0.48, 0.82]);
  const scrimOpacity = useTransform(scrollY, [0, 40, 120], [1, 0.3, 0]);
  const shadowStrength = useTransform(scrollY, [0, 40, 200], [0.1, 0.14, 0.2]);
  const navScale = useTransform(scrollY, [0, 40, 200], [1, 0.98, 0.97]);

  const backdropFilter = useMotionTemplate`blur(${blur}px) saturate(${saturation}%)`;
  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${bgAlpha})`;
  const boxShadow = useMotionTemplate`0 12px 40px rgba(0, 0, 0, ${shadowStrength}), 0 2px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.22)`;

  const logoPrimary = useTransform(scrollY, [0, 50], ["#fafaf9", "#1c1917"]);
  const logoSecondary = useTransform(scrollY, [0, 50], ["rgba(250, 250, 249, 0.78)", "#57534e"]);
  const logoShadow = useTransform(scrollY, [0, 50], ["0 1px 12px rgba(0,0,0,0.45)", "0 0 0 rgba(0,0,0,0)"]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slower, ease: easing.luxury, delay: 1.55 }}
      className="px-gutter lg:px-gutter-lg pointer-events-none fixed inset-x-0 top-4 z-50 sm:px-10"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-4 h-36 bg-gradient-to-b from-neutral-950/55 via-neutral-950/20 to-transparent"
        style={{ opacity: scrimOpacity }}
      />

      <motion.nav
        aria-label={t("ariaLabel")}
        style={{
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          backgroundColor,
          boxShadow,
          scale: navScale,
        }}
        className="pointer-events-auto mx-auto flex h-10 w-full max-w-[1600px] min-w-0 transform-gpu items-center justify-between rounded-full border border-gold-500/25 pe-1 ps-4 will-change-transform sm:ps-5 max-sm:rtl:grid max-sm:rtl:h-auto max-sm:rtl:min-h-10 max-sm:rtl:grid-cols-[auto_auto_minmax(0,1fr)] max-sm:rtl:items-center max-sm:rtl:gap-x-2.5 max-sm:rtl:px-2.5 max-sm:rtl:py-1"
      >
        <Link
          href={ROUTES.HOME}
          aria-label={t("homeAriaLabel")}
          data-cursor="interactive"
          className="group ease-luxury relative flex min-w-0 shrink items-baseline gap-1 py-1 transition-opacity duration-700 hover:opacity-80 sm:gap-2 max-sm:rtl:col-start-3 max-sm:rtl:max-w-full max-sm:rtl:justify-self-end max-sm:rtl:gap-0.5"
        >
          <motion.span
            style={{ color: logoPrimary, textShadow: logoShadow }}
            className="font-heading text-[0.9375rem] font-medium tracking-[0.16em] sm:text-lg sm:tracking-[0.2em] max-sm:rtl:text-[0.8125rem] max-sm:rtl:tracking-[0.12em]"
          >
            AUREA
          </motion.span>
          <motion.span
            style={{ color: logoSecondary, textShadow: logoShadow }}
            className="text-caption tracking-[0.18em] sm:tracking-[0.26em] max-sm:rtl:text-[0.625rem] max-sm:rtl:tracking-[0.12em]"
          >
            DENTAL
          </motion.span>
          <motion.span
            aria-hidden="true"
            style={{ backgroundColor: logoPrimary }}
            className="ease-luxury absolute -bottom-0.5 start-0 h-px w-0 opacity-50 transition-[width] duration-700 group-hover:w-full"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 max-sm:rtl:contents">
          <LanguageSwitcher className="max-sm:rtl:col-start-2 max-sm:rtl:justify-self-center" />
          <MagneticWrap
            strength={0.12}
            className="max-sm:rtl:col-start-1 max-sm:rtl:justify-self-start max-sm:rtl:min-w-0"
          >
          <BookingCtaLink
            data-cursor="interactive"
            className={cn(
              "group relative inline-flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-full px-3.5",
              "text-body-sm font-body font-medium text-neutral-950 sm:px-4",
              "max-sm:rtl:h-7 max-sm:rtl:max-w-[9.75rem] max-sm:rtl:px-2.5 max-sm:rtl:text-[0.6875rem] max-sm:rtl:leading-none",
              "bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600",
              "shadow-[0_2px_16px_rgba(198,169,98,0.32),inset_0_1px_0_rgba(255,255,255,0.35)]",
              "transition-[box-shadow,transform,filter] duration-700 ease-luxury",
              "hover:-translate-y-px hover:from-gold-200 hover:via-gold-400 hover:to-gold-500",
              "hover:shadow-[0_4px_28px_rgba(198,169,98,0.5),0_0_40px_rgba(198,169,98,0.24)]",
              "active:scale-[0.98] active:translate-y-0",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            )}
          >
            <span
              aria-hidden="true"
              className="gold-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-luxury group-hover:translate-x-full"
            />
            <span className="relative whitespace-nowrap">{t("cta")}</span>
          </BookingCtaLink>
        </MagneticWrap>
        </div>
      </motion.nav>
    </motion.header>
  );
}
