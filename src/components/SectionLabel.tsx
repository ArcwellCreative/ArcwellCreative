export function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`label flex items-center gap-2.5 ${
        light ? "text-charcoal/60" : "text-cream/55"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
      {children}
    </div>
  );
}
