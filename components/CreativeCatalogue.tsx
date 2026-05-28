"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "./Magnetic";

// ─── Data ──────────────────────────────────────────────────────────────────

type CreativeCategory =
  | "Social media"
  | "Visuals & design"
  | "Campaigns"
  | "Brand content"
  | "Multilingual"
  | "Conversational";

interface CreativeItem {
  id: string;
  category: CreativeCategory;
  name: string;
  description: string;
  output: string;
}

const ALL_ITEMS: CreativeItem[] = [
  // Social media
  { id: "sm1", category: "Social media", name: "Content calendar builder", description: "Brand brief → a full month of post ideas, captions, and hashtag sets. Consistent voice, zero staring at a blank screen.", output: "30 posts / month" },
  { id: "sm2", category: "Social media", name: "Caption generator", description: "Product shot or campaign note → platform-ready captions for LinkedIn, Instagram, and Facebook, in your brand voice.", output: "10 captions / hr" },
  { id: "sm3", category: "Social media", name: "Trend response content", description: "Trending topic detected → brand-relevant post drafted for approval within the hour, not by next week.", output: "Same-day turnaround" },
  { id: "sm4", category: "Social media", name: "Community reply drafter", description: "Incoming comments and DMs → on-brand responses drafted for review. Engage more, type less.", output: "2 hrs saved / week" },
  // Visuals & design
  { id: "v1", category: "Visuals & design", name: "Ad creative generator", description: "Campaign brief → multiple ad variants across sizes and formats, ready for paid social or Google Display.", output: "10 variants / campaign" },
  { id: "v2", category: "Visuals & design", name: "Product mockup creator", description: "Product photo or description → lifestyle mockups and scene compositions. No photoshoot required.", output: "Same-day delivery" },
  { id: "v3", category: "Visuals & design", name: "Brand asset kit", description: "Visual brief → on-brand social templates, presentation decks, and marketing collateral in one consistent pack.", output: "Full kit in 48 hrs" },
  // Campaigns
  { id: "e1", category: "Campaigns", name: "Email campaign builder", description: "Audience segment and goal → subject line, body, and CTA written and structured, ready to drop into your platform.", output: "1 campaign / hr" },
  { id: "e2", category: "Campaigns", name: "Personalised sequences", description: "Customer list → multi-step email journeys that adapt to open and click behaviour. No two readers see the same thing.", output: "5-step sequence / day" },
  { id: "e3", category: "Campaigns", name: "Launch & promo pack", description: "Sale or launch brief → full campaign in one shot: landing page copy, email, social captions, and ad copy.", output: "Full pack in 2 hrs" },
  // Brand content
  { id: "b1", category: "Brand content", name: "Blog & article writer", description: "Topic or keyword → well-structured, brand-voice article with headings, subpoints, and a clean close. Ready for a light human edit.", output: "1 article / hr" },
  { id: "b2", category: "Brand content", name: "Pitch deck creator", description: "Business brief → narrative arc and slide-by-slide content for investor or client pitches. You bring the idea, we shape the story.", output: "10-slide deck / day" },
  { id: "b3", category: "Brand content", name: "Video script writer", description: "Campaign idea → punchy, scene-by-scene script for reels, ads, or explainer videos. Tone matched to your brand.", output: "Full script in 90 min" },
  { id: "b4", category: "Brand content", name: "Podcast show notes", description: "Episode recording or transcript → formatted show notes, timestamps, chapter titles, and social pull quotes.", output: "30 min / episode" },
  // Multilingual
  { id: "ml1", category: "Multilingual", name: "SA language content", description: "English copy → content translated into Afrikaans, Zulu, or Xhosa that sounds natural, not like a machine did it.", output: "4 languages / piece" },
  { id: "ml2", category: "Multilingual", name: "Localised campaign copy", description: "National campaign → adapted messaging for each market. The same offer, written for the people you're actually talking to.", output: "Per market, same day" },
  { id: "ml3", category: "Multilingual", name: "WhatsApp broadcasts", description: "Campaign brief → short, conversational messages in the language your customers use. High open rates start with the right words.", output: "10 messages / hr" },
  // Conversational
  { id: "ch1", category: "Conversational", name: "WhatsApp assistant", description: "Your FAQs, offers, and service info → a trained assistant that chats with customers in their language, around the clock.", output: "24/7 availability" },
  { id: "ch2", category: "Conversational", name: "Website chat widget", description: "Product or service docs → a branded chat widget that qualifies leads and answers questions the moment they land.", output: "Live in 5 days" },
  { id: "ch3", category: "Conversational", name: "Social auto-replies", description: "Common DM questions on Instagram and Facebook → instant, personalised responses that keep the conversation warm.", output: "Zero response delay" },
];

