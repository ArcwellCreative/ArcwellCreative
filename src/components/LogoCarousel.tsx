"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SERVICE_LOGOS as LOGOS, toWhiteSilhouette } from "@/lib/logos";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 32 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -32 }),
};

export function LogoCarousel() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [processed, setProcessed] = useState<Record<string, string>>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      LOGOS.map((logo) => toWhiteSilhouette(logo.src).then((url) => [logo.src, url] as const))
    )
      .then((pairs) => {
        if (!cancelled) setProcessed(Object.fromEntries(pairs));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % LOGOS.length, 1]);
    }, 3400);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const goTo = (target: number) => {
    setSlide(([prev]) => {
      if (target === prev) return [prev, direction];
      const len = LOGOS.length;
      const forward = (target - prev + len) % len;
      const backward = (prev - target + len) % len;
      return [target, forward <= backward ? 1 : -1];
    });
  };

  const current = LOGOS[index];
  const currentSrc = processed[current.src];

  return (
    <div className="mt-9 flex flex-col items-center gap-7 text-center sm:mt-10">
      <div className="relative h-44 w-64 shrink-0 sm:h-56 sm:w-80">
        <AnimatePresence custom={direction} initial={false}>
          {currentSrc && (
            <motion.div
              key={current.src}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- client-generated data URI, not a static asset */}
              <img src={currentSrc} alt={current.alt} className="h-full w-full object-contain" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="label text-cream/40">Selected logo work</span>
        <div className="flex gap-2.5">
          {LOGOS.map((logo, i) => (
            <button
              key={logo.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${logo.alt}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-copper-light" : "bg-cream/20 hover:bg-cream/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
