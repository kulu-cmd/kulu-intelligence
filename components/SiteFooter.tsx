"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KuluWordmark } from "./KuluWordmark";

const nav = [
  { href: "/learn", label: "Learn" },
  { href: "/implement", label: "Implement" },
  { href: "/case-studies", label: "Practice" },
  { href: "/about", label: "Approach" },
];

export function SiteFooter() {
  return (
    <footer className="bg-indigo text-dawn relative overflow-hidden">
      <div className="absolute inset-0 dot-field opacity-40 pointer-events-none" aria-hidden />

      {/* Massive wordmark — like a sign-off plate */}
      <div className="relative pt-24 md:pt-32 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[1640px] px-6 md:px-12"
        >
          <div className="font-display font-semibold leading-[0.85] tracking-[-0.05em] text-[clamp(80px,15vw,260px)]">
            Kulu<span className="text-stoep">.</span>
          </div>
          <div className="descriptor text-[14px] md:text-[18px] opacity-75 mt-6">
            INTELLIGENCE · AI, MADE HUMAN
          </div>
        </motion.div>
      </div>

      <hr className="rule" />

      <div className="relative mx-auto max-w-[1640px] px-6 md:px-12 py-12 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-4">
          <div className="eyebrow opacity-65 mb-4">A consultancy out of Johannesburg</div>
          <p className="text-[14px] leading-[1.7] opacity-80 max-w-[34ch]">
            Practical AI for professional firms in property, marketing, accounting and HR — across South Africa and the continent.
          </p>
        </div>

        <div className="md:col-span-3" id="contact">
          <div className="eyebrow opacity-65 mb-4">Get in touch</div>
          <ul className="text-[14px] leading-[1.85]">
            <li>
              <a
                href="mailto:hello@kulu.co.za"
                data-cursor
                className="hover:text-stoep transition-colors duration-300"
              >
                hello@kulu.co.za
              </a>
            </li>
            <li className="opacity-75">+27 71 555 0142</li>
            <li className="opacity-75">Mon–Fri · 09:00–17:00</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow opacity-65 mb-4">The site</div>
          <ul className="text-[14px] leading-[1.85]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor
                  className="hover:text-stoep transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="eyebrow opacity-65 mb-4">Based in</div>
          <ul className="text-[14px] leading-[1.85] opacity-80">
            <li>Johannesburg, ZA</li>
            <li>Across Africa</li>
          </ul>
        </div>
      </div>

      <hr className="rule" />

      <div className="relative mx-auto max-w-[1640px] px-6 md:px-12 py-6 flex flex-col-reverse md:flex-row justify-between gap-3 eyebrow opacity-55">
        <div>© {new Date().getFullYear()} Kulu Intelligence · All rights reserved</div>
        <div>"A brand is a promise kept on a Tuesday."</div>
      </div>
    </footer>
  );
}
