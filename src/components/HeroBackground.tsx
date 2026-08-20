const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* warm base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(147,77,34,0.18),transparent)]" />

      {/* arc motif — echoes the mark in the logo, swept large across the frame */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arcBand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b56b3c" stopOpacity="0" />
            <stop offset="50%" stopColor="#b56b3c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#934d22" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* soft glowing sweep band */}
        <circle
          cx="1560"
          cy="-160"
          r="700"
          fill="none"
          stroke="url(#arcBand)"
          strokeWidth="130"
          strokeLinecap="round"
          opacity="0.16"
        />

        {/* crisp hairline definition arcs */}
        <circle
          cx="1560"
          cy="-160"
          r="820"
          fill="none"
          stroke="#b56b3c"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <circle
          cx="1560"
          cy="-160"
          r="590"
          fill="none"
          stroke="#b56b3c"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <circle
          cx="1610"
          cy="-60"
          r="440"
          fill="none"
          stroke="#f4f1ec"
          strokeOpacity="0.1"
          strokeWidth="1"
        />

        {/* answering arc, lower-left, quieter */}
        <circle
          cx="-240"
          cy="980"
          r="540"
          fill="none"
          stroke="#b56b3c"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
      </svg>

      {/* fine grain for tactile depth */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />
    </div>
  );
}
