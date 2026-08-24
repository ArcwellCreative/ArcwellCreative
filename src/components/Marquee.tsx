const PHRASES = ["Crafted, Not Templated", "Distinguished By Design"];

function MarqueeSet() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {PHRASES.map((phrase, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="mx-4 shrink-0 cursor-default select-none font-serif-italic text-[3.5rem] italic leading-none tracking-[-0.02em] text-cream opacity-[0.07] transition-opacity duration-500 hover:opacity-90 sm:text-[5rem] lg:text-[6.5rem]">
            {phrase}
          </span>
          <span className="mx-4 shrink-0 text-[3.5rem] text-copper-light opacity-30 sm:text-[5rem] lg:text-[6.5rem]">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="overflow-hidden border-t border-b border-cream/10 bg-ink pt-10 pb-8 sm:pt-14 sm:pb-10">
      <div className="flex w-max animate-marquee will-change-transform">
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </section>
  );
}
