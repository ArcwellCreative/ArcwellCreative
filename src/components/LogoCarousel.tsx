"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ImagePlus } from "lucide-react";
import {
  MINIMAL_LOGOS,
  MID_RANGE_LOGOS,
  ADVANCED_LOGOS,
  toWhiteSilhouette,
  type LogoItem,
} from "@/lib/logos";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

const TIERS: { label: string; logos: LogoItem[] }[] = [
  { label: "Minimal", logos: MINIMAL_LOGOS },
  { label: "Refined", logos: MID_RANGE_LOGOS },
  { label: "Elevated", logos: ADVANCED_LOGOS },
];

function LogoColumn({ label, logos }: { label: string; logos: LogoItem[] }) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [processed, setProcessed] = useState<Record<string, string>>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (logos.length === 0) return;
    let cancelled = false;
    Promise.all(
      logos.map((logo) => toWhiteSilhouette(logo.src).then((url) => [logo.src, url] as const))
    )
      .then((pairs) => {
        if (!cancelled) setProcessed(Object.fromEntries(pairs));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [logos]);

  useEffect(() => {
    if (shouldReduceMotion || logos.length < 2) return;
    const id = setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % logos.length, 1]);
    }, 3400);
    return () => clearInterval(id);
  }, [shouldReduceMotion, logos.length]);

  const goTo = (target: number) => {
    setSlide(([prev]) => {
      if (target === prev) return [prev, direction];
      const len = logos.length;
      const forward = (target - prev + len) % len;
      const backward = (prev - target + len) % len;
      return [target, forward <= backward ? 1 : -1];
    });
  };

  const current = logos[index];
  const currentSrc = current ? processed[current.src] : undefined;

  return (
    <div className="flex flex-col items-center gap-7 px-8 text-center sm:gap-8 sm:px-12">
      <div className="relative flex h-40 w-full max-w-56 shrink-0 items-center justify-center sm:h-52 sm:max-w-64">
        {logos.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-cream/15 text-cream/30">
            <ImagePlus size={26} strokeWidth={1.5} />
            <span className="label text-[0.65rem]">Coming soon</span>
          </div>
        ) : (
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
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="label text-cream/40">{label}</span>
        {logos.length > 1 && (
          <div className="flex gap-2.5">
            {logos.map((logo, i) => (
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
        )}
      </div>
    </div>
  );
}

export function LogoCarousel() {
  return (
    <div className="mx-auto mt-9 grid max-w-3xl grid-cols-1 divide-y divide-cream/10 sm:mt-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {TIERS.map((tier) => (
        <div key={tier.label} className="py-8 first:pt-0 sm:py-0">
          <LogoColumn label={tier.label} logos={tier.logos} />
        </div>
      ))}
    </div>
  );
}
