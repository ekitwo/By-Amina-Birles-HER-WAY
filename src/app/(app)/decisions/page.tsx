import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function DecisionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Decisions"
        title="Decision Journal"
        description="Every high-stakes decision, logged with its options, assumptions, and risks — and revisited months later against what actually happened."
      />

      <EmptyState
        eyebrow="No decisions logged"
        title="Nothing to review yet."
        description="When you're weighing something like changing jobs or starting a business, HER WAY builds out scenarios side by side — income, risk, learning, optionality, alignment with your Vision — instead of giving you a yes or no. Every decision you log here gets revisited later against its real outcome."
      />
    </div>
  );
}
