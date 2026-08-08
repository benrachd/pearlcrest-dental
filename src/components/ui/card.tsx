import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * - `default`  — flat surface, hairline border. The workhorse variant.
 * - `elevated` — no border, soft shadow instead. For content that should
 *                visually float above the page.
 * - `outline`  — border only, no fill — for use on top of imagery/tint.
 * - `glass`    — frosted surface — for use on top of photography/video.
 */
const cardVariants = cva("rounded-xl", {
  variants: {
    variant: {
      default: "bg-surface border border-border",
      elevated: "bg-surface shadow-lg",
      outline: "border border-border-strong bg-transparent",
      glass: "glass",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export function Card({ className, variant, padding, asChild = false, ...props }: CardProps) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(cardVariants({ variant, padding, className }))} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 pb-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-heading-lg font-heading text-foreground", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-sm text-foreground-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-body-md text-foreground", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 pt-5", className)} {...props} />;
}
