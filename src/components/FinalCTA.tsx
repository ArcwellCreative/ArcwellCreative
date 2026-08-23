"use client";

import Link from "next/link";
import { handleHashLinkClick } from "@/lib/scroll";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { SectionArcs } from "./SectionArcs";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-28 sm:py-36">
      <SectionArcs corner="top-right" tone="dark" />
      <div className="container-arc relative">
        <Reveal>
          <SectionLabel>Let&apos;s Work Together</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 mt-8 max-w-4xl font-medium tracking-tight text-cream">
            Your business already does good work. Let&apos;s make it look
            that way.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body-lg mt-8 max-w-lg text-cream/70">
            Whether you need a new website, a stronger logo, better
            social marketing, or a complete visual refresh, let&apos;s build
            something you&apos;re proud to put your name on.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
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
              href="#contact"
              onClick={(e) => handleHashLinkClick(e, "#contact")}
              className="label inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Request a Free Concept
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
