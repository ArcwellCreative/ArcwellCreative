"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const LOGOS = [
  { src: "/logos/birrias.png", alt: "Birria's Mexican Food & Bar logo" },
  { src: "/logos/period.png", alt: "Period podcast logo" },
  { src: "/logos/forever-is-officially-over.png", alt: "Forever Is Officially Over infinity logo" },
  { src: "/logos/apple-cider-bakers.png", alt: "Apple Cider Bakers logo" },
  { src: "/logos/night-owl.png", alt: "Night Owl logo" },
];

export function LogoCarousel() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % LOGOS.length), 2600);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const current = LOGOS[index];

  return (
    <div className="mt-2 flex items-center gap-4">
      <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-[#eeeeee] sm:h-32 sm:w-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={300}
              height={260}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2">
        <span className="label text-cream/40">Selected logo work</span>
        <div className="flex gap-1.5">
          {LOGOS.map((logo, i) => (
            <button
              key={logo.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${logo.alt}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-copper-light" : "bg-cream/20 hover:bg-cream/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
