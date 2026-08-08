import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

/**
 * Locale-aware drop-in replacements for Next.js' own navigation APIs.
 *
 * Import `Link`, `redirect`, `usePathname` and `useRouter` from here instead
 * of `next/link` / `next/navigation` anywhere in the app. They automatically
 * read and forward the current locale, so feature code never has to think
 * about locale prefixes manually.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
