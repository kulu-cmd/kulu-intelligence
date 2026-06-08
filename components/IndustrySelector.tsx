"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Seminar {
  id: string;
  title: string;
  foundation: boolean;
}

interface Industry {
  id: string;
  name: string;
  tagline: string;
  cardBg: string;
  cardText: string;
  pillBg: string;
  pillText: string;
  pillSelectedBg: string;
  pillSelectedText: string;
  periodColor: string;
  seminars: Seminar[];
  customFoundation?: Seminar[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOUNDATION_SEMINARS: Seminar[] = [
  { id: "F1", title: "How AI is being used in your industry", foundation: true },
  { id: "F2", title: "How to prompt well", foundation: true },
];

const INDUSTRIES: Industry[] = [
  {
    id: "property",
    name: "Property",
    tagline: "Managing agents & estate agencies",
    cardBg: "bg-stoep",
    cardText: "text-indigo",
    pillBg: "bg-stoep/15",
    pillText: "text-indigo",
    pillSelectedBg: "bg-indigo",
    pillSelectedText: "text-dawn",
    periodColor: "text-dawn",
    customFoundation: [
      { id: "PF1", title: "How AI is being used in Property", foundation: true },
      { id: "PF2", title: "How to prompt well", foundation: true },
    ],
    seminars: [
      { id: "P1", title: "Working with documents — listings, contracts, images", foundation: false },
      { id: "P2", title: "Projects where AI has memory", foundation: false },
      { id: "P3", title: "Creating workflows around your day-to-day tasks", foundation: false },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    tagline: "Agencies & in-house teams",
    cardBg: "bg-mielie",
    cardText: "text-indigo",
    pillBg: "bg-mielie/20",
    pillText: "text-indigo",
    pillSelectedBg: "bg-indigo",
    pillSelectedText: "text-dawn",
    periodColor: "text-stoep",
    customFoundation: [
      { id: "MF1", title: "How AI is being used in Marketing", foundation: true },
      { id: "MF2", title: "How to prompt well", foundation: true },
    ],
    seminars: [
      { id: "M1", title: "Working with documents — briefs, brand guidelines, campaign decks", foundation: false },
      { id: "M2", title: "Projects where AI has memory", foundation: false },
      { id: "M3", title: "Creating workflows around your day-to-day tasks", foundation: false },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    tagline: "Practices & finance teams",
    cardBg: "bg-spruit",
    cardText: "text-indigo",
    pillBg: "bg-spruit/20",
    pillText: "text-indigo",
    pillSelectedBg: "bg-indigo",
    pillSelectedText: "text-dawn",
    periodColor: "text-stoep",
    customFoundation: [
      { id: "AF1", title: "How AI is being used in Accounting", foundation: true },
      { id: "AF2", title: "How to prompt well", foundation: true },
    ],
    seminars: [
      { id: "A1", title: "Working with documents — financial statements, tax returns, client reports", foundation: false },
      { id: "A2", title: "Projects where AI has memory", foundation: false },
      { id: "A3", title: "Creating workflows around your day-to-day tasks", foundation: false },
    ],
  },
  {
    id: "hr",
    name: "HR Agencies",
    tagline: "Recruiters & people teams",
    cardBg: "bg-indigo",
    cardText: "text-dawn",
    pillBg: "bg-dawn/10",
    pillText: "text-dawn",
    pillSelectedBg: "bg-dawn",
    pillSelectedText: "text-indigo",
    periodColor: "text-stoep",
    customFoundation: [
      { id: "HF1", title: "How AI is being used in HR & Recruitment", foundation: true },
      { id: "HF2", title: "How to prompt well", foundation: true },
    ],
    seminars: [
      { id: "H1", title: "Working with documents — CVs, job descriptions, employment contracts", foundation: false },
      { id: "H2", title: "Projects where AI has memory", foundation: false },
      { id: "H3", title: "Creating workflows around your day-to-day tasks", foundation: false },
    ],
  },
  {
    id: "mining",
    name: "Mining",
    tagline: "Consultancies & operations",
    cardBg: "bg-mielie",
    cardText: "text-indigo",
    pillBg: "bg-mielie/20",
    pillText: "text-indigo",
    pillSelectedBg: "bg-indigo",
    pillSelectedText: "text-dawn",
    periodColor: "text-stoep",
    customFoundation: [
      { id: "XF1", title: "How AI is being used in Mining", foundation: true },
      { id: "XF2", title: "How to prompt well", foundation: true },
    ],
    seminars: [
      { id: "X1", title: "Working with documents — safety reports, compliance docs, geological data", foundation: false },
      { id: "X2", title: "Projects where AI has memory", foundation: false },
      { id: "X3", title: "Creating workflows around your day-to-day tasks", foundation: false },
    ],
  },
  {
    id: "education",
    name: "Education",
    tagline: "Primary & secondary schools",
    cardBg: "bg-indigo",
    cardText: "text-dawn",
    pillBg: "bg-indigo/10",
    pillText: "text-indigo",
    pillSelectedBg: "bg-spruit",
    pillSelectedText: "text-indigo",
    periodColor: "text-stoep",
    customFoundation: [
      { id: "EF1", title: "AI safety and best practices", foundation: true },
      { id: "EF2", title: "How to prompt well", foundation: true },
    ],
    seminars: [
      { id: "E1", title: "Using AI to build tools (Claude Code)", foundation: false },
      { id: "E2", title: "AI for lesson planning and admin", foundation: false },
      { id: "E3", title: "Teaching students to work alongside AI", foundation: false },
    ],
  },
];

// ─── Ease ─────────────────────────────────────────────────────────────────────

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];


// ─── Industry tile (grid view) ────────────────────────────────────────────────

function IndustryTile({
  industry,
  index,
  isActive,
  onClick,
}: {
  industry: Industry;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        "relative flex flex-col justify-end rounded-[14px] p-5 md:p-6 text-left w-full",
        "min-h-[120px] md:min-h-[140px] overflow-hidden group",
        industry.cardBg,
        industry.cardText,
        isActive ? "ring-2 ring-stoep ring-offset-2 ring-offset-dawn" : "",
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: easeKulu }}
      whileHover={{ y: -5, transition: { duration: 0.35, ease: easeKulu } }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Dot field */}
      <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.08]" aria-hidden />

      {/* Hover accent line */}
      <span
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-kulu rounded-t-[14px]"
        style={{ backgroundColor: "currentColor", opacity: 0.25 }}
        aria-hidden
      />

      <div className="relative">
        <p className="eyebrow mb-2.5 opacity-50">{industry.tagline}</p>
        <span
          className="font-display font-medium leading-tight tracking-[-0.015em]"
          style={{ fontSize: "clamp(18px, 1.6vw, 26px)" }}
        >
          {industry.name}
          <span className={industry.periodColor}>.</span>
        </span>
      </div>
    </motion.button>
  );
}

