import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const DOT_COLOR_CLASS = {
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
} as const;

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Optional small leading dot, e.g. to tie a tag to a status color. */
  dotColor?: keyof typeof DOT_COLOR_CLASS;
}

/**
 * A static categorization label (e.g. "Cosmetic Dentistry", "Invisalign
 * Certified") — content metadata, not status. For a status/count indicator
 * use `Badge`; for an interactive/removable pill use `Chip`.
 */
export function Tag({ className, dotColor, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "text-caption border-border-strong text-foreground-muted inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium tracking-wide uppercase",
        className,
      )}
      {...props}
    >
      {dotColor && (
        <span
          className={cn("size-1.5 rounded-full", DOT_COLOR_CLASS[dotColor])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
