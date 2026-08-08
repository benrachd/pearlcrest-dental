import { Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type { ButtonHTMLAttributes, SVGProps } from "react";
import { Icon, type IconSize } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
    "font-body font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-700 ease-luxury",
    "active:scale-[0.97] active:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md",
        accent:
          "bg-accent text-accent-foreground shadow-gold hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_4px_28px_rgba(198,169,98,0.35),0_0_40px_rgba(198,169,98,0.15)]",
        secondary:
          "bg-neutral-100 text-foreground hover:-translate-y-0.5 hover:bg-neutral-200 hover:shadow-sm",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-sm",
        ghost: "bg-transparent text-foreground hover:bg-neutral-100",
        link: "bg-transparent text-foreground underline underline-offset-4 hover:text-foreground-muted",
        glass: "glass text-foreground shadow-sm hover:-translate-y-0.5 hover:glass-strong hover:shadow-md",
      },
      size: {
        sm: "h-9 rounded-sm px-3.5 text-body-sm",
        md: "h-11 rounded-md px-5 text-body-md",
        lg: "h-13 rounded-md px-7 text-body-lg",
        xl: "h-15 rounded-lg px-9 text-body-lg",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const ICON_SIZE_BY_BUTTON_SIZE: Record<string, IconSize> = {
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "md",
  icon: "md",
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  endIcon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export function Button({
  className,
  variant,
  size = "md",
  asChild = false,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const iconSize = ICON_SIZE_BY_BUTTON_SIZE[size ?? "md"];

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-cursor="interactive"
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {(variant === "accent" || variant === "primary") && (
        <>
          <span
            aria-hidden="true"
            className="gold-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-luxury group-hover:translate-x-full"
          />
        </>
      )}
      {loading ? (
        <Spinner size={iconSize} />
      ) : (
        startIcon && <Icon icon={startIcon} size={iconSize} />
      )}
      <Slottable>{children}</Slottable>
      {!loading && endIcon && (
        <span className="ease-luxury relative inline-flex transition-transform duration-700 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
          <Icon icon={endIcon} size={iconSize} />
        </span>
      )}
    </Comp>
  );
}
