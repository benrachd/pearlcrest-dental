import { type VariantProps, cva } from "class-variance-authority";
import type { InputHTMLAttributes, SVGProps } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

/**
 * Uses logical (`ps-*`, `pe-*`, `start-*`, `end-*`) instead of physical
 * (`pl-*`, `pr-*`, `left-*`, `right-*`) spacing/position utilities
 * throughout, so icon placement automatically mirrors for the Arabic (RTL)
 * locale with zero conditional logic.
 */
const inputVariants = cva(
  [
    "w-full rounded-md border border-border bg-surface text-foreground",
    "placeholder:text-foreground-subtle",
    "transition-[border-color,box-shadow] duration-200 ease-luxury",
    "focus-visible:border-accent focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  {
    variants: {
      inputSize: {
        sm: "h-9 px-3 text-body-sm",
        md: "h-11 px-3.5 text-body-md",
        lg: "h-13 px-4 text-body-lg",
      },
      invalid: {
        true: "border-error focus-visible:border-error focus-visible:ring-error/25",
        false: "",
      },
    },
    defaultVariants: {
      inputSize: "md",
      invalid: false,
    },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
  startIcon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  endIcon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export function Input({
  className,
  inputSize = "md",
  invalid,
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  if (!startIcon && !endIcon) {
    return <input className={cn(inputVariants({ inputSize, invalid }), className)} {...props} />;
  }

  return (
    <div className="relative flex items-center">
      {startIcon && (
        <Icon
          icon={startIcon}
          size="sm"
          className="text-foreground-subtle pointer-events-none absolute start-3"
        />
      )}
      <input
        className={cn(
          inputVariants({ inputSize, invalid }),
          startIcon && "ps-9",
          endIcon && "pe-9",
          className,
        )}
        {...props}
      />
      {endIcon && (
        <Icon
          icon={endIcon}
          size="sm"
          className="text-foreground-subtle pointer-events-none absolute end-3"
        />
      )}
    </div>
  );
}
