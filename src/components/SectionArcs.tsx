import type { CSSProperties } from "react";

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_ANCHOR: Record<Corner, CSSProperties> = {
  "top-left": { top: "-40%", left: "-25%" },
  "top-right": { top: "-40%", right: "-25%" },
  "bottom-left": { bottom: "-40%", left: "-25%" },
  "bottom-right": { bottom: "-40%", right: "-25%" },
};

export function SectionArcs({
  corner = "top-right",
  tone = "dark",
  grain = true,
}: {
  corner?: Corner;
  tone?: "dark" | "light";
  grain?: boolean;
}) {
  const anchor = CORNER_ANCHOR[corner];
  const lineColor = tone === "dark" ? "border-copper-light" : "border-copper";
  const softColor = tone === "dark" ? "border-cream" : "border-charcoal";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute aspect-square w-[85vw] max-w-[1100px] rounded-full border-2 ${lineColor}`}
        style={{ ...anchor, opacity: tone === "dark" ? 0.28 : 0.2 }}
      />
      <div
        className={`absolute aspect-square w-[62vw] max-w-[820px] rounded-full border ${lineColor}`}
        style={{ ...anchor, opacity: tone === "dark" ? 0.18 : 0.13 }}
      />
      <div
        className={`absolute aspect-square w-[42vw] max-w-[560px] rounded-full border ${softColor}`}
        style={{ ...anchor, opacity: tone === "dark" ? 0.1 : 0.08 }}
      />

      {grain && (
        <div
          className={`absolute inset-0 opacity-[0.045] ${
            tone === "dark" ? "mix-blend-overlay" : "mix-blend-multiply"
          }`}
          style={{ backgroundImage: `url("${GRAIN_URL}")` }}
        />
      )}
    </div>
  );
}
