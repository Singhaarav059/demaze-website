import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { projects } from "@/content/projects";

const paths = [
  "/",
  "/projects",
  "/services",
  "/about-us",
  "/contact-us",
  "/privacy-policy",
  "/terms-of-service",
  "/ai-dev-automation-playbook",
  "/ai-dev-automation-playbook-form",
  ...projects.map((project) => `/projects/${project.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
