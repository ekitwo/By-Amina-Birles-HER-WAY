import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function OpportunityRadarPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Opportunity Radar"
        title="Opportunity Radar"
        description="Possibilities the Opportunity Engine surfaces from your skills, network, audience, and experience — scored, not just suggested."
      />

      <EmptyState
        eyebrow="Nothing surfaced yet"
        title="The radar needs a profile to work from."
        description="Once your resources and goals are known, this screen proposes concrete opportunities — a role, a consulting angle, a monetization path — each with impact, effort, fit, risk, and why it fits you specifically. These are recommendations, never instructions."
      />
    </div>
  );
}
