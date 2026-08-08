import type { LabelHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Marks the associated field as required, appending a visual + accessible indicator. */
  required?: boolean;
}

/**
 * Always pair with a form control via `htmlFor`/`id` — labels are one of
 * the highest-impact, lowest-effort accessibility wins for a form.
 */
export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-foreground text-body-sm mb-1.5 inline-block font-medium", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-error ms-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
