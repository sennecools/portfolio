import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Frame } from "@/components/frame";
import { LinkSelector, type SelectorLink } from "@/components/link-selector";
import { Rise } from "@/components/rise";
import { idx, rv } from "@/components/rv";
import { getSiteText, site } from "@/content/site";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getProjects, groupByPlacement } from "@/lib/projects";

const display = (url: string) => url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");

/** A fact whose value is still a [bracket] placeholder is left out instead of shown. */
const isReal = (fact: { value: string }) => !fact.value.startsWith("[");

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const text = getSiteText(locale);
  const to = (p: string) => localePath(locale, p);

  const { featured, strands, index } = groupByPlacement(getProjects(locale));
  // The CV links only switch on once the file actually exists in /public.
  const cv = site.links.cv[locale];
  const hasCv = fs.existsSync(path.join(process.cwd(), "public", cv));

  const links: SelectorLink[] = [
    { id: "github", label: "GitHub", display: display(site.links.github), href: site.links.github },
    { id: "linkedin", label: "LinkedIn", display: display(site.links.linkedin), href: site.links.linkedin },
    ...(hasCv ? [{ id: "cv", label: "CV", display: cv.slice(1), href: cv }] : []),
  ];

  return (
    <main>
      <div className="band-paper">
        <section className="hero">
          <div className="wrap">
            <div className="hero__grid">
              <div className="hero__copy">
                <p className="t-meta dim hero__eyebrow">{t.home.eyebrow}</p>
                <h1 className="t-hero hero__title">
                  {/* Each line sits in a mask (.line) and rises out of it on load. */}
                  {text.hero.title.map((line, i) => (
                    <span className="line" key={line}>
                      <span style={idx(i)}>{line}</span>
                    </span>
                  ))}
                </h1>
                <p className="hero__intro">{text.hero.intro}</p>
                <div className="hero__actions">
                  <a className="btn btn--bone t-ui" href="#work">
                    {t.home.viewWork}
                  </a>
                  <a className="btn btn--wash t-ui" href="#contact">
                    {t.home.getInTouch}
                  </a>
                </div>
                <p className="t-meta hero__label" id="links-label">
                  {t.home.findMeOn}
                </p>
                <LinkSelector links={links} labelledBy="links-label" openLabel={t.links_selector.open} />
              </div>
              <Frame
                variant="plate"
                className="hero__art"
                src={site.photos.hero}
                alt={text.hero.photoAlt}
                label={t.home.portrait}
                sizes="(max-width: 860px) 100vw, 574px"
                priority
                reveal="load"
              />
            </div>

            <dl className="glance">
              {text.glance.filter(isReal).map((g) => (
                <div key={g.label}>
                  <dt className="t-meta">{g.label}</dt>
                  <dd>{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {featured && (
          <section className="featured" aria-labelledby="featured-title">
            <div className="wrap">
              <Frame
                variant="field"
                className="featured__frame"
                src={featured.cover}
                alt={featured.coverAlt}
                label={`${featured.title} — ${t.project.screenshot}`}
              />
              <div className="featured__body" {...rv("rule")}>
                <div>
                  <p className="t-meta dim" {...rv("fade")}>
                    {t.home.featured} · {featured.category}
                  </p>
                  <Rise className="t-section featured__title" id="featured-title" d0={80}>
                    {featured.title}
                  </Rise>
                  <p className="featured__text" {...rv("up", { d0: 60 })}>
                    {featured.summary}
                  </p>
                  <div className="featured__actions" {...rv("fade", { d0: 200 })}>
                    <Link className="btn btn--hue t-ui" href={to(`/work/${featured.slug}`)}>
                      {t.home.readCaseStudy}
                    </Link>
                    {featured.links.map((l) => (
                      <a key={l.href} className="btn btn--wash t-ui" href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
                <ul className="kv" {...rv("rule", { step: "s" })}>
                  <li {...rv("up-s", { d0: 150 })}>
                    <span className="t-meta dim">{t.facts.role}</span>
                    <span>{featured.role}</span>
                  </li>
                  <li {...rv("up-s", { d0: 150 })}>
                    <span className="t-meta dim">{t.facts.stack}</span>
                    <span>{featured.stack}</span>
                  </li>
                  <li {...rv("up-s", { d0: 150 })}>
                    <span className="t-meta dim">{t.facts.year}</span>
                    <span>{featured.year}</span>
                  </li>
                  <li {...rv("up-s", { d0: 150 })}>
                    <span className="t-meta dim">{t.facts.status}</span>
                    <span>{featured.status}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="band-back">
        <section className="work wrap" id="work" aria-labelledby="work-title">
          <div className="head-row">
            <Rise className="t-section" id="work-title">
              {t.home.work}
            </Rise>
            <a className="t-ui t-link head-row__link" href={site.links.github} target="_blank" rel="noreferrer" {...rv("fade", { d0: 200 })}>
              {t.home.allRepos}
            </a>
          </div>

          {strands.length > 0 && (
            <div className="work__grid">
              {strands.map((p) => (
                <Link key={p.slug} className="item" href={to(`/work/${p.slug}`)} {...rv("card")}>
                  <Frame
                    variant="plate"
                    className="item__plate"
                    src={p.cover}
                    alt={p.coverAlt}
                    label={p.kind}
                    sizes="(max-width: 960px) 100vw, 344px"
                    reveal="none"
                  />
                  <p className="t-meta item__label">{p.category}</p>
                  <h3 className="t-title item__title">{p.title}</h3>
                  <p className="item__text">{p.summary}</p>
                  <span className="t-ui t-link item__more">{t.home.caseStudy}</span>
                </Link>
              ))}
            </div>
          )}

          {index.length > 0 && (
            <div className="work__more">
              <p className="t-meta work__more-label" {...rv("fade")}>
                {t.home.moreProjects}
              </p>
              <div className="rows" {...rv("rule", { step: "s" })}>
                {index.map((p) => (
                  <Link key={p.slug} className="row" href={to(`/work/${p.slug}`)} {...rv("up-s")}>
                    <span className="row__title">{p.title}</span>
                    <span className="row__meta">{p.stack}</span>
                    <span className="row__meta row__end">{p.year}</span>
                    <span className="row__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="about wrap" id="about" aria-labelledby="about-title">
          <div className="head-row">
            <Rise className="t-section" id="about-title">
              {t.home.about}
            </Rise>
            {hasCv && (
              <a className="t-ui t-link head-row__link" href={cv} target="_blank" rel="noopener" {...rv("fade", { d0: 200 })}>
                {t.home.downloadCv}
              </a>
            )}
          </div>
          <div className="about__grid">
            <Frame
              variant="field"
              className="about__portrait"
              src={site.photos.about}
              alt={text.about.photoAlt}
              label={t.home.portrait}
              sizes="(max-width: 860px) 330px, 450px"
            />
            <div>
              <p className="t-lead about__lead" {...rv("up", { d0: 60 })}>
                {text.about.lead}
              </p>
              <p className="about__text" {...rv("up", { d0: 80 })}>
                {text.about.text}
              </p>
              <ul className="kv" {...rv("rule", { step: "s" })}>
                {text.about.facts.filter(isReal).map((f) => (
                  <li key={f.label} {...rv("up-s")}>
                    <span className="t-meta dim">{f.label}</span>
                    <span>{f.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="band-paper">
        <section className="contact wrap" id="contact" aria-labelledby="contact-title">
          <div className="contact__grid">
            <div>
              <Rise className="t-section" id="contact-title">
                {t.home.contactTitle}
              </Rise>
              <p className="contact__text" {...rv("up")}>
                {text.contact.text}
              </p>
              <ul className="contact__list" {...rv("rule", { step: "s" })}>
                <li {...rv("up-s")}>
                  <span className="t-meta dim">{t.home.email}</span>
                  <a className="contact__val" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
                <li {...rv("up-s")}>
                  <span className="t-meta dim">LinkedIn</span>
                  <a className="contact__val" href={site.links.linkedin} target="_blank" rel="noreferrer">
                    {display(site.links.linkedin).replace("linkedin.com/", "")}
                  </a>
                </li>
                <li {...rv("up-s")}>
                  <span className="t-meta dim">GitHub</span>
                  <a className="contact__val" href={site.links.github} target="_blank" rel="noreferrer">
                    {display(site.links.github).replace("github.com/", "")}
                  </a>
                </li>
                <li {...rv("up-s")}>
                  <span className="t-meta dim">{t.home.basedIn}</span>
                  <span className="contact__val">{text.location}</span>
                </li>
              </ul>
            </div>
            <ContactForm
              locale={locale}
              reasons={site.contactReasons.map((id) => ({ id, label: t.contact.reasons[id] }))}
              t={t.contact}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
