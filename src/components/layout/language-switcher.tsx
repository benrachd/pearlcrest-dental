"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

const LOCALE_OPTIONS = [
  { code: "en" as const, label: "EN" },
  { code: "fr" as const, label: "FR" },
  { code: "ar" as const, label: "AR" },
];

export function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const inactiveColor = useTransform(scrollY, [0, 50], ["rgba(250, 250, 249, 0.72)", "#78716c"]);
  const activeColor = useTransform(scrollY, [0, 50], ["#fafaf9", "#92600a"]);
  const separatorColor = useTransform(scrollY, [0, 50], ["rgba(250, 250, 249, 0.35)", "rgba(120, 113, 108, 0.45)"]);

  return (
    <nav aria-label={t("languageAriaLabel")} className="flex shrink-0 items-center">
      <ul className="flex items-center gap-1 sm:gap-1.5">
        {LOCALE_OPTIONS.map(({ code, label }, index) => {
          const isActive = locale === code;

          return (
            <li key={code} className="flex items-center gap-1 sm:gap-1.5">
              {index > 0 ? (
                <motion.span
                  aria-hidden="true"
                  style={{ color: separatorColor }}
                  className="text-[0.625rem] leading-none select-none"
                >
                  ·
                </motion.span>
              ) : null}
              <Link
                href={pathname}
                locale={code}
                data-cursor="interactive"
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "text-[0.6875rem] font-medium tracking-[0.14em] uppercase transition-opacity duration-700 sm:text-caption sm:tracking-[0.16em]",
                  isActive ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
              >
                <motion.span style={{ color: isActive ? activeColor : inactiveColor }}>{label}</motion.span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
