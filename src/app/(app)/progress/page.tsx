import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Progress"
        title="Progress"
        description="Outputs, outcomes, milestones, and consistency — not a percentage of checked boxes."
      />

      <EmptyState
        eyebrow="Nothing tracked yet"
        title="Progress needs goals and a few weeks of movement before it means anything."
        description="Once you're underway, this screen shows what actually changed — audience growth, a launched project, a salary increase — against your goals, alongside your Life Alignment: how well your time, energy, and goals are pulling in the same direction, with a plain explanation of why."
      />
    </div>
  );
}
