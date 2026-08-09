"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { easing } from "@/animations/transitions";
import { labelReveal } from "@/animations/variants";
import { countWords, WordReveal } from "@/components/common/word-reveal";

const HEADLINE_START = 1.05;
const WORD_STAGGER = 0.14;

export function HeroHeadline() {
  const t = useTranslations("Hero");

  const leadWords = countWords(t("headlineLead"));
  const emphasisWords = countWords(t("headlineEmphasis"));
  const emphasisStart = HEADLINE_START + leadWords * WORD_STAGGER;
  const subheadlineDelay = emphasisStart + emphasisWords * WORD_STAGGER + 0.35;

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-5 rtl:text-end md:max-w-3xl md:gap-8 lg:gap-10">
      <motion.p
        variants={labelReveal}
        initial="hidden"
        animate="visible"
        custom={0.75}
        className="text-caption text-gold-300/80 rtl:tracking-normal max-w-full uppercase tracking-[0.22em] max-md:whitespace-nowrap max-md:text-[0.53125rem] max-md:leading-[1.45] max-md:tracking-[0.05em] max-md:text-gold-200/95 max-md:drop-shadow-[0_1px_8px_rgba(0,0,0,0.28)] md:tracking-[0.32em]"
      >
        {t("eyebrow")}
      </motion.p>

      <div className="flex w-full min-w-0 flex-col gap-5 max-md:max-w-[16.5rem] rtl:max-md:max-w-[calc(100vw-3rem)] md:gap-8 lg:gap-10">
      <h1
        aria-label={t("headlineAria")}
        className="font-body w-full min-w-0 max-w-[calc(100vw-3rem)] md:max-w-none ltr:-ms-[0.02em] font-light leading-[1.04] tracking-[-0.035em] text-neutral-50 text-[clamp(1.9375rem,5.2vw+0.88rem,2.5rem)] max-md:text-white rtl:leading-[1.18] rtl:tracking-normal md:text-display-xl lg:text-[clamp(3.5rem,7.2vw,6.25rem)] md:leading-[0.98] md:tracking-[-0.04em]"
      >
        <span className="inline-flex max-w-full flex-wrap items-baseline justify-start gap-x-[0.12em] gap-y-1 rtl:justify-end md:gap-x-[0.18em] md:gap-y-2">
          <WordReveal
            text={t("headlineLead")}
            startDelay={HEADLINE_START}
            stagger={WORD_STAGGER}
            wordClassName="max-md:drop-shadow-[0_2px_16px_rgba(0,0,0,0.42)]"
          />
          <WordReveal
            text={t("headlineEmphasis")}
            startDelay={emphasisStart}
            stagger={WORD_STAGGER}
            wordClassName="font-heading text-gold-200/95 rtl:not-italic relative -top-[0.02em] md:-top-[0.03em] font-medium italic tracking-[-0.025em] max-md:text-gold-100 max-md:drop-shadow-[0_2px_14px_rgba(0,0,0,0.38)]"
          />
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: easing.luxury, delay: subheadlineDelay }}
        className="text-body-md text-neutral-200/75 max-w-[23ch] leading-[1.65] tracking-[0.015em] max-md:translate-y-0.5 max-md:font-normal max-md:text-neutral-50/95 max-md:leading-[1.62] max-md:drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)] rtl:max-w-[calc(100vw-3rem)] rtl:leading-[1.72] rtl:tracking-normal md:max-w-[34ch] md:text-body-lg md:leading-[1.75] lg:text-body-xl lg:max-w-[38ch]"
      >
        {t("subheadline")}
      </motion.p>
      </div>
    </div>
  );
}

export function getHeroCtaDelay(lead: string, emphasis: string): number {
  const leadWords = countWords(lead);
  const emphasisWords = countWords(emphasis);
  const emphasisStart = HEADLINE_START + leadWords * WORD_STAGGER;
  return emphasisStart + emphasisWords * WORD_STAGGER + 0.35 + 0.55;
}
