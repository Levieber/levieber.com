import { m } from "@/main/presentation/common/i18n";

const highlights = [
  {
    label: m.highlightFullStackLabel(),
    value: m.highlightFullStackValue(),
  },
  {
    label: m.highlightArchitectureLabel(),
    value: m.highlightArchitectureValue(),
  },
  {
    label: m.highlightPerformanceLabel(),
    value: m.highlightPerformanceValue(),
  },
];

export function HighlightGrid() {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      {highlights.map((item) => (
        <div className="rounded-sm border border-border bg-card p-4" key={item.label}>
          <p className="mb-2 font-mono text-xs tracking-[0.08em] text-accent uppercase">
            {item.label}
          </p>
          <p className="font-heading text-base font-semibold text-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
