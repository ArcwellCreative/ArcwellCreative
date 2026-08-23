import { processSteps } from "@/lib/site-config";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Process() {
  return (
    <section id="process" className="border-t border-cream/10 py-28 sm:py-36">
      <div className="container-arc">
        <Reveal>
          <SectionLabel>Our Process</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h2 mt-6 max-w-xl font-display font-bold uppercase tracking-tight text-cream">
            A clear path from first conversation to finished work.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={0.1 * i}>
              <div className="border-t border-cream/15 pt-6">
                <span className="label text-copper-light">{step.number}</span>
                <h3 className="text-h3 mt-4 font-display font-bold uppercase tracking-tight text-cream">
                  {step.title}
                </h3>
                <p className="text-body mt-3 max-w-[24ch] text-cream/65">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
