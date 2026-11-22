"use client";

import Image, { type ImageProps } from "next/image";

/**
 * Hides an image only if it has not finished loading when the page hydrates, then lets it fade in
 * over its frame. `data-pending` is only ever set from here, so without JavaScript (or when the
 * image was already there) the picture is never hidden.
 */
const fadeWhenLoaded = (img: HTMLImageElement | null) => {
  if (!img || img.complete) return;
  img.setAttribute("data-pending", "");
  const done = () => img.removeAttribute("data-pending");
  img.addEventListener("load", done, { once: true });
  img.addEventListener("error", done, { once: true });
};

export function FrameImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} ref={fadeWhenLoaded} />;
}
