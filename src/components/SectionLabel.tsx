export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-paper-dim uppercase">
      <span className="font-display text-accent">{index}</span>
      <span>{label}</span>
    </div>
  );
}
