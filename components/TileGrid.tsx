"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Tile = {
  num: string;
  label: string;
  title: string;
  body: string;
  meta: string;
  href: string;
  surface: "dawn" | "indigo" | "coral" | "mielie";
};

const tiles: Tile[] = [
  {
    num: "01",
    label: "Learn",
    title: "Seminars",
    body: "1–2 hour AI literacy sessions for the rooms that need them. Live, in-person, plain-spoken.",
    meta: "60–120 min · live",
    href: "/learn",
    surface: "dawn",
  },
  {
    num: "02",
    label: "Implement",
    title: "Workflows",
    body: "Embedded AI work. Audit, design, build, stay on. Two weeks. Live before month-end.",
    meta: "From R8,500 · 14 days",
    href: "/implement",
    surface: "indigo",
  },
  {
    num: "03",
    label: "Case studies",
    title: "What we tried",
    body: "Real businesses, real before-and-afters. The bits that worked. The bits that didn't.",
    meta: "37 projects · 6 industries",
    href: "/case-studies",
    surface: "coral",
  },
  {
    num: "04",
    label: "About",
    title: "Why Kulu",
    body: "Kulu means weighty, important, the kind of thing that earns your attention. That's the bar.",
    meta: "Joburg, ZA · 2026",
    href: "/about",
    surface: "mielie",
  },
];

const surfaceClasses: Record<Tile["surface"], string> = {
  dawn: "bg-dawn text-indigo border border-indigo/10",
  indigo: "bg-indigo text-dawn",
  coral: "bg-stoep text-indigo",
  mielie: "bg-mielie text-indigo",
};

const periodColour: Record<Tile["surface"], string> = {
  dawn: "text-stoep",
  indigo: "text-stoep",
  coral: "text-dawn",
  mielie: "text-stoep",
};

const numColour: Record<Tile["surface"], string> = {
  dawn: "text-indigo/5",
  indigo: "text-dawn/[0.07]",
  coral: "text-indigo/10",
  mielie: "text-indigo/[0.08]",
};

const accentLineColour: Record<Tile["surface"], string> = {
  dawn: "bg-stoep",
  indigo: "bg-stoep",
  coral: "bg-dawn",
  mielie: "bg-stoep",
};

export function TileGrid() {
  return (
    <section
      aria-label="Where to go next"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-indigo/10"
    >
      {tiles.map((tile, idx) => (
        <TileCard key={tile.href} tile={tile} idx={idx} />
      ))}
    </section>
  );
}

function TileCard({ tile, idx }: { tile: Tile; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 200, mass: 0.4 });
  const sy = useSpring(y, { damping: 18, stiffness: 200, mass: 0.4 });

  // Subtle 3D tilt — uses the cursor's position relative to the tile centre
  const rx = useTransform(sy, [-50, 50], [3, -3]);
  const ry = useTransform(sx, [-50, 50], [-3, 3]);

  // Magnetic content pull
  const tx = useTransform(sx, [-50, 50], [-6, 6]);
  const ty = useTransform(sy, [-50, 50], [-6, 6]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <Link
        ref={ref}
        href={tile.href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor
        data-cursor-label={`Go →`}
        className={[
          "tile group relative block min-h-[420px] md:min-h-[460px] lg:min-h-[520px] overflow-hidden p-7 md:p-9",
          "transition-colors duration-500 will-change-transform",
          surfaceClasses[tile.surface],
        ].join(" ")}
        style={{ transform: "translateZ(0)" }}
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="absolute inset-0"
        >
          {/* Ghost number — huge, decorative */}
          <div
            className={[
              "absolute right-3 bottom-0 font-display font-semibold leading-none tracking-[-0.06em] select-none pointer-events-none",
              "text-[clamp(180px,30vw,360px)]",
              numColour[tile.surface],
            ].join(" ")}
            aria-hidden
          >
            {tile.num}
          </div>

          {/* Light sweep on hover */}
          <div
            aria-hidden
            className={[
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              tile.surface === "indigo"
                ? "bg-gradient-to-br from-stoep/15 to-transparent"
                : "bg-gradient-to-br from-white/30 to-transparent",
            ].join(" ")}
          />
        </motion.div>

        {/* Top accent line — grows in on hover */}
        <span
          aria-hidden
          className={[
            "absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-kulu",
            accentLineColour[tile.surface],
          ].join(" ")}
        />

        {/* Content (magnetic) */}
        <motion.div
          style={{ x: tx, y: ty }}
          className="relative flex flex-col h-full justify-between"
        >
          <div className="flex items-baseline justify-between">
            <span className="eyebrow opacity-65">
              {tile.num} · {tile.label}
            </span>
            <motion.span
              className={[
                "eyebrow",
                tile.surface === "indigo" ? "opacity-65" : "opacity-65",
              ].join(" ")}
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              View →
            </motion.span>
          </div>

          <div className="mt-auto pt-16">
            <h3 className="font-display font-semibold leading-[0.92] tracking-[-0.03em] text-[40px] md:text-[52px] lg:text-[58px]">
              {tile.title}
              <span className={`period ${periodColour[tile.surface]}`}>.</span>
            </h3>
            <p className="mt-5 text-[14px] md:text-[15px] leading-[1.55] max-w-[28ch] opacity-80">
              {tile.body}
            </p>
            <div
              className={[
                "mt-7 pt-4 border-t flex items-center justify-between text-[11px] tracking-[0.14em] uppercase font-medium",
                tile.surface === "indigo"
                  ? "border-dawn/15 opacity-65"
                  : "border-current/15 opacity-65",
              ].join(" ")}
            >
              <span>{tile.meta}</span>
              <span className="font-display normal-case tracking-normal text-[14px]">
                <motion.span
                  className="inline-block"
                  initial={false}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
