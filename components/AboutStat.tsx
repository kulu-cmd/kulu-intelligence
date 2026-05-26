"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useCountUp(target: number, durationSeconds: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(durationSeconds * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [active, target, durationSeconds]);
  return count;
}

/**
 * AboutStat — full-bleed dark section with an animated 90% counter.
 * The number is the only decoration.
 */
export function AboutStat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const count = useCountUp(90, 1.6, isInView);

  return (
    <section ref={ref} className="relative overflow-hidden bg-indigo text-dawn">
      <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-28 md:py-44">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-14">

          {/* The number */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start leading-none"
          >
            <span className="font-display font-semibold tracking-[-0.05em] text-[100px] sm:text-[150px] md:text-[200px] lg:text-[240px] leading-[0.85] tabular-nums">
              {count}
            </span>
            <span className="font-display font-semibold tracking-[-0.03em] text-stoep text-[50px] sm:text-[75px] md:text-[100px] lg:text-[120px] leading-[1] mt-3 md:mt-5">
              %
            </span>
          </motion.div>

          {/* Caption — anchors to bottom of the number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[32ch] pb-3 md:pb-8"
          >
            <p className="font-display font-medium text-[22px] md:text-[28px] tracking-[-0.02em] leading-[1.25] opacity-90">
              of South African businesses are small businesses
              <span className="text-stoep">.</span>
            </p>
            <p className="mt-4 text-[14px] leading-[1.65] opacity-45">
              That's the gap we work in.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
