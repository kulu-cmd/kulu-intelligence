"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { KuluMonogram } from "./KuluWordmark";
import { useRouteTransition } from "./RouteTransition";

/**
 * LandingCard — single-viewport composition for the professional 35+
 * audience (property, marketing, accounting & finance, HR firms).
 *
 *   ┌─ Meta bar ────────────────────────────────────────────────────┐
 *   ├─ Hero — Kulu. wordmark, brand promise, atmosphere             │
 *   ├─ Industries strip (Property · Marketing · Accounting · HR)    │
 *   └─ 4 tiles, centred text, ~30% shorter, route-wipe on click ───┘
 *
 * No scroll. Tiles are the primary navigation.
 */

type Surface = "dawn" | "indigo" | "coral" | "mielie";

type Tile = {
  label: string;
  title: string;
  body: string;
  meta: string;
  href: string;
  surface: Surface;
  image: string;
};

const tiles: Tile[] = [
  {
    label: "Learn",
    title: "Seminars",
    body: "Focused, in-person sessions that bring teams up to speed on practical AI — without the hype.",
    meta: "60 — 120 min",
    href: "/learn",
    surface: "dawn",
    image: "/seminars.png",
  },
  {
    label: "Implement",
    title: "Workflows",
    body: "We embed with your team, audit the work, and build AI into it. Two weeks, kickoff to live.",
    meta: "From R8,500",
    href: "/implement",
    surface: "indigo",
    image: "/workflows.png",
  },
  {
    label: "Practice",
    title: "Case studies",
    body: "Where AI is already earning its keep — in firms across property, marketing, accounting and HR.",
    meta: "37 engagements",
    href: "/case-studies",
    surface: "coral",
    image: "/testimonials.png",
  },
  {
    label: "Approach",
    title: "Why Kulu",
    body: "A small consultancy built for professional firms that want to move on AI properly. No rushing.",
    meta: "Johannesburg · 2026",
    href: "/about",
    surface: "mielie",
    image: "/why-kulu.png",
  },
];

const surfaceClasses: Record<Surface, string> = {
  dawn: "bg-dawn text-indigo",
  indigo: "bg-indigo text-dawn",
  coral: "bg-stoep text-indigo",
  mielie: "bg-mielie text-indigo",
};

const periodColour: Record<Surface, string> = {
  dawn: "text-stoep",
  indigo: "text-stoep",
  coral: "text-dawn",
  mielie: "text-stoep",
};

const accentLineColour: Record<Surface, string> = {
  dawn: "bg-stoep",
  indigo: "bg-stoep",
  coral: "bg-dawn",
  mielie: "bg-stoep",
};


const letters = ["K", "u", "l", "u"];

