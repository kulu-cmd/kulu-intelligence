"use client";

import { motion } from "framer-motion";

const lines = [
  "We've worked with businesses",
  "in Southeast Asia and Europe —",
  "watched AI reshape how they move.",
];

/**
 * AboutOrigin — editorial story section. Line-by-line clip reveal on scroll.
 * Split layout: heading left, large staggered lines right.
 */
export function AboutOrigin() {
  return (
    <section className="bg-dawn text-indigo py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">

          {/* Left: label + heading */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow opacity-55 mb-8"
            >
              02 — Where we come from
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display font-semibold text-[36px] md:text-[44px] lg:text-[54px] leading-[0.95] tracking-[-0.035em] max-w-[14ch]"
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                From everywhere, for here<span className="text-stoep">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right: staggered lines + caption */}
          <div className="md:col-span-8 md:pt-14">
            <div className="space-y-1">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    className="font-display font-medium text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] tracking-[-0.025em] leading-[1.2]"
                    initial={{ y: "110%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.85,
                      delay: 0.12 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>

            <motion.p
              className="mt-10 text-[15px] md:text-[16px] leading-[1.75] opacity-60 max-w-[50ch]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              We came back to South Africa because 90% of its businesses are
              small — and most haven't had access to what we've seen work
              everywhere else. We're here to change that.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
