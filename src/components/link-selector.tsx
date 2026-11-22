"use client";

import { useEffect, useRef, useState } from "react";
import { useSlidingIndicator } from "@/components/use-indicator";
import { fill } from "@/i18n/config";

export type SelectorLink = { id: string; label: string; display: string; href: string };

/** Milliseconds per character when an address types itself out. */
const TYPE_SPEED = 22;

const OpenIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M5 1.5H1.5v9h9V7" stroke="currentColor" strokeWidth="1.25" />
    <path className="links__arrow" d="M7 1.5h3.5V5M10.5 1.5 5.5 6.5" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

/** The "Find me on" tabs in the hero: pick a destination, then the whole address row opens it. */
/** `openLabel` is the accessible name of the open button, with a {label} placeholder. */
export function LinkSelector({ links, labelledBy, openLabel }: { links: SelectorLink[]; labelledBy: string; openLabel: string }) {
  const [active, setActive] = useState(0);
  // `null` means "show the whole address". It is only a number while an address is typing itself out,
  // so the first render (and anyone who prefers reduced motion) always gets the full text.
  const [typed, setTyped] = useState<number | null>(null);
  // After the last character the caret lingers for two blinks and fades, instead of vanishing mid-word.
  const [settling, setSettling] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabs = useRef<HTMLDivElement>(null);
  useSlidingIndicator(tabs, ".links__tab[aria-selected='true']", active);

  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

  const current = links[active] ?? links[0];
  if (!current) return null;

  const pick = (i: number) => {
    if (timer.current) clearInterval(timer.current);
    setActive(i);
    setSettling(false);
    const target = links[i];
    if (!target || i === active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(null);
      return;
    }
    let n = 0;
    setTyped(0);
    timer.current = setInterval(() => {
      n += 1;
      if (n < target.display.length) {
        setTyped(n);
        return;
      }
      if (timer.current) clearInterval(timer.current);
      setTyped(null);
      setSettling(true);
    }, TYPE_SPEED);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = links.length - 1;
    let next: number;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    pick(next);
    document.getElementById(`links-tab-${links[next]!.id}`)?.focus();
  };

  const typing = typed !== null;

  return (
    <div className="links">
      <div className="links__body">
        <div className="links__tabs" role="tablist" aria-labelledby={labelledBy} onKeyDown={onKeyDown} ref={tabs}>
          {/* The one block that slides between the tabs (see use-indicator.ts). */}
          <span className="links__ind" aria-hidden="true" />
          {links.map((l, i) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              className="links__tab"
              id={`links-tab-${l.id}`}
              aria-selected={i === active}
              aria-controls="links-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => pick(i)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="links__panel" role="tabpanel" id="links-panel" aria-labelledby={`links-tab-${current.id}`}>
          <a
            className="links__link"
            href={current.href}
            target="_blank"
            rel="noreferrer"
            aria-label={fill(openLabel, { label: current.label })}
          >
            <code>
              <span className="links__text">{typing ? current.display.slice(0, typed) : current.display}</span>
              {typing && <span className="caret" aria-hidden="true" />}
              {settling && !typing && (
                <span
                  className="caret caret--out"
                  aria-hidden="true"
                  onAnimationEnd={(e) => {
                    if (e.animationName === "fade-out") setSettling(false);
                  }}
                />
              )}
            </code>
            <span className="links__open">
              <OpenIcon />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
