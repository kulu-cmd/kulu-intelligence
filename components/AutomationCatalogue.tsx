"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const ITEMS_PER_PAGE = 4;

const pageVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function globalNum(item: AutomationItem): string {
  return String(ALL_ITEMS.findIndex((i) => i.id === item.id) + 1).padStart(2, "0");
}

/* ─── Main component ──────────────────────────────────────────────── */

export function AutomationCatalogue() {
  const [active, setActive] = useState<Category>("All");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () =>
      active === "All"
        ? ALL_ITEMS
        : ALL_ITEMS.filter((i) => i.category === active),
    [active]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );
  const [featured, ...rest] = pageItems;

  function navigate(newPage: number) {
    setPage(newPage);
  }

  function changeCategory(cat: Category) {
    setActive(cat);
    setPage(0);
  }

  return (
    <section id="catalogue" className="py-24 md:py-32 bg-dawn overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em]">
            What we can build for you
            <span className="text-stoep">.</span>
          </h2>
          <div className="eyebrow opacity-55">Automation catalogue</div>
        </div>

        {/* Category filter */}
        <div className="relative flex items-center overflow-x-auto no-scrollbar border-b border-indigo/10 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={[
                "relative flex-shrink-0 px-4 md:px-5 py-3 eyebrow transition-colors duration-200 whitespace-nowrap",
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

        {/* Catalogue viewport */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${page}`}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Featured card */}
            {featured && (
              <FeaturedCard item={featured} num={globalNum(featured)} />
            )}

            {/* Supporting cards */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {rest.map((item, i) => (
                  <SmallCard
                    key={item.id}
                    item={item}
                    num={globalNum(item)}
                    idx={i}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-indigo/10">
          <span className="eyebrow tabular-nums">
            <span className="text-indigo font-semibold opacity-100">
              {String(page + 1).padStart(2, "0")}
            </span>
            <span className="opacity-30"> / {String(totalPages).padStart(2, "0")}</span>
            <span className="opacity-25 ml-3 hidden md:inline">
              · {filtered.length} automation{filtered.length !== 1 ? "s" : ""}
            </span>
          </span>

          <div className="flex items-center gap-4">
            {/* Progress pips */}
            <div className="hidden md:flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  aria-label={`Page ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === page ? 22 : 6,
                    height: 6,
                    backgroundColor:
                      i === page
                        ? "#FF6B5C"
                        : "rgba(26,43,71,0.18)",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(page - 1)}
                disabled={page === 0}
                aria-label="Previous page"
                className="w-11 h-11 rounded-full border border-indigo/15 flex items-center justify-center text-indigo text-[18px] font-display transition-all duration-200 hover:border-indigo/40 hover:bg-indigo/5 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <button
                onClick={() => navigate(page + 1)}
                disabled={page >= totalPages - 1}
                aria-label="Next page"
                className="w-11 h-11 rounded-full border border-indigo/15 flex items-center justify-center text-indigo text-[18px] font-display transition-all duration-200 hover:border-indigo/40 hover:bg-indigo/5 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured card (full-width, dark) ───────────────────────────── */

function FeaturedCard({
  item,
  num,
}: {
  item: AutomationItem;
  num: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-[10px] bg-indigo text-dawn p-8 md:p-14 min-h-[260px] md:min-h-[310px] flex flex-col justify-between cursor-default"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 dot-field opacity-[0.32] pointer-events-none"
        aria-hidden
      />

      {/* Ghost catalogue number */}
      <div
        aria-hidden
        className="absolute right-4 -bottom-6 font-display font-semibold leading-none tracking-[-0.06em] select-none pointer-events-none"
        style={{
          fontSize: "clamp(160px, 20vw, 260px)",
          color: "rgba(255,248,232,0.05)",
        }}
      >
        {num}
      </div>

      {/* Top row */}
      <div className="relative flex items-center justify-between">
        <span className="eyebrow opacity-45">{item.category}</span>
        <div className="flex items-center gap-2">
          <span
            className="block w-1.5 h-1.5 rounded-full bg-stoep flex-shrink-0"
            style={{ opacity: 0.7 }}
            aria-hidden
          />
          <span className="eyebrow opacity-38 text-[9.5px]">
            {item.timeSaved} saved
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="relative mt-auto">
        <h3 className="font-display font-semibold text-[32px] md:text-[44px] lg:text-[52px] tracking-[-0.025em] leading-[0.97] mb-5 max-w-[24ch]">
          {item.name}
          <span className="text-stoep">.</span>
        </h3>

        <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-10">
          <p className="text-[14px] md:text-[15px] leading-[1.65] opacity-60 max-w-[56ch]">
            {item.description}
          </p>
          <a
            href="/about#contact"
            style={{
              opacity: hovered ? 1 : 0.72,
              transform: hovered ? "translateX(0)" : "translateX(-4px)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-stoep text-indigo rounded-full text-[12px] font-medium whitespace-nowrap self-start md:self-auto"
          >
            Talk to us about this →
          </a>
        </div>
      </div>

      {/* Hover accent bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-stoep"
        style={{
          width: hovered ? "100%" : "0%",
          transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </article>
  );
}

/* ─── Small card (3-up grid) ──────────────────────────────────────── */

function SmallCard({
  item,
  num,
  idx,
}: {
  item: AutomationItem;
  num: string;
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.42,
        delay: 0.08 + idx * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-[10px] border border-indigo/[0.09] bg-dawn p-6 md:p-8 flex flex-col cursor-default"
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 14px 44px rgba(26,43,71,0.10), 0 2px 6px rgba(26,43,71,0.05)"
          : "0 1px 3px rgba(26,43,71,0.04)",
        transition:
          "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
      }}
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-stoep"
        style={{
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Number + category */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="font-display font-semibold text-[11px] tracking-[-0.01em]"
          style={{ opacity: 0.18 }}
        >
          {num}
        </span>
        <span className="eyebrow opacity-32 text-[9px]">{item.category}</span>
      </div>

      {/* Name */}
      <h3 className="font-display font-medium text-[22px] md:text-[26px] tracking-[-0.02em] leading-[1.1] flex-1">
        {item.name}
        <span className="text-stoep">.</span>
      </h3>

      {/* Description — 2-line clamp */}
      <p className="mt-3 text-[13px] leading-[1.62] opacity-52 line-clamp-2">
        {item.description}
      </p>

      {/* Time saved */}
      <div className="mt-5 pt-4 border-t border-indigo/[0.08] flex items-center gap-2">
        <span
          className="block w-1.5 h-1.5 rounded-full bg-stoep flex-shrink-0"
          style={{ opacity: 0.55 }}
          aria-hidden
        />
        <span className="eyebrow opacity-38 text-[9.5px]">
          {item.timeSaved} saved
        </span>
      </div>
    </motion.article>
  );
}