export function LandingCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 28, stiffness: 80, mass: 0.6 });
  const smy = useSpring(my, { damping: 28, stiffness: 80, mass: 0.6 });
  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);

  const wordX = useTransform(smx, [0, 1], [6, -6]);
  const wordY = useTransform(smy, [0, 1], [4, -4]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const time = d.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Johannesburg",
      });
      setNow(`${time} SAST · Johannesburg`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 flex flex-col bg-indigo text-dawn overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* ─── HERO STRIP (slightly taller now that tiles are 30% shorter) ─── */}
      <section
        aria-label="Kulu Intelligence"
        className="relative shrink-0 flex flex-col justify-end pt-16 sm:pt-20 pb-6 sm:pb-8 md:pb-10 px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ minHeight: "clamp(260px, 36svh, 440px)" }}
      >
        {/* Mouse-tracked spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(560px circle at var(--mx) var(--my), rgba(255,107,92,0.22), transparent 60%)",
            ["--mx" as string]: spotX,
            ["--my" as string]: spotY,
          }}
        />

        {/* Drifting mesh gradients */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[35%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[110px] opacity-[0.32]"
          style={{ background: "radial-gradient(circle, #FF6B5C 0%, transparent 70%)" }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 25, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[20%] -left-[10%] w-[45vw] h-[45vw] rounded-full blur-[110px] opacity-[0.22]"
          style={{ background: "radial-gradient(circle, #FFD66B 0%, transparent 70%)" }}
          animate={{ x: [0, -25, 20, 0], y: [0, 20, -25, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[5%] left-[40%] w-[35vw] h-[35vw] rounded-full blur-[120px] opacity-[0.15]"
          style={{ background: "radial-gradient(circle, #B8E0D2 0%, transparent 70%)" }}
          animate={{ x: [0, 25, -20, 0], y: [0, 25, 0, 0] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="pointer-events-none absolute inset-0 dot-field opacity-[0.40]" aria-hidden />

        {/* Top meta bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute top-5 sm:top-7 md:top-8 left-5 sm:left-8 md:left-12 lg:left-16 right-5 sm:right-8 md:right-12 lg:right-16 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <KuluMonogram size={18} variant="cream-on-indigo" />
            <span className="descriptor text-[8.5px] text-dawn/55 hidden sm:inline">
              INTELLIGENCE
            </span>
          </div>
          <span className="eyebrow text-dawn/55 text-[10px] sm:text-[11px] tabular-nums hidden xs:block">
            {now}
          </span>
        </motion.div>

        {/* Centre lockup */}
        <div className="relative">
          <motion.div style={{ x: wordX, y: wordY }} className="will-change-transform">
            <h1
              aria-label="Kulu."
              className="font-display font-semibold leading-[0.85] tracking-[-0.05em] text-[clamp(64px,12vw,164px)] flex items-baseline"
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.07,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0, y: -24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{
                  delay: 0.62,
                  duration: 0.9,
                  type: "spring",
                  stiffness: 320,
                  damping: 14,
                }}
                className="inline-block text-stoep"
                aria-hidden
              >
                .
              </motion.span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="descriptor text-[10px] sm:text-[11px] md:text-[12px] text-dawn/65 mt-2 sm:mt-3"
            >
              INTELLIGENCE
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TILES ─── */}
      <section
        aria-label="Choose a path"
        className="relative flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-4 sm:grid-rows-2 lg:grid-rows-1"
      >
        {tiles.map((tile, idx) => (
          <TileCell key={tile.href} tile={tile} idx={idx} />
        ))}
      </section>
    </div>
  );
}

function TileCell({ tile, idx }: { tile: Tile; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { navigate } = useRouteTransition();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 220, mass: 0.4 });
  const sy = useSpring(y, { damping: 20, stiffness: 220, mass: 0.4 });

  const tx = useTransform(sx, [-50, 50], [-4, 4]);
  const ty = useTransform(sy, [-50, 50], [-3, 3]);
  const rx = useTransform(sy, [-50, 50], [1.5, -1.5]);
  const ry = useTransform(sx, [-50, 50], [-1.5, 1.5]);

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = ref.current;
    if (!el) {
      navigate(tile.href, tile.surface);
      return;
    }
    const r = el.getBoundingClientRect();
    navigate(tile.href, tile.surface, {
      x: r.left,
      y: r.top,
      w: r.width,
      h: r.height,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.25 + idx * 0.08,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
      className="relative min-h-0"
    >
      <a
        ref={ref}
        href={tile.href}
        onClick={handleClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor
        data-cursor-label="Open →"
        className={[
          "tile group relative flex flex-col h-full w-full overflow-hidden",
          "transition-colors duration-500",
          surfaceClasses[tile.surface],
        ].join(" ")}
      >
        {/* Accent line — grows in from centre on hover */}
        <span
          aria-hidden
          className={[
            "absolute left-1/2 -translate-x-1/2 top-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-kulu z-10",
            accentLineColour[tile.surface],
          ].join(" ")}
        />

        {/* Vertical divider on the LEFT (except first tile) — only desktop */}
        {idx > 0 && (
          <span
            aria-hidden
            className={[
              "hidden lg:block absolute left-0 top-6 bottom-6 w-px z-10",
              tile.surface === "indigo" ? "bg-dawn/15" : "bg-indigo/10",
            ].join(" ")}
          />
        )}

        {/* ── Image — top portion, raw, no filters ── */}
        <div className="relative flex-none overflow-hidden" style={{ height: "60%" }}>
          {/* Label + arrow overlaid on image */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-5 sm:px-7 sm:pt-6 md:px-8 md:pt-7">
            <span className="eyebrow opacity-65 text-[10px] sm:text-[11px]">
              {tile.label}
            </span>
            <span className="eyebrow opacity-65 text-[10px] sm:text-[11px] inline-flex items-center gap-1">
              <span>Open</span>
              <motion.span
                className="inline-block"
                initial={false}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </span>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tile.image}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-kulu group-hover:scale-[1.04]"
          />
        </div>

        {/* ── Text area — below image ── */}
        <motion.div
          style={{ x: tx, y: ty, transformStyle: "preserve-3d" }}
          className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7 flex-1"
        >
          <h3 className="font-display font-semibold leading-[0.95] tracking-[-0.025em] text-[clamp(26px,3vw,44px)]">
            {tile.title}
            <span className={`period ${periodColour[tile.surface]}`}>.</span>
          </h3>
          <p className="text-[12px] md:text-[13px] lg:text-[14px] leading-[1.5] max-w-[26ch] opacity-80">
            {tile.body}
          </p>
        </motion.div>

        {/* ── Bottom meta ── */}
        <div
          className={[
            "px-5 sm:px-7 md:px-8 pb-5 sm:pb-6 pt-3 mx-5 sm:mx-7 md:mx-8",
            "border-t flex items-center justify-between gap-3",
            "text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-medium",
            tile.surface === "indigo" ? "border-dawn/15 opacity-65" : "border-current/15 opacity-65",
          ].join(" ")}
        >
          <span className="truncate">{tile.meta}</span>
          <span className="font-display normal-case tracking-normal text-[14px] sm:text-[15px] shrink-0">
            →
          </span>
        </div>
      </a>
    </motion.div>
  );
}
