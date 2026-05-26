"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "./Magnetic";

// ─── Data ──────────────────────────────────────────────────────────────────

type AutomationCategory =
  | "Documents"
  | "Communications"
  | "Sales pipeline"
  | "Data & admin"
  | "HR & hiring"
  | "Knowledge";

interface AutomationItem {
  id: string;
  category: AutomationCategory;
  name: string;
  description: string;
  timeSaved: string;
}

const ALL_ITEMS: AutomationItem[] = [
  // Documents
  { id: "d1", category: "Documents", name: "Proposal generator", description: "Sales call notes → complete branded proposal with scope, deliverables, and timeline. Zero manual drafting.", timeSaved: "2–3 hrs / proposal" },
  { id: "d2", category: "Documents", name: "Contract & SLA builder", description: "Client data → fully populated contract with correct entity names, figures, and dates — gaps highlighted automatically.", timeSaved: "3–5 hrs / contract" },
  { id: "d3", category: "Documents", name: "Quote & pricing sheet", description: "Line items and margins → formatted, on-brand quote document. Handles currency, escalation, and totals.", timeSaved: "1–2 hrs / quote" },
  { id: "d4", category: "Documents", name: "Report generator", description: "Raw data → formatted weekly or monthly client-facing report, ready to send.", timeSaved: "2–3 hrs / week" },
  { id: "d5", category: "Documents", name: "Meeting notes to actions", description: "Rough notes or transcript → structured summary with decisions, owners, and deadlines extracted.", timeSaved: "45 min / meeting" },
  // Communications
  { id: "c1", category: "Communications", name: "Email triage & drafter", description: "Incoming emails classified by type → AI drafts responses for routine messages. Human approves and sends.", timeSaved: "1–2 hrs / day" },
  { id: "c2", category: "Communications", name: "Follow-up sequence builder", description: "Post-meeting or post-proposal → personalised follow-up emails at set intervals. No lead goes cold.", timeSaved: "3–4 hrs / week" },
  { id: "c3", category: "Communications", name: "Client onboarding pack", description: "New client details → welcome letter, terms summary, account setup, and first-week checklist.", timeSaved: "45 min / client" },
  { id: "c4", category: "Communications", name: "Review response drafter", description: "New Google or Hellopeter review → personalised on-brand response drafted for approval.", timeSaved: "4–5 hrs / week" },
  { id: "c5", category: "Communications", name: "Internal newsletter", description: "Weekly inputs from team → formatted internal communication or client newsletter, ready to send.", timeSaved: "2 hrs / week" },
  // Sales pipeline
  { id: "s1", category: "Sales pipeline", name: "Lead intake processor", description: "Inbound enquiry → enriched lead profile with pain points, company context, and recommended solution angle.", timeSaved: "30 min / lead" },
  { id: "s2", category: "Sales pipeline", name: "CRM auto-population", description: "Sales call or email thread → CRM fields updated automatically. No more manual note entry after every call.", timeSaved: "20 min / call" },
  { id: "s3", category: "Sales pipeline", name: "Competitive intel digest", description: "Competitors monitored weekly → summary of pricing, product, and messaging changes.", timeSaved: "3 hrs / week" },
  { id: "s4", category: "Sales pipeline", name: "Renewal alert & draft letter", description: "Contract end date approaching → automated alert plus draft renewal letter with pricing pre-filled.", timeSaved: "1 hr / renewal" },
  // Data & admin
  { id: "a1", category: "Data & admin", name: "Invoice & PO processor", description: "Incoming invoice or purchase order → data extracted and logged into accounting system automatically.", timeSaved: "1–2 hrs / day" },
  { id: "a2", category: "Data & admin", name: "KPI dashboard compiler", description: "Multiple data sources → single formatted management report with key metrics, trends, and flags.", timeSaved: "90 min / week" },
  { id: "a3", category: "Data & admin", name: "Receipt & expense categoriser", description: "Photo of receipt or bank statement → categorised expense entry ready for accountant.", timeSaved: "2–3 hrs / week" },
  { id: "a4", category: "Data & admin", name: "Document summariser", description: "Long reports, contracts, or RFPs → concise executive summary with key points and required actions.", timeSaved: "1–2 hrs / doc" },
  // HR & hiring
  { id: "h1", category: "HR & hiring", name: "CV screener & shortlist", description: "Bulk CV upload → ranked shortlist with match score, red flags, and suggested interview questions.", timeSaved: "1 hr / 10 CVs" },
  { id: "h2", category: "HR & hiring", name: "Job description writer", description: "Role brief → complete JD with responsibilities, requirements, and tone aligned to company culture.", timeSaved: "1–2 hrs / JD" },
  { id: "h3", category: "HR & hiring", name: "Employee onboarding pack", description: "New hire details → full onboarding pack: employment summary, IT checklist, policies, first-week schedule.", timeSaved: "2 hrs / hire" },
  { id: "h4", category: "HR & hiring", name: "Interview summary report", description: "Interview notes or transcript → structured candidate evaluation with strengths, concerns, and hire recommendation.", timeSaved: "30 min / interview" },
  // Knowledge
  { id: "k1", category: "Knowledge", name: "Internal Q&A assistant", description: "Your policies and procedures → a smart assistant that answers staff questions instantly, around the clock.", timeSaved: "2–4 hrs / week" },
  { id: "k2", category: "Knowledge", name: "Client knowledge portal", description: "Your FAQs and product docs → a searchable self-service portal that reduces inbound support queries.", timeSaved: "5–8 hrs / week" },
  { id: "k3", category: "Knowledge", name: "Training doc generator", description: "Process notes and SOPs → formatted training manuals ready for new hires on day one.", timeSaved: "3–5 hrs / manual" },
  { id: "k4", category: "Knowledge", name: "Policy digest builder", description: "Dense policy documents → plain-English summaries with searchable key clauses your team can actually use.", timeSaved: "2 hrs / document" },
];

