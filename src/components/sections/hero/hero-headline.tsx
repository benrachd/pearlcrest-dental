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
    <div className="flex w-full min-w-0 max-w-full flex-col gap-5 md:max-w-3xl md:gap-8 lg:gap-10">
      <motion.p
        variants={labelReveal}
        initial="hidden"
        animate="visible"
        custom={0.75}
        className="text-caption text-gold-300/80 rtl:tracking-normal max-w-full uppercase tracking-[0.22em] md:tracking-[0.32em]"
      >
        {t("eyebrow")}
      </motion.p>

      <h1
        aria-label={t("headlineAria")}
        className="font-body w-full min-w-0 max-w-[calc(100vw-3rem)] md:max-w-none -ms-[0.02em] font-light leading-[1.04] tracking-[-0.035em] text-neutral-50 text-[clamp(1.9375rem,5.2vw+0.88rem,2.5rem)] md:text-display-xl lg:text-[clamp(3.5rem,7.2vw,6.25rem)] md:leading-[0.98] md:tracking-[-0.04em]"
      >
        <span className="inline-flex max-w-full flex-wrap items-baseline gap-x-[0.12em] gap-y-1 md:gap-x-[0.18em] md:gap-y-2">
          <WordReveal text={t("headlineLead")} startDelay={HEADLINE_START} stagger={WORD_STAGGER} />
          <WordReveal
            text={t("headlineEmphasis")}
            startDelay={emphasisStart}
            stagger={WORD_STAGGER}
            wordClassName="font-heading text-gold-200/95 rtl:not-italic relative -top-[0.02em] md:-top-[0.03em] font-medium italic tracking-[-0.025em]"
          />
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: easing.luxury, delay: subheadlineDelay }}
        className="text-body-md text-neutral-200/75 max-w-[32ch] leading-[1.65] tracking-[0.015em] md:text-body-lg md:max-w-[34ch] md:leading-[1.75] lg:text-body-xl lg:max-w-[38ch]"
      >
        {t("subheadline")}
      </motion.p>
    </div>
  );
}

export function getHeroCtaDelay(lead: string, emphasis: string): number {
  const leadWords = countWords(lead);
  const emphasisWords = countWords(emphasis);
  const emphasisStart = HEADLINE_START + leadWords * WORD_STAGGER;
  return emphasisStart + emphasisWords * WORD_STAGGER + 0.35 + 0.55;
}
