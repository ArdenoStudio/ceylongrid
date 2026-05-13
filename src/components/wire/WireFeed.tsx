"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Signal, SignalCategory, SignalSource } from "@/types";
import { CATEGORY_LABELS, SOURCE_LABELS } from "@/lib/constants";
import WireItem from "./WireItem";
import WireFilters from "./WireFilters";

const ALL_CATEGORIES = new Set(Object.keys(CATEGORY_LABELS) as SignalCategory[]);
const ALL_SOURCES = new Set(Object.keys(SOURCE_LABELS) as SignalSource[]);

export default function WireFeed() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategories, setActiveCategories] = useState<Set<SignalCategory>>(ALL_CATEGORIES);
  const [activeSources, setActiveSources] = useState<Set<SignalSource>>(ALL_SOURCES);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("signals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (data) setSignals(data as Signal[]);
        setLoading(false);
      });

    const channel = supabase
      .channel("wire-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "signals" },
        (payload) => {
          setSignals((prev) => [payload.new as Signal, ...prev].slice(0, 200));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const toggleCategory = useCallback((cat: SignalCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }, []);

  const toggleSource = useCallback((src: SignalSource) => {
    setActiveSources((prev) => {
      const next = new Set(prev);
      next.has(src) ? next.delete(src) : next.add(src);
      return next;
    });
  }, []);

  const visible = signals.filter(
    (s) => activeCategories.has(s.category) && activeSources.has(s.source)
  );

  return (
    <div className="flex flex-col h-full">
      <WireFilters
        activeCategories={activeCategories}
        activeSources={activeSources}
        onCategoryToggle={toggleCategory}
        onSourceToggle={toggleSource}
      />

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-cg-text-dim text-xs font-mono">
            Loading...
          </div>
        ) : visible.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-cg-text-dim text-xs font-mono">
            No signals match current filters
          </div>
        ) : (
          visible.map((signal) => <WireItem key={signal.id} signal={signal} />)
        )}
      </div>
    </div>
  );
}
