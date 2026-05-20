"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type Category =
  | "All"
  | "Documents"
  | "Communications"
  | "Sales pipeline"
  | "Data & admin"
  | "HR & hiring";

interface AutomationItem {
  id: string;
  category: Exclude<Category, "All">;
  name: string;
  description: string;
  timeSaved: string;
}

const ALL_ITEMS: AutomationItem[] = [
  // Documents
  {
    id: "d1",
    category: "Documents",
    name: "Proposal generator",
    description:
      "Sales call notes or a brief → complete branded proposal with scope, deliverables, and timeline. Zero manual drafting.",
    timeSaved: "2–3 hrs per proposal",
  },
  {
    id: "d2",
    category: "Documents",
    name: "Contract & SLA builder",
    description:
      "Client data → fully populated contract with correct entity names, figures, and dates — gaps highlighted automatically.",
    timeSaved: "3–5 hrs per contract",
  },
  {
    id: "d3",
    category: "Documents",
    name: "Quote & pricing sheet",
    description:
      "Line items and margins in → formatted, on-brand quote document out. Handles currency, escalation, and totals.",
    timeSaved: "1–2 hrs per quote",
  },
  {
    id: "d4",
    category: "Documents",
    name: "Report generator",
    description:
      "Raw data → formatted weekly or monthly client-facing report, ready to send.",
    timeSaved: "2–3 hrs per week",
  },
  {
    id: "d5",
    category: "Documents",
    name: "Meeting notes to action items",
    description:
      "Rough notes or transcript → structured summary with decisions, owners, and deadlines extracted.",
    timeSaved: "45 min per meeting",
  },
  // Communications
  {
    id: "c1",
    category: "Communications",
    name: "Email triage & response drafter",
    description:
      "Incoming emails classified by type → AI drafts responses for routine messages. Human approves and sends.",
    timeSaved: "1–2 hrs per day",
  },
  {
    id: "c2",
    category: "Communications",
    name: "Follow-up sequence builder",
    description:
      "Post-meeting or post-proposal → personalised follow-up emails at set intervals. No lead goes cold.",
    timeSaved: "3–4 hrs per week",
  },
  {
    id: "c3",
    category: "Communications",
    name: "Client onboarding pack",
    description:
      "New client details → welcome letter, terms summary, account setup instructions, and first-week checklist.",
    timeSaved: "45 min per client",
  },
  {
    id: "c4",
    category: "Communications",
    name: "Review response drafter",
    description:
      "New Google or Hellopeter review detected → personalised on-brand response drafted for approval.",
    timeSaved: "4–5 hrs per week",
  },
  {
    id: "c5",
    category: "Communications",
    name: "Internal newsletter",
    description:
      "Weekly inputs from team → formatted internal communication or client newsletter, ready to send.",
    timeSaved: "2 hrs per week",
  },
  // Sales pipeline
  {
    id: "s1",
    category: "Sales pipeline",
    name: "Lead intake processor",
    description:
      "Inbound enquiry → enriched lead profile with pain points, company context, and recommended solution angle.",
    timeSaved: "30 min per lead",
  },
  {
    id: "s2",
    category: "Sales pipeline",
    name: "CRM auto-population",
    description:
      "Sales call or email thread → CRM fields updated automatically. No more manual note entry after every call.",
    timeSaved: "20 min per call",
  },
  {
    id: "s3",
    category: "Sales pipeline",
    name: "Competitive intel digest",
    description:
      "Competitors monitored weekly → summary of pricing, product, and messaging changes.",
    timeSaved: "3 hrs per week",
  },
  {
    id: "s4",
    category: "Sales pipeline",
    name: "Renewal alert & draft letter",
    description:
      "Contract end date approaching → automated alert plus draft renewal letter with updated pricing pre-filled.",
    timeSaved: "1 hr per renewal",
  },
  // Data & admin
  {
    id: "a1",
    category: "Data & admin",
    name: "Invoice & PO processor",
    description:
      "Incoming invoice or purchase order → data extracted and logged into accounting system automatically.",
    timeSaved: "1–2 hrs per day",
  },
  {
    id: "a2",
    category: "Data & admin",
    name: "KPI dashboard compiler",
    description:
      "Multiple data sources → single formatted management report with key metrics, trends, and flags.",
    timeSaved: "90 min per week",
  },
  {
    id: "a3",
    category: "Data & admin",
    name: "Receipt & expense categoriser",
    description:
      "Photo of receipt or bank statement → categorised expense entry ready for accountant.",
    timeSaved: "2–3 hrs per week",
  },
  {
    id: "a4",
    category: "Data & admin",
    name: "Document summariser",
    description:
      "Long reports, contracts, or RFPs → concise executive summary with key points and required actions.",
    timeSaved: "1–2 hrs per document",
  },
  // HR & hiring
  {
    id: "h1",
    category: "HR & hiring",
    name: "CV screener & shortlist",
    description:
      "Bulk CV upload → ranked shortlist with match score, red flags, and suggested interview questions.",
    timeSaved: "1 hr per 10 CVs",
  },
  {
    id: "h2",
    category: "HR & hiring",
    name: "Job description writer",
    description:
      "Role brief → complete JD with responsibilities, requirements, and tone aligned to company culture.",
    timeSaved: "1–2 hrs per JD",
  },
  {
    id: "h3",
    category: "HR & hiring",
    name: "Employee onboarding doc pack",
    description:
      "New hire details → full onboarding pack: employment summary, IT checklist, policies, first-week schedule.",
    timeSaved: "2 hrs per hire",
  },
  {
    id: "h4",
    category: "HR & hiring",
    name: "Interview summary report",
    description:
      "Interview notes or transcript → structured candidate evaluation with strengths, concerns, and hire recommendation.",
    timeSaved: "30 min per interview",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Documents",
  "Communications",
  "Sales pipeline",
  "Data & admin",
  "HR & hiring",
];

export function AutomationCatalogue() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? ALL_ITEMS
        : ALL_ITEMS.filter((i) => i.category === active),
    [active]
  );

  return (
    <section id="catalogue" className="py-24 md:py-32 bg-dawn">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[22ch]">
            What we can build for you
            <span className="text-stoep">.</span>
          </h2>
          <div className="eyebrow opacity-55">04 — Automation catalogue</div>
        </div>

        {/* Category filter — sliding coral underline */}
        <div className="relative flex items-center overflow-x-auto no-scrollbar border-b border-indigo/10 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                "relative flex-shrink-0 px-4 md:px-5 py-3 eyebrow transition-colors duration-250 whitespace-nowrap",
                active === cat
                  ? "text-indigo"
                  : "text-indigo/35 hover:text-indigo/65",
              ].join(" ")}
            >
              {cat}
              {active === cat && (
                <motion.div
                  layoutId="filter-bar"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-stoep"
                  style={{ borderRadius: "2px 2px 0 0" }}
                  transition={{ type: "spring", damping: 34, stiffness: 440 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Count meta */}
        <p className="eyebrow opacity-38 mb-10 md:mb-12 pt-3 text-[10px]">
          {filtered.length} automation{filtered.length !== 1 ? "s" : ""}
          {active !== "All" ? ` · ${active}` : " across all categories"}
          {" · "}
          Talk to us about any of these →
        </p>

        {/* Card grid — key forces remount on filter change, enabling stagger */}
        <div
          key={active}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {filtered.map((item, idx) => (
            <CatalogueCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Individual card ─────────────────────────────────────────────── */

function CatalogueCard({
  item,
  idx,
}: {
  item: AutomationItem;
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const globalNum = String(
    ALL_ITEMS.findIndex((i) => i.id === item.id) + 1
  ).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(idx * 0.05, 0.28),
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-dawn border border-indigo/[0.09] rounded-[8px] overflow-hidden flex flex-col p-7 md:p-8"
      style={{
        boxShadow: hovered
          ? "0 14px 44px rgba(26,43,71,0.10), 0 2px 6px rgba(26,43,71,0.05)"
          : "0 1px 3px rgba(26,43,71,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0px)",
        transition:
          "box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Top accent line — grows left-to-right on hover */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-stoep"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Ghost index numeral */}
      <div
        aria-hidden
        className="absolute -right-1 -bottom-5 font-display font-semibold leading-none tracking-[-0.06em] select-none pointer-events-none"
        style={{
          fontSize: "clamp(100px, 12vw, 140px)",
          color: "rgba(26,43,71,0.038)",
        }}
      >
        {globalNum}
      </div>

      {/* Category label */}
      <div className="eyebrow opacity-40 mb-4 text-[9.5px]">{item.category}</div>

      {/* Automation name */}
      <h3 className="relative font-display font-medium text-[21px] md:text-[24px] tracking-[-0.02em] leading-[1.1] mb-3">
        {item.name}
        <span className="text-stoep">.</span>
      </h3>

      {/* Description */}
      <p className="relative text-[13.5px] leading-[1.68] opacity-65 flex-1 mb-5 md:mb-6">
        {item.description}
      </p>

      {/* Bottom row — time saved + CTA */}
      <div className="relative pt-4 border-t border-indigo/[0.09] flex items-center justify-between gap-3 min-h-[28px]">
        {/* Time saved */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            aria-hidden
            className="block w-1.5 h-1.5 rounded-full bg-stoep flex-shrink-0"
            style={{ opacity: 0.6 }}
          />
          <span className="eyebrow opacity-45 text-[9.5px]">
            {item.timeSaved} saved
          </span>
        </div>

        {/* CTA — slides and fades in on hover */}
        <motion.a
          href="/about#contact"
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : -6,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="eyebrow text-stoep text-[9.5px] whitespace-nowrap flex-shrink-0"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Discuss this →
        </motion.a>
      </div>
    </motion.article>
  );
}
