"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — a coral dot that follows the cursor with spring physics.
 * Grows and softens when over interactive elements (a, button, [data-cursor]).
 * Disabled on touch / coarse-pointer devices and when prefers-reduced-motion.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 22, stiffness: 250, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const [variant, setVariant] = useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = useState<string>("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    setActive(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>("a, button, [data-cursor]");
      if (!el) {
        setVariant("default");
        setLabel("");
        return;
      }
      const lab = el.getAttribute("data-cursor-label");
      if (lab) {
        setVariant("label");
        setLabel(lab);
      } else {
        setVariant("hover");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!active) return null;

  const size = variant === "label" ? 92 : variant === "hover" ? 48 : 14;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[120] mix-blend-difference"
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          backgroundColor: variant === "default" ? "#FF6B5C" : "#FFF8E8",
          color: "#1A2B47",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="rounded-full flex items-center justify-center font-medium tracking-wide"
        style={{ fontSize: variant === "label" ? 12 : 0 }}
      >
        {variant === "label" ? label : null}
      </motion.div>
    </motion.div>
  );
}
