import { describe, expect, it } from "vitest";
import { adjacentPosts, collectTags, formatDate, parsePost, readingMinutes, sortPosts, visiblePosts } from "./posts";

const mdx = (frontmatter: string, body = "Hello world.") => `---\n${frontmatter}\n---\n\n${body}\n`;

describe("readingMinutes", () => {
  it("is never less than one minute", () => {
    expect(readingMinutes("")).toBe(1);
    expect(readingMinutes("just a few words")).toBe(1);
  });

  it("rounds to the nearest minute at 220 words a minute", () => {
    expect(readingMinutes("word ".repeat(220))).toBe(1);
    expect(readingMinutes("word ".repeat(550))).toBe(3);
    expect(readingMinutes("word ".repeat(1100))).toBe(5);
  });
});

describe("parsePost", () => {
  it("reads frontmatter and body", () => {
    const post = parsePost(
      "hello",
      mdx('title: "Hello"\ndate: "2026-10-12"\nsummary: " A summary. "\ntags: [Updates, packctl]\ncover: /posts/hello.png'),
    );
    expect(post).toMatchObject({
      slug: "hello",
      title: "Hello",
      date: "2026-10-12",
      summary: "A summary.",
      tags: ["Updates", "packctl"],
      cover: "/posts/hello.png",
      draft: false,
      readingMinutes: 1,
    });
    expect(post.body.trim()).toBe("Hello world.");
  });

  it("accepts an unquoted YAML date", () => {
    expect(parsePost("p", mdx("title: T\ndate: 2026-03-04")).date).toBe("2026-03-04");
  });

  it("defaults optional fields", () => {
    const post = parsePost("p", mdx('title: T\ndate: "2026-01-01"'));
    expect(post).toMatchObject({ summary: "", tags: [], cover: undefined, draft: false });
  });

  it("only treats `draft: true` as a draft", () => {
    expect(parsePost("p", mdx('title: T\ndate: "2026-01-01"\ndraft: true')).draft).toBe(true);
    expect(parsePost("p", mdx('title: T\ndate: "2026-01-01"\ndraft: "yes"')).draft).toBe(false);
  });

  it("drops empty tags and ignores a non-list tags value", () => {
    expect(parsePost("p", mdx('title: T\ndate: "2026-01-01"\ntags: [a, "", " b "]')).tags).toEqual(["a", "b"]);
    expect(parsePost("p", mdx('title: T\ndate: "2026-01-01"\ntags: nope')).tags).toEqual([]);
  });

  it("throws when the title is missing", () => {
    expect(() => parsePost("p", mdx('date: "2026-01-01"'))).toThrow(/"p" is missing a title/);
  });

  it.each(["", "date: tomorrow", 'date: "12-10-2026"', 'date: "2026-13-40"'])("throws on a bad date (%j)", (line) => {
    expect(() => parsePost("p", mdx(`title: T\n${line}`))).toThrow(/YYYY-MM-DD/);
  });
});

describe("sortPosts", () => {
  it("orders newest first without mutating the input", () => {
    const input = [
      { slug: "a", date: "2026-01-01" },
      { slug: "b", date: "2026-03-01" },
      { slug: "c", date: "2025-12-31" },
    ];
    expect(sortPosts(input).map((p) => p.slug)).toEqual(["b", "a", "c"]);
    expect(input.map((p) => p.slug)).toEqual(["a", "b", "c"]);
  });

  it("breaks date ties by slug", () => {
    const input = [
      { slug: "zeta", date: "2026-01-01" },
      { slug: "alpha", date: "2026-01-01" },
    ];
    expect(sortPosts(input).map((p) => p.slug)).toEqual(["alpha", "zeta"]);
  });
});

describe("visiblePosts", () => {
  const posts = [{ draft: false }, { draft: true }];

  it("hides drafts by default in production", () => {
    expect(visiblePosts(posts, false)).toEqual([{ draft: false }]);
  });

  it("keeps drafts when asked", () => {
    expect(visiblePosts(posts, true)).toHaveLength(2);
  });
});

describe("collectTags", () => {
  it("returns tags in order of first appearance, de-duplicated case-insensitively", () => {
    expect(collectTags([{ tags: ["Updates", "Rust"] }, { tags: ["rust", "Notes"] }, { tags: [] }])).toEqual([
      "Updates",
      "Rust",
      "Notes",
    ]);
  });
});

describe("adjacentPosts", () => {
  const posts = [{ slug: "new" }, { slug: "mid" }, { slug: "old" }];

  it("finds both neighbours of a post in the middle", () => {
    expect(adjacentPosts(posts, "mid")).toEqual({ newer: { slug: "new" }, older: { slug: "old" } });
  });

  it("has no newer post at the top and no older post at the bottom", () => {
    expect(adjacentPosts(posts, "new").newer).toBeUndefined();
    expect(adjacentPosts(posts, "old").older).toBeUndefined();
  });

  it("returns nothing for an unknown slug", () => {
    expect(adjacentPosts(posts, "nope")).toEqual({ newer: undefined, older: undefined });
  });
});

describe("formatDate", () => {
  it("formats in each style without shifting the day across time zones", () => {
    expect(formatDate("2026-10-01")).toBe("1 October 2026");
    expect(formatDate("2026-10-01", "short")).toBe("Oct 2026");
    expect(formatDate("2026-12-31", "month")).toBe("December 2026");
  });
});
