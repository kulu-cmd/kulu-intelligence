"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Chapter data ──────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    id: "story",
    num: "01",
    title: "Our story",
    tagline: "From everywhere, for here",
    content: "story" as const,
  },
  {
    id: "numbers",
    num: "02",
    title: "The 90%",
    tagline: "Why South Africa, why now",
    content: "numbers" as const,
  },
  {
    id: "approach",
    num: "03",
    title: "How we work",
    tagline: "What it's like to work with us",
    content: "approach" as const,
  },
];

const PILLARS = [
  {
    title: "We show up",
    body: "No ticket queues. No 48-hour windows. Small enough that when you call, you reach someone who knows your project.",
  },
  {
    title: "We've seen it work",
    body: "Southeast Asia. Amsterdam. London. We've watched AI reshape how early adopters move — and we bring that knowledge back.",
  },
  {
    title: "We keep it plain",
    body: "No strategy docs. No buzzwords. Real tools, live before month-end, priced honestly.",
  },
];

// ─── Chapter content blocks ────────────────────────────────────────────────

function StoryContent() {
  const lines = [
    "We've worked with businesses in Southeast Asia",
    "and Europe — watched AI reshape how they move.",
    "Then we came back to South Africa.",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pb-12">
      <div className="md:col-span-7 space-y-1">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-[22px] md:text-[28px] lg:text-[34px]
                       tracking-[-0.02em] leading-[1.25] overflow-hidden"
            style={{ display: "block" }}
          >
            {line}
          </motion.p>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-5"
      >
        <p className="text-[14px] md:text-[15px] leading-[1.75] opacity-60 max-w-[44ch]">
          We're a small, open-minded team. We've seen AI transform businesses
          that moved early — in Singapore, Amsterdam, and London. We came back
          because 90% of South Africa's businesses are small businesses, and
          most of them haven't had access to what we've seen work everywhere else.
        </p>
        <p className="mt-4 text-[14px] md:text-[15px] leading-[1.75] opacity-60 max-w-[44ch]">
          We're here to change that.
        </p>
      </motion.div>
    </div>
  );
}

function NumbersContent() {
  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6 flex items-start"
        >
          <span
            className="font-display font-semibold tracking-[-0.05em] leading-[0.85] text-indigo"
            style={{ fontSize: "clamp(80px,14vw,160px)" }}
          >
            90
          </span>
          <span
            className="font-display font-semibold text-stoep tracking-[-0.03em] leading-[1]"
            style={{ fontSize: "clamp(40px,7vw,80px)", marginTop: "0.1em" }}
          >
            %
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6 pb-4"
        >
          <p className="font-display font-medium text-[20px] md:text-[26px] tracking-[-0.02em] leading-[1.3] opacity-90">
            of South African businesses are small businesses
            <span className="text-stoep">.</span>
          </p>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.75] opacity-55 max-w-[44ch]">
            That's the gap we work in. Not the big corporates with innovation
            budgets — the firms with 5 to 50 people who need real tools that
            work on Monday morning.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ApproachContent() {
  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="relative group bg-dawn border border-indigo/10 rounded-[10px] p-7 md:p-8
                       hover:bg-spruit/30 transition-colors duration-400 overflow-hidden"
          >
            <span className="absolute top-0 left-7 right-7 h-[1.5px] bg-stoep scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left" aria-hidden />
            <h3 className="font-display font-semibold text-[20px] md:text-[24px] tracking-[-0.015em] leading-[1.15]">
              {p.title}<span className="text-stoep">.</span>
            </h3>
            <p className="mt-4 text-[13.5px] md:text-[14px] leading-[1.7] opacity-62">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChapterContent({ type }: { type: "story" | "numbers" | "approach" }) {
  if (type === "story") return <StoryContent />;
  if (type === "numbers") return <NumbersContent />;
  return <ApproachContent />;
}

// ─── Main component ────────────────────────────────────────────────────────

export function AboutDiscovery() {
  const [active, setActive] = useState<string | null>(null);

  function toggle(id: string) {
    setActive((prev) => (prev === id ? null : id));
  }

  return (
    <section className="bg-dawn text-indigo">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        {CHAPTERS.map((ch, i) => {
          const isOpen = active === ch.id;
          return (
            <div key={ch.id} className={`border-b border-indigo/10 ${i === 0 ? "border-t" : ""}`}>

              {/* Chapter row — always visible */}
              <button
                onClick={() => toggle(ch.id)}
                className="w-full flex items-center justify-between gap-6 py-7 md:py-9 group cursor-pointer text-left"
              >
                <div className="flex items-center gap-5 md:gap-10">
                  <span className="eyebrow opacity-30 tabular-nums w-6 flex-shrink-0">{ch.num}</span>
                  <div>
                    <div
                      className={[
                        "font-display font-semibold leading-[1.0] tracking-[-0.03em] transition-colors duration-300",
                        "text-[28px] md:text-[40px] lg:text-[52px]",
                        isOpen ? "text-indigo" : "text-indigo/70 group-hover:text-indigo",
                      ].join(" ")}
                    >
                      {ch.title}
                      {isOpen && <span className="text-stoep">.</span>}
                    </div>
                    <div className={`eyebrow mt-1 transition-opacity duration-300 ${isOpen ? "opacity-45" : "opacity-28 group-hover:opacity-40"}`}>
                      {ch.tagline}
                    </div>
                  </div>
                </div>

                {/* +/− toggle */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center",
                    "text-[20px] font-light transition-colors duration-300",
                    isOpen
                      ? "border-stoep text-stoep"
                      : "border-indigo/15 text-indigo/40 group-hover:border-indigo/35 group-hover:text-indigo/70",
                  ].join(" ")}
                >
                  +
                </motion.div>
              </button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pt-2 pb-2">
                      <ChapterContent type={ch.content} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}

      </div>
    </section>
  );
}
