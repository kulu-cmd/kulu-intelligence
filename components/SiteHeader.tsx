"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { KuluMonogram } from "./KuluWordmark";
import { ScrollProgress } from "./ScrollProgress";

const nav = [
  { href: "/learn",        label: "Learn" },
  { href: "/implement",    label: "Implement" },
  { href: "/case-studies", label: "Testimonials" },
  { href: "/about",        label: "Why Kulu" },
];

export function SiteHeader({
  overlay = false,
  minimal = false,
}: {
  overlay?: boolean;
  minimal?: boolean;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const overDark = overlay && !scrolled;
  const tone = overDark ? "text-dawn" : "text-indigo";
  const bg   = overDark ? "bg-transparent" : "bg-dawn/85 backdrop-blur-xl";

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
          bg,
          tone,
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1640px] px-4 sm:px-8 md:px-10 lg:px-12 py-3 md:py-5 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-2.5 group"
            aria-label="Kulu Intelligence — home"
            data-cursor
          >
            <motion.span
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="inline-flex"
            >
              <KuluMonogram
                size={22}
                variant={overDark ? "cream-on-indigo" : "indigo-on-dawn"}
              />
            </motion.span>
            <span className="descriptor text-[8.5px] opacity-60 hidden sm:inline">
              INTELLIGENCE
            </span>
          </Link>

          {/* Nav */}
          {!minimal && (
            <nav aria-label="Primary" className="flex items-center gap-1">
              <ul className="flex items-center gap-0 sm:gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-cursor
                      className="relative inline-flex items-center px-2.5 sm:px-3 py-3 text-[13px] tracking-[-0.005em] group"
                    >
                      <span className="relative z-10">{item.label}</span>
                      {/* Pill hover bg */}
                      <span className="absolute inset-x-1 inset-y-1 rounded-full bg-current opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300" />
                      {/* Animated underline */}
                      <span className="absolute bottom-0.5 left-2 right-2 h-[1.5px] bg-stoep scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Let's talk CTA */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="ml-2 hidden md:block"
              >
                <Link
                  href="/about#contact"
                  data-cursor
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stoep text-indigo rounded-full text-[13px] font-medium hover:bg-[#ff5747] transition-colors duration-300"
                >
                  Let&apos;s talk
                </Link>
              </motion.div>
            </nav>
          )}
        </div>
      </motion.header>
    </>
  );
}
