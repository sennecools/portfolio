import type { CSSProperties } from "react";

/** How an element arrives when it scrolls into view. The CSS for each kind lives in the Motion block of globals.css. */
export type RevealKind = "up" | "up-s" | "fade" | "mask" | "wipe" | "rule" | "card";

type RevealOptions = {
  /** Extra delay in milliseconds on top of the stagger the reveal script hands out. */
  d0?: number;
  /** "s" makes this element (or, set on a list, its children) step at 40ms instead of 60ms. */
  step?: "s";
};

/**
 * Props that mark an element for a one-shot scroll reveal: `<p {...rv("up")}>`.
 *
 * The inline reveal script (reveal-script.tsx) adds `data-in` and a `--d` delay to these elements,
 * possibly before React hydrates, so they carry `suppressHydrationWarning`: the extra attribute is
 * expected and must not be reported as a mismatch.
 */
export function rv(kind: RevealKind, { d0, step }: RevealOptions = {}) {
  return {
    "data-rv": kind,
    "data-rv-step": step,
    style: d0 ? ({ "--d0": `${d0}ms` } as CSSProperties) : undefined,
    suppressHydrationWarning: true,
  };
}

/** A stagger index for CSS (`--i`), used by the load entrances and the mobile menu. */
export const idx = (i: number) => ({ "--i": i }) as CSSProperties;