// ─── Topic tiles ───────────────────────────────────────────────────────────

interface Topic {
  id: string;
  label: string;
  descriptor: string;
  category: AutomationCategory;
  selectedBg: string;    // bg-* token
  selectedText: string;  // text-* token
}

const TOPICS: Topic[] = [
  { id: "docs",  label: "Admin & Paperwork",   descriptor: "Proposals · Contracts · Quotes",   category: "Documents",      selectedBg: "bg-mielie",  selectedText: "text-indigo" },
  { id: "comms", label: "Communications",       descriptor: "Emails · Follow-ups · Onboarding", category: "Communications", selectedBg: "bg-spruit",  selectedText: "text-indigo" },
  { id: "data",  label: "Reports & Data",       descriptor: "KPIs · Expenses · Dashboards",     category: "Data & admin",   selectedBg: "bg-indigo",  selectedText: "text-dawn"   },
  { id: "sales", label: "Sales Pipeline",       descriptor: "Leads · CRM · Renewals",           category: "Sales pipeline", selectedBg: "bg-stoep",   selectedText: "text-indigo" },
  { id: "hr",    label: "Hiring & HR",          descriptor: "CVs · Job ads · Onboarding",       category: "HR & hiring",    selectedBg: "bg-mielie",  selectedText: "text-indigo" },
  { id: "kb",    label: "Knowledge Bases",      descriptor: "Q&A bots · Training · Portals",    category: "Knowledge",      selectedBg: "bg-spruit",  selectedText: "text-indigo" },
];

// ─── Topic tile ────────────────────────────────────────────────────────────

