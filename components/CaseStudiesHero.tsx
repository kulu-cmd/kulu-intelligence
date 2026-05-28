"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = ["Hear", "from", "our", "clients"];
const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CaseStudiesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dawn text-indigo overflow-hidden pt-28 md:pt-52 pb-12 md:pb-24"
    >
      {/* Atmosphere blob */}
      <motion.div
        aria-hidden
        className="absolute -top-1/4 right-0 w-[55vw] h-[55vw] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)",
          opacity: 0.11,
        }}
        animate={{ x: [0, 28, -14, 0], y: [0, -22, 28, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">
        <motion.h1
          aria-label="Hear from our clients."
          style={{ y: headingY, willChange: "transform" }}
          className="font-display font-semibold leading-[0.92] tracking-[-0.04em]
                     text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px]"
        >
          {WORDS.map((word, i) => (
            <span
              key={word}
              className="inline-block overflow-hidden mr-[0.25em] pb-[0.12em] mb-[-0.12em]"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: easeKulu }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          {/* Coral period — springs in */}
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block text-stoep"
              initial={{ scale: 0, y: -24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{
                delay: 0.1 + WORDS.length * 0.08 + 0.08,
                type: "spring",
                stiffness: 320,
                damping: 14,
              }}
              aria-hidden
            >
              .
            </motion.span>
          </span>
        </motion.h1>

        {/* Hairline rule */}
        <motion.div
          className="mt-14 md:mt-20 h-px bg-indigo/12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.72, duration: 1.1, ease: easeKulu }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
