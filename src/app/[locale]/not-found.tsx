"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Words } from "@/components/rise";
import { localePath, splitLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/** A not-found page gets no params, so it reads the language from the address instead. */
export default function NotFound() {
  const { locale } = splitLocale(usePathname());
  const t = getDictionary(locale).notFound;
  return (
    <main className="band-paper">
      <section className="wrap notfound">
        <p className="t-meta dim">404</p>
        <h1 className="t-hero notfound__title">
          <Words text={t.title} />
        </h1>
        <p>{t.text}</p>
        <Link className="btn btn--bone t-ui" href={localePath(locale, "/")}>
          {t.home}
        </Link>
      </section>
    </main>
  );
}
