import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function StrategyPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Strategy"
        title="Annual & quarterly strategy"
        description="Your Annual Theme, top 3 outcomes, the current Strategic Season, and — just as important — your Not This Year list."
      />

      <EmptyState
        eyebrow="Not built yet"
        title="Strategy is generated from your goals and priorities, not written by hand."
        description="Once goals exist, the Strategy Engine proposes an Annual Theme, your top 3 outcomes for the year, a Not This Year list, and breaks the current quarter into key projects, risks, and required habits."
      />
    </div>
  );
}
