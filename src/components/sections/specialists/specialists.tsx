"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { luxurySectionReveal, luxuryStagger } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { SpecialistCard } from "@/components/sections/specialists/specialist-card";
import { gridGap, sectionContentGap, sectionShell } from "@/constants/surface-classes";

const SPECIALISTS = [
  { key: "s1", imageSrc: "/images/specialists/specialist-1.png" },
  { key: "s2", imageSrc: "/images/specialists/specialist-2.png" },
  { key: "s3", imageSrc: "/images/specialists/specialist-3.png" },
] as const;

export function Specialists() {
  const t = useTranslations("Specialists");

  return (
    <section aria-labelledby="specialists-heading" className="bg-background relative">
      <div className={sectionShell}>
        <AnimatedSectionHeader
          id="specialists-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
          intro={t("intro")}
        />

        <motion.div
          variants={luxuryStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportContent}
          className={`${sectionContentGap} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}
        >
          {SPECIALISTS.map((item, index) => (
            <motion.div
              key={item.key}
              variants={luxurySectionReveal}
              custom={index * 0.08}
              className={
                index === 2 ? "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-1 lg:max-w-none" : undefined
              }
            >
              <SpecialistCard
                name={t(`${item.key}Name`)}
                role={t(`${item.key}Role`)}
                bio={t(`${item.key}Bio`)}
                imageSrc={item.imageSrc}
                imageAlt={t(`${item.key}ImageAlt`)}
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
