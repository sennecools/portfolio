"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type ShowcaseSlide = { src: string; alt: string; caption?: string; size: { width: number; height: number } };

type Props = {
  slides: ShowcaseSlide[];
  label: string;
  labels: { previous: string; next: string; slide: string };
  /** Seconds each slide stays before the next one. */
  seconds?: number;
};

const pad = (n: number) => String(n).padStart(2, "0");
const isAnimated = (src: string) => /\.(gif|webp)$/.test(src);

/**
 * The image slideshow at the top of a case study. It advances on its own while nobody is
 * interacting with it; the bar under the active thumbnail shows when the next image comes.
 * The timer is a CSS animation, so pausing is just pausing that animation, and under
 * reduced motion the animation is off and the slides only change by hand.
 */
export function Showcase({ slides, label, labels, seconds = 6 }: Props) {
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const [hidden, setHidden] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const total = slides.length;

  const go = useCallback((to: number) => setIndex(((to % total) + total) % total), [total]);

  // Stop the clock while the tab is in the background or the slideshow is off screen.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(([e]) => setHidden(!e?.isIntersecting || document.hidden));
    if (root.current) io.observe(root.current);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  const fill = (n: number) => labels.slide.replace("{n}", String(n)).replace("{total}", String(total));
  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <div
      ref={root}
      className="pshow"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-paused={hold || hidden ? "" : undefined}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        else if (e.key === "ArrowLeft") go(index - 1);
        else return;
        e.preventDefault();
      }}
    >
      <div
        className="pshow__stage"
        style={{ aspectRatio: `${slide.size.width} / ${slide.size.height}` }}
        onPointerDown={(e) => (start.current = e.clientX)}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="pshow__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={fill(i + 1)}
            aria-hidden={i !== index}
            data-on={i === index ? "" : undefined}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(max-width: 860px) 100vw, 1200px"
              quality={90}
              priority={i === 0}
              unoptimized={isAnimated(s.src)}
              draggable={false}
            />
          </div>
        ))}
        {total > 1 && (
          <>
            <button type="button" className="pshow__arrow pshow__arrow--prev" aria-label={labels.previous} onClick={() => go(index - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" className="pshow__arrow pshow__arrow--next" aria-label={labels.next} onClick={() => go(index + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>

      <div className="pshow__meta">
        <p className="pshow__caption" aria-live={hold ? "polite" : "off"}>
          {slide.caption ?? slide.alt}
        </p>
        {total > 1 && (
          <p className="t-meta pshow__count">
            {pad(index + 1)} <span>/ {pad(total)}</span>
          </p>
        )}
      </div>

      {total > 1 && (
        <div className="pshow__thumbs">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className="pshow__thumb"
              aria-label={fill(i + 1)}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
            >
              <Image src={s.src} alt="" fill sizes="160px" unoptimized={isAnimated(s.src)} />
              <span className="pshow__bar">
                {i === index && (
                  <span
                    key={index}
                    className="pshow__fill"
                    style={{ animationDuration: `${seconds}s` }}
                    onAnimationEnd={() => go(index + 1)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
