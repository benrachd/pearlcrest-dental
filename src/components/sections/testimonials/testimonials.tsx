"use client";

import { useTranslations } from "next-intl";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { TestimonialCard } from "@/components/sections/testimonials/testimonial-card";
import { gridGap, sectionContentGap, sectionShell } from "@/constants/surface-classes";

const TESTIMONIALS = ["t1", "t2", "t3"] as const;

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section aria-labelledby="testimonials-heading" className="bg-surface relative">
      <div className={sectionShell}>
        <AnimatedSectionHeader
          id="testimonials-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
        />

        <div className={`${sectionContentGap} grid grid-cols-1 lg:grid-cols-3 ${gridGap}`}>
          {TESTIMONIALS.map((key, index) => (
            <TestimonialCard
              key={key}
              index={index}
              quote={t(`${key}Quote`)}
              name={t(`${key}Name`)}
              location={t(`${key}Location`)}
              treatment={t(`${key}Treatment`)}
              ratingLabel={t("ratingLabel")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
