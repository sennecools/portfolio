"use client";

import { useEffect } from "react";

/** Marks the section currently being read with `data-current`, so its sticky label can light up. Renders nothing. */
export function SectionSpy({ selector }: { selector: string }) {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;
    // A one-percent band a fifth of the way down the viewport: at most one section crosses it at a time.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            for (const s of sections) s.toggleAttribute("data-current", s === e.target);
          } else {
            e.target.removeAttribute("data-current");
          }
        }
      },
      { rootMargin: "-20% 0px -79% 0px" },
    );
    for (const s of sections) observer.observe(s);
    return () => {
      observer.disconnect();
      for (const s of sections) s.removeAttribute("data-current");
    };
  }, [selector]);
  return null;
}
