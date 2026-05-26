"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type Study = {
  industry: string;
  location: string;
  title: string;
  before: string;
  after: string;
  result: string;
  surface: "dawn" | "indigo" | "coral" | "mielie" | "spruit";
};

const surfaceClasses: Record<Study["surface"], string> = {
  dawn: "bg-dawn text-indigo",
  indigo: "bg-indigo text-dawn",
  coral: "bg-stoep text-indigo",
  mielie: "bg-mielie text-indigo",
  spruit: "bg-spruit text-indigo",
};

const periodColour: Record<Study["surface"], string> = {
  dawn: "text-stoep",
  indigo: "text-stoep",
  coral: "text-dawn",
  mielie: "text-stoep",
  spruit: "text-stoep",
};

const borderColour: Record<Study["surface"], string> = {
  dawn: "border-indigo/15",
  indigo: "border-dawn/15",
  coral: "border-indigo/20",
  mielie: "border-indigo/15",
  spruit: "border-indigo/15",
};

const dotActiveColour: Record<Study["surface"], string> = {
  dawn: "bg-stoep",
  indigo: "bg-stoep",
  coral: "bg-dawn",
  mielie: "bg-stoep",
  spruit: "bg-stoep",
};

// ─── Progress dot ──────────────────────────────────────────────────────────
function ProgressDot({
  index,
  total,
  progress,
  activeSurface,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  activeSurface: Study["surface"];
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = (index + 1) * seg;

  const opacity = useTransform(
    progress,
    [start - seg * 0.1, start + seg * 0.1, end - seg * 0.1, end + seg * 0.1],
    [0.25, 1, 1, 0.25]
  );
  const scale = useTransform(
    progress,
    [start - seg * 0.1, start + seg * 0.1, end - seg * 0.1, end + seg * 0.1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.span
      className={`block w-1.5 h-1.5 rounded-full ${dotActiveColour[activeSurface]}`}
      style={{ opacity, scale }}
    />
  );
}

// ─── Individual study panel ────────────────────────────────────────────────
function StudyPanel({
  study,
  index,
  total,
  progress,
}: {
  study: Study;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Entry: slide up from 100% → 0%
  const entryStart = isFirst ? 0 : index * seg - seg * 0.18;
  const entryEnd = isFirst ? 0 : index * seg + seg * 0.06;

  // Exit: scale down + dim as next card enters
  const exitStart = isLast ? 1 : (index + 1) * seg - seg * 0.12;
  const exitEnd = isLast ? 1 : (index + 1) * seg + seg * 0.02;

  const y = useTransform(
    progress,
    [entryStart, entryEnd, exitStart, exitEnd],
    isFirst ? ["0%", "0%", "0%", "0%"] : ["100%", "0%", "0%", "0%"]
  );

  const scale = useTransform(
    progress,
    [exitStart, exitEnd],
    isLast ? [1, 1] : [1, 0.94]
  );

  const dimOpacity = useTransform(
    progress,
    [exitStart, exitEnd],
    isLast ? [0, 0] : [0, 0.4]
  );

  // Progress bar for current card: fills left-to-right as this card is "active"
  const barScale = useTransform(
    progress,
    [index * seg, (index + 1) * seg],
    [0, 1]
  );

  return (
    <motion.div
      className={`absolute inset-0 ${surfaceClasses[study.surface]} overflow-hidden`}
      style={{ y, scale, zIndex: index + 1 }}
    >
      {/* Dot field texture for indigo cards */}
      {study.surface === "indigo" && (
        <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" aria-hidden />
      )}

      {/* Exit dim overlay */}
      <motion.div
        className="absolute inset-0 bg-indigo pointer-events-none"
        style={{ opacity: dimOpacity }}
        aria-hidden
      />

      {/* ── Card content ── */}
      <div className="relative h-full flex flex-col px-8 md:px-14 lg:px-20 py-10 md:py-14">

        {/* Top bar */}
        <div className="flex items-start justify-between">
          <div>
            <div className="eyebrow opacity-65">{study.industry}</div>
            <div className="eyebrow opacity-40 mt-1">{study.location}</div>
          </div>
          <div className="eyebrow opacity-30 tabular-nums">
            0{index + 1} / 0{total}
          </div>
        </div>

        {/* Title — vertically centred in remaining space */}
        <div className="flex-1 flex items-center py-8">
          <h2 className="font-display font-semibold leading-[1.0] tracking-[-0.03em] text-[28px] sm:text-[40px] md:text-[54px] lg:text-[68px] xl:text-[76px] max-w-[22ch]">
            {study.title}
            <span className={periodColour[study.surface]}>.</span>
          </h2>
        </div>

        {/* Bottom: before / after / result */}
        <div className={`border-t ${borderColour[study.surface]} pt-7 md:pt-9 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10`}>
          <div>
            <div className="eyebrow opacity-50 mb-3">Before</div>
            <p className="text-[13px] md:text-[14px] leading-[1.65] opacity-70">
              {study.before}
            </p>
          </div>
          <div>
            <div className="eyebrow opacity-50 mb-3">After</div>
            <p className="text-[13px] md:text-[14px] leading-[1.65] opacity-70">
              {study.after}
            </p>
          </div>
          <div>
            <div className="eyebrow opacity-50 mb-3">Result</div>
            <p className="font-display font-medium text-[16px] md:text-[19px] tracking-[-0.01em] leading-[1.3] opacity-90">
              {study.result}
            </p>
          </div>
        </div>

      </div>

      {/* Scroll progress bar — thin line crawling along the bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-stoep origin-left"
        style={{ scaleX: barScale }}
        aria-hidden
      />
    </motion.div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────
export function CaseStudiesScroll({ studies }: { studies: Study[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `${(studies.length + 0.6) * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {studies.map((study, i) => (
          <StudyPanel
            key={study.title}
            study={study}
            index={i}
            total={studies.length}
            progress={scrollYProgress}
          />
        ))}

        {/* Progress dots — right edge */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50">
          {studies.map((_, i) => (
            <ProgressDot
              key={i}
              index={i}
              total={studies.length}
              progress={scrollYProgress}
              activeSurface={studies[i].surface}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
