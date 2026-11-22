import { getSiteText, site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";
import { buildRss } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const xml = buildRss(
    { title: `${site.name} — Blog`, description: getSiteText("en").blog.intro, siteUrl: site.url },
    getAllPosts(false),
  );
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
