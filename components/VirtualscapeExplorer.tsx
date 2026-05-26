"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Data ──────────────────────────────────────────────────────────────────

const AUTOMATIONS = [
  {
    num: "01",
    label: "Proposal Generation",
    brief: "From brief to proposal in hours",
    selectedBg: "bg-mielie",
    selectedText: "text-indigo",
    panelBg: "bg-mielie/15",
    borderColor: "border-indigo/15",
    before:
      "Senior consultants spending 3–4 days writing proposals from scratch. Inconsistent structure, variable quality, slow sales cycle. Every new engagement started with a blank page.",
    after:
      "A proposal engine trained on Virtualscape's strongest work. Call notes in → scoped, costed, formatted proposal out. Reviewed and approved the same day.",
    result: "3 days → 4 hours.",
  },
  {
    num: "02",
    label: "Knowledge Bases",
    brief: "Every answer, anywhere",
    selectedBg: "bg-spruit",
    selectedText: "text-indigo",
    panelBg: "bg-spruit/15",
    borderColor: "border-indigo/12",
    before:
      "New hires taking 6–8 weeks to become productive. Clients calling for information buried across documents. The same questions answered over and over by people who had better things to do.",
    after:
      "An internal assistant trained on SOPs, safety manuals, and policies. A client-facing portal with searchable service documentation. Both updated automatically, available around the clock.",
    result: "Onboarding halved. Client queries down 60%.",
  },
  {
    num: "03",
    label: "Report Generation",
    brief: "22 hours returned every month",
    selectedBg: "bg-indigo",
    selectedText: "text-dawn",
    panelBg: "bg-indigo",
    borderColor: "border-dawn/15",
    before:
      "Monthly reports required data pulled manually from four separate systems, formatted by hand each time. Two people. Two full days. Every single month.",
    after:
      "An automated pipeline pulls from all four systems, structures the data against the template, flags anomalies, and delivers a formatted draft. One reviewer. Two hours.",
    result: "2 days → 2 hours. Every month.",
  },
];

const SEMINARS = [
  {
    id: "claude-biz",
    title: "Claude for Business",
    body: "A practical introduction to what Claude can do in a professional setting. No jargon, no slides without substance. Teams leave with real prompts they can use on Monday.",
  },
  {
    id: "proficiency",
    title: "Claude Proficiency",
    body: "A deeper session for teams ready to go beyond the basics. We build workflows, debug outputs, and close the gap between what AI can do and what your team actually gets.",
  },
  {
    id: "integration",
    title: "AI Integration in Practice",
    body: "How to find, prioritise, and implement AI in your existing business — without disrupting what's working. Operational, honest, and specific to your firm.",
  },
];

// ─── Panel animation variants ──────────────────────────────────────────────

const panelVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Seminar card ──────────────────────────────────────────────────────────

