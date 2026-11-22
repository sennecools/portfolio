import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Sans, League_Gothic } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RevealScript } from "@/components/reveal-script";
import { RouteFlag } from "@/components/route-flag";
import { getSiteText, site } from "@/content/site";
import { isLocale, locales, localeTags, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { alternates } from "@/i18n/metadata";
import "../globals.css";

// Archivo and League Gothic are loaded with their width axis: the design sets
// most headings in a condensed cut via `font-stretch`.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const leagueGothic = League_Gothic({ subsets: ["latin"], axes: ["wdth"], variable: "--font-league-gothic", display: "swap" });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-instrument-sans", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--font-dm-mono", display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

/** Every language is rendered at build time; the middleware maps the URLs onto these. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${meta.tagline}`, template: `%s — ${site.name}` },
    description: getSiteText(locale).description,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    alternates: alternates(locale, "/"),
  };
}

export const viewport: Viewport = { themeColor: "#131110", colorScheme: "dark" };

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fonts = [archivo, leagueGothic, instrumentSans, dmMono].map((f) => f.variable).join(" ");
  return (
    // data-scroll-behavior lets Next suspend `html{scroll-behavior:smooth}` while it changes route.
    // suppressHydrationWarning: the reveal script and RouteFlag put their own data attributes on <html>.
    <html lang={localeTags[locale]} className={fonts} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <RevealScript />
        <RouteFlag />
        <div className="page" id="top">
          <Nav locale={locale} t={getDictionary(locale).nav} />
          {children}
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
