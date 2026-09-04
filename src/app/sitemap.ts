import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

const paths = ["/", "/projects", "/services", "/about-us", "/contact-us"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
