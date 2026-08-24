"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const TEXTS = ["FREE CONCEPT", "NO CHARGE", "CLICK HERE"];

function BoldArrow({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 17H62V6L100 20L62 34V23H0V17Z" />
    </svg>
  );
}

export function FreeConceptCallout() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TEXTS.length), 1700);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const text = TEXTS[index];

  return (
    <div className="relative inline-flex">
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -left-28 hidden -translate-y-1/2 text-cream lg:block"
            animate={{
              x: [0, -22, 0],
              filter: [
                "drop-shadow(0 0 3px rgba(244,241,236,0.35))",
                "drop-shadow(0 0 10px rgba(244,241,236,0.75))",
                "drop-shadow(0 0 3px rgba(244,241,236,0.35))",
              ],
            }}
            transition={{
              x: { duration: 2.2, repeat: Infinity, ease: EASE_OUT_EXPO },
              filter: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <BoldArrow className="h-6 w-20" />
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -right-28 hidden -translate-y-1/2 text-cream lg:block"
            animate={{
              x: [0, 22, 0],
              filter: [
                "drop-shadow(0 0 3px rgba(244,241,236,0.35))",
                "drop-shadow(0 0 10px rgba(244,241,236,0.75))",
                "drop-shadow(0 0 3px rgba(244,241,236,0.35))",
              ],
            }}
            transition={{
              x: { duration: 2.2, repeat: Infinity, ease: EASE_OUT_EXPO },
              filter: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <BoldArrow flip className="h-6 w-20" />
          </motion.div>
        </>
      )}

      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 1.18 }}
        className="rounded-full border-[3px] border-cream bg-copper shadow-[0_20px_50px_-15px_rgba(217,136,71,0.5)]"
      >
        <Link
          href="/free-concept"
          className="label flex w-96 items-center justify-center px-10 py-8 text-2xl text-cream sm:w-[28rem] sm:text-3xl"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </Link>
      </motion.div>
    </div>
  );
}
