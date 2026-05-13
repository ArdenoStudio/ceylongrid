import type { Signal } from "@/types";
import { CATEGORY_LABELS, CATEGORY_COLORS, SOURCE_LABELS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

interface WireItemProps {
  signal: Signal;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function WireItem({ signal }: WireItemProps) {
  const categoryColor = CATEGORY_COLORS[signal.category];

  return (
    <div className="flex gap-3 px-4 py-3 border-b border-cg-border hover:bg-cg-surface/60 transition-colors group">
      <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
        <span
          className="size-2 rounded-full mt-1"
          style={{ backgroundColor: categoryColor }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ color: categoryColor, backgroundColor: `${categoryColor}18` }}
          >
            {CATEGORY_LABELS[signal.category]}
          </span>
          <span className="text-[10px] text-cg-text-dim font-mono">
            {SOURCE_LABELS[signal.source]}
          </span>
          {signal.district && (
            <span className="text-[10px] text-cg-text-dim font-mono capitalize">
              {signal.district.replace(/_/g, " ")}
            </span>
          )}
          {signal.magnitude != null && (
            <span className="text-[10px] font-mono text-cg-danger">
              M{signal.magnitude.toFixed(1)}
            </span>
          )}
        </div>

        <p className="text-sm text-cg-text leading-snug">
          {signal.headline}
          {signal.url && (
            <a
              href={signal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-cg-text-dim hover:text-cg-accent"
            >
              <ExternalLink size={11} />
            </a>
          )}
        </p>
      </div>

      <time className="text-[10px] text-cg-text-dim font-mono shrink-0 pt-1">
        {timeAgo(signal.created_at)}
      </time>
    </div>
  );
}