function TopicTile({
  topic,
  isSelected,
  onToggle,
  index,
}: {
  topic: Topic;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      className={[
        "relative overflow-hidden rounded-[14px] p-6 md:p-8 text-left cursor-pointer",
        "min-h-[120px] md:min-h-[148px] flex flex-col justify-between group",
        "transition-colors duration-300",
        isSelected
          ? `${topic.selectedBg} ${topic.selectedText}`
          : "bg-dawn border border-indigo/12 text-indigo hover:border-indigo/30 hover:bg-indigo/[0.018]",
      ].join(" ")}
    >
      {/* Hover accent bar (unselected only) */}
      {!isSelected && (
        <span className="absolute top-0 left-0 h-[2px] bg-stoep w-0 group-hover:w-full transition-all duration-500 ease-out" aria-hidden />
      )}

      {/* Top row: checkmark */}
      <div className="flex justify-end h-5">
        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={{ background: "rgba(0,0,0,0.18)" }}
              aria-hidden
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <div>
        <div className="font-display font-semibold text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[-0.02em] leading-[1.1]">
          {topic.label}
        </div>
        <div className={`eyebrow mt-2 ${isSelected ? "opacity-55" : "opacity-38"}`}>
          {topic.descriptor}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Result card ───────────────────────────────────────────────────────────

function ResultCard({ item, index }: { item: AutomationItem; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[12px] bg-dawn border border-indigo/10
                 p-7 md:p-9 flex flex-col
                 hover:border-indigo/22 hover:shadow-[0_14px_44px_rgba(26,43,71,0.08)]
                 transition-all duration-300"
    >
      {/* Accent bar */}
      <span
        className="absolute top-0 left-0 h-[2px] bg-stoep w-0 group-hover:w-full transition-all duration-500 ease-out"
        aria-hidden
      />

      {/* Category + time saved */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <span className="eyebrow opacity-38">{item.category}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="block w-1.5 h-1.5 rounded-full bg-stoep opacity-60 flex-shrink-0" aria-hidden />
          <span className="eyebrow opacity-40">{item.timeSaved} saved</span>
        </div>
      </div>

      {/* Name */}
      <h3 className="font-display font-semibold text-[20px] md:text-[24px] lg:text-[28px] tracking-[-0.02em] leading-[1.1] flex-1">
        {item.name}
        <span className="text-stoep">.</span>
      </h3>

      {/* Description */}
      <p className="mt-4 text-[13.5px] md:text-[14px] leading-[1.65] opacity-62">
        {item.description}
      </p>

      {/* CTA */}
      <div className="mt-6 pt-5 border-t border-indigo/[0.08]">
        <Link
          href="/about#contact"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-stoep
                     hover:gap-3 transition-all duration-200"
        >
          Build this for me →
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function AutomationCatalogue() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.has(id)) return new Set();
      return new Set([id]);
    });
  }

  const filteredItems = useMemo(() => {
    if (selected.size === 0) return [];
    const cats = new Set(
      TOPICS.filter((t) => selected.has(t.id)).map((t) => t.category)
    );
    return ALL_ITEMS.filter((item) => cats.has(item.category));
  }, [selected]);

  const noneSelected = selected.size === 0;

  return (
    <section className="py-24 md:py-32 bg-dawn overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        {/* ── Heading ─────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <h2
            aria-label="Automate something."
            className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                       text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px]"
          >
            {["Automate", "something"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.22em] pb-[0.18em] mb-[-0.18em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block text-stoep"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.42, type: "spring", stiffness: 320, damping: 14 }}
                aria-hidden
              >
                .
              </motion.span>
            </span>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            {/* Rule + headline row */}
            <div className="flex items-center gap-4 w-full max-w-[560px]">
              <span className="flex-1 h-px bg-indigo opacity-[0.14] shrink-0 min-w-[20px]" />
              <p
                className="font-display font-medium tracking-[-0.025em] text-indigo text-center text-[18px] sm:text-[20px] md:text-[24px]"
              >
                Point at the{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-stoep">culprit</span>
                  <motion.span
                    className="absolute left-0 bottom-[2px] h-[2px] bg-stoep rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  />
                </span>
                <span className="text-stoep">.</span>
              </p>
              <span className="flex-1 h-px bg-indigo opacity-[0.14]" />
            </div>

            {/* Bouncing arrow */}
            <motion.svg
              width="14" height="22" viewBox="0 0 14 22" fill="none"
              className="text-stoep"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              aria-hidden
            >
              <path d="M7 0v18M1 12l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </div>

        {/* ── Topic tiles ─────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {TOPICS.map((topic, i) => (
            <TopicTile
              key={topic.id}
              topic={topic}
              isSelected={selected.has(topic.id)}
              onToggle={() => toggle(topic.id)}
              index={i}
            />
          ))}
        </div>

        {/* ── Empty state hint ────────────────────────────── */}
        <AnimatePresence>
          {noneSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-16 flex items-center justify-center gap-3"
            >
              <div className="h-px flex-1 bg-indigo/8" />
              <span className="eyebrow opacity-25">select a category above to see what's possible</span>
              <div className="h-px flex-1 bg-indigo/8" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 md:mt-20"
            >
              {/* Count header */}
              <div className="flex items-end justify-between mb-8 md:mb-10 pb-6 border-b border-indigo/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredItems.length}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-[20px] md:text-[28px] lg:text-[34px] tracking-[-0.025em] leading-[1]"
                  >
                    {filteredItems.length} automation{filteredItems.length !== 1 ? "s" : ""} we can build for you
                    <span className="text-stoep">.</span>
                  </motion.div>
                </AnimatePresence>
                <span className="eyebrow opacity-35 hidden md:block">
                  {TOPICS.find((t) => selected.has(t.id))?.label ?? ""}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, i) => (
                    <ResultCard key={item.id} item={item} index={i} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 md:mt-16 pt-10 border-t border-indigo/10
                           flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <p className="text-[14px] md:text-[15px] opacity-55 max-w-[44ch] leading-[1.65]">
                  Not seeing exactly what you need? We build bespoke.
                  Tell us the problem — we'll figure out the solution.
                </p>
                <Magnetic strength={0.3}>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/about#contact"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5
                                 bg-stoep text-indigo rounded-full text-[14px] font-medium
                                 hover:bg-[#ff5747] transition-colors duration-300"
                    >
                      Talk to us →
                    </Link>
                  </motion.div>
                </Magnetic>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
