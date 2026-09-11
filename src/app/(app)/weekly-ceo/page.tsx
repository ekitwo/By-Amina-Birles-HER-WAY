import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function WeeklyCeoPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Weekly CEO Meeting"
        title="Your Weekly CEO Meeting"
        description="A short, sharp weekly ritual — a handful of real questions, not thirty — that ends in a strategy for next week."
      />

      <EmptyState
        eyebrow="Nothing to review yet"
        title="Your first Weekly CEO Meeting starts once you have a first week of goals and actions behind you."
        description="Each meeting asks what actually mattered, what moved, what got ignored and why — then produces next week's top 3 outcomes, what to deprioritize, and a risk to watch."
      />
    </div>
  );
}
