/**
 * Fails fast, with a readable error, if a required environment variable is
 * missing — instead of silently rendering `undefined` into a URL, a meta
 * tag, or a script `src` at runtime. Intentionally dependency-free.
 */
function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Did you forget to copy .env.example to .env.local?`,
    );
  }
  return value;
}

/** Optional environment variable with an explicit fallback. */
function optionalEnv(value: string | undefined, fallback = ""): string {
  return value ?? fallback;
}

export const env = {
  siteUrl: optionalEnv(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
  googleSiteVerification: optionalEnv(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  bingSiteVerification: optionalEnv(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),
  gaMeasurementId: optionalEnv(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
};

export { requireEnv };
