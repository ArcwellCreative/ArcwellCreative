import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { SectionArcs } from "./SectionArcs";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-cream/10 bg-charcoal py-28 sm:py-36"
    >
      <SectionArcs corner="top-left" tone="dark" />
      <div className="container-arc relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel>About Arcwell</SectionLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-h2 font-medium leading-[1.15] tracking-tight text-cream">
                Arcwell Creative is an independent creative studio built
                around one idea: good design shouldn&apos;t be reserved for
                massive brands.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body-lg mt-10 max-w-xl text-cream/65">
                We work with local and growing businesses to create better
                websites, stronger identities, and professional visual
                materials that make the business feel as established as the
                work behind it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
