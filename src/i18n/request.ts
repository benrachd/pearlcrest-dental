import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Resolves which locale and message bundle a given request should render
 * with. This is consumed internally by the `next-intl` Next.js plugin
 * (see `next.config.ts`) and by every Server Component that calls
 * `getTranslations` / `getMessages`.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
