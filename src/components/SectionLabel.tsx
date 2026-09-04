export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 py-1.5 pr-4 pl-1.5 text-xs tracking-[0.2em] text-paper-dim uppercase">
      <span className="font-display flex h-6 w-6 items-center justify-center rounded-full bg-ink-soft text-[10px] text-accent">
        {index}
      </span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-paper-dim/50" />
      <span>{label}</span>
    </div>
  );
}
