"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, Mail } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function BusinessCardMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-[14px] border border-cream/10 bg-charcoal p-6">
      <div className="flex aspect-[7/4] w-full max-w-64 flex-col justify-between rounded-lg bg-stone p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 shrink-0 rounded-sm bg-copper" />
          <div className="flex flex-col gap-1">
            <span className="h-1.5 w-16 rounded-full bg-charcoal/70" />
            <span className="h-1 w-10 rounded-full bg-charcoal/35" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-charcoal/60">
          <Phone size={12} strokeWidth={1.75} />
          <Mail size={12} strokeWidth={1.75} />
          <span className="h-1 w-14 rounded-full bg-charcoal/25" />
        </div>
      </div>
    </div>
  );
}

function FlyerMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-cream/10 bg-copper p-5">
      <span className="label text-cream/70">Special Offer</span>
      <div className="mt-4 flex flex-1 flex-col justify-center gap-2">
        <span className="h-5 w-4/5 rounded bg-cream/90" />
        <span className="h-5 w-3/5 rounded bg-cream/90" />
      </div>
      <div className="my-4 h-16 rounded-md bg-cream/15" />
      <span className="mx-auto h-6 w-24 rounded-full bg-cream/90" />
    </div>
  );
}

function MenuMockup() {
  const rows = [
    { name: "w-20", price: "w-8" },
    { name: "w-24", price: "w-6" },
    { name: "w-16", price: "w-8" },
    { name: "w-28", price: "w-6" },
  ];
  return (
    <div className="flex h-full w-full flex-col rounded-[14px] border border-cream/10 bg-stone p-6">
      <span className="label mx-auto text-charcoal/60">Menu</span>
      <div className="mx-auto mt-1 h-px w-10 bg-copper" />
      <div className="mt-5 flex flex-1 flex-col justify-center gap-4">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`h-1.5 rounded-full bg-charcoal/55 ${row.name}`} />
            <span className="h-px flex-1 border-t border-dotted border-charcoal/25" />
            <span className={`h-1.5 rounded-full bg-copper/70 ${row.price}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

const ITEMS = [
  { label: "Business Card", Comp: BusinessCardMockup },
  { label: "Flyer", Comp: FlyerMockup },
  { label: "Food Menu", Comp: MenuMockup },
] as const;

export function PrintShowcase() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 2600);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const Current = ITEMS[index].Comp;

  return (
    <div className="mt-9 flex flex-col items-center gap-6 sm:mt-10">
      <div className="relative h-52 w-72 shrink-0 sm:h-60 sm:w-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2.5">
        {ITEMS.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${item.label} mockup`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-copper-light" : "bg-cream/20 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
