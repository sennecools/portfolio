import Link from "next/link";
import { rv } from "@/components/rv";
import { getSiteText, site } from "@/content/site";
import { fill, type Locale, localeNames, localePath, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const text = getSiteText(locale);
  const to = (path: string) => localePath(locale, path);

  return (
    <footer className="band-night foot">
      <div className="wrap">
        <div className="foot__top">
          <Link className="foot__mark" href={to("/")}>
            Senne
            <br />
            Cools
          </Link>
          <nav className="foot__nav t-ui" aria-label={t.nav.footer}>
            <Link href={to("/#work")}>{t.nav.work}</Link>
            <Link href={to("/blog")}>{t.nav.blog}</Link>
            <Link href={to("/#about")}>{t.nav.about}</Link>
            <Link href={to("/#contact")}>{t.nav.contact}</Link>
          </nav>
          <div className="foot__social t-ui">
            <a href={site.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>{t.home.email}</a>
          </div>
        </div>
        <div className="foot__bottom t-ui" {...rv("rule")}>
          <p>
            © {new Date().getFullYear()} {site.name} · {fill(t.footer.basedIn, { location: text.location })}
          </p>
          <p className="foot__langs">
            {/* Every language links to its own home page; the current one is plain text. */}
            {locales.map((l) =>
              l === locale ? (
                <span key={l} aria-current="true">
                  {localeNames[l]}
                </span>
              ) : (
                <Link key={l} className="t-link" href={localePath(l, "/")} hrefLang={localeTags[l]} lang={localeTags[l]}>
                  {localeNames[l]}
                </Link>
              ),
            )}
            <a className="t-link" href="#top">
              {t.footer.backToTop}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
