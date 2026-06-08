"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   AboutHero — Frame 1: "Born in South Africa."
   Full-viewport cinematic opener with scroll parallax.
   ───────────────────────────────────────────────────────────────────────── */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WORDS = ["Born", "in", "South", "Africa"];

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: heading drifts up, opacity fades as you scroll away
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <section
      id="frame-born"
      ref={ref}
      className="relative min-h-[100svh] bg-indigo overflow-hidden flex flex-col justify-center grain"
      aria-label="About hero"
    >
      {/* Dot field */}
      <div
        className="absolute inset-0 dot-field pointer-events-none opacity-[0.13]"
        aria-hidden
      />

      {/* Coral atmospheric glow — zooms on scroll */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B5C 0%, transparent 62%)",
          scale: glowScale,
        }}
        animate={{ opacity: [0.07, 0.14, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spruit drift */}
      <motion.div
        aria-hidden
        className="absolute -top-[15%] -right-[10%] w-[45vw] h-[45vw]
                   rounded-full blur-[110px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content — parallax */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 w-full"
      >
        {/* Frame counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <span className="eyebrow text-dawn/18 tracking-[0.22em]">01 / 07</span>
        </motion.div>

        {/* Word-stagger heading */}
        <h1
          aria-label="Born in South Africa."
          className="font-display font-semibold leading-[0.90] tracking-[-0.045em]
                     text-[52px] sm:text-[80px] md:text-[110px] lg:text-[140px]"
        >
          {WORDS.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.22em] pb-[0.14em] mb-[-0.14em]">
              <motion.span
                className="inline-block text-dawn"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          {/* Coral period */}
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block text-stoep"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 320, damping: 14 }}
              aria-hidden
            >
              .
            </motion.span>
          </span>
        </h1>

        {/* Subtle location line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease }}
          className="mt-10 md:mt-14"
        >
          <span className="eyebrow text-dawn/25 tracking-[0.22em]">
            Johannesburg · London · Singapore · Back home
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-none"
        aria-hidden
      >
        <span className="eyebrow text-dawn/22 text-[10px] tracking-[0.22em]">scroll</span>
        <motion.svg
          width="12" height="20" viewBox="0 0 12 20" fill="none"
          className="text-dawn"
          style={{ opacity: 0.22 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <path
            d="M6 0v14M1 9l5 6 5-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
