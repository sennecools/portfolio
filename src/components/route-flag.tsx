"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

/**
 * Sets `data-routed` on <html> the first time the route changes on the client, and leaves it there.
 * The stylesheet uses it to fade a new page in and to halve the delays of its head entrance, so a
 * navigation feels quicker than the first load. A layout effect, so it lands before the new page paints.
 */
export function RouteFlag() {
  const pathname = usePathname();
  const first = useRef(pathname);
  useLayoutEffect(() => {
    if (pathname !== first.current) document.documentElement.setAttribute("data-routed", "");
  }, [pathname]);
  return null;
}
