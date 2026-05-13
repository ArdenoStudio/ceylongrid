"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex items-center justify-between px-4 h-12 border-b border-cg-border shrink-0">
      <Link href="/grid" className="flex items-center gap-2">
        <span className="text-cg-accent font-mono font-bold tracking-widest text-sm uppercase">
          Ceylon<span className="text-cg-text">Grid</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-cg-text-dim font-mono">
          <span className="size-1.5 rounded-full bg-cg-safe animate-pulse" />
          Live
        </span>
      </div>
    </header>
  );
}
