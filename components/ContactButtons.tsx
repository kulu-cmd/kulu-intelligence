"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./Magnetic";

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ContactOption {
  label: string;
  href: string;
  icon: "whatsapp" | "email";
}

interface ContactButtonProps {
  label: string;
  variant: "coral" | "ghost";
  options: ContactOption[];
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ContactButton({ label, variant, options }: ContactButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const baseClass =
    variant === "coral"
      ? "inline-flex items-center gap-2 px-6 py-3.5 bg-stoep text-indigo rounded-full text-[14px] font-medium hover:bg-[#ff5747] transition-colors duration-300"
      : "inline-flex items-center gap-2 px-6 py-3.5 border border-dawn/30 text-dawn rounded-full text-[14px] font-medium hover:bg-dawn/10 transition-colors duration-300";

  return (
    <div ref={ref} className="relative w-full">
      <Magnetic strength={0.3}>
        <button
          data-cursor
          onClick={() => setOpen((v) => !v)}
          className={`${baseClass} w-full justify-between`}
        >
          {label}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: easeKulu }}
            className="inline-block leading-none"
          >
            →
          </motion.span>
        </button>
      </Magnetic>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: easeKulu }}
            className="absolute bottom-[calc(100%+10px)] left-0 z-50 min-w-[200px]
                       bg-[#13203A] border border-dawn/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="py-1.5">
              {options.map((opt) => (
                <a
                  key={opt.href}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-dawn text-[13px] font-medium
                             hover:bg-dawn/8 hover:text-stoep transition-colors duration-200 group"
                >
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                    {opt.icon === "whatsapp" ? <WhatsAppIcon /> : <EmailIcon />}
                  </span>
                  {opt.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const WA_NUMBER = "27613889339";

export function ContactButtons() {
  return (
    <div className="flex flex-col gap-3 items-start">
      <ContactButton
        label="Book a seminar"
        variant="coral"
        options={[
          {
            label: "WhatsApp",
            icon: "whatsapp",
            href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in booking an AI seminar for my team.")}`,
          },
          {
            label: "Email us",
            icon: "email",
            href: `mailto:hello@kulu-intelligence.co.za?subject=${encodeURIComponent("Seminar enquiry")}&body=${encodeURIComponent("Hi,\n\nI'm interested in booking an AI seminar for my team.\n\n")}`,
          },
        ]}
      />
      <ContactButton
        label="Automate something"
        variant="ghost"
        options={[
          {
            label: "WhatsApp",
            icon: "whatsapp",
            href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'd like to automate something in my business. Can we chat?")}`,
          },
          {
            label: "Email us",
            icon: "email",
            href: `mailto:hello@kulu-intelligence.co.za?subject=${encodeURIComponent("Automation enquiry")}&body=${encodeURIComponent("Hi,\n\nI'd like to automate something in my business.\n\n")}`,
          },
        ]}
      />
    </div>
  );
}
