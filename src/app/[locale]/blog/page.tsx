import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/frame";
import { PostList } from "@/components/post-list";
import { Rise, Words } from "@/components/rise";
import { getSiteText } from "@/content/site";
import { defaultLocale, isLocale, localePath, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { alternates } from "@/i18n/metadata";
import { collectTags, formatDate, getAllPosts } from "@/lib/posts";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: getDictionary(locale).blog.title,
    description: getSiteText(locale).blog.intro,
    alternates: alternates(locale, "/blog"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).blog;
  const posts = getAllPosts();
  const latest = posts[0];
  // Posts are written in English; on pages in another language they say so to screen readers.
  const postLang = locale === defaultLocale ? undefined : localeTags[defaultLocale];

  return (
    <main>
      <section className="band-paper bhead">
        <div className="wrap">
          <p className="t-meta dim">{t.title}</p>
          <h1 className="t-hero bhead__title">
            <Words text={t.heading} />
          </h1>
          <p className="bhead__sub">{getSiteText(locale).blog.intro}</p>

          {latest && (
            <Link className="bfeat" href={localePath(locale, `/blog/${latest.slug}`)}>
              <Frame
                variant="plate"
                className="bfeat__plate"
                src={latest.cover}
                alt={latest.coverAlt}
                label={latest.tags[0] ?? t.post}
                sizes="(max-width: 860px) 100vw, 528px"
                priority
                reveal="load"
              />
              <div>
                <p className="t-meta dim">
                  {t.latest} · {formatDate(latest.date, "month", locale)}
                  {latest.tags[0] ? ` · ${latest.tags[0]}` : ""}
                </p>
                <h2 className="t-title bfeat__title" lang={postLang}>
                  {latest.title}
                </h2>
                <p className="bfeat__text" lang={postLang}>
                  {latest.summary}
                </p>
                <span className="t-ui t-link bfeat__more">{t.readPost}</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="band-back blist" aria-labelledby="all-title">
        <div className="wrap">
          <Rise className="t-section" id="all-title">
            {t.allPosts}
          </Rise>
          <PostList
            tags={collectTags(posts)}
            t={{ all: t.all, filter: t.filter, empty: t.empty }}
            posts={posts.map((p) => ({
              slug: p.slug,
              href: localePath(locale, `/blog/${p.slug}`),
              title: p.title,
              date: formatDate(p.date, "short", locale),
              tag: p.tags[0] ?? "",
              tags: p.tags,
            }))}
          />
          <div className="older t-ui">
            <span />
            <a className="t-link" href="/blog/rss.xml">
              {t.rss}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
