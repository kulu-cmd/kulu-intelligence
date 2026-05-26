"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "./Magnetic";

// ─── Client data ────────────────────────────────────────────────────────────

type Client = {
  name: string;
  industry: string;
  location: string;
  brief: string;
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  services: string[];
  surface: "dawn" | "indigo" | "mielie" | "spruit" | "stoep";
};

const CLIENTS: Client[] = [
  {
    name: "Virtualscape",
    industry: "Mining Consultancy",
    location: "Johannesburg",
    brief:
      "Three repetitive workflows were eating expert time every week. We automated proposal generation, built internal knowledge bases, and set up report pipelines — returning over 22 hours a month.",
    testimonial:
      "Kulu didn't just build tools — they understood how our consultants actually work. The proposal engine alone changed the pace of our sales cycle. We went from spending days on proposals to reviewing a polished draft the same afternoon.",
    testimonialAuthor: "James Sobey",
    testimonialRole: "Managing Director, Virtualscape",
    services: [
      "Proposal Generation Automation",
      "Internal Knowledge Base",
      "Client-Facing Knowledge Portal",
      "Automated Report Pipeline",
      "Claude for Business Seminar",
      "Claude Proficiency Training",
    ],
    surface: "indigo",
  },
  {
    name: "Element Farm Solutions",
    industry: "Business Solutions",
    location: "South Africa",
    brief:
      "One source of truth for the business, a sales pipeline that tracks every deal to close, and a digital marketing engine that runs without daily oversight — built and live within a month.",
    testimonial:
      "The knowledge base changed how we onboard and how we answer client questions. The sales pipeline means no lead gets dropped or forgotten. And the marketing runs itself — we're consistent and visible without someone staring at a dashboard all day. Three problems, three clean solutions.",
    testimonialAuthor: "Kamil Baloyi",
    testimonialRole: "Director, Element Farm Solutions",
    services: [
      "Knowledge Base Build",
      "Sales Pipeline Automation",
      "Digital Marketing Automation",
    ],
    surface: "mielie",
  },
];

// ─── Surface styles ─────────────────────────────────────────────────────────

function getSurfaceStyles(surface: Client["surface"], isOpen: boolean) {
  const map = {
    indigo: {
      card: isOpen ? "bg-indigo text-dawn" : "bg-dawn text-indigo border border-indigo/10",
      tag: isOpen ? "text-dawn/50" : "text-indigo/45",
      divider: isOpen ? "bg-dawn/12" : "bg-indigo/8",
      serviceBg: "bg-dawn/8",
      serviceText: isOpen ? "text-dawn/75" : "text-indigo/70",
      quote: isOpen ? "text-dawn/65" : "",
      accent: "text-stoep",
      dotField: isOpen,
    },
    mielie: {
      card: isOpen ? "bg-mielie text-indigo" : "bg-dawn text-indigo border border-indigo/10",
      tag: "text-indigo/45",
      divider: "bg-indigo/8",
      serviceBg: "bg-indigo/8",
      serviceText: "text-indigo/70",
      quote: "text-indigo/65",
      accent: "text-stoep",
      dotField: false,
    },
    spruit: {
      card: isOpen ? "bg-spruit text-indigo" : "bg-dawn text-indigo border border-indigo/10",
      tag: "text-indigo/45",
      divider: "bg-indigo/8",
      serviceBg: "bg-indigo/8",
      serviceText: "text-indigo/70",
      quote: "text-indigo/65",
      accent: "text-stoep",
      dotField: false,
    },
    stoep: {
      card: isOpen ? "bg-stoep text-indigo" : "bg-dawn text-indigo border border-indigo/10",
      tag: "text-indigo/45",
      divider: "bg-indigo/8",
      serviceBg: "bg-indigo/8",
      serviceText: "text-indigo/70",
      quote: "text-indigo/65",
      accent: "text-dawn",
      dotField: false,
    },
    dawn: {
      card: isOpen
        ? "bg-dawn text-indigo border border-indigo/12 shadow-[0_2px_24px_rgba(26,43,71,0.06)]"
        : "bg-dawn text-indigo border border-indigo/10",
      tag: "text-indigo/45",
      divider: "bg-indigo/8",
      serviceBg: "bg-indigo/6",
      serviceText: "text-indigo/70",
      quote: "text-indigo/65",
      accent: "text-stoep",
      dotField: false,
    },
  };
  return map[surface];
}

// ─── Client card ────────────────────────────────────────────────────────────

