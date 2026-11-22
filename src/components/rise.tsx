import type { ReactNode } from "react";
import { idx, rv } from "@/components/rv";

/**
 * A heading that rises out of its own baseline when it scrolls into view.
 * The text stays one intact node inside two wrappers, so nothing changes for search engines or screen readers.
 */
export function Rise({
  as: Tag = "h2",
  className,
  id,
  d0,
  children,
}: {
  as?: "h2" | "p";
  className?: string;
  id?: string;
  d0?: number;
  children: ReactNode;
}) {
  return (
    <Tag className={className} id={id} {...rv("mask", { d0 })}>
      <span className="line">
        <span>{children}</span>
      </span>
    </Tag>
  );
}

/** Splits a page title into words that rise one after another on load (CSS only). Real spaces stay between them. */
export function Words({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    // Words can repeat, so the position is part of the key.
    <span key={`${word}-${i}`}>
      {i > 0 && " "}
      <span className="w">
        <span style={idx(i)}>{word}</span>
      </span>
    </span>
  ));
}
