import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * The pages live under `app/[locale]`. The default language is served without a prefix, so
 * `/blog` is rewritten to `/en/blog` behind the scenes, and `/en/blog` redirects to `/blog` so each
 * page has one address. Other languages keep their prefix: `/nl/blog` is served as it is.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next's own files, API routes and files with an extension
  // (images, the RSS feed, the sitemap), which are not pages.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
