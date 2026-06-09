"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { LearnOpeningQuote } from "./LearnOpeningQuote";
import { Magnetic } from "./Magnetic";
import IndustrySelector from "./IndustrySelector";

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Room {
  eyebrow: string;
  title: string;
  body: string;
  baseBg: string;
  accentDot: string;
  periodColor: string;
}

const ROOMS: Room[] = [
  {
    eyebrow:     "For directors and C-suite",
    title:       "Leadership sessions",
    body:        "A strategic read on AI for the people making the calls. What it means for your firm, your competition, and the decisions you need to make this year. Clear picture, no buzzwords.",
    baseBg:      "bg-stoep",
    accentDot:   "bg-dawn",
    periodColor: "text-dawn",
  },
  {
    eyebrow:     "Sales, Ops, Admin, Dev & HR teams",
    title:       "Business Stakeholders",
    body:        "How your team gets the best out of AI — whatever their role. Practical, hands-on, and built around the actual work your people do every day.",
    baseBg:      "bg-mielie",
    accentDot:   "bg-stoep",
    periodColor: "text-stoep",
  },
  {
    eyebrow:     "For educators and administrators",
    title:       "Schools and Institutions",
    body:        "Preparing teachers, students, and staff for an AI-native world. Practical guidance, responsible use, and a shared vocabulary the whole institution can work from.",
    baseBg:      "bg-spruit",
    accentDot:   "bg-indigo",
    periodColor: "text-stoep",
  },
];

const FORMAT_STATS = [
  { label: "Length",     value: "60 — 120 min" },
  { label: "Format",     value: "Live, in-person" },
  { label: "Group size", value: "Up to 40" },
];

const TITLE_WORDS = ["The", "Fast", "Track"];

// ─── Audience card ────────────────────────────────────────────────────────────

function AudienceCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: easeKulu }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: easeKulu } }}
      className={[
        "relative overflow-hidden rounded-[14px] p-7 md:p-10 flex flex-col",
        "min-h-[240px] md:min-h-[280px] cursor-default text-indigo",
        room.baseBg,
      ].join(" ")}
    >
      <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.10]" aria-hidden />
      <span
        className={`absolute top-6 right-6 w-2.5 h-2.5 rounded-full ${room.accentDot} opacity-55`}
        aria-hidden
      />
      <div className="relative mt-auto">
        <p className="eyebrow mb-5 opacity-40">{room.eyebrow}</p>
        <h3
          className="font-display font-semibold leading-[1.05] tracking-[-0.025em] mb-4"
          style={{ fontSize: "clamp(22px, 2vw, 30px)" }}
        >
          {room.title}<span className={room.periodColor}>.</span>
        </h3>
        <p className="leading-[1.72] opacity-55" style={{ fontSize: "14px" }}>
          {room.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearnPageClient() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <>
      <LearnOpeningQuote />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative bg-dawn text-indigo overflow-hidden pt-28 md:pt-40">

        <motion.div
          aria-hidden
          className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-[0.22] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)" }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.14] pointer-events-none"
          style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">
          <motion.h1
            aria-label="The Fast Track"
            style={{ y: titleY, willChange: "transform" }}
            className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                       text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px] max-w-[16ch]"
          >
            {TITLE_WORDS.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.12em] mb-[-0.12em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: easeKulu }}
                >
                  {w}
                  {i === TITLE_WORDS.length - 1 && (
                    <motion.span
                      className="inline-block text-stoep"
                      initial={{ scale: 0, y: -20, opacity: 0 }}
                      whileInView={{ scale: 1, y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        delay: 0.08 + TITLE_WORDS.length * 0.08 + 0.05,
                        type: "spring",
                        stiffness: 320,
                        damping: 14,
                      }}
                      aria-hidden
                    >
                      .
                    </motion.span>
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Descriptor blurb */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.34, ease: easeKulu }}
            className="mt-6 text-body text-indigo/50 italic max-w-[52ch]"
          >
            2 highly focused sessions targeted at bringing your staff up to speed with the latest best practices and techniques with AI.<br />From prompt enhancement to working with documents, we&apos;ve got you covered.
          </motion.p>

          <IndustrySelector />
        </div>

        {/* Format strip */}
        <div className="relative mt-12 md:mt-16 border-t border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-3 divide-x divide-indigo/10">
            {FORMAT_STATS.map((item, i) => (
              <motion.div
                key={item.label}
                className="py-8 md:py-10 px-0 md:px-8 first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: easeKulu }}
              >
                <div className="eyebrow opacity-45">{item.label}</div>
                <div className="mt-3 font-display font-medium text-[22px] sm:text-[28px] md:text-[38px] tracking-[-0.025em] leading-[1]">
                  {item.value}<span className="text-stoep">.</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is it for ─────────────────────────────────────────────────── */}
      <section className="bg-indigo text-dawn py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.15]" aria-hidden />

        <div className="mx-auto max-w-[1480px] px-6 md:px-12 relative">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeKulu }}
            className="mb-12 md:mb-16"
          >
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-dawn
                         text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px]"
            >
              Who is it for<span className="text-stoep">?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {ROOMS.map((room, index) => (
              <AudienceCard key={room.title} room={room} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-stoep text-indigo py-14 md:py-20 relative overflow-hidden">
        {/* Dot field atmosphere */}
        <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.12]" aria-hidden />

        {/* Drifting blob */}
        <motion.div
          aria-hidden
          className="absolute -top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-[0.18] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FFF8E8 0%, transparent 70%)" }}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="mx-auto max-w-[1480px] px-6 md:px-12 relative">
          <div className="max-w-[860px]">

            {/* Rule */}
            <motion.div
              className="h-[0.5px] bg-indigo/20 mb-8 md:mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeKulu }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="eyebrow opacity-40 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: easeKulu }}
            >
              Open to all industries
            </motion.p>

            <motion.h2
              className="font-display font-semibold leading-[0.95] tracking-[-0.035em] text-indigo
                         text-[36px] sm:text-[52px] md:text-[64px] mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.08, ease: easeKulu }}
            >
              Your industry<span className="text-dawn">.</span>{" "}
              <br className="hidden sm:block" />
              Your team<span className="text-dawn">.</span>{" "}
              <br className="hidden sm:block" />
              Your pace<span className="text-dawn">.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] md:text-[16px] leading-[1.7] text-indigo/65 mb-8 max-w-[52ch]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.18, ease: easeKulu }}
            >
              We are keen to teach people from all industries. If you would like to
              collaborate with us to deliver a more curated workshop, get in touch —
              we will shape the sessions around what your team actually needs.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.28, ease: easeKulu }}
            >
              <Magnetic strength={0.3}>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/about#contact"
                    className="inline-flex items-center gap-2 px-7 py-4
                               bg-indigo text-dawn rounded-full text-[14px] font-medium
                               hover:bg-indigo-deep transition-colors duration-300"
                  >
                    Book a session →
                  </Link>
                </motion.div>
              </Magnetic>

              <Magnetic strength={0.25}>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <a
                    href={`https://wa.me/27613889339?text=${encodeURIComponent("Hi! I'd like to collaborate with Kulu Intelligence on a curated workshop for our team.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-4
                               bg-dawn/25 text-indigo rounded-full text-[14px] font-medium
                               border border-indigo/15 hover:bg-dawn/40 transition-colors duration-300"
                  >
                    WhatsApp us
                  </a>
                </motion.div>
              </Magnetic>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
