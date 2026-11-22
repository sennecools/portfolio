import type { Metadata } from "next";
import { defaultLocale, type Locale, localePath, locales, localeTags } from "./config";

/**
 * `alternates` for a page: its canonical URL in this language and the same page in every other
 * language (hreflang). `path` is written as in the default language. Next replaces `alternates`
 * as a whole, so the RSS feed link from the layout is repeated here.
 */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = localePath(l, path);
  languages["x-default"] = localePath(defaultLocale, path);
  return {
    canonical: localePath(locale, path),
    languages,
    types: { "application/rss+xml": "/blog/rss.xml" },
  };
}
