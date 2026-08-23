export function PosterMockup({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[10px] border border-cream/10 bg-copper p-5 ${className ?? ""}`}
    >
      <div className="flex items-start justify-between">
        <span className="label text-cream/70">Campaign</span>
        <span className="h-2 w-2 rounded-full bg-cream/70" />
      </div>
      <div className="-mx-1">
        <p className="text-[3.4rem] font-semibold leading-[0.85] tracking-tight text-cream sm:text-[4rem]">
          02
        </p>
      </div>
      <div className="h-px w-full bg-cream/30" />
      <span className="label text-cream/70">Social Marketing</span>
    </div>
  );
}
