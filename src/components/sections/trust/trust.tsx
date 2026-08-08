"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { StatCounter } from "@/components/common/stat-counter";
import { cinematicStagger, sectionReveal } from "@/animations/variants";
import { viewportContent } from "@/animations/viewport";
import { sectionShell } from "@/constants/surface-classes";

const STATS = [
  { key: "years", value: 18, suffix: "+" },
  { key: "treatments", value: 50000, suffix: "+" },
  { key: "digital", value: 100, suffix: "%" },
  { key: "destinations", value: 4, suffix: "" },
] as const;

export function Trust() {
  const t = useTranslations("Trust");

  return (
    <section aria-labelledby="trust-heading" className="bg-neutral-950 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(198,169,98,0.12),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="from-neutral-950/80 pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent"
      />

      <div className={`${sectionShell} relative`}>
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportContent}
          className="mx-auto flex max-w-3xl flex-col gap-7 text-center lg:gap-8"
        >
          <p className="text-caption text-gold-400/90 rtl:tracking-normal uppercase tracking-[0.26em]">
            {t("eyebrow")}
          </p>
          <h2
            id="trust-heading"
            className="font-body text-display-md sm:text-display-lg text-balance tracking-[-0.02em] text-neutral-50 leading-[1.08]"
          >
            {t.rich("title", { em: (chunks) => <RichTitleEmphasis className="text-gold-300">{chunks}</RichTitleEmphasis> })}
          </h2>
          <p className="text-body-lg text-neutral-400 mx-auto max-w-[48ch] leading-[1.8] tracking-[0.01em]">
            {t("intro")}
          </p>
        </motion.div>

        <motion.ul
          variants={cinematicStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportContent}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-10 lg:mt-28 lg:grid-cols-4 lg:gap-8"
        >
          {STATS.map((stat, index) => (
            <motion.li
              key={stat.key}
              variants={sectionReveal}
              custom={index * 0.08}
              className="border-gold-500/15 flex flex-col gap-3 border-t pt-8 sm:gap-4 sm:pt-10"
            >
              <p className="font-heading text-display-sm sm:text-display-md tracking-[-0.02em]">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-body-sm text-neutral-400 leading-[1.65] tracking-[0.02em] sm:text-body-md">
                {t(`${stat.key}Label`)}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
