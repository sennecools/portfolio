import type { PostMeta } from "@/lib/posts";

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type Channel = { title: string; description: string; siteUrl: string };

/** RSS 2.0 feed for the given posts (expected newest first). */
export function buildRss(channel: Channel, posts: Pick<PostMeta, "slug" | "title" | "date" | "summary" | "tags">[]): string {
  const base = channel.siteUrl.replace(/\/$/, "");
  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(p.summary)}</description>`,
        ...p.tags.map((t) => `      <category>${escapeXml(t)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(channel.title)}</title>`,
    `    <link>${base}/blog</link>`,
    `    <description>${escapeXml(channel.description)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
