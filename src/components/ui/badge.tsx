import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * A small, non-interactive indicator of status, count, or classification
 * (e.g. "Available today", "New", a notification count). For an
 * interactive, dismissible pill see `Chip`; for a static categorization
 * label see `Tag`.
 */
const badgeVariants = cva(
  "text-caption inline-flex w-fit items-center gap-1 rounded-full font-medium whitespace-nowrap",
  {
    variants: {
      intent: {
        neutral: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      tone: {
        subtle: "",
        solid: "",
        outline: "border bg-transparent",
      },
      size: {
        sm: "h-5 px-2",
        md: "h-6 px-2.5",
      },
    },
    compoundVariants: [
      { intent: "neutral", tone: "subtle", class: "bg-neutral-100 text-neutral-700" },
      { intent: "neutral", tone: "solid", class: "bg-neutral-900 text-neutral-50" },
      { intent: "neutral", tone: "outline", class: "border-border-strong text-foreground" },

      { intent: "accent", tone: "subtle", class: "bg-gold-100 text-gold-700" },
      { intent: "accent", tone: "solid", class: "bg-accent text-accent-foreground" },
      { intent: "accent", tone: "outline", class: "border-gold-400 text-gold-700" },

      { intent: "success", tone: "subtle", class: "bg-success-subtle text-success-emphasis" },
      { intent: "success", tone: "solid", class: "bg-success text-white" },
      { intent: "success", tone: "outline", class: "border-success text-success-emphasis" },

      { intent: "warning", tone: "subtle", class: "bg-warning-subtle text-warning-emphasis" },
      { intent: "warning", tone: "solid", class: "bg-warning text-white" },
      { intent: "warning", tone: "outline", class: "border-warning text-warning-emphasis" },

      { intent: "error", tone: "subtle", class: "bg-error-subtle text-error-emphasis" },
      { intent: "error", tone: "solid", class: "bg-error text-white" },
      { intent: "error", tone: "outline", class: "border-error text-error-emphasis" },

      { intent: "info", tone: "subtle", class: "bg-info-subtle text-info-emphasis" },
      { intent: "info", tone: "solid", class: "bg-info text-white" },
      { intent: "info", tone: "outline", class: "border-info text-info-emphasis" },
    ],
    defaultVariants: {
      intent: "neutral",
      tone: "subtle",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, intent, tone, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ intent, tone, size, className }))} {...props} />;
}
