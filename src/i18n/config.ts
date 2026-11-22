/**
 * The languages the site is published in. To add one: add its code here, give it a name, a date
 * format and an Open Graph locale below, add its dictionary in `dictionary.ts`, and fill in its
 * text in `src/content`. TypeScript lists every place that still needs a translation.
 */
export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];

/** The default language is served without a prefix (`/blog`); the others get one (`/nl/blog`). */
export const defaultLocale: Locale = "en";

/** How the language names itself, for the language switch. */
export const localeNames: Record<Locale, string> = { en: "English", nl: "Nederlands" };

/** BCP 47 tags, for `<html lang>`, hreflang and date formatting. */
export const localeTags: Record<Locale, string> = { en: "en-GB", nl: "nl-BE" };

export const ogLocales: Record<Locale, string> = { en: "en_GB", nl: "nl_BE" };

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

/**
 * A site path in the given language. `path` is written as in the default language and may carry a
 * hash: `localePath("nl", "/#work")` is `/nl#work`, `localePath("en", "/blog")` stays `/blog`.
 */
export function localePath(locale: Locale, path: string): string {
  const hashAt = path.indexOf("#");
  const base = hashAt === -1 ? path : path.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : path.slice(hashAt);
  const clean = base.startsWith("/") ? base : `/${base}`;
  if (locale === defaultLocale) return `${clean}${hash}`;
  return `${clean === "/" ? `/${locale}` : `/${locale}${clean}`}${hash}`;
}

/** Split a browser pathname into its language and the path as the default language writes it. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const first = pathname.split("/")[1];
  if (isLocale(first) && first !== defaultLocale) {
    return { locale: first, path: pathname.slice(first.length + 1) || "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

/** Fill `{name}` placeholders in a dictionary string. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
