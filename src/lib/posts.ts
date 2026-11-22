import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale, localeTags } from "@/i18n/config";

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  summary: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

/** Roughly 220 words a minute, never less than one minute. */
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Turn a raw .mdx file into a post. Throws on missing or malformed frontmatter so a bad post fails the build. */
export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) throw new Error(`Post "${slug}" is missing a title`);

  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(`Post "${slug}" needs a date in YYYY-MM-DD format`);
  }

  const tags = Array.isArray(data.tags) ? data.tags.map((t) => String(t).trim()).filter(Boolean) : [];

  return {
    slug,
    title,
    date,
    summary: typeof data.summary === "string" ? data.summary.trim() : "",
    tags,
    cover: typeof data.cover === "string" ? data.cover : undefined,
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : undefined,
    draft: data.draft === true,
    readingMinutes: readingMinutes(content),
    body: content,
  };
}

/** Newest first; ties broken by slug so the order is stable. */
export function sortPosts<T extends Pick<PostMeta, "date" | "slug">>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** Drafts are visible while developing and hidden from production builds. */
export function visiblePosts<T extends Pick<PostMeta, "draft">>(posts: T[], includeDrafts: boolean): T[] {
  return includeDrafts ? posts : posts.filter((p) => !p.draft);
}

/** Tags in order of first appearance, case-insensitively de-duplicated. */
export function collectTags(posts: Pick<PostMeta, "tags">[]): string[] {
  const seen = new Map<string, string>();
  for (const p of posts) for (const t of p.tags) if (!seen.has(t.toLowerCase())) seen.set(t.toLowerCase(), t);
  return [...seen.values()];
}

/** The posts either side of `slug` in a newest-first list. */
export function adjacentPosts<T extends Pick<PostMeta, "slug">>(posts: T[], slug: string) {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { newer: undefined, older: undefined };
  return { newer: posts[i - 1], older: posts[i + 1] };
}

const DATE_STYLES = {
  long: { day: "numeric", month: "long", year: "numeric" },
  short: { month: "short", year: "numeric" },
  month: { month: "long", year: "numeric" },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>;

/** A post date in the page’s language, e.g. "12 October 2026" or "12 oktober 2026". */
export function formatDate(iso: string, style: keyof typeof DATE_STYLES = "long", locale: Locale = defaultLocale): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(localeTags[locale], { ...DATE_STYLES[style], timeZone: "UTC" }).format(d);
}

export function getAllPosts(includeDrafts = process.env.NODE_ENV !== "production"): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePost(f.replace(/\.mdx$/, ""), fs.readFileSync(path.join(POSTS_DIR, f), "utf8")));
  return sortPosts(visiblePosts(posts, includeDrafts));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
