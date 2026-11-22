import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { fillDownloads, formatDownloads } from "./live-stats";
import { getProjects } from "./projects";

describe("live download counts", () => {
  it("formats counts per language, and falls back to a lower bound", () => {
    expect(formatDownloads(10505, "nl")).toBe("10.505");
    expect(formatDownloads(10505, "en")).toBe("10,505");
    expect(formatDownloads(null, "nl")).toBe("10.000+");
  });

  it("fills every placeholder of a Modrinth project", () => {
    for (const locale of ["en", "nl"] as const) {
      for (const p of getProjects(locale).filter((p) => p.modrinth)) {
        const filled = fillDownloads(p, "10.505");
        expect(JSON.stringify(filled)).not.toContain("{downloads}");
        expect(filled.status).toContain("10.505");
      }
    }
  });

  it("only uses the placeholder in projects that have a Modrinth slug", () => {
    for (const p of projects.filter((p) => !p.modrinth)) {
      expect(JSON.stringify(p), p.slug).not.toContain("{downloads}");
    }
  });
});
