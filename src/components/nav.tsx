"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { idx } from "@/components/rv";
import { type Locale, localeNames, localePath, locales, localeTags, splitLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

/** Paths are written as in the default language; `localePath` adds the prefix of the page’s language. */
const LINKS = [
  { href: "/#work", key: "work", slot: "nav__1", section: "/work" },
  { href: "/blog", key: "blog", slot: "nav__2", section: "/blog" },
  { href: "/#about", key: "about", slot: "nav__4", section: null },
  { href: "/#contact", key: "contact", slot: "nav__5", section: null },
] as const;

/** The home-page sections the nav follows while you scroll (the ids behind the `/#…` links). */
const SPIED = LINKS.flatMap((l) => (l.href.startsWith("/#") ? [l.href.slice(2)] : []));

/** Without JavaScript the menu button cannot open the panel, so the links sit in a plain row under the bar. */
const NO_SCRIPT_CSS =
  "@media (max-width:860px){.nav{position:absolute}.nav__menu{display:none}" +
  ".nav__panel{position:static;clip-path:none;visibility:visible;padding-block:8px 12px}" +
  ".nav__panel .wrap{display:flex;flex-wrap:wrap;gap:4px 20px}" +
  ".nav__panel a{opacity:1;translate:none;font-size:24px}}";

export function Nav({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  // `path` is the page without its language prefix, so the checks below work the same in every language.
  const pathname = usePathname();
  const { path } = splitLocale(pathname);
  const others = locales.filter((l) => l !== locale);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [spied, setSpied] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenu(false), [pathname]);

  // Escape closes the mobile menu and hands focus back to its button.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  // On the home page, follow which section sits on a line 40% down the viewport. The result is only
  // committed once it has been stable for a moment, so a smooth jump from Work to Contact does not
  // flash About on the way past.
  useEffect(() => {
    if (path !== "/" || !("IntersectionObserver" in window)) return;
    const inView = new Set<string>();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target.id);
          else inView.delete(e.target.id);
        }
        clearTimeout(timer);
        timer = setTimeout(() => setSpied(SPIED.find((id) => inView.has(id)) ?? null), 120);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const id of SPIED) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      setSpied(null);
    };
  }, [path]);

  const current = (section: string | null) => (section && path.startsWith(section) ? "page" : undefined);
  /** "Current section" is a different state from "current page": it only gets the line, not the colour. */
  const reading = (href: string) => (path === "/" && spied !== null && href === `/#${spied}` ? "" : undefined);
  const link = (i: number) => {
    const l = LINKS[i]!;
    return (
      <Link className={`nav__link ${l.slot}`} href={localePath(locale, l.href)} aria-current={current(l.section)} data-current={reading(l.href)}>
        {t[l.key]}
      </Link>
    );
  };

  // The bar gets a solid background once the page has scrolled, or while the menu is open.
  return (
    <header className={scrolled || menu ? "nav nav--compact" : "nav"}>
      <nav className="nav__inner wrap" aria-label={t.main}>
        {link(0)}
        {link(1)}
        <Link className="nav__mark" href={localePath(locale, "/")} aria-label={t.home}>
          <span>Senne</span> <span>Cools</span>
        </Link>
        {link(2)}
        {link(3)}
        {/* The same page in the other language(s). */}
        {others.map((l) => (
          <Link key={l} className="nav__lang" href={localePath(l, path)} hrefLang={localeTags[l]} lang={localeTags[l]} aria-label={localeNames[l]}>
            {l.toUpperCase()}
          </Link>
        ))}
        <button
          ref={menuButton}
          className="nav__menu"
          type="button"
          aria-controls="nav-menu"
          aria-expanded={menu}
          aria-label={menu ? t.closeMenu : t.openMenu}
          onClick={() => setMenu((m) => !m)}
        >
          {/* Three strokes that fold into a cross (CSS, keyed off aria-expanded) instead of swapping path data. */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M2 5h14" />
            <path d="M2 9h14" />
            <path d="M2 13h14" />
          </svg>
        </button>
      </nav>
      {/* Always in the DOM so it can animate shut. While closed it is `visibility:hidden`,
          which also takes its links out of the tab order and the accessibility tree. */}
      <div id="nav-menu" className="nav__panel" data-open={menu ? "" : undefined}>
        <div className="wrap">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              className="t-title"
              href={localePath(locale, l.href)}
              aria-current={current(l.section)}
              data-current={reading(l.href)}
              style={idx(i)}
              onClick={() => setMenu(false)}
            >
              {t[l.key]}
            </Link>
          ))}
        </div>
      </div>
      <noscript>
        <style>{NO_SCRIPT_CSS}</style>
      </noscript>
    </header>
  );
}
