"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const FRAMES = [
  { text: "FREE CONCEPT", bg: "#f4f1ec", fg: "#161618" },
  { text: "NO CHARGE", bg: "#934d22", fg: "#f4f1ec" },
  { text: "CLICK HERE", bg: "#161618", fg: "#f4f1ec" },
];

function ArrowDoodle({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M56 30C40 32 16 28 6 30" />
      <path d="M16 20L5 30L16 40" />
    </svg>
  );
}

export function FreeConceptCallout() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % FRAMES.length), 1700);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const frame = FRAMES[index];

  return (
    <div className="relative inline-flex">
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -left-20 hidden -translate-y-1/2 text-copper-light lg:block"
            animate={{ x: [0, -12, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDoodle flip className="h-16 w-16" />
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -right-20 hidden -translate-y-1/2 text-copper-light lg:block"
            animate={{ x: [0, 12, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <ArrowDoodle className="h-16 w-16" />
          </motion.div>
        </>
      )}

      <motion.div
        animate={{ backgroundColor: frame.bg }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 1.18 }}
        className="rounded-full border-[3px] border-copper-light shadow-[0_20px_50px_-15px_rgba(147,77,34,0.5)]"
      >
        <Link
          href="/free-concept"
          className="label flex w-72 items-center justify-center px-8 py-6 text-lg sm:w-80 sm:text-xl"
          style={{ color: frame.fg }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={frame.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              {frame.text}
            </motion.span>
          </AnimatePresence>
        </Link>
      </motion.div>
    </div>
  );
}
