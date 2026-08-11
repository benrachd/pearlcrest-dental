import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export const dynamic = "force-static";

/** Generates `/robots.txt` at build time. */
export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  const host = `${siteConfig.url.replace(/\/$/, "")}${basePath}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
