"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { luxurySectionReveal, luxuryStagger } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { ServiceCard } from "@/components/sections/services/service-card";
import { gridGap, sectionContentGap, sectionShell } from "@/constants/surface-classes";
import { ROUTES } from "@/constants/routes";

const SERVICES = [
  { key: "whitening", imageSrc: "/images/services/service-cosmetic-dentistry-v2.png" },
  { key: "rootCanal", imageSrc: "/images/services/service-dental-implants-v2.png" },
  { key: "veneers", imageSrc: "/images/services/service-smile-design-v2.png" },
  { key: "generalCare", imageSrc: "/images/services/service-vip-care-v2.png" },
] as const;

export function Services() {
  const t = useTranslations("Services");

  return (
    <section aria-labelledby="services-heading" className="bg-background relative">
      <div className={sectionShell}>
        <AnimatedSectionHeader
          id="services-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
          intro={t("intro")}
        />

        <motion.div
          variants={luxuryStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportContent}
          className={`${sectionContentGap} grid grid-cols-1 sm:grid-cols-2 ${gridGap}`}
        >
          {SERVICES.map((service, index) => (
            <motion.div key={service.key} variants={luxurySectionReveal} custom={index * 0.08}>
              <ServiceCard
                title={t(`${service.key}Title`)}
                description={t(`${service.key}Description`)}
                imageSrc={service.imageSrc}
                imageAlt={t(`${service.key}ImageAlt`)}
                href={ROUTES.SERVICES}
                priority={index < 2}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
