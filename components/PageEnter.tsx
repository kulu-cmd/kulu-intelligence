"use client";

import { useEffect } from "react";
import { useRouteTransition } from "./RouteTransition";

/**
 * PageEnter — mounts on every sub-page and consumes the route-transition
 * "enter colour" after a short delay, so the context doesn't carry over to
 * future navigations. The route-transition overlay handles the visible fade.
 */
export function PageEnter() {
  const { enterColour, consumeEnter } = useRouteTransition();
  useEffect(() => {
    if (!enterColour) return;
    const t = setTimeout(() => consumeEnter(), 800);
    return () => clearTimeout(t);
  }, [enterColour, consumeEnter]);
  return null;
}
