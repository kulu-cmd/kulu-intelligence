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
  { id: "F1", title: "What AI is and how to prompt well", foundation: true },
  { id: "F2", title: "Using AI in Business Context — working with documents and projects", foundation: true },
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
    seminars: [
      { id: "P1", title: "What AI is doing in property right now", foundation: false },
      { id: "P2", title: "From notes to listing copy: a prompting workshop", foundation: false },
      { id: "P3", title: "Client communication at volume", foundation: false },
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
    seminars: [
      { id: "M1", title: "AI in the creative process", foundation: false },
      { id: "M2", title: "Briefing and copy workshops", foundation: false },
      { id: "M3", title: "Research and audience insight with AI", foundation: false },
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
    seminars: [
      { id: "A1", title: "AI in accounting today", foundation: false },
      { id: "A2", title: "Querying financial documents with AI", foundation: false },
      { id: "A3", title: "Writing clear client reports faster", foundation: false },
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
    seminars: [
      { id: "H1", title: "AI in talent acquisition", foundation: false },
      { id: "H2", title: "Job descriptions and screening criteria", foundation: false },
      { id: "H3", title: "Candidate communication at scale", foundation: false },
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
    seminars: [
      { id: "X1", title: "AI in mining operations today", foundation: false },
      { id: "X2", title: "Safety reporting and compliance with AI", foundation: false },
      { id: "X3", title: "Geological data and AI-assisted analysis", foundation: false },
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

const WA_NUMBER = "27613889339";

// ─── Ease ─────────────────────────────────────────────────────────────────────

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildMessage(selected: Set<string>): string {
  // Group selected IDs by industry
  const byIndustry: Record<string, { ind: Industry; titles: string[] }> = {};
  for (const id of selected) {
    for (const ind of INDUSTRIES) {
      const match = ind.seminars.find((s) => s.id === id);
      if (match) {
        if (!byIndustry[ind.id]) byIndustry[ind.id] = { ind, titles: [] };
        byIndustry[ind.id].titles.push(match.title);
      }
    }
  }

  const lines: string[] = [
    "Hi! I'd like to book a Kulu Intelligence seminar. Here's what I'm interested in:\n",
  ];

  // If only one industry selected, show that industry's foundation
  const industryEntries = Object.values(byIndustry);
  if (industryEntries.length === 1) {
    const { ind, titles } = industryEntries[0];
    const foundation = ind.customFoundation ?? FOUNDATION_SEMINARS;
    lines.push("Foundation: " + foundation.map((s) => s.title).join(", "));
    lines.push(`${ind.name}: ${titles.join(", ")}`);
  } else {
    // Multiple industries — show global foundation + per-industry breakdown
    lines.push("Foundation: " + FOUNDATION_SEMINARS.map((s) => s.title).join(", "));
    for (const { ind, titles } of industryEntries) {
      lines.push(`${ind.name}: ${titles.join(", ")}`);
    }
  }

  lines.push("\nCan we chat about putting this together?");
  return lines.join("\n");
}

function buildEmailBody(selected: Set<string>): string {
  return buildMessage(selected);
}

// ─── Industry tile (grid view) ────────────────────────────────────────────────

function IndustryTile({
  industry,
  index,
  selectedCount,
  onClick,
}: {
  industry: Industry;
  index: number;
  selectedCount: number;
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
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
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

      {/* Selection badge */}
      {selectedCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-5 h-5 rounded-full bg-stoep text-indigo
                     text-[10px] font-medium flex items-center justify-center leading-none"
        >
          {selectedCount}
        </motion.span>
      )}

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

// ─── Selectable seminar pill ───────────────────────────────────────────────────

function SelectablePill({
  seminar,
  index,
  selected,
  onToggle,
  pillBg,
  pillText,
  pillSelectedBg,
  pillSelectedText,
}: {
  seminar: Seminar;
  index: number;
  selected: boolean;
  onToggle: () => void;
  pillBg: string;
  pillText: string;
  pillSelectedBg: string;
  pillSelectedText: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={[
        "rounded-full cursor-pointer select-none text-left",
        "px-5 py-3 text-[13px] md:text-[14px] font-body font-medium leading-tight",
        "transition-colors duration-200",
        "flex items-center gap-2.5",
        selected
          ? `${pillSelectedBg} ${pillSelectedText}`
          : `${pillBg} ${pillText} opacity-70 hover:opacity-100`,
      ].join(" ")}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: easeKulu }}
      whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.25, ease: easeKulu } }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Checkbox indicator */}
      <span
        className={[
          "flex-shrink-0 w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center",
          selected
            ? "border-current bg-stoep"
            : "border-current/30 bg-transparent",
        ].join(" ")}
      >
        {selected && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {seminar.title}
    </motion.button>
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

// ─── Cloud view (selected industry) ──────────────────────────────────────────

function CloudView({
  industry,
  selectedSeminars,
  onToggle,
  onBack,
}: {
  industry: Industry;
  selectedSeminars: Set<string>;
  onToggle: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.28, ease: easeKulu }}
    >
      {/* Header row */}
      <div className="flex items-start gap-4 mb-8 md:mb-10">
        <motion.button
          type="button"
          onClick={onBack}
          className="flex-shrink-0 mt-1 flex items-center justify-center w-9 h-9 rounded-full
                     bg-indigo/8 text-indigo hover:bg-indigo/15 transition-colors duration-200"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: easeKulu }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back to industries"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeKulu }}
        >
          <p className="eyebrow opacity-45 mb-1.5">Seminar sessions for</p>
          <h3
            className="font-display font-semibold leading-tight tracking-[-0.025em]"
            style={{ fontSize: "clamp(28px, 2.5vw, 42px)" }}
          >
            {industry.name}
            <span className={industry.periodColor}>.</span>
          </h3>
          <p className="mt-2 opacity-45 leading-[1.6]" style={{ fontSize: "14px" }}>
            {industry.tagline}
          </p>
        </motion.div>
      </div>

      {/* Foundation seminars */}
      <div className="mb-6">
        <motion.p
          className="eyebrow opacity-35 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.25 }}
        >
          Foundation — always included
        </motion.p>
        <div className="flex flex-wrap gap-2.5 md:gap-3">
          {(industry.customFoundation ?? FOUNDATION_SEMINARS).map((s, i) => (
            <FoundationPill key={s.id} seminar={s} index={i} />
          ))}
        </div>
      </div>

      {/* Industry-specific seminars */}
      <div>
        <motion.p
          className="eyebrow opacity-35 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.1, duration: 0.25 }}
        >
          {industry.name} — select what applies
        </motion.p>
        <div className="flex flex-wrap gap-2.5 md:gap-3">
          {industry.seminars.map((s, i) => (
            <SelectablePill
              key={s.id}
              seminar={s}
              index={i}
              selected={selectedSeminars.has(s.id)}
              onToggle={() => onToggle(s.id)}
              pillBg={industry.pillBg}
              pillText={industry.pillText}
              pillSelectedBg={industry.pillSelectedBg}
              pillSelectedText={industry.pillSelectedText}
            />
          ))}
        </div>
      </div>

      {/* Connecting line accent */}
      <motion.div
        className="mt-8 h-[0.5px] bg-indigo/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: easeKulu }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

// ─── Checkout panel ───────────────────────────────────────────────────────────

function CheckoutPanel({ selected }: { selected: Set<string> }) {
  const count = selected.size;
  const message = buildMessage(selected);
  const emailBody = buildEmailBody(selected);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:hello@kulu.co.za?subject=${encodeURIComponent("Seminar booking enquiry")}&body=${encodeURIComponent(emailBody)}`;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.25, ease: easeKulu } }}
          transition={{ duration: 0.5, ease: easeKulu }}
          className="mt-10 md:mt-14"
        >
          <div className="rounded-[16px] bg-indigo text-dawn p-7 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 dot-field pointer-events-none opacity-[0.12]" aria-hidden />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
              <div>
                <p className="eyebrow text-dawn/40 mb-3">Your programme</p>
                <h3
                  className="font-display font-semibold leading-tight tracking-[-0.025em] text-dawn"
                  style={{ fontSize: "clamp(22px, 2vw, 32px)" }}
                >
                  {count} seminar{count !== 1 ? "s" : ""} selected
                  <span className="text-stoep">.</span>
                </h3>
                <p className="mt-2.5 text-[14px] text-dawn/45 leading-[1.65] max-w-[38ch]">
                  Foundation sessions are always included. Send us your list and we&apos;ll get back to you within a day.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full
                             bg-[#25D366] text-white text-[14px] font-medium
                             hover:brightness-110 transition-all duration-200"
                  whileHover={{ y: -2, transition: { duration: 0.25, ease: easeKulu } }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* WhatsApp icon */}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp us
                </motion.a>

                <motion.a
                  href={emailHref}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full
                             bg-dawn/10 text-dawn text-[14px] font-medium border border-dawn/15
                             hover:bg-dawn/20 transition-all duration-200"
                  whileHover={{ y: -2, transition: { duration: 0.25, ease: easeKulu } }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Email icon */}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 8 10-8" />
                  </svg>
                  Send by email
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IndustrySelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSeminars, setSelectedSeminars] = useState<Set<string>>(new Set());

  const selectedIndustry = INDUSTRIES.find((i) => i.id === selectedId) ?? null;

  function toggleSeminar(id: string) {
    setSelectedSeminars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function countForIndustry(industry: Industry): number {
    return industry.seminars.filter((s) => selectedSeminars.has(s.id)).length;
  }

  return (
    <div className="mt-8 md:mt-12">
      <AnimatePresence mode="sync">
        {selectedIndustry ? (
          <motion.div key={selectedIndustry.id}>
            <CloudView
              industry={selectedIndustry}
              selectedSeminars={selectedSeminars}
              onToggle={toggleSeminar}
              onBack={() => setSelectedId(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* Tile grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {INDUSTRIES.map((industry, index) => (
                <IndustryTile
                  key={industry.id}
                  industry={industry}
                  index={index}
                  selectedCount={countForIndustry(industry)}
                  onClick={() => setSelectedId(industry.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout panel — shown when selections exist */}
      <CheckoutPanel selected={selectedSeminars} />
    </div>
  );
}
