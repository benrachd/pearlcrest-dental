"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { galleryReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { GlassReflection } from "@/components/common/glass-reflection";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { ComparisonSlider } from "@/components/sections/gallery/comparison-slider";
import { sectionShell } from "@/constants/surface-classes";
import { cn } from "@/utils/cn";

const CASES = [
  { key: "case1", before: "/images/gallery/gallery-before-1.png", after: "/images/gallery/gallery-after-1.png" },
  { key: "case2", before: "/images/gallery/gallery-before-2.png", after: "/images/gallery/gallery-after-2.png" },
  { key: "case3", before: "/images/gallery/gallery-before-3.png", after: "/images/gallery/gallery-after-3.png" },
] as const;

export function Gallery() {
  const t = useTranslations("Gallery");

  return (
    <section aria-labelledby="gallery-heading" className="bg-surface relative overflow-hidden">
      <div
        aria-hidden="true"
        className="from-gold-100/20 via-gold-50/5 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(198,169,98,0.08),transparent)]"
      />

      <div className={`${sectionShell} relative`}>
        <AnimatedSectionHeader
          id="gallery-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
          intro={t("intro")}
          dramatic
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-28 box-border flex w-full min-w-0 max-w-5xl flex-col gap-36 lg:mt-36 lg:gap-48">
          {CASES.map((item, index) => (
            <motion.div
              key={item.key}
              variants={galleryReveal}
              custom={index * 0.14}
              initial="hidden"
              whileInView="visible"
              viewport={viewportContent}
              className={cn("box-border min-w-0 w-full max-w-full overflow-hidden", index === 0 && "relative")}
              data-cursor="interactive"
            >
              {index === 0 && (
                <div
                  aria-hidden="true"
                  className="from-gold-100/15 pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b via-transparent to-transparent blur-2xl"
                />
              )}
              <GlassReflection className="box-border min-w-0 w-full max-w-full rounded-2xl">
                <ComparisonSlider
                  title={t(`${item.key}Title`)}
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  beforeAlt={t(`${item.key}BeforeAlt`)}
                  afterAlt={t(`${item.key}AfterAlt`)}
                  beforeLabel={t("beforeLabel")}
                  afterLabel={t("afterLabel")}
                  treatmentName={t(`${item.key}Treatment`)}
                  duration={t(`${item.key}Duration`)}
                  patientAge={t(`${item.key}Age`)}
                  recovery={t(`${item.key}Recovery`)}
                  treatmentLabel={t("metaTreatment")}
                  durationLabel={t("metaDuration")}
                  ageLabel={t("metaAge")}
                  recoveryLabel={t("metaRecovery")}
                  sliderAriaLabel={t(`${item.key}SliderLabel`)}
                  priority={index === 0}
                  featured={index === 0}
                />
              </GlassReflection>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
