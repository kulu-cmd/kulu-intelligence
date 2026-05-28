"use client";

import { motion } from "framer-motion";
import { KuluWordmark } from "./KuluWordmark";
import { Magnetic } from "./Magnetic";

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

const colVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.09, ease: easeKulu },
  }),
};

export function SiteFooter() {
  return (
    <footer className="bg-indigo text-dawn relative overflow-hidden">
      <div className="absolute inset-0 dot-field opacity-40 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1640px] px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12">

        {/* Wordmark */}
        <motion.div
          className="col-span-1 sm:col-span-2 md:col-span-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: easeKulu }}
        >
          <KuluWordmark size={64} variant="cream-on-indigo" showDescriptor showTagline />
        </motion.div>

        {/* Contact */}
        <motion.div
          className="md:col-span-3"
          id="contact"
          custom={1}
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="eyebrow opacity-65 mb-4">Get in touch</div>
          <ul className="text-[14px] leading-[1.85] flex flex-col gap-3">
            <li>
              <Magnetic strength={0.22}>
                <a
                  href="mailto:hello@kulu-intelligence.co.za"
                  data-cursor
                  className="relative inline-block group"
                >
                  <span className="hover:text-stoep transition-colors duration-300 break-all">
                    hello@kulu-intelligence.co.za
                  </span>
                  <span className="absolute bottom-0 left-0 h-[1px] bg-stoep w-0 group-hover:w-full transition-all duration-400 ease-out" />
                </a>
              </Magnetic>
            </li>
            <li>
              <Magnetic strength={0.22}>
                <a
                  href="https://wa.me/27613889339"
                  data-cursor
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block group opacity-75 hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="hover:text-stoep transition-colors duration-300">
                    +27 61 388 9339 (WhatsApp)
                  </span>
                  <span className="absolute bottom-0 left-0 h-[1px] bg-stoep w-0 group-hover:w-full transition-all duration-400 ease-out" />
                </a>
              </Magnetic>
            </li>
          </ul>
        </motion.div>

        {/* Based in */}
        <motion.div
          className="md:col-span-2"
          custom={2}
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="eyebrow opacity-65 mb-4">Based in</div>
          <ul className="text-[14px] leading-[1.85] opacity-80">
            <li>Johannesburg, ZA</li>
            <li>Across Africa</li>
          </ul>
        </motion.div>

      </div>

      <hr className="rule" />

      <motion.div
        className="relative mx-auto max-w-[1640px] px-6 md:px-12 py-6 eyebrow opacity-55"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: easeKulu }}
      >
        <div>© {new Date().getFullYear()} Kulu Intelligence · All rights reserved</div>
      </motion.div>
    </footer>
  );
}
