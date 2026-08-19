"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

export function HoverTilt({
  children,
  className,
  scale = 1.07,
  maxAngle = 2,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
  maxAngle?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rotate = useMotionValue(0);
  const springRotate = useSpring(rotate, { stiffness: 300, damping: 22, mass: 0.5 });

  function handlePointerMove(e: PointerEvent<HTMLSpanElement>) {
    if (shouldReduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0 (left edge) .. 1 (right edge)
    const offset = relX - 0.5; // -0.5 (left) .. 0.5 (right), 0 at center
    // mouse right of center -> left side lifts (clockwise / positive rotate), and vice versa
    rotate.set(offset * 2 * maxAngle);
  }

  function handlePointerLeave() {
    rotate.set(0);
  }

  return (
    <motion.span
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={shouldReduceMotion ? undefined : { scale }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{ rotate: springRotate }}
      className={`relative inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
