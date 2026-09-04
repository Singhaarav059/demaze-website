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
    <p className={`label flex items-center gap-3 ${tone === "void" ? "text-void-dim" : "text-muted"}`}>
      <span className="text-accent tabular-nums">{index}</span>
      <span>{children}</span>
    </p>
  );
}
