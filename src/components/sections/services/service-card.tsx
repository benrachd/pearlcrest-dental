import { EditorialImage } from "@/components/common/editorial-image";
import { LuxuryCard } from "@/components/common/luxury-card";
import { ScrollParallax } from "@/components/common/scroll-parallax";
import { ArrowUpRightGlyph } from "@/components/sections/services/services-icons";
import { cardEditorial, cardEditorialHover, imageHoverZoom } from "@/constants/surface-classes";
import type { RoutePath } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: RoutePath;
  priority?: boolean;
}

export function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  priority = false,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <LuxuryCard className={cn(cardEditorial, cardEditorialHover)}>
        <ScrollParallax offset={16} className="relative aspect-[3/2] overflow-hidden">
          <EditorialImage
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            revealOnScroll
            sizes="(min-width: 1024px) 44vw, (min-width: 640px) 46vw, 92vw"
            className={imageHoverZoom}
          />
        </ScrollParallax>

        <div className="flex items-end justify-between gap-8 p-8 sm:p-10">
          <div className="flex flex-col gap-3.5">
            <h3 className="font-body text-heading-xl sm:text-display-sm tracking-[-0.02em] text-neutral-950 leading-[1.08]">
              {title}
            </h3>
            <p className="text-body-md text-foreground-muted max-w-[38ch] leading-[1.75] tracking-[0.01em]">
              {description}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="border-gold-600/30 text-gold-700 ease-luxury group-hover:bg-gold-600 group-hover:border-gold-600 flex size-11 shrink-0 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-700 group-hover:scale-105 group-hover:text-neutral-50"
          >
            <ArrowUpRightGlyph className="ease-luxury size-4 transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </span>
        </div>
      </LuxuryCard>
    </Link>
  );
}
