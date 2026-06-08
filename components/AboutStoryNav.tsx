"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   AboutStoryNav — Sticky side navigation for "The Long Walk Home"
   7 dots on the right edge, active one pulses coral with a label.
   Fades in after scrolling past the hero. Click to scroll to frame.
   ───────────────────────────────────────────────────────────────────────── */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FRAMES = [
  { id: "frame-born",        label: "Born" },
  { id: "frame-somewhere",   label: "Abroad" },
  { id: "frame-machines",    label: "Machines" },
  { id: "frame-pivot",       label: "The pivot" },
  { id: "frame-home",        label: "Home" },
  { id: "frame-automations", label: "Automations" },
  { id: "frame-mission",     label: "Mission" },
];

export function AboutStoryNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = FRAMES.map((f) => document.getElementById(f.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    // Show nav after scrolling past 40vh
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Track active frame
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.35 }
    );

    els.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease }}
          className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50
                     flex flex-col items-end gap-5
                     hidden md:flex"
          aria-label="Story navigation"
        >
          {FRAMES.map((frame, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={frame.id}
                onClick={() => scrollTo(frame.id)}
                className="group flex items-center gap-3 cursor-pointer"
                aria-label={`Go to ${frame.label}`}
              >
                {/* Label — appears on hover or when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.25, ease }}
                      className="eyebrow text-[9px] tracking-[0.18em]"
                      style={{
                        color: activeIndex === 0 || activeIndex === 2 || activeIndex === 6
                          ? "rgba(255,248,232,0.45)"
                          : "rgba(26,43,71,0.40)",
                      }}
                    >
                      {frame.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <span className="relative flex items-center justify-center w-3 h-3">
                  {isActive && (
                    <motion.span
                      layoutId="story-dot-ring"
                      className="absolute inset-[-3px] rounded-full border border-stoep/50"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <motion.span
                    className="block rounded-full"
                    animate={{
                      width: isActive ? 8 : 4,
                      height: isActive ? 8 : 4,
                      backgroundColor: isActive ? "#FF6B5C" : "rgba(255,248,232,0.25)",
                    }}
                    transition={{ duration: 0.3, ease }}
                  />
                </span>
              </button>
            );
          })}

          {/* Frame counter */}
          <motion.span
            className="mt-2 font-mono text-[10px] tracking-[0.1em]"
            style={{
              color: activeIndex === 0 || activeIndex === 2 || activeIndex === 6
                ? "rgba(255,248,232,0.20)"
                : "rgba(26,43,71,0.20)",
            }}
            key={activeIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {String(activeIndex + 1).padStart(2, "0")}/{String(FRAMES.length).padStart(2, "0")}
          </motion.span>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
