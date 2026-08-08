"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { cinematicStagger, luxurySectionReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { JourneyStep } from "@/components/sections/journey/journey-step";
import { sectionContentGap, sectionShell } from "@/constants/surface-classes";

const STEPS = ["inquiry", "consultation", "planning", "treatment", "aftercare"] as const;

export function Journey() {
  const t = useTranslations("Journey");
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section aria-labelledby="journey-heading" className="bg-background relative overflow-hidden">
      <div
        aria-hidden="true"
        className="from-gold-100/10 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
      />

      <div className={`${sectionShell} relative`}>
        <AnimatedSectionHeader
          id="journey-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
          intro={t("intro")}
        />

        <motion.ol
          ref={timelineRef}
          variants={cinematicStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportContent}
          className={`${sectionContentGap} relative flex flex-col gap-20 lg:flex-row lg:gap-8`}
        >
          <motion.div
            aria-hidden="true"
            className="bg-gold-500/25 absolute start-0 end-0 top-6 hidden h-px origin-left lg:block"
            style={{ scaleX: lineProgress }}
          />

          <motion.div
            aria-hidden="true"
            className="bg-gold-500/25 absolute start-3 top-0 bottom-0 w-px origin-top lg:hidden"
            style={{ scaleY: lineProgress }}
          />

          {STEPS.map((step, index) => (
            <motion.li key={step} variants={luxurySectionReveal} custom={index * 0.08} className="relative lg:flex-1">
              <JourneyStep
                number={`0${index + 1}`}
                title={t(`${step}Title`)}
                description={t(`${step}Description`)}
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
