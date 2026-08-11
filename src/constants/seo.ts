/**
 * Defaults consumed by `src/lib/metadata.ts` so individual routes only need
 * to override what makes them different (title, description, image).
 */
export const seoDefaults = {
  ogImage: "/images/hero/hero-editorial-v2.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: "summary_large_image" as const,
  themeColor: "#0b0b0b",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