function SeminarCard({ seminar, index }: { seminar: typeof SEMINARS[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[10px] border border-indigo/10 bg-dawn"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left group"
      >
        <div>
          <div className="eyebrow opacity-40 mb-1.5">Seminar {String(index + 1).padStart(2, "0")}</div>
          <div className="font-display font-semibold text-[18px] md:text-[22px] tracking-[-0.015em] leading-[1.1]">
            {seminar.title}<span className="text-stoep">.</span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-indigo/15 flex items-center justify-center
                     text-[18px] font-light text-stoep group-hover:border-stoep transition-colors duration-300"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-7 pb-7">
              <div className="h-px bg-indigo/8 mb-5" />
              <p className="text-[14px] md:text-[15px] leading-[1.7] opacity-65">{seminar.body}</p>
              <Link
                href="/about#contact"
                className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-medium text-stoep hover:gap-3 transition-all duration-200"
              >
                Book this session →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function VirtualscapeExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  function select(idx: number) {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  }

  const auto = AUTOMATIONS[activeIdx];
  const isDark = auto.panelBg === "bg-indigo";

  return (
    <>
      {/* ── Virtualscape client intro ──────────────────────── */}
      <section className="relative overflow-hidden bg-indigo text-dawn">
        <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow opacity-45 mb-8"
          >
            01 — Client work · Mining · Johannesburg
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-semibold leading-[0.88] tracking-[-0.045em]
                             text-[56px] sm:text-[80px] md:text-[108px] lg:text-[136px]"
                >
                  Virtualscape<span className="text-stoep">.</span>
                </motion.h2>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 pb-2"
            >
              <p className="text-[14px] md:text-[15px] leading-[1.75] opacity-60 max-w-[38ch]">
                A Johannesburg-based mining consultancy. Three repetitive
                workflows were eating expert time every week. Here's what changed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Automation explorer ────────────────────────────── */}
      <section className="bg-dawn text-indigo">
        <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-16 md:py-20">

          {/* Selector tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {AUTOMATIONS.map((a, i) => {
              const isActive = i === activeIdx;
              return (
                <motion.button
                  key={a.num}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => select(i)}
                  className={[
                    "relative overflow-hidden rounded-[10px] px-6 py-5 text-left cursor-pointer",
                    "transition-colors duration-300",
                    isActive
                      ? `${a.selectedBg} ${a.selectedText}`
                      : "bg-dawn border border-indigo/12 text-indigo hover:border-indigo/28",
                  ].join(" ")}
                >
                  {/* Accent bar on hover */}
                  {!isActive && (
                    <span className="absolute top-0 left-0 h-[2px] bg-stoep w-0 hover:w-full transition-all duration-500 ease-out" aria-hidden />
                  )}
                  <div className="eyebrow opacity-45 mb-2">{a.num}</div>
                  <div className="font-display font-semibold text-[16px] md:text-[20px] tracking-[-0.015em] leading-[1.1]">
                    {a.label}
                  </div>
                  <div className={`eyebrow mt-1.5 ${isActive ? "opacity-50" : "opacity-32"}`}>
                    {a.brief}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Animated content panel */}
          <div className="relative overflow-hidden rounded-[12px]" style={{ minHeight: "320px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={[
                  "relative overflow-hidden rounded-[12px] p-8 md:p-12 lg:p-14",
                  auto.panelBg,
                  isDark ? "text-dawn" : "text-indigo",
                ].join(" ")}
              >
                {isDark && (
                  <div className="absolute inset-0 dot-field opacity-25 pointer-events-none" aria-hidden />
                )}

                <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                  {/* Before */}
                  <div className="md:col-span-5">
                    <div className={`eyebrow mb-4 ${isDark ? "opacity-45" : "opacity-50"}`}>Before</div>
                    <p className={`text-[14px] md:text-[15px] leading-[1.75] ${isDark ? "opacity-65" : "opacity-65"}`}>
                      {auto.before}
                    </p>
                  </div>

                  {/* After */}
                  <div className="md:col-span-5">
                    <div className={`eyebrow mb-4 ${isDark ? "opacity-45" : "opacity-50"}`}>After</div>
                    <p className={`text-[14px] md:text-[15px] leading-[1.75] ${isDark ? "opacity-65" : "opacity-65"}`}>
                      {auto.after}
                    </p>
                  </div>

                  {/* Result */}
                  <div className={`md:col-span-2 flex flex-col justify-end`}>
                    <div className={`eyebrow mb-3 ${isDark ? "opacity-45" : "opacity-50"}`}>Result</div>
                    <p className="font-display font-semibold text-[22px] md:text-[28px] tracking-[-0.025em] leading-[1.1]">
                      {auto.result}
                      <span className="text-stoep"> </span>
                    </p>
                  </div>

                </div>

                {/* Large ghost number */}
                <div
                  aria-hidden
                  className="absolute right-6 bottom-0 font-display font-semibold leading-none tracking-[-0.06em] select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(100px,18vw,200px)",
                    color: isDark ? "rgba(255,248,232,0.04)" : "rgba(26,43,71,0.05)",
                  }}
                >
                  {auto.num}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── Seminars ───────────────────────────────────────── */}
      <section className="bg-dawn border-t border-indigo/8">
        <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-16 md:py-24">

          <motion.div
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end justify-between mb-8 md:mb-10"
          >
            <div>
              <div className="eyebrow opacity-45 mb-3">02 — Training & Seminars</div>
              <h2 className="font-display font-semibold text-[28px] md:text-[40px] tracking-[-0.03em] leading-[0.95]">
                Getting your team up to speed<span className="text-stoep">.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SEMINARS.map((s, i) => (
              <SeminarCard key={s.id} seminar={s} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="bg-stoep text-indigo">
        <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-20 md:py-28
                        flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow opacity-65 mb-4">03 — Your turn</div>
            <h2 className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                           text-[36px] md:text-[56px] lg:text-[72px] max-w-[20ch]">
              What could we automate for you<span className="text-dawn">?</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-3 flex-wrap"
          >
            <Link
              href="/implement"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo text-dawn
                         rounded-full text-[14px] font-medium hover:bg-[#13203A] transition-colors duration-300"
            >
              See what's possible →
            </Link>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-indigo/30
                         text-indigo rounded-full text-[14px] font-medium hover:bg-indigo/10 transition-colors duration-300"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
