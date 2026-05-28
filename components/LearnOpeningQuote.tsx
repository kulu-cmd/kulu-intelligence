"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Reading-pace word reveal ───────────────────────────────────────────────
// Each word fires in with a scale punch + brightness flash, like a word
// registering as you read it in your head. Words already read sit calm.

const PACE = 0.20; // seconds between word onsets

const S1_WORDS = ["Education", "is", "the", "most", "powerful"];
const S2_WORDS = ["weapon", "which", "you", "can", "use", "to"];
const S3_WORDS = ["change", "the", "world."];

const S1_START = 1.4;
// Small natural pause between stanzas — mimics the eye jumping to the next line
const S2_START = S1_START + S1_WORDS.length * PACE + 0.18;
const S3_START = S2_START + S2_WORDS.length * PACE + 0.22;

// Last word onset + settle duration
const READING_DONE = S3_START + (S3_WORDS.length - 1) * PACE + 0.55;
const ATTR_DELAY   = READING_DONE + 0.28;
const SCROLL_DELAY = ATTR_DELAY   + 0.50;

// 2.7 s of rest after the last word settles → auto-scroll to next section
const AUTO_SCROLL_DELAY_MS = Math.round((READING_DONE + 2.7) * 1000) - 1000;

// ─── Word component ─────────────────────────────────────────────────────────
// Scale punch: 0.78 → 1.13 → 0.96 → 1.0 (overshoot = the recognition jolt)
// Brightness:  2.4  → 1.55 → 1.0        (flash = the neuron firing)
// y drop:      -9   →  2   → -0.5 → 0   (word "lands" on your vision)
// `ready` gates the animate so nothing fires until the page has painted.

function Word({ text, delay, ready }: { text: string; delay: number; ready: boolean }) {
  return (
    <span className="inline-block mr-[0.22em]">
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, scale: 0.78, y: -9, filter: "brightness(2.4)" }}
        animate={ready ? {
          opacity: 1,
          scale:  [0.78, 1.13, 0.96, 1.0],
          y:      [-9,    2,  -0.5,   0],
          filter: ["brightness(2.4)", "brightness(1.55)", "brightness(1.0)"],
        } : {}}
        transition={{
          opacity: { duration: 0.15, delay, ease: "easeOut" },
          scale:   { duration: 0.54, delay, times: [0, 0.26, 0.62, 1] },
          y:       { duration: 0.54, delay, times: [0, 0.26, 0.62, 1] },
          filter:  { duration: 0.54, delay, times: [0, 0.38, 1] },
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function LearnOpeningQuote() {
  const ref = useRef<HTMLElement>(null);

  // Wait for two animation frames (one to commit, one to paint) before
  // starting any animations — prevents words firing before the page renders.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let raf1: number, raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true));
    });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY       = useTransform(scrollYProgress, [0, 1],    [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1,   0]);

  // Auto-scroll countdown starts only after the page has painted.
  // Cancelled immediately if the user scrolls manually first.
  useEffect(() => {
    if (!ready) return;

    let userScrolled = false;
    const onScroll = () => { userScrolled = true; };
    window.addEventListener("scroll", onScroll, { once: true, passive: true });

    const id = setTimeout(() => {
      if (!userScrolled) {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }, AUTO_SCROLL_DELAY_MS);

    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ready]);

  return (
    <section
      ref={ref}
      className="relative bg-indigo min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* ── Background atmosphere ─────────────────────────────────────────── */}

      <div
        className="absolute inset-0 dot-field pointer-events-none"
        style={{ opacity: 0.13 }}
        aria-hidden
      />

      {/* Coral glow — breathing behind the words */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[72vw] h-[72vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 62%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute -top-[15%] -right-[8%] w-[48vw] h-[48vw]
                   rounded-full blur-[110px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute -bottom-[10%] -left-[6%] w-[38vw] h-[38vw]
                   rounded-full blur-[90px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD66B 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-16"
      >
        <blockquote
          aria-label='"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela'
        >

          {/* Ghost opening quote mark — anchored top-left, atmospheric */}
          <motion.div
            aria-hidden
            className="font-display font-semibold text-stoep leading-none select-none pointer-events-none
                       text-[96px] sm:text-[124px] md:text-[156px] mb-[-0.18em]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 0.14 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: easeKulu }}
          >
            &ldquo;
          </motion.div>

          {/* ── Stanza 1: the setup ── */}
          <p className="font-display font-semibold text-dawn leading-[1.08] tracking-[-0.025em]
                        text-[34px] sm:text-[46px] md:text-[60px]">
            {S1_WORDS.map((w, i) => (
              <Word key={w + i} text={w} delay={S1_START + i * PACE} ready={ready} />
            ))}
          </p>

          {/* ── Stanza 2: bridge (quieter — container dims the words) ── */}
          <p
            className="font-display font-medium text-dawn leading-[1.2] tracking-[-0.015em]
                       text-[20px] sm:text-[26px] md:text-[32px] mt-3 md:mt-4"
            style={{ opacity: 0.46 }}
          >
            {S2_WORDS.map((w, i) => (
              <Word key={w + i} text={w} delay={S2_START + i * PACE} ready={ready} />
            ))}
          </p>

          {/* ── Stanza 3: the payload ── */}
          <p className="font-display font-semibold text-stoep leading-[1.04] tracking-[-0.03em]
                        text-[50px] sm:text-[66px] md:text-[88px] mt-1 md:mt-2">
            {S3_WORDS.map((w, i) => (
              <Word key={w + i} text={w} delay={S3_START + i * PACE} ready={ready} />
            ))}
            {/* Closing quote mark — fades in after the last word lands */}
            <motion.span
              className="inline-block ml-[0.06em]"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 0.30 } : {}}
              transition={{
                duration: 0.5,
                delay: S3_START + (S3_WORDS.length - 1) * PACE + 0.18,
                ease: easeKulu,
              }}
              aria-hidden
            >
              &rdquo;
            </motion.span>
          </p>

          {/* ── Attribution ── */}
          <motion.footer
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: ATTR_DELAY, ease: easeKulu }}
            className="mt-8 md:mt-10 flex items-center justify-end gap-4"
          >
            <motion.span
              className="block h-px bg-dawn"
              initial={{ width: 0 }}
              animate={ready ? { width: 40 } : {}}
              transition={{ duration: 0.7, delay: ATTR_DELAY + 0.1, ease: easeKulu }}
              style={{ opacity: 0.22 }}
              aria-hidden
            />
            <p className="eyebrow text-dawn tracking-[0.2em]" style={{ opacity: 0.42 }}>
              Nelson Mandela
            </p>
          </motion.footer>

        </blockquote>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: SCROLL_DELAY, duration: 1, ease: easeKulu }}
        aria-hidden
      >
        <motion.span
          className="eyebrow text-dawn"
          style={{ opacity: 0.22, letterSpacing: "0.22em" }}
        >
          scroll
        </motion.span>
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