function ClientCard({ client, index }: { client: Client; index: number }) {
  const [open, setOpen] = useState(false);
  const s = getSurfaceStyles(client.surface, open);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      layout
      className={[
        "relative overflow-hidden rounded-[12px] transition-colors duration-500",
        s.card,
      ].join(" ")}
    >
      {/* Dot field for dark surfaces */}
      {s.dotField && (
        <div
          className="absolute inset-0 dot-field opacity-25 pointer-events-none"
          aria-hidden
        />
      )}

      {/* ── Header button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-full text-left px-7 md:px-10 py-7 md:py-8 group cursor-pointer"
      >
        <div className="flex items-start md:items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Eyebrow */}
            <div className={`eyebrow mb-2.5 ${s.tag}`}>
              {String(index + 1).padStart(2, "0")} — {client.industry} ·{" "}
              {client.location}
            </div>

            {/* Client name */}
            <h3 className="font-display font-semibold text-[28px] md:text-[40px] lg:text-[48px] tracking-[-0.03em] leading-[0.95]">
              {client.name}
              <span className={s.accent}>.</span>
            </h3>

            {/* Brief — visible when closed */}
            <AnimatePresence>
              {!open && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 text-[14px] md:text-[15px] leading-[1.7] opacity-50 max-w-[60ch]"
                >
                  {client.brief}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle indicator */}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center",
              "text-[22px] md:text-[24px] font-light transition-colors duration-300",
              open
                ? client.surface === "indigo"
                  ? "border-dawn/20 text-stoep"
                  : "border-indigo/15 text-stoep"
                : "border-indigo/15 text-stoep group-hover:border-stoep",
            ].join(" ")}
          >
            +
          </motion.span>
        </div>
      </button>

      {/* ── Expanded content ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="relative px-7 md:px-10 pb-9 md:pb-12">
              {/* Divider */}
              <div className={`h-px ${s.divider} mb-8 md:mb-10`} />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                {/* Testimonial */}
                <div className="md:col-span-7">
                  <div className={`eyebrow mb-4 ${s.tag}`}>Testimonial</div>
                  <blockquote>
                    <p
                      className={`text-[15px] md:text-[17px] leading-[1.75] ${s.quote} italic`}
                    >
                      &ldquo;{client.testimonial}&rdquo;
                    </p>
                    <footer className="mt-5">
                      <div className="font-display font-semibold text-[15px] md:text-[16px] tracking-[-0.01em]">
                        {client.testimonialAuthor}
                      </div>
                      <div
                        className={`text-[13px] mt-0.5 ${s.tag}`}
                      >
                        {client.testimonialRole}
                      </div>
                    </footer>
                  </blockquote>
                </div>

                {/* Services */}
                <div className="md:col-span-5">
                  <div className={`eyebrow mb-4 ${s.tag}`}>
                    Services delivered
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {client.services.map((service) => (
                      <li
                        key={service}
                        className={[
                          "px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium",
                          s.serviceBg,
                          s.serviceText,
                        ].join(" ")}
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── CTA panel with mouse-tracked highlight ─────────────────────────────────

function CtaPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 28, stiffness: 80 });
  const smy = useSpring(my, { damping: 28, stiffness: 80 });
  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-12 md:mt-24 bg-stoep text-indigo rounded-[12px] px-6 sm:px-8 md:px-14 py-10 md:py-20
                 flex flex-col md:flex-row gap-8 md:items-end md:justify-between overflow-hidden"
    >
      {/* Mouse-tracked highlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.18), transparent 65%)",
          ["--mx" as string]: spotX,
          ["--my" as string]: spotY,
        }}
      />

      <div className="relative">
        <div className="eyebrow opacity-65 mb-4">Your turn</div>
        <h2 className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                       text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] max-w-[20ch]">
          What could we automate for you<span className="text-dawn">?</span>
        </h2>
      </div>
      <div className="relative flex gap-3 flex-wrap">
        <Magnetic strength={0.28}>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link
              href="/implement"
              className="inline-flex items-center gap-2 px-6 py-4 bg-indigo text-dawn
                         rounded-full text-[14px] font-medium hover:bg-[#13203A] transition-colors duration-300"
            >
              See what&apos;s possible →
            </Link>
          </motion.div>
        </Magnetic>
        <Magnetic strength={0.28}>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-indigo/30
                         text-indigo rounded-full text-[14px] font-medium py-4 hover:bg-indigo/10 transition-colors duration-300"
            >
              Talk to us
            </Link>
          </motion.div>
        </Magnetic>
      </div>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function ClientCards() {
  return (
    <section className="bg-dawn text-indigo">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col gap-4">
          {CLIENTS.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <CtaPanel />
      </div>
    </section>
  );
}
