import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

/**
 * Generates `/manifest.webmanifest` at build time (PWA / "Add to Home
 * Screen" metadata). `icons` is intentionally empty until real app icons
 * are placed in `public/icons/`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.legalName,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: siteConfig.themeColor,
    icons: [],
  };
}
