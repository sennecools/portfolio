import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";

/** Shown when Modrinth cannot be reached; written as a lower bound so it never overstates. */
const FALLBACK = 10_000;
const DAY = 60 * 60 * 24;

/** The all-time download count of a Modrinth project, refreshed at most once a day. */
export async function modrinthDownloads(slug: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.modrinth.com/v2/project/${encodeURIComponent(slug)}`, {
      headers: { "User-Agent": "portfolio-site/1.0" },
      next: { revalidate: DAY },
    });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const downloads = (data as { downloads?: unknown }).downloads;
    return typeof downloads === "number" ? downloads : null;
  } catch {
    return null;
  }
}

export function formatDownloads(count: number | null, locale: Locale): string {
  const format = new Intl.NumberFormat(locale === "nl" ? "nl-BE" : "en-GB");
  return count === null ? `${format.format(FALLBACK)}+` : format.format(count);
}

/** Replaces "{downloads}" in a project's text with its live Modrinth download count. */
export function fillDownloads(project: Project, downloads: string): Project {
  const fill = (s: string) => s.replaceAll("{downloads}", downloads);
  return {
    ...project,
    summary: fill(project.summary),
    intro: fill(project.intro),
    status: fill(project.status),
    context: project.context.map(fill),
    built: project.built.map(fill),
  };
}

/** The projects with live numbers filled in. Projects without a Modrinth slug pass through. */
export async function withLiveStats(projects: Project[], locale: Locale): Promise<Project[]> {
  return Promise.all(
    projects.map(async (p) =>
      p.modrinth ? fillDownloads(p, formatDownloads(await modrinthDownloads(p.modrinth), locale)) : p,
    ),
  );
}
