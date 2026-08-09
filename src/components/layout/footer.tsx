"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/layout/footer-icons";
import {
  ContactDetailText,
  ConciergeCtaLink,
  ContactSectionLink,
} from "@/components/common/contact-links";
import { cinematicStagger, sectionReveal } from "@/animations/variants";
import { viewportHeader } from "@/animations/viewport";
import { ROUTES } from "@/constants/routes";
import { contactConfig, getMailtoHref, getTelHref } from "@/constants/contact-config";
import { Link } from "@/i18n/navigation";

const LOCATIONS = ["dubai", "abuDhabi", "riyadh", "doha"] as const;

const FOOTER_NAV = [
  { labelKey: "linkHome", href: ROUTES.HOME },
  { labelKey: "linkTreatments", href: ROUTES.SERVICES },
  { labelKey: "linkAbout", href: ROUTES.ABOUT },
  { labelKey: "linkDoctors", href: "/#specialists-heading" },
  { labelKey: "linkContact", href: ROUTES.CONTACT },
] as const;

const SOCIAL_LINKS = [
  { labelKey: "socialInstagram", href: "https://instagram.com/aureadental", icon: InstagramIcon },
  { labelKey: "socialLinkedIn", href: "https://linkedin.com/company/aureadental", icon: LinkedInIcon },
  { labelKey: "socialFacebook", href: "https://facebook.com/aureadental", icon: FacebookIcon },
] as const;

const contactDetailClass =
  "text-body-sm text-foreground-muted leading-[1.7] tracking-[0.01em] transition-colors duration-700 hover:text-foreground";

const footerLinkClass =
  "text-body-sm text-foreground-muted group relative inline-block transition-colors duration-700 hover:text-foreground";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const underline = (
    <span className="bg-gold-500/60 ease-luxury absolute -bottom-0.5 start-0 h-px w-0 transition-[width] duration-700 group-hover:w-full" />
  );

  if (href.includes("#contact")) {
    return (
      <ContactSectionLink data-cursor="interactive" className={footerLinkClass}>
        {children}
        {underline}
      </ContactSectionLink>
    );
  }

  return (
    <Link href={href} data-cursor="interactive" className={footerLinkClass}>
      {children}
      {underline}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start 0.9", "start 0.3"],
  });
  const dividerScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#f8f5f2]">
      <div
        aria-hidden="true"
        className="from-gold-100/30 via-gold-50/10 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(198,169,98,0.07),transparent)]"
      />

      <motion.div
        variants={cinematicStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportHeader}
        className="px-gutter lg:px-gutter-lg relative mx-auto w-full max-w-[1600px] py-24 sm:px-10 lg:py-32"
      >
        <motion.div variants={sectionReveal} className="mb-20 lg:mb-28">
          <Link
            href={ROUTES.HOME}
            aria-label={t("homeAriaLabel")}
            data-cursor="interactive"
            className="ease-luxury inline-flex flex-col gap-3.5 transition-opacity duration-700 hover:opacity-55"
          >
            <span className="font-heading text-foreground text-4xl font-medium tracking-[0.2em] sm:text-[2.75rem] sm:leading-[1.05]">
              AUREA
            </span>
            <span className="text-caption text-foreground-muted tracking-[0.38em]">DENTAL</span>
          </Link>
          <p className="text-body-md text-foreground-muted mt-10 max-w-md leading-[1.85] tracking-[0.01em]">
            {t("brandStatement")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <motion.div variants={sectionReveal} custom={0.05} className="flex flex-col gap-6">
            <p className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">
              {t("locationsHeading")}
            </p>
            <ul className="flex flex-col gap-4">
              {LOCATIONS.map((key) => (
                <li key={key} className="text-body-sm text-foreground-muted leading-[1.7] tracking-[0.01em]">
                  {t(`location_${key}`)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.nav variants={sectionReveal} custom={0.1} aria-label={t("navAriaLabel")} className="flex flex-col gap-6">
            <p className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">
              {t("navHeading")}
            </p>
            <ul className="flex flex-col gap-4">
              {FOOTER_NAV.map((link) => (
                <li key={link.labelKey}>
                  <FooterLink href={link.href}>{t(link.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={sectionReveal} custom={0.15} className="flex flex-col gap-6">
            <p className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">
              {t("contactHeading")}
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <ContactDetailText
                  value={contactConfig.email}
                  href={getMailtoHref()}
                  className={contactDetailClass}
                />
              </li>
              <li>
                <ContactDetailText
                  value={isArabic ? t("contactPhoneDisplay") : contactConfig.phone}
                  href={getTelHref()}
                  className={contactDetailClass}
                />
              </li>
              <li>
                <ConciergeCtaLink
                  data-cursor="interactive"
                  className="text-body-sm text-foreground-muted ease-luxury inline-flex items-center gap-2 transition-colors duration-700 hover:text-foreground"
                >
                  <WhatsAppIcon className="size-4" />
                  {isArabic ? t("contactWhatsAppDisplay") : contactConfig.whatsapp}
                </ConciergeCtaLink>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={sectionReveal} custom={0.2} className="flex flex-col gap-6">
            <p className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">
              {t("socialHeading")}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ labelKey, href, icon: Icon }) => (
                <a
                  key={labelKey}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(labelKey)}
                  data-cursor="interactive"
                  className="border-gold-500/20 bg-surface/40 text-foreground-muted ease-luxury flex size-12 items-center justify-center rounded-full border backdrop-blur-sm transition-[color,background-color,transform,box-shadow,border-color] duration-700 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-gold-50/90 hover:text-gold-700 hover:shadow-[0_8px_28px_rgba(198,169,98,0.18)]"
                >
                  <Icon className="size-4 transition-transform duration-700 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative mt-20 lg:mt-28">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
            style={{ scaleX: dividerScale }}
          />
          <motion.div
            variants={sectionReveal}
            custom={0.25}
            className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-wrap gap-8">
              <FooterLink href={ROUTES.PRIVACY}>{t("privacyPolicy")}</FooterLink>
              <FooterLink href={ROUTES.TERMS}>{t("terms")}</FooterLink>
            </div>
            <p className="text-caption text-foreground-subtle tracking-[0.04em]">{t("copyright", { year })}</p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
