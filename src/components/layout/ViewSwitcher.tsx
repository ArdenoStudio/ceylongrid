"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Radio, BarChart2 } from "lucide-react";
import { clsx } from "clsx";

const VIEWS = [
  { href: "/grid",  label: "Grid",  icon: Map },
  { href: "/wire",  label: "Wire",  icon: Radio },
  { href: "/pulse", label: "Pulse", icon: BarChart2 },
] as const;

export default function ViewSwitcher() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 px-4 h-10 border-b border-cg-border shrink-0">
      {VIEWS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors",
              active
                ? "bg-cg-border text-cg-accent"
                : "text-cg-text-dim hover:text-cg-text"
            )}
          >
            <Icon size={12} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
