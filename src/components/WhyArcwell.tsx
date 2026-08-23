import { whyArcwell } from "@/lib/site-config";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function WhyArcwell() {
  return (
    <section className="border-t border-cream/10 bg-charcoal py-28 sm:py-36">
      <div className="container-arc">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel>Why Arcwell</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h2 mt-6 font-display font-bold uppercase tracking-tight text-cream">
                Design that works for the business, not just the portfolio.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:gap-y-14">
            {whyArcwell.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <div className="border-t border-cream/15 pt-6">
                  <h3 className="text-h3 font-display font-bold uppercase tracking-tight text-cream">
                    {item.title}
                  </h3>
                  <p className="text-body mt-3 text-cream/65">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
