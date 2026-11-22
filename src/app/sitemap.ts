import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { localePath, locales, localeTags } from "@/i18n/config";
import { getAllPosts } from "@/lib/posts";

/** Every page in every language, each entry pointing at its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages: { path: string; lastModified?: string }[] = [
    { path: "/" },
    { path: "/blog" },
    ...projects.map((p) => ({ path: `/work/${p.slug}` })),
    ...getAllPosts(false).map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.date })),
  ];
  return locales.flatMap((locale) =>
    pages.map(({ path, lastModified }) => ({
      url: `${base}${localePath(locale, path)}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], `${base}${localePath(l, path)}`])),
      },
    })),
  );
}
