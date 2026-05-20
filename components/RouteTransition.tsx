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

type Origin = { x: number; y: number; w: number; h: number } | null;

type Ctx = {
  navigate: (href: string, surface: Surface, origin?: Origin) => void;
  enterColour: string | null;
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
      consumeEnter: () => {},
    } as Ctx;
  }
  return ctx;
}

/**
 * RouteTransitionProvider — coordinates cinematic route changes.
 *
 *   exit phase  — coloured overlay expands from the clicked tile to fill
 *                 the viewport, covering the route change underneath
 *   route push  — Next.js navigates while the overlay holds full coverage
 *   enter phase — overlay fades out, revealing the destination page
 *
 * The destination's `enterColour` can be consumed by a `<PageEnter>` on
 * the new page to add a coloured veil that fades, doubling down on the
 * connection between the tile and the page that opens.
 */
export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [colour, setColour] = useState<string>("#FF6B5C");
  const [origin, setOrigin] = useState<Origin>(null);

  const enterColourRef = useRef<string | null>(null);
  const [enterColour, setEnterColour] = useState<string | null>(null);

  const navigate = useCallback(
    (href: string, surface: Surface, originRect?: Origin) => {
      const c = surfaceColour[surface] ?? "#FF6B5C";
      setColour(c);
      setOrigin(originRect ?? null);
      enterColourRef.current = c;
      setPhase("exit");
      // Let the wipe cover the viewport before navigating
      window.setTimeout(() => {
        router.push(href);
      }, 520);
    },
    [router]
  );

  // When the pathname changes after an exit, switch to the enter phase
  useEffect(() => {
    if (phase === "exit") {
      // Brief hold before fading out so the new page has time to paint
      const t = window.setTimeout(() => {
        setEnterColour(enterColourRef.current);
        setPhase("enter");
      }, 50);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // After enter completes, return to idle
  useEffect(() => {
    if (phase !== "enter") return;
    const t = window.setTimeout(() => {
      setPhase("idle");
      setOrigin(null);
    }, 550);
    return () => clearTimeout(t);
  }, [phase]);

  const consumeEnter = useCallback(() => {
    setEnterColour(null);
    enterColourRef.current = null;
  }, []);

  return (
    <RouteTransitionContext.Provider value={{ navigate, enterColour, consumeEnter }}>
      {children}

      {/* Single overlay — animates origin→fullscreen during exit, then
          fades out during enter. No key change means framer-motion can
          tween smoothly through the phase transition. */}
      {phase !== "idle" && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[200]"
          style={{ backgroundColor: colour }}
          initial={
            origin
              ? {
                  x: origin.x,
                  y: origin.y,
                  width: origin.w,
                  height: origin.h,
                  opacity: 1,
                }
              : { x: 0, y: 0, width: "100vw", height: "100vh", opacity: 1 }
          }
          animate={
            phase === "exit"
              ? {
                  x: 0,
                  y: 0,
                  width: "100vw",
                  height: "100vh",
                  opacity: 1,
                  transition: { duration: 0.55, ease: [0.7, 0, 0.2, 1] },
                }
              : {
                  x: 0,
                  y: 0,
                  width: "100vw",
                  height: "100vh",
                  opacity: 0,
                  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                }
          }
        />
      )}
    </RouteTransitionContext.Provider>
  );
}
