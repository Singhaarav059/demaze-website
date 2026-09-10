import { describe, expect, it } from "vitest";
import { industries, metrics, projects, services, technologies } from "./site-data";

describe("production content", () => {
  it("keeps every service complete and uniquely addressable", () => {
    expect(services).toHaveLength(4);
    expect(new Set(services.map((service) => service.id)).size).toBe(services.length);
    services.forEach((service) => {
      expect(service.description.length).toBeGreaterThan(80);
      expect(service.items.length).toBeGreaterThanOrEqual(6);
    });
  });

  it("keeps verified portfolio and trust content populated", () => {
    expect(projects.length).toBeGreaterThanOrEqual(16);
    expect(metrics).toHaveLength(4);
    expect(technologies).toHaveLength(8);
    expect(industries.length).toBeGreaterThanOrEqual(15);
    projects.forEach((project) => expect(project.image).toBeTruthy());
  });
});
