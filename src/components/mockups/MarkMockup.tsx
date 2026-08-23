"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SERVICE_LOGOS, toWhiteSilhouette } from "@/lib/logos";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function MarkMockup({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [processed, setProcessed] = useState<Record<string, string>>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SERVICE_LOGOS.map((logo) =>
        toWhiteSilhouette(logo.src).then((url) => [logo.src, url] as const)
      )
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
    const id = setInterval(() => setIndex((i) => (i + 1) % SERVICE_LOGOS.length), 2100);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const current = SERVICE_LOGOS[index];
  const currentSrc = processed[current.src];

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[10px] border border-cream/10 bg-ink p-5 ${className ?? ""}`}
    >
      <span className="label text-cream/60">Brand Mark</span>
      <div className="relative mx-auto h-16 w-full sm:h-20">
        <AnimatePresence>
          {currentSrc && (
            // eslint-disable-next-line @next/next/no-img-element -- client-generated data URI, not a static asset
            <motion.img
              key={current.src}
              src={currentSrc}
              alt={current.alt}
              initial={{ opacity: 0, scale: 0.88, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.06, y: -6 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-copper" />
        <span className="h-3 w-3 rounded-full bg-cream/80" />
        <span className="h-3 w-3 rounded-full bg-charcoal border border-cream/20" />
      </div>
    </div>
  );
}
