"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Industry {
  id: string;
  name: string;
  tagline: string;
  selectedBgLight: string;
  selectedTextLight: string;
  agenda: string[];
}

interface Room {
  eyebrow: string;
  title: string;
  body: string;
  baseBg: string;
  accentDot: string;
}

const INDUSTRIES: Industry[] = [
  {
    id: "property",
    name: "Property",
    tagline: "Managing agents & estate agencies",
    selectedBgLight: "bg-indigo",
    selectedTextLight: "text-dawn",
    agenda: [
      "What AI is doing in property right now — and what it isn't",
      "Drafting lease summaries, inspection reports, and tenant queries",
      "Automating listing descriptions from agent notes",
      "Screening tenant applications against your criteria",
      "Where your client data lives and how to handle it properly",
      "Prompting properly: getting consistent output from your team",
      "Two or three tools worth trialling this quarter",
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    tagline: "Agencies & in-house teams",
    selectedBgLight: "bg-stoep",
    selectedTextLight: "text-indigo",
    agenda: [
      "What AI can actually do for creative and strategy work",
      "Brief-to-first-draft workflows that don't sound like AI wrote them",
      "Repurposing content across channels without losing the voice",
      "Using AI for campaign data analysis and surfacing real insight",
      "Protecting your clients' brand voice in AI-assisted processes",
      "How to evaluate a new AI tool without falling for the hype",
      "The two or three tools worth your team's time this quarter",
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    tagline: "Practices & finance teams",
    selectedBgLight: "bg-mielie",
    selectedTextLight: "text-indigo",
    agenda: [
      "Where AI fits in financial workflows — and where it doesn't belong",
      "Reconciling and flagging anomalies faster without losing oversight",
      "Drafting management account commentary from the numbers",
      "Summarising complex documents for partners and clients",
      "Data security: what can cross the firewall and what can't",
      "Building reliable, auditable AI workflows your partners can trust",
      "The compliance questions you should be asking now",
    ],
  },
  {
    id: "hr",
    name: "HR Agencies",
    tagline: "Recruiters & people teams",
    selectedBgLight: "bg-spruit",
    selectedTextLight: "text-indigo",
    agenda: [
      "The honest state of AI in recruitment — what's hype, what's live",
      "Screening CVs against role criteria at speed and scale",
      "Drafting job briefs and interview frameworks from an intake call",
      "Summarising candidate notes and building shortlist rationale",
      "Keeping human judgment where it matters in assessment",
      "How to use AI without introducing bias into your process",
      "Tools worth evaluating — and the ones to skip",
    ],
  },
  {
    id: "mining",
    name: "Mining",
    tagline: "Consultancies & operations",
    selectedBgLight: "bg-mielie",
    selectedTextLight: "text-indigo",
    agenda: [
      "AI in heavy industry: what's practical today, what's years away",
      "Automating proposal and tender document generation",
      "Building knowledge bases for operational teams and new hires",
      "Streamlining reporting across disconnected systems",
      "Safety and compliance considerations when deploying AI",
      "Getting field teams and office staff onto the same tools",
      "Where to start — and what to measure first",
    ],
  },
];

const ROOMS: Room[] = [
  {
    eyebrow: "For partners and principals",
    title: "Leadership sessions",
    body: "A grounded read on where AI is, what it can do for a firm like yours, and the decisions that need to happen first. No buzzwords — just a clear picture.",
    baseBg: "bg-stoep",
    accentDot: "bg-dawn",
  },
  {
    eyebrow: "For functional teams",
    title: "Working sessions",
    body: "Hands-on with the tools, on your own work. Whatever the team actually spends its time on — we work through it together in the room.",
    baseBg: "bg-mielie",
    accentDot: "bg-stoep",
  },
  {
    eyebrow: "For everyone in the room",
    title: "Firm-wide briefings",
    body: "A shared frame of reference. So the conversation about AI stops being seven different conversations happening in parallel across the firm.",
    baseBg: "bg-spruit",
    accentDot: "bg-indigo",
  },
];

const FORMAT_STATS = [
  { label: "Length",     value: "60 — 120 min" },
  { label: "Format",     value: "Live, in-person" },
  { label: "Group size", value: "Up to 40" },
];

const TITLE_WORDS = ["Rough", "and", "Tumble", "with", "AI"];

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TileProps {
  industry: Industry;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

function IndustryTile({ industry, isSelected, index, onClick }: TileProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        "relative flex flex-col justify-between rounded-[12px] p-5 text-left transition-colors duration-200 min-h-[100px] w-full",
        isSelected
          ? `${industry.selectedBgLight} ${industry.selectedTextLight}`
          : "bg-indigo/5 border border-indigo/15 text-indigo hover:bg-indigo/10 hover:border-indigo/25",
      ].join(" ")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.2 + index * 0.07, duration: 0.5, ease: easeKulu }}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.span
            key="check"
            className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-indigo/15 text-indigo text-xs font-bold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
      <div>
        <p className="eyebrow mb-2 opacity-50">{industry.tagline}</p>
        <span
          className="font-display font-medium leading-tight"
          style={{ fontSize: "clamp(17px, 1.3vw, 22px)" }}
        >
          {industry.name}
        </span>
      </div>
    </motion.button>
  );
}

