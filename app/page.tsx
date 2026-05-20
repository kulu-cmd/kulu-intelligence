"use client";

import { useEffect } from "react";
import { LandingCard } from "@/components/LandingCard";
import { CustomCursor } from "@/components/CustomCursor";

export default function HomePage() {
  // Lock body scroll while on the landing — the four tiles are the navigation.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
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
