import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

function CloseGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const chipVariants = cva(
  [
    "text-body-sm inline-flex h-9 items-center rounded-full border",
    "transition-[background-color,border-color,color] duration-200 ease-luxury",
  ],
  {
    variants: {
      selected: {
        true: "border-accent bg-gold-100 text-gold-800",
        false: "border-border bg-surface text-foreground hover:bg-neutral-100",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export interface ChipProps {
  children: ReactNode;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Present -> chip is a selectable toggle (rendered as a `<button>`); absent -> static. */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  disabled?: boolean;
  /** Present -> a remove ("x") button is appended, as a sibling control, never nested inside another button. */
  onRemove?: () => void;
  removeLabel?: string;
}

/**
 * An interactive pill — filter selection, removable multi-select tag, etc.
 * For a non-interactive status indicator use `Badge`; for a static
 * categorization label use `Tag`.
 */
export function Chip({
  children,
  className,
  icon,
  selected,
  onSelectedChange,
  disabled,
  onRemove,
  removeLabel = "Remove",
}: ChipProps) {
  const isSelectable = Boolean(onSelectedChange);
  const label = (
    <>
      {icon && <Icon icon={icon} size="xs" />}
      <span>{children}</span>
    </>
  );

  return (
    <div
      className={cn(
        chipVariants({ selected }),
        onRemove ? "ps-3.5 pe-2" : "px-3.5",
        "gap-1.5",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      {isSelectable ? (
        <button
          type="button"
          aria-pressed={selected}
          disabled={disabled}
          onClick={() => onSelectedChange?.(!selected)}
          className="inline-flex items-center gap-1.5 focus-visible:outline-none"
        >
          {label}
        </button>
      ) : (
        <span className="inline-flex items-center gap-1.5">{label}</span>
      )}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={onRemove}
          className="text-foreground-subtle hover:text-foreground inline-flex size-5 items-center justify-center rounded-full hover:bg-neutral-200"
        >
          <Icon icon={CloseGlyph} size="xs" />
        </button>
      )}
    </div>
  );
}
