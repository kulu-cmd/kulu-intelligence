"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   AboutHero — Animated pop-art Bane speech hero
   SA adaptation: "You merely adopted the AI. We were born in it."
   Aesthetic: Lichtenstein / comic-panel energy on bg-indigo
   ───────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutHero() {
  return (
    <section
      className="relative min-h-screen bg-indigo overflow-hidden flex flex-col justify-center grain"
      aria-label="About hero"
    >

      {/* ── Ben-Day halftone dot field ── large dots, pop-art scale */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 107, 92, 0.16) 3.5px, transparent 3.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Mielie atmospheric glow — bloom behind the coral text */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          top: "42%",
          left: "38%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(255, 214, 107, 0.09) 0%, transparent 68%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Coral burst behind "WE WERE BORN IN IT" ── */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.05, ease }}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "380px",
          background:
            "radial-gradient(ellipse, rgba(255, 107, 92, 0.11) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 w-full py-28 md:py-36">

        {/* Line 1 — small, dim, left — "You think the AI wave" */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          className="font-display font-medium text-dawn/30 tracking-[-0.005em] mb-3 md:mb-4"
          style={{ fontSize: "clamp(14px, 2vw, 24px)" }}
        >
          You think the AI wave
        </motion.div>

        {/* Line 2 — MASSIVE outlined — "is your ally?" */}
        <div className="overflow-hidden mb-3 md:mb-4">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.32, ease }}
            className="font-display font-semibold leading-[0.88] tracking-[-0.05em] select-none"
            style={{
              fontSize: "clamp(52px, 10.5vw, 126px)",
              WebkitTextStroke: "2px rgba(255, 248, 232, 0.48)",
              color: "transparent",
            }}
          >
            is your ally?
          </motion.div>
        </div>

        {/* Line 3 — small, right-aligned — "You merely adopted it." */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.82, ease }}
          className="font-display font-medium text-dawn/40 tracking-[-0.015em] text-right mb-4 md:mb-6"
          style={{ fontSize: "clamp(15px, 2.2vw, 28px)" }}
        >
          You merely adopted it.
        </motion.div>

        {/* Line 4 — HERO SLAM — coral — "WE WERE BORN IN IT." */}
        <div className="overflow-hidden mb-3 md:mb-4">
          <motion.div
            initial={{ scale: 0.72, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
              delay: 1.12,
            }}
            className="font-display font-semibold text-stoep leading-[0.88] tracking-[-0.05em]"
            style={{ fontSize: "clamp(44px, 10.5vw, 124px)" }}
          >
            WE WERE BORN IN IT<span className="text-mielie">.</span>
          </motion.div>
        </div>

        {/* Line 5 — small, dim — "Moulded by it." */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 1.6, ease }}
          className="font-display font-medium text-dawn/35 tracking-[-0.01em] mb-3 md:mb-4"
          style={{ fontSize: "clamp(13px, 1.8vw, 22px)" }}
        >
          Moulded by it.
        </motion.div>

        {/* Line 6 — medium, mielie, right — "By then — nothing but blinding." */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.95, ease }}
          className="font-display font-medium text-mielie tracking-[-0.025em] text-right"
          style={{ fontSize: "clamp(20px, 3.5vw, 46px)" }}
        >
          By then — nothing but blinding<span className="text-stoep">.</span>
        </motion.div>

        {/* ── Hairline divider ── */}
        <motion.hr
          className="rule mt-12 md:mt-16 border-0"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 2.4, ease }}
          style={{ transformOrigin: "left", background: "rgba(255,248,232,0.14)" }}
        />

        {/* ── Forged line ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.75, ease }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8"
        >
          <p
            className="font-display font-semibold text-dawn leading-[1.0] tracking-[-0.035em]"
            style={{ fontSize: "clamp(20px, 3.2vw, 42px)" }}
          >
            This is where Kulu was forged<span className="text-stoep">.</span>
          </p>
          <span className="eyebrow text-dawn/28 sm:text-right shrink-0">
            Johannesburg · Singapore · Amsterdam · Back home
          </span>
        </motion.div>

      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden
      >
        <span className="eyebrow text-dawn/25 text-[10px]">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-7"
          style={{ background: "rgba(255,248,232,0.18)" }}
        />
      </motion.div>

    </section>
  );
}
