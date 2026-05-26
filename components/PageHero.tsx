"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  num: string;
  category: string;
  title: string;
  lead?: string;
  surface?: "dawn" | "indigo" | "coral" | "mielie" | "spruit";
}

const surfaceClasses = {
  dawn:   "bg-dawn text-indigo",
  indigo: "bg-indigo text-dawn",
  coral:  "bg-stoep text-indigo",
  mielie: "bg-mielie text-indigo",
  spruit: "bg-spruit text-indigo",
};

const periodColour = {
  dawn:   "text-stoep",
  indigo: "text-stoep",
  coral:  "text-dawn",
  mielie: "text-stoep",
  spruit: "text-stoep",
};

/**
 * PageHero — sub-page masthead with letter-stagger title and
 * scroll parallax on title + lead. No eyebrow meta bar.
 */
export function PageHero({ title, lead, surface = "dawn" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWords = title.split(" ");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Title drifts up at a slower rate than scroll → feels close
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  // Lead drifts up slightly less → sits just behind the title
  const leadY  = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative w-full overflow-hidden pt-28 md:pt-44 pb-16 md:pb-32",
        surfaceClasses[surface],
      ].join(" ")}
    >
      {/* Atmosphere blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-[0.32] pointer-events-none"
        style={{
          background:
            surface === "indigo"
              ? "radial-gradient(circle, #FF6B5C 0%, transparent 70%)"
              : surface === "coral"
              ? "radial-gradient(circle, #FFD66B 0%, transparent 70%)"
              : "radial-gradient(circle, #FF6B5C 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.2] pointer-events-none"
        style={{
          background:
            surface === "mielie"
              ? "radial-gradient(circle, #FF6B5C 0%, transparent 70%)"
              : surface === "dawn"
              ? "radial-gradient(circle, #B8E0D2 0%, transparent 70%)"
              : "radial-gradient(circle, #FFD66B 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {surface === "indigo" && (
        <div className="absolute inset-0 dot-field opacity-[0.45] pointer-events-none" aria-hidden />
      )}

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">
        {/* Title with parallax */}
        <motion.h1
          aria-label={title}
          style={{ y: titleY, willChange: "transform" }}
          className="font-display font-semibold leading-[0.92] tracking-[-0.04em] text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px] max-w-[16ch]"
        >
          {titleWords.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
              {i === titleWords.length - 1 && (
                <motion.span
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15 + titleWords.length * 0.07 + 0.05,
                    type: "spring",
                    stiffness: 320,
                    damping: 14,
                  }}
                  className={`inline-block ${periodColour[surface]}`}
                  aria-hidden
                >
                  .
                </motion.span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Lead with parallax */}
        {lead && (
          <motion.p
            style={{ y: leadY, willChange: "transform" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mt-10 md:mt-14 text-[16px] md:text-[20px] leading-[1.55] max-w-[58ch] opacity-85"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
