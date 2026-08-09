"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatedSectionHeader } from "@/components/common/animated-section-header";
import { RichTitleEmphasis } from "@/components/common/rich-title-emphasis";
import { ArrowRightGlyph } from "@/components/sections/hero/hero-icons";
import {
  clinicConfig,
  getGoogleMapsLink,
  getMapEmbedSrc,
} from "@/constants/clinic-config";
import { cardOnSurface, sectionContentGap, sectionShell } from "@/constants/surface-classes";
import { cn } from "@/utils/cn";

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-gold-500/15 pt-6 first:border-t-0 first:pt-0">
      <dt className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">{label}</dt>
      <dd className="text-body-md text-foreground leading-[1.75] tracking-[0.01em]">{value}</dd>
    </div>
  );
}

export function VisitAurea() {
  const t = useTranslations("VisitAurea");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const mapEmbedSrc = getMapEmbedSrc();
  const mapsLink = getGoogleMapsLink();

  return (
    <section
      id="visit-aurea"
      aria-labelledby="visit-aurea-heading"
      className="bg-surface relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(198,169,98,0.08),transparent_55%)]"
      />

      <div className={`${sectionShell} relative`}>
        <AnimatedSectionHeader
          id="visit-aurea-heading"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { em: (chunks) => <RichTitleEmphasis>{chunks}</RichTitleEmphasis> })}
          intro={t("intro")}
        />

        <div
          className={cn(
            sectionContentGap,
            "grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16",
          )}
        >
          <div className={cn(cardOnSurface, "flex flex-col gap-8 p-8 sm:p-10 lg:p-12")}>
            <div className="flex flex-col gap-3">
              <p className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">
                {t("locationsLabel")}
              </p>
              <p className="text-body-lg text-foreground leading-[1.75] tracking-[0.01em]">{t("locations")}</p>
            </div>

            <dl className="flex flex-col gap-6">
              <ContactRow label={t("addressLabel")} value={isArabic ? t("addressValue") : clinicConfig.address} />
              <ContactRow label={t("phoneLabel")} value={isArabic ? t("phoneValue") : clinicConfig.phone} />
              <ContactRow label={t("emailLabel")} value={clinicConfig.email} />
              <ContactRow label={t("whatsappLabel")} value={isArabic ? t("whatsappValue") : clinicConfig.whatsapp} />
              <ContactRow label={t("hoursLabel")} value={isArabic ? t("hoursValue") : clinicConfig.openingHours} />
            </dl>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div
              className={cn(
                cardOnSurface,
                "relative min-h-[280px] flex-1 overflow-hidden sm:min-h-[360px] lg:min-h-[480px]",
              )}
            >
              {mapEmbedSrc ? (
                <iframe
                  title={t("mapAria")}
                  src={mapEmbedSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="from-gold-50/40 via-background to-gold-100/20 absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br px-8 text-center">
                  <div
                    aria-hidden="true"
                    className="border-gold-500/20 pointer-events-none absolute inset-6 rounded-card border border-dashed"
                  />
                  <p className="text-body-md text-foreground-muted max-w-[32ch] leading-[1.75] tracking-[0.01em]">
                    {t("mapPlaceholder")}
                  </p>
                </div>
              )}
            </div>

            {mapsLink ? (
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="text-body-sm text-gold-700 hover:text-gold-600 ease-luxury group inline-flex w-fit items-center gap-2 font-medium tracking-[0.04em] transition-colors duration-700"
                aria-label={t("openMapsAria")}
              >
                {t("openMaps")}
                <ArrowRightGlyph
                  aria-hidden="true"
                  className="size-4 transition-transform duration-700 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </a>
            ) : (
              <p className="text-body-sm text-foreground-muted leading-[1.65]">{t("mapLinkPlaceholder")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
