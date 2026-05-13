"use client";

import { CATEGORY_LABELS, CATEGORY_COLORS, SOURCE_LABELS } from "@/lib/constants";
import type { SignalCategory, SignalSource } from "@/types";
import { clsx } from "clsx";

interface WireFiltersProps {
  activeCategories: Set<SignalCategory>;
  activeSources: Set<SignalSource>;
  onCategoryToggle: (c: SignalCategory) => void;
  onSourceToggle: (s: SignalSource) => void;
}

export default function WireFilters({
  activeCategories,
  activeSources,
  onCategoryToggle,
  onSourceToggle,
}: WireFiltersProps) {
  const categories = Object.keys(CATEGORY_LABELS) as SignalCategory[];
  const sources = Object.keys(SOURCE_LABELS) as SignalSource[];

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-cg-border shrink-0">
      {categories.map((cat) => {
        const active = activeCategories.has(cat);
        return (
          <button
            key={cat}
            onClick={() => onCategoryToggle(cat)}
            className={clsx(
              "text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded transition-all",
              active ? "opacity-100" : "opacity-30 hover:opacity-60"
            )}
            style={{
              color: CATEGORY_COLORS[cat],
              backgroundColor: active ? `${CATEGORY_COLORS[cat]}22` : "transparent",
              border: `1px solid ${CATEGORY_COLORS[cat]}40`,
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        );
      })}

      <div className="w-px h-4 bg-cg-border mx-1" />

      {sources.map((src) => {
        const active = activeSources.has(src);
        return (
          <button
            key={src}
            onClick={() => onSourceToggle(src)}
            className={clsx(
              "text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-cg-border transition-all",
              active ? "text-cg-text bg-cg-border" : "text-cg-text-dim hover:text-cg-text"
            )}
          >
            {SOURCE_LABELS[src]}
          </button>
        );
      })}
    </div>
  );
}
