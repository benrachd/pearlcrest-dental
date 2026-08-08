import type { ReactNode } from "react";
import { richTitleEmphasis } from "@/constants/surface-classes";
import { cn } from "@/utils/cn";

export function RichTitleEmphasis({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn(richTitleEmphasis, className)}>{children}</em>;
}
