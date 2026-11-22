import type { Locale } from "@/i18n/config";

/** A value in every language the site is published in. */
export type Localized<T> = Record<Locale, T>;

/** Text that reads the same in every language (a name, a version), or differs per language. */
export type Text = string | Localized<string>;

/** Pick the value for one language. */
export function pick<T>(value: T | Localized<T>, locale: Locale): T {
  if (value !== null && typeof value === "object" && !Array.isArray(value) && locale in value) {
    return (value as Localized<T>)[locale];
  }
  return value as T;
}

/** The kind of a project link decides its button label, in every language. */
export type LinkKind = "site" | "source" | "demo" | "releases" | "modrinth";

/** A project as written in `src/content/projects`, with its text in every language. */
export type ProjectSource = {
  /** URL segment: /work/<slug> */
  slug: string;
  title: string;
  /** Strand shown above the title, e.g. "Client work", "Open source". */
  category: Text;
  /** What kind of thing it is, e.g. "Web app", "Game mod". */
  kind: Text;
  /** One or two sentences for cards on the home page. */
  summary: Localized<string>;
  /** Lead paragraph on the case-study page. */
  intro: Localized<string>;
  role: Text;
  year: string;
  status: Text;
  /** Short stack line, e.g. "Rust · Vulkan". */
  stack: string;
  /**
   * Where it appears on the home page:
   * "featured" (one, shown large), "strand" (three cards), "index" (the list underneath).
   */
  placement: "featured" | "strand" | "index";
  /** First link is the primary action. */
  links: { kind: LinkKind; href: string }[];
  /** Modrinth project slug: "{downloads}" in the text is filled with its live download count. */
  modrinth?: string;
  /** Image in /public, e.g. "/projects/packctl/cover.png". An orange plate is shown until it exists. */
  cover?: string;
  coverAlt?: Localized<string>;
  /** Short line under the cover in the slideshow; one or two lines at most. */
  coverCaption?: Localized<string>;
  context: Localized<string[]>;
  built: Localized<string[]>;
  stackRows: { label: Text; value: Text }[];
  /** Leave empty unless the problem is one a reader would follow. */
  challenges: { title: Localized<string>; text: Localized<string> }[];
  gallery: { src?: string; alt?: Localized<string>; caption: Localized<string> }[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

/** A project in one language, as the pages use it. */
export type Project = {
  slug: string;
  title: string;
  category: string;
  kind: string;
  summary: string;
  intro: string;
  role: string;
  year: string;
  status: string;
  stack: string;
  placement: ProjectSource["placement"];
  modrinth?: string;
  links: ProjectLink[];
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  context: string[];
  built: string[];
  stackRows: { label: string; value: string }[];
  challenges: { title: string; text: string }[];
  gallery: { src?: string; alt?: string; caption: string }[];
};
