"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * HeroCard — cinematic landing canvas.
 *
 * Composition:
 *  - Full-bleed indigo card, dot-grain texture, drifting mesh-gradient blobs
 *  - Mouse-tracked radial spotlight in coral that warms the area near the cursor
 *  - Wordmark "Kulu." reveals letter-by-letter with a spring stagger;
 *    the coral period drops last with an elastic bounce
 *  - Tagline, kicker, and scroll affordance fade in on cascaded delays
 *  - Bottom marquee — slowly drifting brand mantra
 */

const letters = ["K", "u", "l", "u"];

export function HeroCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 28, stiffness: 80, mass: 0.6 });
  const smy = useSpring(my, { damping: 28, stiffness: 80, mass: 0.6 });

  // Subtle parallax on the wordmark — opposite direction of cursor, tiny
  const wordX = useTransform(smx, [0, 1], [10, -10]);
  const wordY = useTransform(smy, [0, 1], [6, -6]);

  // Spotlight CSS variables driven by motion values
  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const time = d.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Johannesburg",
      });
      setNow(`${time} SAST · Johannesburg`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-label="Kulu Intelligence — AI, made human."
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-indigo text-dawn"
    >
      {/* Mouse-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at var(--mx) var(--my), rgba(255,107,92,0.22), transparent 60%)`,
          ["--mx" as string]: spotX,
          ["--my" as string]: spotY,
        }}
      />

      {/* Drifting mesh-gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-[0.35]"
        style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-[25%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-[0.25]"
        style={{ background: "radial-gradient(circle, #FFD66B 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 25, 0], y: [0, 20, -25, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-[0.18]"
        style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
        animate={{ x: [0, 30, -25, 0], y: [0, 30, 10, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot-grain texture */}
      <div className="pointer-events-none absolute inset-0 dot-field opacity-[0.55]" aria-hidden />
      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(8,15,30,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Top kicker — minimal, no magazine framing */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="px-6 md:px-12 lg:px-16 pt-10 md:pt-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="block w-2 h-2 rounded-full bg-stoep"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <span className="eyebrow text-dawn/65">An African AI consultancy</span>
          </div>
          <span className="eyebrow text-dawn/55 tabular-nums">{now}</span>
        </motion.div>

        {/* Centre — wordmark + tagline */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-16">
          <motion.div
            style={{ x: wordX, y: wordY }}
            className="relative will-change-transform"
          >
            <h1
              className="font-display font-semibold leading-[0.85] tracking-[-0.05em] text-center text-[clamp(96px,18vw,260px)] flex items-baseline justify-center"
              aria-label="Kulu."
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.08,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{ overflow: "visible" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0, y: -40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{
                  delay: 0.78,
                  duration: 0.9,
                  type: "spring",
                  stiffness: 320,
                  damping: 14,
                }}
                className="inline-block text-stoep"
                aria-hidden
              >
                .
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="descriptor text-[13px] md:text-[15px] text-dawn/75 mt-6 md:mt-8"
          >
            INTELLIGENCE
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-display italic text-[20px] md:text-[26px] tracking-[-0.01em] text-dawn/85 mt-7 text-center"
          >
            AI, made human<span className="text-stoep">.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 max-w-[52ch] text-center text-[15px] md:text-[17px] leading-[1.65] text-dawn/70"
          >
            We teach teams how to use AI. We build the workflows that make it stick.
            Live before month-end.
          </motion.p>
        </div>

        {/* Bottom — scroll affordance + marquee */}
        <div className="relative pb-8 md:pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <span className="eyebrow text-dawn/55">Choose your path</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-dawn/35"
              aria-hidden
            />
          </motion.div>

          <Marquee />
        </div>
      </div>
    </section>
  );
}

/* — Marquee — slowly drifts the brand mantra, infinite */
function Marquee() {
  const items = [
    "AI, made human.",
    "Plain talk, real tools.",
    "Live before month-end.",
    "From the corner shop to the corner office.",
    "Joburg → Africa.",
    "We tried it. It worked.",
  ];
  return (
    <div className="overflow-hidden border-y border-dawn/15 py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display font-medium text-[18px] md:text-[22px] tracking-[-0.01em] text-dawn/70 flex items-center gap-12"
          >
            {item}
            <span className="text-stoep">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
