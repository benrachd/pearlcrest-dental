"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches, updating on change.
 * Returns `false` on the server and during the first client render to avoid
 * hydration mismatches; the real value is applied after mount.
 *
 * Example: `const isDesktop = useMediaQuery("(min-width: 1024px)");`
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
