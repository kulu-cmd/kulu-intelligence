"use client";

import { useEffect } from "react";

/**
 * MotionGuard — failsafe for environments where requestAnimationFrame is
 * throttled or paused (background tabs, headless screenshot tools, low-power
 * modes). Adds a `motion-ready` class to <html> shortly after mount so a CSS
 * rule can force any unanimated motion content to its visible end state.
 *
 * Real users see the framer-motion animations play normally (well under
 * 1500ms); only stalled environments hit the fallback.
 */
export function MotionGuard() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const t = setTimeout(() => {
      document.documentElement.classList.add("motion-ready");
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  return null;
}
