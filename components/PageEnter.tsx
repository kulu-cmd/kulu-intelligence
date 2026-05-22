"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouteTransition } from "./RouteTransition";

/**
 * PageEnter — mounts on every sub-page and provides a secondary veil
 * that fades away beneath the retracting Shoji panels, preventing any
 * content flash as the new page is revealed.
 *
 * Lives at z-[150] — below the panels (z-[200]) but above page content.
 * Fades from full opacity → 0 as the panels retract, giving the page
 * content time to hydrate and render before being fully visible.
 */
export function PageEnter() {
  const { enterColour, consumeEnter } = useRouteTransition();

  useEffect(() => {
    if (!enterColour) return;
    // Consume after the veil has fully faded away
    const t = setTimeout(consumeEnter, 750);
    return () => clearTimeout(t);
  }, [enterColour, consumeEnter]);

  return (
    <AnimatePresence>
      {enterColour && (
        <motion.div
          key={enterColour}
          className="pointer-events-none fixed inset-0 z-[150]"
          style={{ backgroundColor: enterColour }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay:    0.12, // slight hold before fading, so panels have started retracting
            ease:     [0.4, 0, 0.2, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
