"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function HoverTilt({
  children,
  className,
  scale = 1.12,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={shouldReduceMotion ? undefined : { scale }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={`relative inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
