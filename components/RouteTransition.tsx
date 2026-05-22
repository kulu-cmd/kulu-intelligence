"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

type Surface = "dawn" | "indigo" | "coral" | "mielie" | "spruit";

const surfaceColour: Record<Surface, string> = {
  dawn: "#FFF8E8",
  indigo: "#1A2B47",
  coral: "#FF6B5C",
  mielie: "#FFD66B",
  spruit: "#B8E0D2",
};

// Blade line colour per surface — visible leading edge on each rising panel
const bladeColour: Record<Surface, string> = {
  dawn: "rgba(255,107,92,0.7)",    // coral on cream
  indigo: "rgba(255,248,232,0.4)", // cream on indigo
  coral: "rgba(255,248,232,0.5)",  // cream on coral
  mielie: "rgba(255,107,92,0.7)",  // coral on yellow
  spruit: "rgba(26,43,71,0.25)",   // indigo on mint
};

type Origin = { x: number; y: number; w: number; h: number } | null;

type Ctx = {
  navigate: (href: string, surface: Surface, origin?: Origin) => void;
  enterColour: string | null;
  enterBlade: string | null;
  consumeEnter: () => void;
};

const RouteTransitionContext = createContext<Ctx | null>(null);

export function useRouteTransition() {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) {
    return {
      navigate: (href: string) => {
        if (typeof window !== "undefined") window.location.href = href;
      },
      enterColour: null,
      enterBlade: null,
      consumeEnter: () => {},
    } as Ctx;
  }
  return ctx;
}

// ─── Timing constants ────────────────────────────────────────────────────────
const PANEL_COUNT    = 5;
const PANEL_DURATION = 0.38;          // seconds per panel travel
const EXIT_STAGGER   = 0.048;         // seconds between panels on exit (left→right)
const ENTER_STAGGER  = 0.048;         // seconds between panels on enter (right→left)

// Route push happens after all exit panels have fully covered the screen
const ROUTE_PUSH_MS  = Math.round(
  (PANEL_COUNT - 1) * EXIT_STAGGER * 1000 + PANEL_DURATION * 1000 + 30
); // ≈ 602ms

// How long to hold at full coverage before revealing the new page
const ENTER_HOLD_MS  = 80;

// How long after "enter" starts before we go idle (let all panels clear)
const IDLE_TIMEOUT_MS = Math.round(
  (PANEL_COUNT - 1) * ENTER_STAGGER * 1000 + PANEL_DURATION * 1000 + 80
); // ≈ 650ms

// ─────────────────────────────────────────────────────────────────────────────

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router   = useRouter();
  const pathname = usePathname();

  const [phase, setPhase]   = useState<"idle" | "exit" | "enter">("idle");
  const [colour, setColour] = useState<string>("#1A2B47");
  const [blade, setBlade]   = useState<string>("rgba(255,248,232,0.4)");

  const enterColourRef = useRef<string | null>(null);
  const enterBladeRef  = useRef<string | null>(null);
  const [enterColour, setEnterColour] = useState<string | null>(null);
  const [enterBlade, setEnterBlade]   = useState<string | null>(null);

  const navigate = useCallback(
    (href: string, surface: Surface, _origin?: Origin) => {
      const c = surfaceColour[surface] ?? "#1A2B47";
      const b = bladeColour[surface]   ?? "rgba(255,248,232,0.4)";
      setColour(c);
      setBlade(b);
      enterColourRef.current = c;
      enterBladeRef.current  = b;
      setPhase("exit");

      // Push route after exit panels have fully covered the viewport
      window.setTimeout(() => router.push(href), ROUTE_PUSH_MS);
    },
    [router]
  );

  // When the pathname changes while in exit phase, switch to enter phase
  useEffect(() => {
    if (phase === "exit") {
      const t = window.setTimeout(() => {
        setEnterColour(enterColourRef.current);
        setEnterBlade(enterBladeRef.current);
        setPhase("enter");
      }, ENTER_HOLD_MS);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // After enter panels have cleared, return to idle
  useEffect(() => {
    if (phase !== "enter") return;
    const t = window.setTimeout(() => setPhase("idle"), IDLE_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const consumeEnter = useCallback(() => {
    setEnterColour(null);
    setEnterBlade(null);
    enterColourRef.current = null;
    enterBladeRef.current  = null;
  }, []);

  return (
    <RouteTransitionContext.Provider
      value={{ navigate, enterColour, enterBlade, consumeEnter }}
    >
      {children}

      {/*
       * Shoji Screen — 5 vertical panels that rise from below (exit) and
       * drop back down (enter), staggered in opposite directions.
       *
       * Mounted only while phase !== idle. Because the container is always
       * mounted during both exit and enter, panels stay in the DOM and
       * Framer Motion can tween from their current position on phase change.
       */}
      {phase !== "idle" && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[200] flex overflow-hidden"
        >
          {Array.from({ length: PANEL_COUNT }).map((_, i) => {
            const exitDelay  = i * EXIT_STAGGER;
            const enterDelay = (PANEL_COUNT - 1 - i) * ENTER_STAGGER;

            return (
              <div key={i} className="flex-1 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: colour }}
                  initial={{ y: "100%" }}
                  animate={
                    phase === "exit"
                      ? {
                          y: "0%",
                          transition: {
                            duration: PANEL_DURATION,
                            delay:    exitDelay,
                            ease:     [0.76, 0, 0.24, 1], // fast start, smooth settle
                          },
                        }
                      : {
                          y: "100%",
                          transition: {
                            duration: PANEL_DURATION,
                            delay:    enterDelay,
                            ease:     [0.36, 0, 1, 1], // gentle release → accelerates away
                          },
                        }
                  }
                >
                  {/* Bottom blade — leading edge as panel rises during exit */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: blade }}
                  />
                  {/* Top blade — trailing edge as panel drops during enter */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ backgroundColor: blade, opacity: 0.5 }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </RouteTransitionContext.Provider>
  );
}