function AgendaList({ items, industryId }: { items: string[]; industryId: string }) {
  return (
    <ol className="list-none m-0 p-0">
      {items.map((item, index) => (
        <motion.li
          key={`${industryId}-${index}`}
          className="flex items-start border-b border-dawn/12 py-4 gap-4 overflow-hidden"
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ delay: 0.04 + index * 0.06, duration: 0.65, ease: easeKulu }}
        >
          <span className="eyebrow text-dawn/40 shrink-0 pt-px" style={{ width: "40px" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-body text-dawn/85 leading-relaxed" style={{ fontSize: "15px" }}>
            {item}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

// ─── Audience card (own section) ──────────────────────────────────────────────

function AudienceCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: easeKulu }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: easeKulu } }}
      className={[
        "relative overflow-hidden rounded-[14px] p-6 md:p-10 flex flex-col min-h-[220px] md:min-h-[260px] cursor-default text-indigo",
        room.baseBg,
      ].join(" ")}
    >
      {/* Dot field texture */}
      <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.12]" aria-hidden />

      {/* Accent dot top-right */}
      <span
        className={`absolute top-6 right-6 w-3 h-3 rounded-full ${room.accentDot} opacity-70`}
        aria-hidden
      />

      {/* Content */}
      <div className="relative mt-auto">
        <p className="eyebrow mb-4 opacity-50">{room.eyebrow}</p>
        <h3
          className="font-display font-semibold leading-[1.05] tracking-[-0.025em] mb-4 text-indigo"
          style={{ fontSize: "clamp(22px, 2vw, 30px)" }}
        >
          {room.title}
          <span className="text-indigo/40">.</span>
        </h3>
        <p className="leading-[1.7] text-indigo/60" style={{ fontSize: "14px" }}>
          {room.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearnPageClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const tilesY = useTransform(scrollYProgress, [0, 1], [0, -25]);

  const selectedIndustry = INDUSTRIES.find((i) => i.id === selectedId) ?? null;

  function handleTileClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative bg-dawn text-indigo overflow-hidden pt-32 md:pt-44">
        {/* Atmosphere blobs */}
        <motion.div
          aria-hidden
          className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-[0.28] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)" }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.18] pointer-events-none"
          style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Title + tiles */}
        <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">
          <motion.h1
            aria-label="Rough and Tumble with AI"
            style={{ y: titleY, willChange: "transform" }}
            className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px] max-w-[16ch]"
          >
            {TITLE_WORDS.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: easeKulu }}
              >
                {w}
                {i === TITLE_WORDS.length - 1 && (
                  <motion.span
                    className="inline-block text-stoep"
                    initial={{ scale: 0, y: -20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.15 + TITLE_WORDS.length * 0.07 + 0.05,
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
            ))}
          </motion.h1>

          {/* Industry tiles */}
          <motion.div
            style={{ y: tilesY, willChange: "transform" }}
            className="mt-12 md:mt-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: easeKulu }}
          >
            <p className="eyebrow opacity-55 mb-5">Pick your industry to see a tailored agenda</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {INDUSTRIES.map((industry, index) => (
                <IndustryTile
                  key={industry.id}
                  industry={industry}
                  isSelected={selectedId === industry.id}
                  index={index}
                  onClick={() => handleTileClick(industry.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Agenda — pops in between tiles and the format strip ── */}
        <AnimatePresence>
          {selectedIndustry && (
            <motion.div
              key="agenda"
              style={{ overflow: "hidden" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.52, ease: easeKulu }}
            >
              <div className="relative bg-indigo text-dawn mt-10">
                <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" aria-hidden />
                <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-12 md:py-16">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedIndustry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: easeKulu }}
                    >
                      {/* Industry label + agenda */}
                      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 mb-8">
                        <h2
                          className="font-display font-semibold text-dawn leading-tight"
                          style={{ fontSize: "clamp(24px, 2.4vw, 40px)" }}
                        >
                          {selectedIndustry.name}
                          <span className="text-stoep">.</span>
                        </h2>
                        <p className="eyebrow text-dawn/45">{selectedIndustry.tagline}</p>
                      </div>
                      <AgendaList
                        items={selectedIndustry.agenda}
                        industryId={selectedIndustry.id}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Format strip — always at the bottom of the hero ── */}
        <div className="relative mt-10 border-t border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-3 divide-x divide-indigo/10">
            {FORMAT_STATS.map((item) => (
              <motion.div
                key={item.label}
                className="py-8 md:py-10 px-0 md:px-8 first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: easeKulu }}
              >
                <div className="eyebrow opacity-55">{item.label}</div>
                <div className="mt-3 font-display font-medium text-[22px] sm:text-[28px] md:text-[38px] tracking-[-0.025em] leading-[1]">
                  {item.value}<span className="text-stoep">.</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is this for — 3 audience cards ── */}
      <section className="bg-indigo text-dawn py-14 md:py-28 relative overflow-hidden">
        {/* Background dot field */}
        <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.18]" aria-hidden />

        <div className="mx-auto max-w-[1480px] px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeKulu }}
            className="mb-12 md:mb-16"
          >
            <h2
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-dawn"
              style={{ fontSize: "clamp(32px, 3.5vw, 56px)" }}
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
    </>
  );
}
