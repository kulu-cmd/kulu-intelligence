"use client";

import { motion } from "framer-motion";

const easeKulu: [number, number, number, number] = [0.22, 1, 0.36, 1];

const INDUSTRIES = [
  { id: "property",   name: "Property",    tagline: "Managing agents & estate agencies" },
  { id: "marketing",  name: "Marketing",   tagline: "Agencies & in-house teams"         },
  { id: "accounting", name: "Accounting",  tagline: "Practices & finance teams"         },
  { id: "hr",         name: "HR Agencies", tagline: "Recruiters & people teams"         },
  { id: "mining",     name: "Mining",      tagline: "Consultancies & operations"        },
];

export function IndustriesStrip() {
  return (
    <section className="bg-dawn py-12 md:py-16 border-b border-indigo/10 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">

        {/* Industry tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: easeKulu }}
              className="group relative flex flex-col justify-between rounded-[12px] p-5 md:p-7 min-h-[110px]
                         bg-indigo/[0.035] border border-indigo/10 text-indigo
                         hover:border-indigo/28 hover:bg-indigo/[0.065]
                         hover:shadow-[0_8px_32px_rgba(26,43,71,0.07)]
                         transition-all duration-300"
            >
              {/* Top accent bar on hover */}
              <span
                className="absolute top-0 left-0 h-[2px] bg-stoep w-0 group-hover:w-full transition-all duration-500 ease-out rounded-t-[12px]"
                aria-hidden
              />
              <p className="eyebrow opacity-40 mb-3 group-hover:opacity-55 transition-opacity duration-200">
                {industry.tagline}
              </p>
              <span className="font-display font-medium text-[17px] sm:text-[20px] md:text-[22px] tracking-[-0.02em] leading-tight">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
