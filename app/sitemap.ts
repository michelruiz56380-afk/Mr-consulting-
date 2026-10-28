import type { MetadataRoute } from "next";
import { pillars, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...pillars.map((p) => `/${p.slug}`)];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
