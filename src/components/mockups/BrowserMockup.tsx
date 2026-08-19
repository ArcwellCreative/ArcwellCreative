export function BrowserMockup({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-cream/10 bg-charcoal ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 border-b border-cream/10 px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cream/20" />
          <span className="h-2 w-2 rounded-full bg-cream/20" />
          <span className="h-2 w-2 rounded-full bg-cream/20" />
        </div>
        <div className="h-4 flex-1 rounded-full bg-ink/60" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-5">
        <div className="h-2 w-10 rounded-full bg-copper" />
        <div className="h-4 w-4/5 rounded bg-cream/85" />
        <div className="h-4 w-3/5 rounded bg-cream/85" />
        <div className="mt-2 h-2 w-full rounded bg-cream/25" />
        <div className="h-2 w-4/5 rounded bg-cream/25" />
        <div className="mt-3 h-7 w-24 rounded-full bg-copper" />
      </div>
    </div>
  );
}
