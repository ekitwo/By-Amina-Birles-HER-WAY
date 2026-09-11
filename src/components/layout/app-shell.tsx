import type { ReactNode } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { getRepository } from "@/lib/data/get-repository";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function AppShell({ children }: { children: ReactNode }) {
  const repo = getRepository();
  const user = await repo.getCurrentUser();
  const displayName = user?.displayName ?? "";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border px-5 py-6 lg:flex">
        <div className="mb-8 flex items-center gap-2 px-1">
          <span className="font-display text-lg tracking-tight text-ink">HER WAY</span>
        </div>

        <div className="mb-6 rounded-lg border border-border bg-card px-4 py-3.5">
          <span className="text-[11px] font-medium uppercase tracking-widest text-accent">
            North Star
          </span>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            Not set yet — build your Vision in{" "}
            <span className="font-medium text-ink-soft">My Way</span>.
          </p>
        </div>

        <SidebarNav />

        <div className="mt-auto pt-6">
          <Separator className="mb-4" />
          <div className="flex items-center gap-3 px-1">
            <Avatar>
              <AvatarFallback>{initials(displayName || "?")}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 lg:hidden">
          <span className="font-display text-lg tracking-tight text-ink">HER WAY</span>
        </header>
        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-5xl animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
