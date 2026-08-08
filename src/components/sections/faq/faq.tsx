"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { luxurySectionReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { FaqItem } from "@/components/sections/faq/faq-item";
import { sectionShell } from "@/constants/surface-classes";

const QUESTIONS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function Faq() {
  const t = useTranslations("Faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="bg-surface relative">
      <div className={sectionShell}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <AnimatedSectionHeader
            id="faq-heading"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
            intro={t("intro")}
          />

          <motion.div
            variants={luxurySectionReveal}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportContent}
            className="border-border border-t"
          >
            {QUESTIONS.map((key, index) => (
              <FaqItem
                key={key}
                question={t(`${key}Question`)}
                answer={t(`${key}Answer`)}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
