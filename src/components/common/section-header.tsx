import type { ReactNode } from "react";
import { editorialIndexLine } from "@/constants/surface-classes";
import { cn } from "@/utils/cn";

export interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  className?: string;
  centered?: boolean;
  /** Larger display scale for hero sections like CTA. */
  dramatic?: boolean;
}

/**
 * Editorial section header — dramatic headlines, perfect rhythm.
 */
export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  className = "",
  centered = false,
  dramatic = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-8",
        centered ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <p
        className={cn(
          "text-caption text-gold-700 rtl:tracking-normal flex items-center gap-4 uppercase tracking-[0.28em]",
          centered && "justify-center",
        )}
      >
        <span aria-hidden="true" className={editorialIndexLine} />
        {eyebrow}
        {centered ? <span aria-hidden="true" className={editorialIndexLine} /> : null}
      </p>

      <h2
        id={id}
        className={cn(
          "font-body text-balance tracking-tight text-neutral-950",
          dramatic
            ? "text-display-lg sm:text-display-xl leading-[1.08]"
            : "text-display-md sm:text-display-lg leading-[1.1]",
        )}
      >
        {title}
      </h2>

      {intro ? (
        <p className="text-body-lg text-foreground-muted max-w-[54ch] leading-[1.75]">{intro}</p>
      ) : null}
    </div>
  );
}
