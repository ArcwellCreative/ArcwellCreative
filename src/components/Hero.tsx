"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { handleHashLinkClick } from "@/lib/scroll";
import { Typewriter } from "./Typewriter";
import { HeroBackground } from "./HeroBackground";
import { BrowserMockup } from "./mockups/BrowserMockup";
import { PosterMockup } from "./mockups/PosterMockup";
import { MarkMockup } from "./mockups/MarkMockup";
import { GridMockup } from "./mockups/GridMockup";

const cards = [
  { Comp: BrowserMockup, label: "Web Design", rotate: -4, y: 0 },
  { Comp: PosterMockup, label: "Advertising", rotate: -1, y: -10 },
  { Comp: MarkMockup, label: "Branding", rotate: 2, y: 2 },
  { Comp: GridMockup, label: "Print Design", rotate: 5, y: -6 },
];

export function Hero() {
  const [wordmarkDone, setWordmarkDone] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-24 lg:pb-32">
      <HeroBackground />

      <div className="container-arc relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="label text-cream/50"
          >
            Independent Creative Studio
          </motion.p>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="label text-cream/50"
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
          <Typewriter
            text="ARCWELL"
            startDelay={300}
            speed={70}
            onDone={() => setWordmarkDone(true)}
          />
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-1 text-[0.9rem] font-medium uppercase text-copper-light tracking-[1em] sm:text-base"
        >
          <Typewriter text="CREATIVE" start={wordmarkDone} startDelay={120} speed={55} />
        </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-h2 font-medium leading-[1.03] tracking-tight text-cream lg:col-span-7"
          >
            We make businesses{" "}
            <span className="text-copper-light">impossible</span> to overlook.
          </motion.h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.22 }}
            className="flex flex-col gap-8 lg:col-span-5"
          >
            <p className="text-body-lg max-w-md text-cream/65">
              Arcwell Creative builds websites, brands, advertisements, and
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
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-4 sm:mt-28 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {cards.map(({ Comp, label, rotate, y }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y, rotate }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="aspect-[4/5] transition-transform duration-350 ease-in-out will-change-transform group-hover:-translate-y-7 group-hover:rotate-0">
                <Comp className="shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" />
              </div>
              <p className="label mt-3 text-cream/45">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
