import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicImageSize, readImageSize } from "./image-size";

const projects = path.join(process.cwd(), "public", "projects");

describe("readImageSize", () => {
  it("reads JPEG, PNG and WebP files in /public", () => {
    expect(publicImageSize("/projects/beyond-talent-ats/dashboard.jpg")).toEqual({ width: 2880, height: 1800 });
    expect(publicImageSize("/projects/better-tablist/animated-minimal.png")).toEqual({ width: 1000, height: 450 });
    expect(publicImageSize("/projects/diffrast/shape-fitting.webp")).toEqual({ width: 960, height: 363 });
  });

  it("finds a size for every project image", () => {
    for (const dir of fs.readdirSync(projects)) {
      for (const file of fs.readdirSync(path.join(projects, dir))) {
        const size = publicImageSize(`/projects/${dir}/${file}`);
        expect(size, `${dir}/${file}`).not.toBeNull();
        expect(size!.width).toBeGreaterThan(0);
        expect(size!.height).toBeGreaterThan(0);
      }
    }
  });

  it("returns null for files that are not images, and for missing files", () => {
    expect(readImageSize(new TextEncoder().encode("not an image at all"))).toBeNull();
    expect(publicImageSize("/projects/does-not-exist.jpg")).toBeNull();
  });
});
