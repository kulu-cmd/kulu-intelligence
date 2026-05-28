"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

/* ─────────────────────────────────────────────────────────────────────────
   AboutDiscovery — Reimagined about sections
   Three acts: Origin · Method · Wave
   ───────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

// ── Act 1: Origin ─────────────────────────────────────────────────────────

function ForgedSection() {
  return (
    <section className="bg-dawn text-indigo py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">

          {/* Left: heading column */}
          <div className="md:col-span-5">
            <Reveal>
              <div className="eyebrow opacity-55 mb-8">01 — Origin</div>
            </Reveal>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display font-semibold leading-[0.93] tracking-[-0.04em]"
                style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}
                initial={{ y: "106%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.95, delay: 0.08, ease }}
              >
                Forged to navigate<span className="text-stoep">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right: body copy */}
          <div className="md:col-span-7 md:pt-[4.5rem]">
            <Reveal delay={0.08}>
              <p
                className="font-display font-medium tracking-[-0.02em] leading-[1.25] mb-8 md:mb-10"
                style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
              >
                Kulu Intelligence was forged to help businesses navigate the AI landscape<span className="text-stoep">.</span>
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-[15px] md:text-[16px] leading-[1.8] opacity-58 max-w-[52ch] mb-5">
                Change isn't coming — it's here. New tools drop every week. Models leap forward
                month on month. The landscape reshapes before most people have learned
                the old one.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="text-[15px] md:text-[16px] leading-[1.8] opacity-58 max-w-[52ch] mb-5">
                We want to make sure as many South African businesses as possible catch
                this wave. Not the ones with massive IT departments — the real ones.
                The accounting firm. The property agency. The marketing shop
                running on vibes and long Fridays.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="text-[15px] md:text-[16px] leading-[1.8] opacity-58 max-w-[52ch]">
                Everyone deserves a fair shot at what's coming.
                That's the reason Kulu exists<span className="text-stoep">.</span>
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Export ────────────────────────────────────────────────────────────────

export function AboutDiscovery() {
  return (
    <>
      <ForgedSection />
    </>
  );
}
