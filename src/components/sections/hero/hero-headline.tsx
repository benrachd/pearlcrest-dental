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
      <div className="flex w-full min-w-0 flex-col gap-5 max-md:max-w-[16.5rem] max-md:rtl:ms-auto max-md:rtl:me-0 max-md:rtl:max-w-[min(16.5rem,calc(100vw-3rem))] max-md:rtl:text-end md:gap-8 md:rtl:w-full md:rtl:max-w-full lg:gap-10">
        <motion.p
          variants={labelReveal}
          initial="hidden"
          animate="visible"
          custom={0.75}
          className="text-caption text-gold-300/80 rtl:tracking-normal max-w-full uppercase tracking-[0.22em] max-md:whitespace-nowrap max-md:text-[0.53125rem] max-md:leading-[1.45] max-md:tracking-[0.05em] max-md:text-gold-200/95 max-md:drop-shadow-[0_1px_8px_rgba(0,0,0,0.28)] max-md:rtl:text-[0.46875rem] max-md:rtl:leading-[1.5] max-md:rtl:tracking-[0.03em] max-md:rtl:text-gold-200/85 md:tracking-[0.32em] md:rtl:text-end md:rtl:text-[0.6875rem] md:rtl:leading-[1.55] md:rtl:tracking-[0.06em]"
        >
          {t("eyebrow")}
        </motion.p>

        <h1
          aria-label={t("headlineAria")}
          className="font-body w-full min-w-0 max-w-[calc(100vw-3rem)] md:max-w-none ltr:-ms-[0.02em] font-light leading-[1.04] tracking-[-0.035em] text-neutral-50 text-[clamp(1.9375rem,5.2vw+0.88rem,2.5rem)] max-md:text-white rtl:leading-[1.18] rtl:tracking-normal md:rtl:max-w-full md:rtl:text-end md:rtl:text-[clamp(2.25rem,3.6vw,3.75rem)] md:rtl:leading-[1.12] md:text-display-xl lg:text-[clamp(3.5rem,7.2vw,6.25rem)] md:leading-[0.98] md:tracking-[-0.04em] lg:rtl:text-[clamp(2.5rem,3.8vw,4rem)] lg:rtl:leading-[1.1]"
        >
          <span className="inline-flex max-w-full flex-wrap items-baseline justify-start gap-x-[0.12em] gap-y-1 max-md:rtl:justify-end md:rtl:w-full md:rtl:justify-end md:gap-x-[0.18em] md:gap-y-2">
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
          className="text-body-md text-neutral-200/75 min-w-0 max-w-[calc(100vw-3rem)] break-words leading-[1.65] tracking-[0.015em] [overflow-wrap:anywhere] max-md:translate-y-0.5 max-md:font-normal max-md:text-neutral-50/95 max-md:leading-[1.62] max-md:drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)] rtl:leading-[1.72] rtl:tracking-normal md:max-w-[34ch] md:text-body-lg md:leading-[1.75] md:rtl:max-w-full md:rtl:text-end lg:text-body-xl lg:max-w-[38ch] lg:rtl:max-w-full"
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
