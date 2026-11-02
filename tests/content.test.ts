import { describe, it, expect } from "bun:test";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { experience } from "@/content/experience";
import { siteConfig } from "@/content/site";
import { socialLinks } from "@/content/social";

describe("Content layer data integrity", () => {
  it("projects have unique IDs and unique slugs", () => {
    const ids = projects.map((p) => p.id);
    const slugs = projects.map((p) => p.slug);

    expect(new Set(ids).size).toBe(projects.length);
    expect(new Set(slugs).size).toBe(projects.length);
  });

  it("all project relatedIds refer to existing project IDs", () => {
    const existingIds = new Set(projects.map((p) => p.id));
    for (const project of projects) {
      for (const relId of project.relatedIds) {
        expect(existingIds.has(relId)).toBe(true);
      }
    }
  });

  it("projects contain required fields and valid categories", () => {
    const validCategories = ["showcase", "organizational", "experimental"];
    const validStatuses = ["completed", "in-progress", "pending"];

    for (const p of projects) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(validCategories).toContain(p.category);
      expect(validStatuses).toContain(p.status);
      expect(p.energy).toBeGreaterThanOrEqual(0);
      expect(p.energy).toBeLessThanOrEqual(100);
    }
  });

  it("skills contain valid categories and non-empty names", () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const s of skills) {
      expect(s.name.length).toBeGreaterThan(0);
      expect(s.years).toBeGreaterThan(0);
      expect(["beginner", "intermediate", "advanced", "expert"]).toContain(s.level);
    }
  });

  it("experience records contain company, role, and achievements", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const e of experience) {
      expect(e.company.length).toBeGreaterThan(0);
      expect(e.role.length).toBeGreaterThan(0);
      expect(e.achievements.length).toBeGreaterThan(0);
    }
  });

  it("site configuration has valid URLs and author email", () => {
    expect(siteConfig.url).toStartWith("https://");
    expect(siteConfig.author.email).toContain("@");
    expect(siteConfig.name.length).toBeGreaterThan(0);
  });

  it("social links have valid platforms and URLs", () => {
    expect(socialLinks.length).toBeGreaterThan(0);
    for (const link of socialLinks) {
      expect(link.platform.length).toBeGreaterThan(0);
      expect(link.url.length).toBeGreaterThan(0);
    }
  });
});
