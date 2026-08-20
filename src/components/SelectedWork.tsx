"use client";

import { motion } from "motion/react";
import { viewportOnce } from "@/lib/motion";
import { projects } from "@/lib/site-config";
import { mockupByKind } from "./mockups";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function SelectedWork() {
  return (
    <section id="work" className="border-t border-cream/10 py-28 sm:py-36">
      <div className="container-arc">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel>Selected Concepts</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h2 mt-6 max-w-lg font-medium tracking-tight text-cream">
                Concept work that shows the range.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="text-body max-w-xs text-cream/60">
              Arcwell is a newer studio — these are visual concept pieces,
              not completed client work. Real projects will replace them as
              our portfolio grows.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {projects.map((project, i) => {
            const Mockup = mockupByKind[project.kind];
            return (
              <motion.article
                key={project.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <Mockup />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 border-t border-cream/10 pt-5">
                  <div>
                    <p className="text-h3 font-medium tracking-tight text-cream">
                      {project.category}
                    </p>
                    <p className="text-body mt-1.5 text-cream/60">
                      {project.discipline}
                    </p>
                  </div>
                  <span className="label mt-1 shrink-0 text-cream/50">
                    {project.number}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
