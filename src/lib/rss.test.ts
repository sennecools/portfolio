import { describe, expect, it } from "vitest";
import { parseFence } from "./fence";
import { buildRss, escapeXml } from "./rss";

describe("escapeXml", () => {
  it("escapes the five XML special characters", () => {
    expect(escapeXml(`a & b < c > d "e" 'f'`)).toBe("a &amp; b &lt; c &gt; d &quot;e&quot; &apos;f&apos;");
  });

  it("escapes ampersands first so entities are not double-escaped wrongly", () => {
    expect(escapeXml("<&>")).toBe("&lt;&amp;&gt;");
  });
});

describe("buildRss", () => {
  const channel = { title: "Blog & Notes", description: "Updates", siteUrl: "https://example.com/" };
  const post = { slug: "hello", title: "Hello <world>", date: "2026-10-12", summary: "Tom & Jerry", tags: ["Updates", "R&D"] };

  it("builds absolute links without a double slash", () => {
    const xml = buildRss(channel, [post]);
    expect(xml).toContain("<link>https://example.com/blog/hello</link>");
    expect(xml).toContain('<atom:link href="https://example.com/blog/rss.xml"');
  });

  it("escapes titles, summaries and tags", () => {
    const xml = buildRss(channel, [post]);
    expect(xml).toContain("<title>Blog &amp; Notes</title>");
    expect(xml).toContain("<title>Hello &lt;world&gt;</title>");
    expect(xml).toContain("<description>Tom &amp; Jerry</description>");
    expect(xml).toContain("<category>R&amp;D</category>");
  });

  it("writes the date as an RFC 822 UTC timestamp", () => {
    expect(buildRss(channel, [post])).toContain("<pubDate>Mon, 12 Oct 2026 00:00:00 GMT</pubDate>");
  });

  it("emits one item per post, in the given order", () => {
    const xml = buildRss(channel, [post, { ...post, slug: "second" }]);
    expect(xml.match(/<item>/g)).toHaveLength(2);
    expect(xml.indexOf("/blog/hello")).toBeLessThan(xml.indexOf("/blog/second"));
  });

  it("is still a valid channel with no posts", () => {
    const xml = buildRss(channel, []);
    expect(xml).not.toContain("<item>");
    expect(xml.trimEnd().endsWith("</rss>")).toBe(true);
  });
});

describe("parseFence", () => {
  it("maps known language ids to display names", () => {
    expect(parseFence("language-ts")).toEqual({ language: "TypeScript", file: "" });
    expect(parseFence("language-RS")).toEqual({ language: "Rust", file: "" });
  });

  it("splits off a file name after the colon", () => {
    expect(parseFence("language-rs:src/plan.rs")).toEqual({ language: "Rust", file: "src/plan.rs" });
  });

  it("keeps colons inside the file name", () => {
    expect(parseFence("language-sh:C:/tools/run.sh").file).toBe("C:/tools/run.sh");
  });

  it("passes unknown languages through and handles a bare fence", () => {
    expect(parseFence("language-zig").language).toBe("zig");
    expect(parseFence(undefined)).toEqual({ language: "", file: "" });
  });
});
