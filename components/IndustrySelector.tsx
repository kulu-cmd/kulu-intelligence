"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
  eyebrow: string;
  title: string;
  body: string;
}

interface Industry {
  id: string;
  name: string;
  tagline: string;
  selectedBg: string;
  selectedText: string;
  agenda: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INDUSTRIES: Industry[] = [
  {
    id: "property",
    name: "Property",
    tagline: "Managing agents & estate agencies",
    selectedBg: "bg-dawn",
    selectedText: "text-indigo",
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
    selectedBg: "bg-stoep",
    selectedText: "text-indigo",
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
    selectedBg: "bg-mielie",
    selectedText: "text-indigo",
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
    selectedBg: "bg-spruit",
    selectedText: "text-indigo",
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
    selectedBg: "bg-mielie",
    selectedText: "text-indigo",
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
    body: "A grounded read on where AI is, what it can do for a firm like yours, and the decisions that need to happen first.",
  },
  {
    eyebrow: "For functional teams",
    title: "Working sessions",
    body: "Hands-on with the tools, on your own work. Whatever the team actually spends its time on.",
  },
  {
    eyebrow: "For everyone in the room",
    title: "Firm-wide briefings",
    body: "A shared frame of reference. So the conversation about AI stops being seven different conversations.",
  },
];

// ─── Ease ─────────────────────────────────────────────────────────────────────

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface IndustryTileProps {
  industry: Industry;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

function IndustryTile({ industry, isSelected, index, onClick }: IndustryTileProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        "relative flex flex-col justify-between rounded-[12px] p-5 text-left transition-colors duration-200 min-h-[110px] w-full",
        isSelected
          ? `${industry.selectedBg} ${industry.selectedText}`
          : "bg-dawn/5 border border-dawn/15 text-dawn hover:bg-dawn/12",
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: easeKulu,
      }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Check badge */}
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
        <p className="eyebrow mb-2 opacity-60">{industry.tagline}</p>
        <span
          className="font-display font-medium leading-tight"
          style={{ fontSize: "clamp(18px, 1.4vw, 24px)" }}
        >
          {industry.name}
        </span>
      </div>
    </motion.button>
  );
}

interface AgendaListProps {
  items: string[];
  industryId: string;
}

function AgendaList({ items, industryId }: AgendaListProps) {
  return (
    <div>
      <h3
        className="font-display font-medium text-dawn mb-6"
        style={{ fontSize: "clamp(18px, 1.3vw, 22px)" }}
      >
        Your tailored agenda.
      </h3>
      <ol className="list-none m-0 p-0">
        {items.map((item, index) => (
          <motion.li
            key={`${industryId}-${index}`}
            className="flex items-start border-b border-dawn/12 py-4 gap-4 overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{
              delay: 0.04 + index * 0.06,
              duration: 0.65,
              ease: easeKulu,
            }}
          >
            <span
              className="eyebrow text-dawn/40 shrink-0 pt-px"
              style={{ width: "40px" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-body text-dawn/85 leading-relaxed"
              style={{ fontSize: "15px" }}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

interface RoomCardProps {
  room: Room;
  index: number;
}

function RoomCard({ room, index }: RoomCardProps) {
  return (
    <motion.div
      className="bg-dawn/[0.06] rounded-[8px] p-5 border border-dawn/[0.12]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08 + 0.3,
        duration: 0.5,
        ease: easeKulu,
      }}
    >
      <p className="eyebrow text-dawn/50 mb-2">{room.eyebrow}</p>
      <h4
        className="font-display font-medium text-dawn mb-2 leading-snug"
        style={{ fontSize: "18px" }}
      >
        {room.title}
      </h4>
      <p
        className="font-body text-dawn/60 leading-relaxed"
        style={{ fontSize: "13px" }}
      >
        {room.body}
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IndustrySelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const selectedIndustry = INDUSTRIES.find((i) => i.id === selectedId) ?? null;

  function handleTileClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-indigo text-dawn overflow-hidden"
    >
      {/* Dot field background */}
      <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
        {/* Heading with parallax */}
        <motion.div style={{ y: headingY }} className="mb-14">
          <p className="eyebrow text-dawn/50 mb-4">Tailored content</p>
          <h2
            className="font-display font-semibold text-dawn leading-tight"
            style={{ fontSize: "clamp(32px, 3.5vw, 56px)" }}
          >
            What does your firm do?
          </h2>
        </motion.div>

        {/* Industry tiles grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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

        {/* Content area */}
        <AnimatePresence mode="wait">
          {selectedIndustry ? (
            <motion.div
              key={selectedIndustry.id}
              className="mt-12 pt-12 border-t border-dawn/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeKulu }}
            >
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Agenda — 60% */}
                <div className="lg:w-[60%]">
                  <AgendaList
                    items={selectedIndustry.agenda}
                    industryId={selectedIndustry.id}
                  />
                </div>

                {/* Rooms — 40% */}
                <div className="lg:w-[40%]">
                  <p className="eyebrow text-dawn/50 mb-5">The format</p>
                  <div className="flex flex-col gap-3">
                    {ROOMS.map((room, index) => (
                      <RoomCard key={room.title} room={room} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="mt-10 text-center eyebrow opacity-25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              select an industry above
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
