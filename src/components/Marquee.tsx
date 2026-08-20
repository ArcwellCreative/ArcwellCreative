const PHRASES = ["Crafted, Not Templated", "Distinguished By Design"];

function MarqueeSet() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {PHRASES.map((phrase, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="mx-4 shrink-0 cursor-default select-none font-serif-italic text-[3.5rem] italic leading-none tracking-[-0.02em] text-cream opacity-[0.07] transition-[opacity,text-shadow] duration-500 hover:opacity-90 hover:[text-shadow:0_0_40px_rgba(181,107,60,0.55)] sm:text-[5rem] lg:text-[6.5rem]">
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
    <section className="overflow-hidden border-t border-cream/10 bg-ink py-10 sm:py-14">
      <div className="flex w-max animate-marquee will-change-transform">
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </section>
  );
}
