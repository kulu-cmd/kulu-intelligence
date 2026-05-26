"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * CaseStudiesHero — editorial two-line composition.
 * "Hear from" ghosts back, "our clients." steps forward.
 * Both layers parallax at different rates as you scroll, creating depth.
 */
export function CaseStudiesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background text (dim) drifts up slowly — feels distant
  const hearFromY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  // Foreground text (full) drifts up faster — feels close
  const ourClientsY = useTransform(scrollYProgress, [0, 1], [0, -65]);

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
        <h1 aria-label="Hear from our clients.">

          {/* Line 1: dim, moves slowly → background layer */}
          <div className="overflow-hidden">
            <motion.span
              style={{ y: hearFromY, willChange: "transform" }}
              className="block font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[38px] sm:text-[64px] md:text-[112px] lg:text-[144px]
                         opacity-[0.18]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Hear from
            </motion.span>
          </div>

          {/* Line 2: full opacity, moves faster → foreground layer */}
          <div className="overflow-hidden">
            <motion.span
              style={{ y: ourClientsY, willChange: "transform" }}
              className="block font-display font-semibold leading-[0.92] tracking-[-0.04em]
                         text-[38px] sm:text-[64px] md:text-[112px] lg:text-[144px]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              our clients
              <motion.span
                className="inline-block text-stoep"
                initial={{ scale: 0, y: -24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 320,
                  damping: 14,
                }}
                aria-hidden
              >
                .
              </motion.span>
            </motion.span>
          </div>

        </h1>

        {/* Hairline rule */}
        <motion.div
          className="mt-14 md:mt-20 h-px bg-indigo/12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
