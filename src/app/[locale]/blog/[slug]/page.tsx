import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Frame } from "@/components/frame";
import { mdxComponents } from "@/components/mdx";
import { Rise, Words } from "@/components/rise";
import { rv } from "@/components/rv";
import { defaultLocale, fill, isLocale, localePath, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { alternates } from "@/i18n/metadata";
import { adjacentPosts, formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllPosts().map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post || !isLocale(locale)) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
    alternates: alternates(locale, `/blog/${post.slug}`),
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const t = getDictionary(locale).blog;
  const to = (p: string) => localePath(locale, p);
  // Posts are written in English. On a page in another language the post text is marked as
  // English, and a line under the title says so.
  const translated = locale !== defaultLocale;
  const postLang = translated ? localeTags[defaultLocale] : undefined;

  const all = getAllPosts();
  const { newer, older } = adjacentPosts(all, slug);
  const more = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      {/* Reading progress for the article, driven by scroll position in CSS alone. */}
      <div className="readbar" aria-hidden="true" />
      <div className="band-paper">
        <header className="ahead wrap">
          <div className="ahead__inner">
            <Link className="back t-ui" href={to("/blog")}>
              <span className="arr" aria-hidden="true">
                ←
              </span>{" "}
              {t.backToPosts}
            </Link>
            <p className="t-meta ahead__meta">
              <span>{formatDate(post.date, "long", locale)}</span>
              <span>{fill(t.minRead, { n: post.readingMinutes })}</span>
              {post.draft && <span>{t.draft}</span>}
              {post.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </p>
            <h1 className="t-hero ahead__title" lang={postLang}>
              <Words text={post.title} />
            </h1>
            {post.summary && (
              <p className="t-lead ahead__lede" lang={postLang}>
                {post.summary}
              </p>
            )}
            {translated && <p className="t-meta dim ahead__lang">{t.inEnglish}</p>}
          </div>
        </header>
        <div className="wrap acover-wrap">
          <Frame
            variant="plate"
            className="acover"
            src={post.cover}
            alt={post.coverAlt}
            label={post.tags[0] ?? t.post}
            priority
            reveal="load"
          />
        </div>
      </div>

      <div className="band-back">
        <div className="wrap abody">
          <article className="prose" lang={postLang}>
            <MDXRemote source={post.body} components={mdxComponents} />
          </article>

          <div className="afoot" {...rv("rule")}>
            <div className="tags" {...rv("fade")}>
              {post.tags.map((tag) => (
                <Link key={tag} href={to("/blog")}>
                  {tag}
                </Link>
              ))}
            </div>
            <a className="t-ui t-link" href="#top" {...rv("fade")}>
              {t.backToTop}
            </a>
          </div>

          {(older || newer) && (
            <nav className="pager" aria-label={t.pager}>
              {older ? (
                <Link href={to(`/blog/${older.slug}`)} {...rv("up-s")}>
                  <p className="t-meta dim">
                    <span className="arr" aria-hidden="true">
                      ←
                    </span>{" "}
                    {t.previous}
                  </p>
                  <p className="t-lead" lang={postLang}>
                    {older.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {newer ? (
                <Link href={to(`/blog/${newer.slug}`)} {...rv("up-s")}>
                  <p className="t-meta dim">
                    {t.next}{" "}
                    <span className="arr" aria-hidden="true">
                      →
                    </span>
                  </p>
                  <p className="t-lead" lang={postLang}>
                    {newer.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="band-paper more" aria-labelledby="more-title">
          <div className="wrap">
            <Rise className="t-section" id="more-title">
              {t.morePosts}
            </Rise>
            <div className="rows" {...rv("rule", { step: "s" })}>
              {more.map((p) => (
                <Link key={p.slug} className="row row--post" href={to(`/blog/${p.slug}`)} {...rv("up-s")}>
                  <span className="row__meta">{formatDate(p.date, "short", locale)}</span>
                  <span className="row__title" lang={postLang}>
                    {p.title}
                  </span>
                  <span className="row__meta row__end">{p.tags[0] ?? ""}</span>
                  <span className="row__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
