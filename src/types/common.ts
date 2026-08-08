import type { ReactNode } from "react";

/** A component that only accepts `children`, nothing else. */
export interface WithChildren {
  children: ReactNode;
}

/** Adds an optional `className` prop, the standard escape hatch for styling. */
export interface WithClassName {
  className?: string;
}

/** Marks every property of `T` as possibly `null` (distinct from optional). */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** Extracts the union of a `const` object's values, e.g. route path strings. */
export type ValueOf<T> = T[keyof T];
