"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Reveal — generic scroll-reveal wrapper. Springs into view from below
 * the first time it enters the viewport.
 *
 * Maps the `as` prop to the matching `motion.<tag>` component. Defaults to
 * `motion.div`. Avoids the deprecated `motion(Component)` HOC syntax.
 */
type Tag = "div" | "section" | "article" | "li" | "ul" | "header" | "footer" | "aside" | "p" | "span";

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
