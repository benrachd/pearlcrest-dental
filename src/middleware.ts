import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Runs on every request (except the exclusions in `config.matcher` below) to:
 * - serve English at `/` and localized routes at `/fr`, `/ar`
 * - rewrite locale-prefixed URLs to the right App Router segment
 * - set the `NEXT_LOCALE` cookie when the visitor switches language
 */
export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, Next.js internals, and files that
  // contain a dot (static assets such as `favicon.ico`, `robots.txt`,
  // images, etc.), which must never be locale-prefixed.
  //
  // The explicit `'/'` entry is required — the regex alone does not match
  // the root path, so `/` would 404 instead of serving English.
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
