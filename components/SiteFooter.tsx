"use client";

import Link from "next/link";
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

      <div className="relative mx-auto max-w-[1640px] px-6 md:px-12 py-12 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-4">
          <KuluWordmark size={64} variant="cream-on-indigo" showDescriptor showTagline />
        </div>

        <div className="md:col-span-3" id="contact">
          <div className="eyebrow opacity-65 mb-4">Get in touch</div>
          <ul className="text-[14px] leading-[1.85]">
            <li>
              <a
                href="mailto:hello@kulu-intelligence.co.za"
                data-cursor
                className="hover:text-stoep transition-colors duration-300"
              >
                hello@kulu-intelligence.co.za
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/27613889339"
                data-cursor
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:text-stoep hover:opacity-100 transition-colors duration-300"
              >
                +27 61 388 9339 (WhatsApp)
              </a>
            </li>
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

      <div className="relative mx-auto max-w-[1640px] px-6 md:px-12 py-6 eyebrow opacity-55">
        <div>© {new Date().getFullYear()} Kulu Intelligence · All rights reserved</div>
      </div>
    </footer>
  );
}
