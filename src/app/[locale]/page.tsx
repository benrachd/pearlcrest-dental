import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactCta } from "@/components/sections/contact-cta";
import { Faq } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Services } from "@/components/sections/services";
import { Specialists } from "@/components/sections/specialists";
import { Trust } from "@/components/sections/trust";
import { VisitPearlcrest } from "@/components/sections/visit";
import { WhyPearlcrest } from "@/components/sections/why-aurea";
import { WowMoment } from "@/components/sections/wow";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/i18n";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return buildMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <WowMoment />
      <Services />
      <Trust />
      <WhyPearlcrest />
      <Gallery />
      <Journey />
      <Specialists />
      <Faq />
      <VisitPearlcrest />
      <ContactCta />
    </main>
  );
}
