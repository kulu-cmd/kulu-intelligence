"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * CustomCursor — coral dot that snaps exactly to the cursor (no position spring,
 * so zero lag) and morphs smoothly to a larger ring on interactive elements.
 *
 * Position: direct motion values (instant, no spring)
 * Size / colour: spring on the inner div only
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

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

  const size = variant === "label" ? 86 : variant === "hover" ? 42 : 10;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[120]"
      style={{ x, y }}
      aria-hidden
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          backgroundColor:
            variant === "default" ? "#FF6B5C" : "rgba(26,43,71,0.10)",
          borderColor:
            variant === "default"
              ? "transparent"
              : "rgba(26,43,71,0.25)",
          borderWidth: variant === "default" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 26, stiffness: 360, mass: 0.22 }}
        className="rounded-full flex items-center justify-center font-medium border"
        style={{
          fontSize: variant === "label" ? 11 : 0,
          color: "#1A2B47",
          letterSpacing: "0.04em",
          borderStyle: "solid",
        }}
      >
        {variant === "label" ? label : null}
      </motion.div>
    </motion.div>
  );
}
