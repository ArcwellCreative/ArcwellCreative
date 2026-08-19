export function MarkMockup({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[10px] border border-cream/10 bg-ink p-5 ${className ?? ""}`}
    >
      <span className="label text-cream/50">Brand Mark</span>
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
        <span className="absolute inset-0 rounded-full border border-cream/15" />
        <span className="absolute inset-3 rounded-full border border-copper/50" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-cream/10" />
        <span className="absolute inset-x-0 top-1/2 h-px bg-cream/10" />
        <span className="relative h-9 w-9 rounded-full bg-copper" />
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-copper" />
        <span className="h-3 w-3 rounded-full bg-cream/80" />
        <span className="h-3 w-3 rounded-full bg-charcoal border border-cream/20" />
      </div>
    </div>
  );
}
