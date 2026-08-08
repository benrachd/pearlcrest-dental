import { EditorialImage } from "@/components/common/editorial-image";
import { LuxuryCard } from "@/components/common/luxury-card";
import { ScrollParallax } from "@/components/common/scroll-parallax";
import { cardEditorial } from "@/constants/surface-classes";
import { cn } from "@/utils/cn";

export interface SpecialistCardProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
}

export function SpecialistCard({
  name,
  role,
  bio,
  imageSrc,
  imageAlt,
  priority = false,
}: SpecialistCardProps) {
  return (
    <LuxuryCard className={cn("group relative overflow-hidden", cardEditorial)}>
      <div
        aria-hidden="true"
        className="from-gold-100/0 to-gold-100/20 pointer-events-none absolute inset-0 z-10 bg-gradient-to-t opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <ScrollParallax offset={20} className="relative aspect-[4/5] shadow-inner-sm">
        <EditorialImage
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          revealOnScroll
          sizes="(min-width: 1024px) 30vw, 92vw"
          className="ease-luxury object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.05]"
        />
      </ScrollParallax>

      <div className="relative z-10 flex flex-col gap-4 p-8 sm:p-10">
        <p className="text-caption text-gold-700 rtl:tracking-normal uppercase tracking-[0.2em]">{role}</p>
        <h3 className="font-body text-heading-xl sm:text-display-sm tracking-tight text-neutral-950">{name}</h3>
        <p className="text-body-md text-foreground-muted max-w-[42ch] leading-[1.75]">{bio}</p>
      </div>
    </LuxuryCard>
  );
}
