"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { services } from "@/lib/site-config";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Typewriter } from "./Typewriter";

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="border-t border-cream/10 py-28 sm:py-36">
      <div className="container-arc">
        <Reveal>
          <SectionLabel>Services</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h2 mt-6 max-w-2xl font-medium tracking-tight text-cream">
            Everything your business needs to look the part.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-cream/10">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={service.number}
                className={`border-b border-cream/10 transition-colors duration-500 ${
                  isOpen ? "bg-copper/[0.04]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.number}`}
                  className="flex w-full items-center gap-6 py-7 text-left sm:gap-10 sm:py-9"
                >
                  <span
                    className={`font-display shrink-0 text-lg font-extrabold transition-colors ${
                      isOpen ? "text-copper-light" : "text-cream/50"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span
                    className={`font-display text-h3 flex-1 font-extrabold tracking-tight transition-colors ${
                      isOpen ? "text-cream" : "text-cream/65"
                    }`}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`shrink-0 text-2xl font-light transition-colors ${
                      isOpen ? "text-copper-light" : "text-cream/60"
                    }`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-panel-${service.number}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-lg max-w-lg pb-8 pl-0 text-cream/65 sm:pb-10 sm:pl-[3.75rem]">
                        <Typewriter text={service.description} speed={14} startDelay={100} />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
