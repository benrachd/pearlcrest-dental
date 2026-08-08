import { cn } from "@/utils/cn";
import type { IconSize } from "@/components/ui/icon";
import { ICON_SIZES } from "@/components/ui/icon";

export interface SpinnerProps {
  size?: IconSize;
  className?: string;
  /** Visible label for assistive technology; the spinner itself is decorative. */
  label?: string;
}

/**
 * A minimal, dependency-free loading indicator — a single rotating arc
 * rather than a busy multi-element spinner, in keeping with a restrained,
 * premium visual language. Used inside `Button`'s `loading` state, and
 * anywhere else a small inline loading affordance is needed.
 */
export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" className={cn("inline-flex", ICON_SIZES[size], className)}>
      <svg viewBox="0 0 24 24" fill="none" className="size-full animate-spin" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
