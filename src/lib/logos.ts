export type LogoItem = { src: string; alt: string };

export const SERVICE_LOGOS: LogoItem[] = [
  { src: "/logos/period.png", alt: "Period podcast logo" },
  { src: "/logos/forever-is-officially-over.png", alt: "Forever Is Officially Over infinity logo" },
  { src: "/logos/apple-cider-bakers.png", alt: "Apple Cider Bakers logo" },
  { src: "/logos/night-owl.png", alt: "Night Owl logo" },
  { src: "/logos/sunrise.png", alt: "Sunrise logo" },
];

// Populate each tier as logos are designed for it.
export const MINIMAL_LOGOS: LogoItem[] = [];
export const MID_RANGE_LOGOS: LogoItem[] = [];
export const ADVANCED_LOGOS: LogoItem[] = [];

const silhouetteCache = new Map<string, string>();

// Reads a logo's pixels and turns the light artwork background fully
// transparent while recoloring the dark ink to solid white, so the mark can
// sit directly on the dark page with no background box at any opacity.
export function toWhiteSilhouette(src: string): Promise<string> {
  const cached = silhouetteCache.get(src);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      const lo = 0.32;
      const hi = 0.78;
      for (let i = 0; i < data.length; i += 4) {
        const luminance = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
        const mask = Math.max(0, Math.min(1, (hi - luminance) / (hi - lo)));
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = Math.round(mask * data[i + 3]);
      }
      ctx.putImageData(frame, 0, 0);
      const url = canvas.toDataURL("image/png");
      silhouetteCache.set(src, url);
      resolve(url);
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}
