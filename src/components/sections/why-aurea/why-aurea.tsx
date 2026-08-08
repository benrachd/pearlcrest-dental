"use client";

import { useTranslations } from "next-intl";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { StoryBlock } from "@/components/sections/why-aurea/story-block";
import { sectionContentGap, sectionShell } from "@/constants/surface-classes";

const STORIES = [
  { key: "precision", imageSrc: "/images/why-aurea/why-digital-precision.png" },
  { key: "clinicians", imageSrc: "/images/why-aurea/why-master-clinicians.png" },
  { key: "concierge", imageSrc: "/images/why-aurea/why-concierge-experience.png" },
  { key: "results", imageSrc: "/images/why-aurea/why-timeless-results.png" },
] as const;

export function WhyAurea() {
  const t = useTranslations("WhyAurea");

  return (
    <section aria-labelledby="why-aurea-heading" className="bg-background relative">
      <div className={sectionShell}>
        <AnimatedSectionHeader
          id="why-aurea-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
        />

        <div className={`${sectionContentGap} flex flex-col gap-24 lg:gap-40`}>
          {STORIES.map((story, index) => (
            <StoryBlock
              key={story.key}
              number={`0${index + 1}`}
              title={t(`${story.key}Title`)}
              paragraph1={t(`${story.key}P1`)}
              paragraph2={t(`${story.key}P2`)}
              imageSrc={story.imageSrc}
              imageAlt={t(`${story.key}ImageAlt`)}
              reverse={index % 2 === 1}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
