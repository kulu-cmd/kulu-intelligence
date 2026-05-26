"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a 2px coral hairline that fills left→right
 * as the user scrolls the page. Fixed at the very top, above
 * the SiteHeader. Fades in after 80px of scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-stoep origin-left z-[201] pointer-events-none"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
