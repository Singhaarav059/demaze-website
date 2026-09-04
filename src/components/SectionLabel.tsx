export default function SectionLabel({
  index,
  children,
  tone = "ink",
}: {
  index: string;
  children: React.ReactNode;
  tone?: "ink" | "void";
}) {
  return (
    <div
      className={`label flex items-center gap-3 ${tone === "void" ? "text-void-dim" : "text-muted"}`}
    >
      <span className="text-accent">{index}</span>
      <span className={`h-px w-8 ${tone === "void" ? "bg-void-fg/20" : "bg-line"}`} />
      <span>{children}</span>
    </div>
  );
}
