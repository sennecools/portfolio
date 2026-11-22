import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";
import { rv } from "@/components/rv";
import { parseFence } from "@/lib/fence";

function CodeBlock({ children }: { children?: ReactNode }) {
  const code = isValidElement<{ className?: string; children?: ReactNode }>(children) ? children : null;
  const { language, file } = parseFence(code?.props.className);
  return (
    <div className="codeblock">
      {(language || file) && (
        <div className="codeblock__bar">
          <span>{file}</span>
          <span>{language}</span>
        </div>
      )}
      <pre>
        <code>{code ? code.props.children : children}</code>
      </pre>
    </div>
  );
}

/** How markdown elements map onto the design's post styles. */
export const mdxComponents: MDXComponents = {
  pre: CodeBlock,
  img: ({ src, alt }) => (
    <figure className="afig">
      {/* Post images are plain files in /public; their size is unknown at build time.
          The wrapper is the frame that wipes open when the figure scrolls into view. */}
      <div className="afig__frame" {...rv("wipe")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" />
      </div>
      {alt && <figcaption className="t-meta">{alt}</figcaption>}
    </figure>
  ),
};
