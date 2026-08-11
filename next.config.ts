import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** Set by `npm run build:gh-pages` for static GitHub Pages export. */
const isGhPagesExport = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  ...(isGhPagesExport
    ? {
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // Optimized, next-gen image formats served through next/image.
  images: {
    unoptimized: isGhPagesExport,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 92],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Static export does not support custom headers.
  ...(isGhPagesExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=()",
                },
              ],
            },
          ];
        },
      }),
};

export default withNextIntl(nextConfig);
