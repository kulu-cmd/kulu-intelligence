"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { KuluMonogram } from "./KuluWordmark";

const nav = [
  { href: "/learn", label: "Learn" },
  { href: "/implement", label: "Implement" },
  { href: "/case-studies", label: "Practice" },
  { href: "/about", label: "Approach" },
];

/**
 * SiteHeader — fixed overlay. On the landing it sits over the indigo
 * card (cream type); on sub-pages it picks up a cream backdrop once scrolled.
 *
 * When `minimal` is true (used on the landing), the nav is hidden — the
 * four tiles themselves are the navigation.
 */
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
  const bg = overDark ? "bg-transparent" : "bg-dawn/85 backdrop-blur-xl";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
        bg,
        tone,
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1640px] px-5 sm:px-8 md:px-10 lg:px-12 py-4 md:py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-2.5 group"
          aria-label="Kulu Intelligence — home"
          data-cursor
        >
          <KuluMonogram
            size={22}
            variant={overDark ? "cream-on-indigo" : "indigo-on-dawn"}
          />
          <span className="descriptor text-[8.5px] opacity-60 hidden sm:inline">
            INTELLIGENCE
          </span>
        </Link>

        {!minimal && (
          <nav aria-label="Primary">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor
                    className="relative inline-flex items-center px-3 py-2 text-[13px] tracking-[-0.005em] group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-x-2 inset-y-1 rounded-full bg-current opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
