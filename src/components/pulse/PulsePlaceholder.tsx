import { BarChart2 } from "lucide-react";

export default function PulsePlaceholder() {
  const panels = [
    { label: "CSE — ASPI", status: "Phase 1" },
    { label: "LKR / USD", status: "Phase 1" },
    { label: "Fuel Prices", status: "Phase 1" },
    { label: "Load Shedding", status: "Phase 1" },
    { label: "Dengue Cases", status: "Phase 2" },
    { label: "Rainfall by District", status: "Phase 2" },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <BarChart2 size={32} className="text-cg-accent opacity-60" />
        <p className="text-cg-text font-mono text-sm">The Pulse</p>
        <p className="text-cg-text-dim text-xs max-w-sm">
          Aggregated Sri Lanka economic, environmental, and infrastructure dashboards. Coming in Phase 1.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
        {panels.map(({ label, status }) => (
          <div
            key={label}
            className="border border-cg-border rounded p-3 flex flex-col gap-1 opacity-40"
          >
            <span className="text-xs font-mono text-cg-text">{label}</span>
            <span className="text-[10px] font-mono text-cg-text-dim uppercase tracking-wider">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
