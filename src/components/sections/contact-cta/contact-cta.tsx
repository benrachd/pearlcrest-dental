"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cinematicReveal } from "@/animations/variants";
import { viewportHeader } from "@/animations/viewport";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { BookingCtaLink, ConciergeCtaLink, ContactDetailText } from "@/components/common/contact-links";
import { GlassReflection } from "@/components/common/glass-reflection";
import { MagneticWrap } from "@/components/common/magnetic-wrap";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { ArrowRightGlyph } from "@/components/sections/hero/hero-icons";
import { Button } from "@/components/ui/button";
import { ctaPrimaryClasses, ctaSecondaryClasses, sectionShell } from "@/constants/surface-classes";
import { contactConfig, getMailtoHref, getTelHref, getWhatsAppHref } from "@/constants/contact-config";

export function ContactCta() {
  const t = useTranslations("ContactCta");

  return (
    <section id="contact" aria-labelledby="contact-cta-heading" className="bg-background relative overflow-hidden">
      <div aria-hidden="true" className="from-gold-100/30 absolute inset-0 bg-gradient-to-br via-transparent to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(198,169,98,0.12),transparent)]"
      />

      <div className={`${sectionShell} relative`}>
        <GlassReflection className="border-border/40 glass-subtle relative mx-auto max-w-4xl rounded-card border shadow-lg">
          <motion.div
            variants={cinematicReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportHeader}
            className="relative flex flex-col items-center gap-12 px-8 py-20 text-center sm:px-16 sm:py-24"
          >
            <div
              aria-hidden="true"
              className="from-gold-100/20 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />

            <AnimatedSectionHeader
            id="contact-cta-heading"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
            intro={t("intro")}
            centered
            dramatic
            className="relative z-10 max-w-none"
          />

          <div className="relative z-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <MagneticWrap>
              <Button asChild variant="accent" size="xl" endIcon={ArrowRightGlyph} className={ctaPrimaryClasses}>
                <BookingCtaLink>{t("ctaPrimary")}</BookingCtaLink>
              </Button>
            </MagneticWrap>
            <MagneticWrap strength={0.12}>
              <Button asChild variant="outline" size="xl" className={ctaSecondaryClasses}>
                <ConciergeCtaLink>{t("ctaSecondary")}</ConciergeCtaLink>
              </Button>
            </MagneticWrap>
          </div>

          <div className="relative z-10 flex flex-col gap-2 text-body-sm text-foreground-muted">
            <p>{t("demoNote")}</p>
            <p>
              <ContactDetailText
                value={contactConfig.email}
                href={getMailtoHref()}
                className="transition-colors duration-700 hover:text-foreground"
              />
            </p>
            <p>
              <ContactDetailText
                value={t("contactPhone")}
                href={getTelHref()}
                className="transition-colors duration-700 hover:text-foreground"
              />
            </p>
            <p>
              <ContactDetailText
                value={t("contactWhatsApp")}
                href={getWhatsAppHref()}
                className="transition-colors duration-700 hover:text-foreground"
              />
            </p>
          </div>
          </motion.div>
        </GlassReflection>
      </div>
    </section>
  );
}
