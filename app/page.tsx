"use client";

import { useEffect } from "react";
import { LandingCard } from "@/components/LandingCard";
import { CustomCursor } from "@/components/CustomCursor";

export default function HomePage() {
  // Lock body scroll only on desktop (lg+), where the fixed single-screen
  // layout fits one viewport. On mobile/tablet the tiles stack and scroll.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      document.body.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.overflow = "";
    };
  }, []);

  // The landing has no SiteHeader — the LandingCard provides its own
  // minimal meta bar with the K. monogram, eyebrow, and live clock.
  return (
    <>
      <CustomCursor />
      <LandingCard />
    </>
  );
}
