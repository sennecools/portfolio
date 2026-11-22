import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/frame";
import { Rise, Words } from "@/components/rise";
import { rv } from "@/components/rv";
import { SectionSpy } from "@/components/section-spy";
import { Showcase, type ShowcaseSlide } from "@/components/showcase";
import { projects } from "@/content/projects";
import { isLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { alternates } from "@/i18n/metadata";
import { publicImageSize } from "@/lib/image-size";
import { withLiveStats } from "@/lib/live-stats";
import { getNextProject, getProject, getProjects } from "@/lib/projects";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const found = getProject(slug, locale);
  if (!found) return {};
  const [project] = await withLiveStats([found], locale);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: project.cover ? [project.cover] : undefined },
    alternates: alternates(locale, `/work/${project.slug}`),
  };
}

const Paragraphs = ({ items }: { items: string[] }) => items.map((t) => <p key={t}>{t}</p>);

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const found = getProject(slug, locale);
  if (!found) notFound();
  const [project] = await withLiveStats([found], locale);
  if (!project) notFound();
  const t = getDictionary(locale);
  const next = getNextProject(project.slug, getProjects(locale));
  const [primary, ...secondary] = project.links;
  // The cover and every gallery image that exists, shown together in the slideshow up top.
  // Each slide carries its own pixel size, so the frame takes the shape of the image.
  const slides: ShowcaseSlide[] = [
    ...(project.cover ? [{ src: project.cover, alt: project.coverAlt ?? project.title, caption: project.coverCaption }] : []),
    ...project.gallery.flatMap((g) => (g.src ? [{ src: g.src, alt: g.alt ?? g.caption, caption: g.caption }] : [])),
  ].map((s) => ({ ...s, size: publicImageSize(s.src) ?? { width: 16, height: 10 } }));

  const facts = [
    { label: t.facts.role, value: project.role },
    { label: t.facts.year, value: project.year },
    { label: t.facts.status, value: project.status },
  ];

  return (
    <main>
      <div className="band-paper">
        <header className="phead wrap">
          <Link className="back t-ui" href={localePath(locale, "/#work")}>
            <span className="arr" aria-hidden="true">
              ←
            </span>{" "}
            {t.project.allWork}
          </Link>
          <p className="t-meta dim phead__label">
            {project.category} · {project.kind}
          </p>
          <h1 className="t-hero phead__title">
            <Words text={project.title} />
          </h1>
          <p className="t-lead phead__intro">{project.intro}</p>
          <dl className="facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="t-meta">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          {primary && (
            <div className="phead__actions">
              <a className="btn btn--hue t-ui" href={primary.href} target="_blank" rel="noreferrer">
                {primary.label}
              </a>
              {secondary.map((l) => (
                <a key={l.href} className="btn btn--wash t-ui" href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </header>
        <div className="wrap pcover-wrap">
          {slides.length > 1 ? (
            <Showcase
              slides={slides}
              label={`${project.title} — ${t.project.gallery}`}
              labels={{ previous: t.project.previous, next: t.project.next, slide: t.project.slide }}
            />
          ) : (
            <Frame
              variant="plate"
              className="pcover"
              src={project.cover}
              alt={project.coverAlt}
              label={`${project.title} — ${project.kind}`}
              priority
              reveal="load"
            />
          )}
        </div>
      </div>

      <div className="band-back">
        <div className="wrap pbody">
          <SectionSpy selector=".psec" />
          {project.context.length > 0 && (
            <section className="psec" aria-labelledby="ctx" {...rv("rule")}>
              <h2 className="t-meta psec__label" id="ctx" {...rv("fade")}>
                {t.project.context}
              </h2>
              <div className="psec__body" {...rv("up")}>
                <Paragraphs items={project.context} />
              </div>
            </section>
          )}
          {project.built.length > 0 && (
            <section className="psec" aria-labelledby="built" {...rv("rule")}>
              <h2 className="t-meta psec__label" id="built" {...rv("fade")}>
                {t.project.built}
              </h2>
              <div className="psec__body" {...rv("up")}>
                <Paragraphs items={project.built} />
              </div>
            </section>
          )}
          {project.stackRows.length > 0 && (
            <section className="psec" aria-labelledby="stk" {...rv("rule")}>
              <h2 className="t-meta psec__label" id="stk" {...rv("fade")}>
                {t.project.stack}
              </h2>
              <div className="psec__body">
                <ul className="kv" data-rv-step="s">
                  {project.stackRows.map((r) => (
                    <li key={r.label} {...rv("up-s")}>
                      <span className="t-meta dim">{r.label}</span>
                      <span>{r.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          {project.challenges.length > 0 && (
            <section className="psec" aria-labelledby="hard" {...rv("rule")}>
              <h2 className="t-meta psec__label" id="hard" {...rv("fade")}>
                {t.project.challenges}
              </h2>
              <div className="psec__body">
                {project.challenges.map((c) => (
                  <div className="challenge" key={c.title} {...rv("up")}>
                    <h3 className="t-title">{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {slides.length <= 1 && project.gallery.length > 0 && (
            <div className="pgallery">
              {project.gallery.map((g) => (
                <figure key={g.caption}>
                  <Frame
                    as="div"
                    variant="field"
                    src={g.src}
                    alt={g.alt}
                    label={t.project.screenshot}
                    sizes="(max-width: 860px) 100vw, 528px"
                  />
                  <figcaption className="t-meta" {...rv("fade", { d0: 250 })}>
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {next && (
            <Link className="pnext" href={localePath(locale, `/work/${next.slug}`)} {...rv("rule")}>
              <div>
                <p className="t-meta dim" {...rv("fade")}>
                  {t.project.nextProject}
                </p>
                <Rise as="p" className="t-section pnext__title">
                  {next.title}
                </Rise>
              </div>
              <span className="t-ui" {...rv("fade", { d0: 200 })}>
                {t.project.viewProject}{" "}
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          )}
          <div className="pend" />
        </div>
      </div>
    </main>
  );
}
