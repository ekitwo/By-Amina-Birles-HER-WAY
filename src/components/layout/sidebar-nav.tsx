"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sunrise,
  Compass,
  Flag,
  Map,
  Radar,
  Scale,
  CalendarClock,
  TrendingUp,
  CircleUser,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/today", label: "Today", icon: Sunrise },
  { href: "/my-way", label: "My Way", icon: Compass },
  { href: "/goals", label: "Goals", icon: Flag },
  { href: "/strategy", label: "Strategy", icon: Map },
  { href: "/opportunity-radar", label: "Opportunity Radar", icon: Radar },
  { href: "/decisions", label: "Decisions", icon: Scale },
  { href: "/weekly-ceo", label: "Weekly CEO", icon: CalendarClock },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/profile", label: "Profile", icon: CircleUser },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-accent-soft font-medium text-accent"
                : "text-ink-soft hover:bg-muted hover:text-ink"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