// ─── Topic pill (non-interactive, with tick) ─────────────────────────────────

function TopicPill({ seminar, index, pillBg, pillText }: { seminar: Seminar; index: number; pillBg: string; pillText: string }) {
  return (
    <motion.div
      className={[
        "rounded-full cursor-default select-none text-left",
        "px-4 py-2.5 text-[12px] md:text-[13px] font-body font-medium leading-tight",
        "flex items-center gap-2",
        pillBg,
        pillText,
      ].join(" ")}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: easeKulu }}
    >
      <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-stoep/60 flex items-center justify-center">
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {seminar.title}
    </motion.div>
  );
}

// ─── Foundation pill (always included, non-interactive) ────────────────────────

function FoundationPill({ seminar, index }: { seminar: Seminar; index: number }) {
  return (
    <motion.div
      className="rounded-full cursor-default select-none bg-indigo text-dawn
                 px-4 py-2.5 text-[12px] md:text-[13px] font-body font-medium leading-tight
                 flex items-center gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.08 } }}
      transition={{ delay: index * 0.022, duration: 0.35, ease: easeKulu }}
    >
      <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-stoep/60 flex items-center justify-center">
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M1 3L3 5L7 1" stroke="#FFF8E8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {seminar.title}
    </motion.div>
  );
}

// ─── Expanded panel (extends below the tile grid) ───────────────────────────

function ExpandedPanel({
  industry,
}: {
  industry: Industry;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: easeKulu } }}
      transition={{ duration: 0.45, ease: easeKulu }}
      className="overflow-hidden"
    >
      <div className={`mt-4 rounded-[14px] ${industry.cardBg} ${industry.cardText} p-7 md:p-10 relative overflow-hidden`}>
        <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.08]" aria-hidden />

        <div className="relative">
          {/* Foundation seminars */}
          <div className="mb-6">
            <motion.p
              className="eyebrow opacity-35 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.18, duration: 0.25 }}
            >
              Foundation — always included
            </motion.p>
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {(industry.customFoundation ?? FOUNDATION_SEMINARS).map((s, i) => (
                <FoundationPill key={s.id} seminar={s} index={i} />
              ))}
            </div>
          </div>

          {/* Industry-specific topics */}
          <div>
            <motion.p
              className="eyebrow opacity-35 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.22, duration: 0.25 }}
            >
              {industry.name} — applied topics
            </motion.p>
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {industry.seminars.map((s, i) => (
                <TopicPill
                  key={s.id}
                  seminar={s}
                  index={i}
                  pillBg={industry.pillBg}
                  pillText={industry.pillText}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IndustrySelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIndustry = INDUSTRIES.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="mt-8 md:mt-12">
      {/* Tile grid — always visible */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {INDUSTRIES.map((industry, index) => (
          <IndustryTile
            key={industry.id}
            industry={industry}
            index={index}
            isActive={selectedId === industry.id}
            onClick={() => setSelectedId(selectedId === industry.id ? null : industry.id)}
          />
        ))}
      </div>

      {/* Expanded panel — extends below the grid */}
      <AnimatePresence mode="wait">
        {selectedIndustry && (
          <ExpandedPanel
            key={selectedIndustry.id}
            industry={selectedIndustry}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
