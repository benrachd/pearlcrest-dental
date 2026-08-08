import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

/** Generates `/robots.txt` at build time. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
