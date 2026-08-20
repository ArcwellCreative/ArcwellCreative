import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function BrandStatement() {
  return (
    <section className="border-t border-cream/10 py-28 sm:py-36">
      <div className="container-arc">
        <Reveal>
          <SectionLabel>Why It Matters</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-h1 mt-8 max-w-4xl font-medium tracking-tight text-cream">
            Great businesses shouldn&apos;t be held back by forgettable
            design.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body-lg mt-10 max-w-xl text-cream/70">
            Arcwell helps businesses improve everything from their website
            and logo to their advertisements and printed materials — so the
            way a business looks finally matches the quality of the work
            behind it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
