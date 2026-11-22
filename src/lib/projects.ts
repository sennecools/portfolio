import { projects } from "@/content/projects";
import { pick, type Project, type ProjectSource } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/** One project in one language, as the pages use it. */
export function localizeProject(p: ProjectSource, locale: Locale): Project {
  const linkLabels = getDictionary(locale).links;
  return {
    slug: p.slug,
    title: p.title,
    category: pick(p.category, locale),
    kind: pick(p.kind, locale),
    summary: p.summary[locale],
    intro: p.intro[locale],
    role: pick(p.role, locale),
    year: p.year,
    status: pick(p.status, locale),
    stack: p.stack,
    placement: p.placement,
    links: p.links.map((l) => ({ label: linkLabels[l.kind], href: l.href })),
    cover: p.cover,
    coverAlt: p.coverAlt?.[locale],
    context: p.context[locale],
    built: p.built[locale],
    stackRows: p.stackRows.map((r) => ({ label: pick(r.label, locale), value: pick(r.value, locale) })),
    challenges: p.challenges.map((c) => ({ title: c.title[locale], text: c.text[locale] })),
    gallery: p.gallery.map((g) => ({ src: g.src, alt: g.alt?.[locale], caption: g.caption[locale] })),
  };
}

export function getProjects(locale: Locale, list: readonly ProjectSource[] = projects): Project[] {
  return list.map((p) => localizeProject(p, locale));
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  const source = projects.find((p) => p.slug === slug);
  return source && localizeProject(source, locale);
}

/** The project after this one in list order, wrapping around at the end. */
export function getNextProject(slug: string, list: readonly Project[]): Project | undefined {
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return undefined;
  return list[(i + 1) % list.length];
}

export function groupByPlacement(list: readonly Project[]) {
  return {
    featured: list.find((p) => p.placement === "featured"),
    strands: list.filter((p) => p.placement === "strand"),
    index: list.filter((p) => p.placement === "index"),
  };
}

/** Problems in the content file that would otherwise only show up as a broken page. */
export function validateProjects(list: readonly Project[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const p of list) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) problems.push(`${p.slug}: slug must be lowercase kebab-case`);
    if (seen.has(p.slug)) problems.push(`${p.slug}: duplicate slug`);
    seen.add(p.slug);
    if (!p.title.trim()) problems.push(`${p.slug}: missing title`);
    if (!p.summary.trim()) problems.push(`${p.slug}: missing summary`);
    for (const l of p.links) {
      if (!/^(https:\/\/|\/)/.test(l.href)) problems.push(`${p.slug}: link "${l.label}" must be https or site-relative`);
    }
  }
  const featured = list.filter((p) => p.placement === "featured").length;
  if (featured > 1) problems.push(`expected at most one featured project, found ${featured}`);
  return problems;
}
