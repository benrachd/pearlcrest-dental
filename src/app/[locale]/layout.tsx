import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AmbientAtmosphere } from "@/components/common/ambient-atmosphere";
import { AmbientParticles } from "@/components/common/ambient-particles";
import { CustomCursor } from "@/components/common/custom-cursor";
import { BookingModalProvider } from "@/components/booking";
import { HashScrollHandler } from "@/components/common/hash-scroll-handler";
import { LoadingScreen } from "@/components/common/loading-screen";
import { MotionProvider } from "@/components/providers/motion-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import { fontVariables } from "@/styles/fonts";
import type { Locale } from "@/types/i18n";
import { getDirection } from "@/utils/locale";
import "@/app/globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Statically pre-renders one layout per supported locale at build time
 * instead of resolving the locale on every request.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return buildMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * This is the root layout of the application (there is no `src/app/layout.tsx`).
 * Because every route lives under the `[locale]` segment, this file is the
 * single place that owns `<html>` / `<body>`, per-locale `lang` / `dir`, and
 * every font/provider that must be available everywhere.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={getDirection(typedLocale)}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden antialiased">
        <NextIntlClientProvider locale={typedLocale} messages={messages}>
          <MotionProvider>
            <LenisProvider>
              <BookingModalProvider>
                <HashScrollHandler />
                <LoadingScreen />
                <CustomCursor />
                <AmbientAtmosphere />
                <AmbientParticles />
                <Navbar />
                {children}
                <Footer />
              </BookingModalProvider>
            </LenisProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
