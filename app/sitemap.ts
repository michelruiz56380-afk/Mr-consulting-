import type { MetadataRoute } from "next";
import { pillars, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...pillars.map((p) => `/${p.slug}`), "/contact", "/mentions-legales", "/confidentialite"];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p.startsWith("/mentions") || p.startsWith("/confidentialite") ? 0.2 : 0.8,
  }));
}