// ─── Topic tiles ───────────────────────────────────────────────────────────

interface Topic {
  id: string;
  label: string;
  descriptor: string;
  category: CreativeCategory;
  selectedBg: string;
  selectedText: string;
}

const TOPICS: Topic[] = [
  { id: "social",  label: "Social Media",       descriptor: "Posts · Captions · Calendar",     category: "Social media",      selectedBg: "bg-stoep",  selectedText: "text-indigo" },
  { id: "visuals", label: "Visuals & Design",    descriptor: "Ads · Mockups · Templates",       category: "Visuals & design",  selectedBg: "bg-mielie", selectedText: "text-indigo" },
  { id: "camps",   label: "Campaigns",           descriptor: "Email · Sequences · Promos",      category: "Campaigns",         selectedBg: "bg-spruit", selectedText: "text-indigo" },
  { id: "brand",   label: "Brand Content",       descriptor: "Blogs · Decks · Scripts",         category: "Brand content",     selectedBg: "bg-indigo", selectedText: "text-dawn"   },
  { id: "lang",    label: "Multilingual",        descriptor: "Zulu · Afrikaans · Xhosa",        category: "Multilingual",      selectedBg: "bg-mielie", selectedText: "text-indigo" },
  { id: "chat",    label: "Conversational",      descriptor: "Chatbots · WhatsApp · Portals",   category: "Conversational",    selectedBg: "bg-spruit", selectedText: "text-indigo" },
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

const WA_NUMBER = "27613889339";

function buildCreativeWaUrl(item: CreativeItem): string {
  const message = [
    `Hi Kulu 👋`,
    ``,
    `I'm interested in creating *${item.name}* for my business.`,
    ``,
    `${item.description}`,
    ``,
    `Can we chat about making this happen?`,
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ResultCard({ item, index }: { item: CreativeItem; index: number }) {
  const waUrl = buildCreativeWaUrl(item);
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

      {/* Category + output */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <span className="eyebrow opacity-38">{item.category}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="block w-1.5 h-1.5 rounded-full bg-stoep opacity-60 flex-shrink-0" aria-hidden />
          <span className="eyebrow opacity-40">{item.output}</span>
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
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-stoep
                     hover:gap-3 transition-all duration-200"
        >
          Create this with me →
        </a>
      </div>
    </motion.article>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function CreativeCatalogue({ showHeading = true }: { showHeading?: boolean }) {
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
    <section className={`${showHeading ? "py-24 md:py-32" : "pt-16 md:pt-20 pb-24 md:pb-32"} bg-dawn overflow-hidden border-t border-indigo/10`}>
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        {/* ── Heading ─────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          {showHeading && (
            <h2
              aria-label="Create something."
              className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px]"
            >
              {["Create", "something"].map((word, i) => (
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
          )}
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
                Pick your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-stoep">canvas</span>
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
              <span className="eyebrow opacity-25">select a format above to see what's possible</span>
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
                    {filteredItems.length} creative offering{filteredItems.length !== 1 ? "s" : ""} we can build for you
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
                  Not seeing what you had in mind? We create bespoke.
                  Tell us the idea — we'll figure out the format.
                </p>
                <Magnetic strength={0.3}>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/about#contact"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5
                                 bg-stoep text-indigo rounded-full text-[14px] font-medium
                                 hover:bg-[#ff5747] transition-colors duration-300"
                    >
                      Let's make something →
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
