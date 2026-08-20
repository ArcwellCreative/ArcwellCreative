const PHRASES = [
  {
    text: "Arcwell Creative",
    className: "font-display font-extrabold uppercase tracking-tight",
  },
  {
    text: "Independent Creative Studio",
    className: "font-display font-light",
  },
  {
    text: "Impossible To Overlook",
    className: "font-cursive font-bold",
  },
];

function MarqueeSet() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {PHRASES.map((phrase, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span
            className={`mx-3 shrink-0 cursor-default select-none text-[1.05rem] leading-none text-cream opacity-[0.16] transition-[opacity,text-shadow] duration-500 hover:opacity-90 hover:[text-shadow:0_0_18px_rgba(181,107,60,0.55)] sm:text-[1.3rem] ${phrase.className}`}
          >
            {phrase.text}
          </span>
          <span className="mx-3 shrink-0 text-[1.05rem] text-copper-light opacity-40 sm:text-[1.3rem]">
            •
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-marquee will-change-transform">
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </div>
  );
}
