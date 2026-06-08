"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────
   AboutDiscovery — Frames 2–7 of "The Long Walk Home"
   Each frame = one thought, one breath, one surface colour.
   Enhanced with scroll-linked parallax and richer atmosphere.
   ───────────────────────────────────────────────────────────────────────── */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Parallax heading helper ─────────────────────────────────────────────

function useHeadingParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return { ref, y };
}

// ── Frame 2: "Grew up somewhere else." ──────────────────────────────────

function FrameSomewhere() {
  const { ref, y } = useHeadingParallax();
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "0.7 start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="frame-somewhere"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-dawn text-indigo py-28 md:py-44 overflow-hidden"
    >
      {/* Warm glow top-right */}
      <motion.div
        aria-hidden
        className="absolute -top-[15%] -right-[10%] w-[45vw] h-[45vw]
                   rounded-full blur-[120px] opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD66B 0%, transparent 70%)" }}
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        <motion.div style={{ y }}>
          <Reveal>
            <div className="eyebrow opacity-30 mb-6">02 / 07</div>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[40px] sm:text-[56px] md:text-[80px] lg:text-[96px] max-w-[14ch]"
            >
              Grew up somewhere else<span className="text-stoep">.</span>
            </h2>
          </Reveal>
        </motion.div>

        <Reveal delay={0.12}>
          <p className="mt-8 md:mt-12 text-[16px] md:text-[18px] leading-[1.75] opacity-55 max-w-[48ch]">
            Kulu was born in South Africa but sadly grew up and studied abroad.
            The UK first, then Singapore. Different accents, different weather,
            same restlessness.
          </p>
        </Reveal>

        {/* Journey line — draws as you scroll */}
        <div ref={lineRef} className="mt-14 md:mt-20 relative">
          <div className="h-px bg-indigo/10 w-full" />
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-stoep rounded-full"
            style={{ width: lineWidth }}
          />

          {/* Waypoint markers */}
          <div className="flex justify-between mt-6">
            {[
              { city: "Johannesburg", label: "Born" },
              { city: "London", label: "Studied" },
              { city: "Singapore", label: "Worked" },
            ].map((stop, i) => (
              <Reveal key={stop.city} delay={0.15 + i * 0.12}>
                <div className="flex flex-col items-center gap-2.5">
                  {/* Pulsing dot */}
                  <span className="relative">
                    <motion.span
                      className="absolute inset-[-4px] rounded-full bg-stoep/20"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="relative block w-2.5 h-2.5 rounded-full bg-stoep" />
                  </span>
                  <span className="font-display font-medium text-[14px] md:text-[16px] tracking-[-0.015em]">
                    {stop.city}
                  </span>
                  <span className="eyebrow opacity-35">{stop.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Frame 3: "Built machines for people who didn't need help." ──────────

const TICKER_ROWS = [
  "0.00234 · SELL 1200 · BUY 0.0891 · HEDGE -4.2% · P&L +12,403 · FILL 0.00017 · SPREAD 0.3bp · VOL 18.4 · DELTA -0.42 · GAMMA 0.003",
  "MKT OPEN · FILL 450 @ 12.34 · REJECT -0.7bp · QUEUE 12ms · LATENCY 0.3μs · VWAP 11.98 · TWAP 12.01 · SLIPPAGE +0.02 · EXEC 99.7%",
  "RISK Δ -1,204 · Γ +0.34 · Θ -892 · MARGIN 14.2M · VAR 2.1M · PNL MTD +234K · SHARPE 1.82 · DRAWDOWN -3.1% · CORR 0.67",
];

function FrameMachines() {
  const { ref, y } = useHeadingParallax();

  return (
    <section
      id="frame-machines"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-indigo text-dawn py-28 md:py-44 overflow-hidden"
    >
      {/* Grid pattern instead of dots — cold, sterile feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,248,232,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,248,232,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Layered ticker rows at different speeds */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex flex-col justify-center gap-16" aria-hidden>
        {TICKER_ROWS.map((row, i) => (
          <motion.div
            key={i}
            className="whitespace-nowrap font-mono text-dawn"
            style={{
              fontSize: `${11 + i}px`,
              opacity: 0.03 + i * 0.01,
            }}
            animate={{ x: [0, i % 2 === 0 ? -800 : 800] }}
            transition={{
              duration: 50 - i * 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {(row + " · ").repeat(6)}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12">

        <motion.div style={{ y }}>
          <Reveal>
            <div className="eyebrow text-dawn/18 mb-6">03 / 07</div>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] max-w-[16ch]"
            >
              Built machines for people who didn&apos;t need help<span className="text-stoep">.</span>
            </h2>
          </Reveal>
        </motion.div>

        <Reveal delay={0.12}>
          <p className="mt-8 md:mt-12 text-[16px] md:text-[18px] leading-[1.75] text-dawn/50 max-w-[48ch]">
            Trading systems for investment banks and hedge funds.
            High frequency, high stakes, high stress.
            Impressive on paper. Empty in practice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── Frame 4: "But that's no fun." — THE PIVOT ──────────────────────────

function FramePivot() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // Text scales up as it enters the viewport — dramatic reveal
  const textScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="frame-pivot"
      ref={ref}
      className="relative bg-stoep text-indigo overflow-hidden flex items-center justify-center min-h-[70vh]"
    >
      <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.10]" aria-hidden />

      {/* Dawn glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFF8E8 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 text-center py-28 md:py-40">
        <motion.div
          style={{ scale: textScale, opacity: textOpacity }}
        >
          <div className="eyebrow opacity-30 mb-6">04 / 07</div>
          <h2
            className="font-display font-semibold leading-[0.90] tracking-[-0.045em]
                       text-[48px] sm:text-[72px] md:text-[100px] lg:text-[128px]"
          >
            But that&apos;s no fun<span className="text-dawn">.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

// ── Frame 5: "Home is where the people are." ────────────────────────────

function FrameHome() {
  const { ref, y } = useHeadingParallax();

  return (
    <section
      id="frame-home"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-dawn text-indigo py-28 md:py-44 overflow-hidden"
    >
      {/* Warm spruit glow */}
      <motion.div
        aria-hidden
        className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw]
                   rounded-full blur-[120px] opacity-[0.12] pointer-events-none"
        style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Coral warmth bottom-left */}
      <motion.div
        aria-hidden
        className="absolute -bottom-[10%] -left-[8%] w-[35vw] h-[35vw]
                   rounded-full blur-[100px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)" }}
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        <motion.div style={{ y }}>
          <Reveal>
            <div className="eyebrow opacity-30 mb-6">05 / 07</div>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[40px] sm:text-[56px] md:text-[80px] lg:text-[96px] max-w-[16ch]"
            >
              Home is where the people are<span className="text-stoep">.</span>
            </h2>
          </Reveal>
        </motion.div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[960px]">
          <Reveal delay={0.1}>
            <p className="text-[16px] md:text-[18px] leading-[1.75] opacity-55">
              Kulu realised there&apos;s no place he&apos;d rather be than home.
              He loves working with technology and people — but the people
              he was working with weren&apos;t really his people.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-[16px] md:text-[18px] leading-[1.75] opacity-55">
              Back in South Africa, he found value and meaning in helping
              his peers and family leverage AI into their personal lives.
              Small automations here and there — saving countless hours
              of stress and hassle.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Frame 6: "Small automations. Countless hours saved." ────────────────

function FrameAutomations() {
  const { ref, y } = useHeadingParallax();

  return (
    <section
      id="frame-automations"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-mielie text-indigo py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.08]" aria-hidden />

      {/* Coral accent glow */}
      <motion.div
        aria-hidden
        className="absolute -top-[15%] -left-[10%] w-[40vw] h-[40vw]
                   rounded-full blur-[100px] opacity-[0.10] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)" }}
        animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12">

        <motion.div style={{ y }}>
          <Reveal>
            <div className="eyebrow opacity-30 mb-6">06 / 07</div>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] max-w-[18ch]"
            >
              Small automations<span className="text-stoep">.</span>{" "}
              <br className="hidden md:block" />
              Countless hours saved<span className="text-stoep">.</span>
            </h2>
          </Reveal>
        </motion.div>

        <Reveal delay={0.12}>
          <p className="mt-8 md:mt-12 text-[16px] md:text-[18px] leading-[1.75] opacity-55 max-w-[52ch]">
            Whether it&apos;s saving people time from filling in mundane paperwork,
            or helping businesses find new clients faster — Kulu prioritises and
            values human interaction first. AI is the tool. People are the point.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── Frame 7: "That's why Kulu Intelligence exists." ─────────────────────

function FrameMission() {
  const { ref, y } = useHeadingParallax();

  return (
    <section
      id="frame-mission"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative bg-indigo text-dawn py-28 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.13]" aria-hidden />

      {/* Coral breathing glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[65vw] h-[65vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12">

        <motion.div style={{ y }}>
          <Reveal>
            <div className="eyebrow text-dawn/18 mb-6">07 / 07</div>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[40px] sm:text-[60px] md:text-[80px] lg:text-[104px] max-w-[18ch]"
            >
              That&apos;s why Kulu Intelligence exists<span className="text-stoep">.</span>
            </h2>
          </Reveal>
        </motion.div>

        <Reveal delay={0.12}>
          <p className="mt-8 md:mt-12 text-[16px] md:text-[18px] leading-[1.75] text-dawn/50 max-w-[52ch]">
            Kulu wants to connect with people through helping them implement AI
            in all facets of their business. Not the ones with massive IT departments —
            the real ones. The accounting firm. The property agency. The marketing shop.
          </p>
        </Reveal>

        {/* Testimonials dare */}
        <Reveal delay={0.22}>
          <div className="mt-14 md:mt-20">
            <motion.div
              className="h-px bg-dawn/14 mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease }}
              style={{ transformOrigin: "left" }}
            />

            <p
              className="font-display font-medium leading-[1.15] tracking-[-0.025em] text-dawn/70"
              style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
            >
              You don&apos;t believe it<span className="text-stoep">?</span>
            </p>
            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-dawn/40 max-w-[44ch]">
              Visit our testimonials page. You won&apos;t regret using Kulu
              to implement AI in your business.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25, ease } }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-7 py-4
                             bg-stoep text-indigo rounded-full text-[14px] font-medium
                             hover:bg-[#ff5747] transition-colors duration-300"
                >
                  See testimonials →
                </Link>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Export ────────────────────────────────────────────────────────────────

export function AboutDiscovery() {
  return (
    <>
      <FrameSomewhere />
      <FrameMachines />
      <FramePivot />
      <FrameHome />
      <FrameAutomations />
      <FrameMission />
    </>
  );
}
