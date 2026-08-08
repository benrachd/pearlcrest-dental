"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` only after the component has mounted on the client.
 * Use to gate rendering that must not run during SSR / static generation
 * (e.g. reading `window`, `localStorage`, or third-party embeds), while
 * keeping the SSR and first client render output identical.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
