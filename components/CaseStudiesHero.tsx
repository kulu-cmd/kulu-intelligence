"use client";

import { motion } from "framer-motion";

/**
 * CaseStudiesHero — editorial opening for the case studies page.
 * Two-line typographic composition: the first line ghosts back,
 * the second steps forward. The coral period is the only accent.
 */
export function CaseStudiesHero() {
  return (
    <section className="relative bg-dawn text-indigo overflow-hidden pt-36 md:pt-48 pb-16 md:pb-24">
      {/* Whisper of stoep warmth — top right, barely there */}
      <motion.div
        aria-hidden
        className="absolute -top-1/4 right-0 w-[55vw] h-[55vw] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)",
          opacity: 0.11,
        }}
        animate={{ x: [0, 28, -14, 0], y: [0, -22, 28, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-14 md:mb-20"
        >
          <motion.span
            className="block w-1.5 h-1.5 rounded-full bg-stoep flex-shrink-0"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <span className="eyebrow opacity-65">Practice — Client work</span>
        </motion.div>

        {/* Headline */}
        <h1 aria-label="Hear from our clients.">

          {/* Line 1: "Hear from" — recedes into the background */}
          <div className="overflow-hidden">
            <motion.span
              className="block font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[52px] sm:text-[80px] md:text-[112px] lg:text-[144px]
                         opacity-[0.18]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Hear from
            </motion.span>
          </div>

          {/* Line 2: "our clients." — steps forward, coral period punctuates */}
          <div className="overflow-hidden">
            <motion.span
              className="block font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[52px] sm:text-[80px] md:text-[112px] lg:text-[144px]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              our clients
              <motion.span
                className="inline-block text-stoep"
                initial={{ scale: 0, y: -24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 320,
                  damping: 14,
                }}
                aria-hidden
              >
                .
              </motion.span>
            </motion.span>
          </div>

        </h1>

        {/* Hairline rule — the quiet full stop at the section base */}
        <motion.div
          className="mt-14 md:mt-20 h-px bg-indigo/12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
