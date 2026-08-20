"use client";

import Link from "next/link";
import { handleHashLinkClick } from "@/lib/scroll";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function IntroOffer() {
  return (
    <section className="border-t border-cream/10 py-28 sm:py-36">
      <div className="container-arc">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel>Complimentary Concept</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 mt-6 font-medium tracking-tight text-cream">
                Curious what your business could look like?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg mt-8 max-w-lg text-cream/60">
                We&apos;re currently selecting local businesses for
                complimentary design concepts. Send us your current website,
                logo, or advertisement and we&apos;ll show you what
                we&apos;d improve.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-4 lg:justify-self-end">
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href="#contact"
                onClick={(e) => handleHashLinkClick(e, "#contact")}
                className="label group inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-cream transition-colors hover:bg-copper-light"
              >
                Request a Free Concept
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <p className="text-body text-cream/40 lg:text-right">
                No obligation. No hard sell. Just a better idea of what&apos;s
                possible.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
