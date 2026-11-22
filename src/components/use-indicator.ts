"use client";

import { useEffect, type RefObject } from "react";

/**
 * Drives the sliding block behind a group of tabs. It measures the selected child against the
 * `.links__ind` layer and writes `--ind-l` / `--ind-r` (px) on the group; the stylesheet turns those
 * into a clip-path window. `data-ind` is only set after the first measure, so without JavaScript the
 * selected tab simply keeps its own background.
 *
 * @param selected CSS selector of the selected child inside the group
 * @param key anything that changes when the selection changes
 */
export function useSlidingIndicator(group: RefObject<HTMLElement | null>, selected: string, key: unknown) {
  useEffect(() => {
    const el = group.current;
    if (!el) return;
    let frame = 0;
    let last = { l: -1, r: -1 };

    const measure = (animate: boolean) => {
      const layer = el.querySelector<HTMLElement>(".links__ind");
      const tab = el.querySelector<HTMLElement>(selected);
      if (!layer || !tab) return;
      const a = layer.getBoundingClientRect();
      const b = tab.getBoundingClientRect();
      if (a.width === 0) return;
      const l = Math.max(0, b.left - a.left);
      const r = Math.max(0, a.right - b.right);
      // Every run of this effect is followed at once by the ResizeObserver's first callback and by
      // an already-resolved fonts.ready. Unless the geometry really changed they must do nothing,
      // or they would cut the slide that the selection change has just started.
      if (!animate && Math.abs(l - last.l) < 0.5 && Math.abs(r - last.r) < 0.5) return;
      last = { l, r };
      if (!animate) {
        // A resize or a late font is a correction, not a selection: no travel.
        el.setAttribute("data-ind-still", "");
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => el.removeAttribute("data-ind-still"));
        });
      }
      el.style.setProperty("--ind-l", `${l}px`);
      el.style.setProperty("--ind-r", `${r}px`);
      el.setAttribute("data-ind", "");
    };

    measure(true);
    const still = () => measure(false);
    const observer = new ResizeObserver(still);
    observer.observe(el);
    void document.fonts?.ready.then(still);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [group, selected, key]);
}
