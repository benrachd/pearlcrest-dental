import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "border-border bg-surface text-foreground text-body-md min-h-28 w-full rounded-md border px-3.5 py-3",
        "placeholder:text-foreground-subtle",
        "ease-luxury transition-[border-color,box-shadow] duration-200",
        "focus-visible:border-accent focus-visible:ring-ring/30 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-40",
        invalid && "border-error focus-visible:border-error focus-visible:ring-error/25",
        className,
      )}
      {...props}
    />
  );
}
