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
      className="relative lg:fixed lg:inset-0 flex flex-col bg-indigo text-dawn overflow-x-hidden min-h-[100svh] lg:h-[100svh] lg:overflow-hidden"
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

        {/* Juggling balls — top right, below time */}
        <div
          className="absolute right-5 sm:right-8 md:right-12 lg:right-16 scale-[0.45] sm:scale-75 lg:scale-100 origin-top-right"
          style={{ top: "clamp(44px, 7svh, 72px)" }}
        >
          <JugglingBalls />
        </div>

        {/* Centre lockup — logo image replaces wordmark */}
        <div className="relative">
          <motion.div
            style={{ x: wordX, y: wordY }}
            className="will-change-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/websitelogo-trim.png"
              alt="Kulu Intelligence"
              className="h-auto object-contain -ml-1"
              style={{ width: "clamp(240px, 32vw, 360px)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── TILES ─── */}
      <section
        aria-label="Choose a path"
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:grid-rows-2 lg:grid-rows-1 lg:flex-1 lg:min-h-0"
      >
        {tiles.map((tile, idx) => (
          <TileCell key={tile.href} tile={tile} idx={idx} />
        ))}
      </section>
    </div>
  );
}

/* ─── Orbiting Balls ─────────────────────────────────────────────────────
   Three balls equally spaced 120° apart on a shared circular orbit.
   The orbit div rotates — balls travel together, never overlapping.
   Each ball also pulses gently on its own slower cycle.
────────────────────────────────────────────────────────────────────────── */
function JugglingBalls() {
  // Orbit geometry — centre at (124, 124), radius 88px, container 248×248
  const CX = 124, CY = 124, R = 88;
  const CONTAINER = 248;

  const balls = [
    { color: "#ff6b5c", size: 68, angleDeg: -90  }, // top    — large coral
    { color: "#ffd66b", size: 50, angleDeg:  30  }, // bottom-right — medium yellow
    { color: "#b8e0d2", size: 26, angleDeg: 150  }, // bottom-left  — small mint
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      aria-hidden
      style={{ width: CONTAINER, height: CONTAINER, position: "relative" }}
    >
      {/* Orbit ring — rotates all balls together */}
      <motion.div
        style={{ width: CONTAINER, height: CONTAINER, position: "absolute", inset: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {balls.map((ball, i) => {
          const rad = (ball.angleDeg * Math.PI) / 180;
          const cx  = CX + R * Math.cos(rad);
          const cy  = CY + R * Math.sin(rad);
          const r   = ball.size / 2;
          return (
            /* Pulse wrapper — independent slow breathing per ball */
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width:           ball.size,
                height:          ball.size,
                backgroundColor: ball.color,
                left:            cx - r,
                top:             cy - r,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration:   3.5 + i * 1.2,
                repeat:     Infinity,
                ease:       "easeInOut",
                repeatType: "mirror",
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
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
          "min-h-[300px] sm:min-h-[340px] lg:min-h-0",
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

        {/* ── Image fills the card, text overlaid on top ── */}
        <div className="relative flex-1 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tile.image}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-kulu group-hover:scale-[1.04]"
          />


          {/* Title + body — transparent overlay at bottom of image */}
          <motion.div
            style={{ x: tx, y: ty, transformStyle: "preserve-3d" }}
            className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end text-center gap-2 px-5 pb-5 sm:px-7 sm:pb-6 md:px-8 md:pb-7"
          >
            <h3 className="font-display font-semibold leading-[0.95] tracking-[-0.025em] text-[clamp(26px,3vw,44px)]">
              {tile.title}
              <span className={`period ${periodColour[tile.surface]}`}>.</span>
            </h3>
            <p className="text-[12px] md:text-[13px] lg:text-[14px] leading-[1.5] max-w-[26ch] opacity-80">
              {tile.body}
            </p>
          </motion.div>
        </div>

      </a>
    </motion.div>
  );
}
