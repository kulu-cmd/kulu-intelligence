"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    name: "Meridian HR",
    industry: "HR & Recruitment",
    location: "Cape Town",
    brief:
      "A mid-size recruitment firm drowning in CV screening and candidate summaries. We built a screening pipeline that cut their shortlisting time by 70%.",
    testimonial:
      "We were sceptical at first — AI in recruitment gets a bad rap. But Kulu's approach was practical, not gimmicky. Our recruiters now spend their time talking to candidates, not reading through stacks of CVs.",
    testimonialAuthor: "Nadia Petersen",
    testimonialRole: "Operations Lead, Meridian HR",
    services: [
      "CV Screening Automation",
      "Candidate Summary Generation",
      "AI Integration in Practice Seminar",
    ],
    surface: "mielie",
  },
  {
    name: "Blackwood & Associates",
    industry: "Accounting & Advisory",
    location: "Durban",
    brief:
      "A growing accounting firm needed to standardise client communications and speed up their monthly reporting cycle without adding headcount.",
    testimonial:
      "What impressed us most was how quickly Kulu delivered. We had the first automation live within two weeks, and the team adopted it without any resistance. It just worked the way we already worked.",
    testimonialAuthor: "David Blackwood",
    testimonialRole: "Partner, Blackwood & Associates",
    services: [
      "Client Communication Templates",
      "Monthly Report Automation",
      "Internal Knowledge Base",
      "Claude for Business Seminar",
    ],
    surface: "spruit",
  },
  {
    name: "Urban Edge Properties",
    industry: "Property Management",
    location: "Pretoria",
    brief:
      "Managing 200+ residential units with a lean team. We automated tenant communications, maintenance scheduling, and lease renewals.",
    testimonial:
      "Our admin load dropped almost overnight. Tenants get faster responses, maintenance requests route themselves, and lease renewals practically handle themselves. Kulu gave us our weekends back.",
    testimonialAuthor: "Thabo Mokoena",
    testimonialRole: "Director, Urban Edge Properties",
    services: [
      "Tenant Communication Automation",
      "Maintenance Request Pipeline",
      "Lease Renewal Automation",
      "AI Integration in Practice Seminar",
    ],
    surface: "dawn",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-24 bg-stoep text-indigo rounded-[12px] px-8 md:px-14 py-14 md:py-20
                     flex flex-col md:flex-row gap-8 md:items-end md:justify-between"
        >
          <div>
            <div className="eyebrow opacity-65 mb-4">Your turn</div>
            <h2 className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                           text-[32px] md:text-[48px] lg:text-[64px] max-w-[20ch]">
              What could we automate for you<span className="text-dawn">?</span>
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/implement"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo text-dawn
                         rounded-full text-[14px] font-medium hover:bg-[#13203A] transition-colors duration-300"
            >
              See what&apos;s possible →
            </Link>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-indigo/30
                         text-indigo rounded-full text-[14px] font-medium hover:bg-indigo/10 transition-colors duration-300"
            >
              Talk to us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
