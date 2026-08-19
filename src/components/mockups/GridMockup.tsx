export function GridMockup({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-cream/10 bg-stone p-5 ${className ?? ""}`}
    >
      <span className="label text-charcoal/60">Layout</span>
      <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
        <div className="col-span-2 row-span-2 rounded-md bg-charcoal" />
        <div className="rounded-md bg-copper" />
        <div className="rounded-md bg-ink/70" />
        <div className="col-span-3 rounded-md bg-charcoal/20" />
      </div>
    </div>
  );
}
