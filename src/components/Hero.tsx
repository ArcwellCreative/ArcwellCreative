"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { handleHashLinkClick, dispatchOpenService } from "@/lib/scroll";
import { Typewriter } from "./Typewriter";
import { HeroBackground } from "./HeroBackground";
import { FreeConceptCallout } from "./FreeConceptCallout";
import { BrowserMockup } from "./mockups/BrowserMockup";
import { PosterMockup } from "./mockups/PosterMockup";
import { MarkMockup } from "./mockups/MarkMockup";
import { GridMockup } from "./mockups/GridMockup";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const cards = [
  { Comp: BrowserMockup, label: "Web Design", rotate: -4, y: 0 },
  { Comp: PosterMockup, label: "Social Marketing", rotate: -1, y: -10 },
  { Comp: MarkMockup, label: "Brand Mark", rotate: 2, y: 2, serviceIndex: 1 },
  { Comp: GridMockup, label: "Print Design", rotate: 5, y: -6 },
];

export function Hero() {
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  function openService(index: number, origin: { x: number; y: number } | null) {
    if (shouldReduceMotion || !origin) {
      dispatchOpenService(index);
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", "#services");
      return;
    }

    setZoomOrigin(origin);
    dispatchOpenService(index);

    // Jump instantly while the copper circle is covering the screen, so the
    // reveal underneath is already settled once it fades out.
    setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "auto", block: "start" });
      history.pushState(null, "", "#services");
    }, 190);

    setTimeout(() => setZoomOrigin(null), 560);
  }

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-24 lg:pb-32">
      <HeroBackground />

      <div className="container-arc relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="label text-cream/60"
          >
            Independent Creative Studio
          </motion.p>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="label text-cream/60"
          >
            Web · Brand · Design
          </motion.p>
        </div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mt-6 text-display font-display font-extrabold tracking-tight text-cream sm:mt-8"
        >
          <Typewriter text="ARCWELL" startDelay={300} speed={70} />
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-1 text-[0.9rem] font-medium uppercase text-copper-light tracking-[1em] sm:text-base"
        >
          <Typewriter text="CREATIVE" startDelay={300} speed={62} />
        </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-h2 font-display uppercase leading-[1.03] tracking-tight text-cream lg:col-span-7"
          >
            <span className="font-bold">We make businesses</span>{" "}
            <span
              className="normal-case text-copper-light"
              style={{ fontFamily: "var(--font-dancing-script)", fontWeight: 700 }}
            >
              impossible
            </span>{" "}
            <span className="font-bold">to overlook.</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.22 }}
            className="flex flex-col gap-8 lg:col-span-5"
          >
            <p className="text-body-lg max-w-md text-cream/75">
              Arcwell Creative builds websites, brands, social marketing, and
              visual identities for businesses ready to look their best.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                onClick={(e) => handleHashLinkClick(e, "#contact")}
                className="label group inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-cream transition-colors hover:bg-copper-light"
              >
                Start a Project
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="#services"
                onClick={(e) => handleHashLinkClick(e, "#services")}
                className="label group inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                Explore Our Services
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-4">
              <FreeConceptCallout />
            </div>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-4 sm:mt-28 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {cards.map(({ Comp, label, rotate, y, serviceIndex }, i) => {
            const cardVisual = (
              <div className="aspect-[4/5] transition-transform duration-350 ease-in-out will-change-transform group-hover:-translate-y-7 group-hover:rotate-0 group-hover:scale-[1.06]">
                <Comp className="shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" />
              </div>
            );

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y, rotate }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: 0.15 * i, ease: EASE_OUT_EXPO }}
                className="group"
              >
                {serviceIndex !== undefined ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      openService(serviceIndex, {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                      });
                    }}
                    aria-label={`Jump to ${label} in Services`}
                    className="block w-full cursor-pointer text-left"
                  >
                    {cardVisual}
                  </button>
                ) : (
                  cardVisual
                )}
                <p className="label mt-3 text-cream/55">{label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {zoomOrigin && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed z-[100] rounded-full bg-copper"
            style={{ left: zoomOrigin.x, top: zoomOrigin.y, x: "-50%", y: "-50%" }}
            initial={{ width: 16, height: 16, opacity: 0.92 }}
            animate={{ width: "300vmax", height: "300vmax", opacity: [0.92, 1, 1, 0] }}
            transition={{ duration: 0.56, ease: EASE_OUT_EXPO, opacity: { duration: 0.56, times: [0, 0.32, 0.58, 1] } }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
