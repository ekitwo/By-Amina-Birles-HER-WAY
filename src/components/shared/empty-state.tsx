import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/**
 * The canonical empty state for HER WAY.
 *
 * Every screen in Phase 0 renders through this component rather than a
 * blank page — an empty screen should still explain what it will become
 * and why, in the product's own voice (specific, not "no data yet").
 */
export function EmptyState({ eyebrow, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[360px] flex-col items-start justify-center rounded-lg border border-dashed border-border bg-card/50 px-10 py-16",
        className
      )}
    >
      {eyebrow ? (
        <span className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-md font-display text-2xl leading-snug tracking-tight text-ink text-balance">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
