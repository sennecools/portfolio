import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import type { Project } from "@/content/types";
import { getNextProject, getProjects, groupByPlacement, validateProjects } from "./projects";

function project(overrides: Partial<Project> = {}): Project {
  return {
    slug: "example",
    title: "Example",
    category: "Open source",
    kind: "CLI",
    summary: "A summary.",
    intro: "An intro.",
    role: "Developer",
    year: "2026",
    status: "Released",
    stack: "Rust · CLI",
    placement: "index",
    links: [{ label: "Source", href: "https://github.com/example/example" }],
    context: [],
    built: [],
    stackRows: [],
    challenges: [],
    gallery: [],
    ...overrides,
  };
}

describe("getNextProject", () => {
  const list = [project({ slug: "a" }), project({ slug: "b" }), project({ slug: "c" })];

  it("returns the following project", () => {
    expect(getNextProject("a", list)?.slug).toBe("b");
  });

  it("wraps from the last project to the first", () => {
    expect(getNextProject("c", list)?.slug).toBe("a");
  });

  it("returns nothing for an unknown slug or a single-project list", () => {
    expect(getNextProject("nope", list)).toBeUndefined();
    expect(getNextProject("a", [project({ slug: "a" })])).toBeUndefined();
  });
});

describe("groupByPlacement", () => {
  it("splits projects into featured, strands and index, keeping order", () => {
    const groups = groupByPlacement([
      project({ slug: "i1", placement: "index" }),
      project({ slug: "s1", placement: "strand" }),
      project({ slug: "f", placement: "featured" }),
      project({ slug: "s2", placement: "strand" }),
    ]);
    expect(groups.featured?.slug).toBe("f");
    expect(groups.strands.map((p) => p.slug)).toEqual(["s1", "s2"]);
    expect(groups.index.map((p) => p.slug)).toEqual(["i1"]);
  });

  it("copes with no featured project", () => {
    expect(groupByPlacement([project()]).featured).toBeUndefined();
  });
});

describe("validateProjects", () => {
  it("accepts a well-formed list", () => {
    expect(validateProjects([project({ slug: "a" }), project({ slug: "b-2", placement: "featured" })])).toEqual([]);
  });

  it.each(["Has Caps", "trailing-", "double--dash", "under_score", ""])("rejects the slug %j", (slug) => {
    expect(validateProjects([project({ slug })]).join()).toMatch(/kebab-case/);
  });

  it("reports duplicate slugs", () => {
    expect(validateProjects([project(), project()]).join()).toMatch(/duplicate slug/);
  });

  it("reports missing copy", () => {
    const problems = validateProjects([project({ title: " ", summary: "" })]).join();
    expect(problems).toMatch(/missing title/);
    expect(problems).toMatch(/missing summary/);
  });

  it("only allows https or site-relative links", () => {
    const bad = project({ links: [{ label: "Site", href: "http://example.com" }, { label: "JS", href: "javascript:alert(1)" }] });
    expect(validateProjects([bad])).toHaveLength(2);
    expect(validateProjects([project({ links: [{ label: "CV", href: "/cv.pdf" }] })])).toEqual([]);
  });

  it("reports more than one featured project", () => {
    const list = [project({ slug: "a", placement: "featured" }), project({ slug: "b", placement: "featured" })];
    expect(validateProjects(list).join()).toMatch(/at most one featured/);
  });
});

describe.each(locales)("the real project content in %s", (locale) => {
  const list = getProjects(locale);

  it("passes validation", () => {
    expect(validateProjects(list)).toEqual([]);
  });

  it("has no leftover placeholders or empty text", () => {
    expect(JSON.stringify(list)).not.toMatch(/\[[A-Z][^\]]*\]|TODO|lorem/i);
    for (const p of list) {
      for (const text of [p.category, p.kind, p.intro, p.role, p.status, ...p.context, ...p.built]) {
        expect(text.trim(), p.slug).not.toBe("");
      }
    }
  });
});
