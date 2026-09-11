import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Goals"
        title="Goals"
        description="Every goal here carries a target, current state, gap, deadline, priority, and next milestone — never just a title on a list."
      />

      <EmptyState
        eyebrow="No goals yet"
        title="Goals are defined after your Vision, not before it."
        description="The Goal Engine turns a life area's desired state into a concrete outcome with a metric, a deadline, and an honest read on which mechanism (a raise, consulting, a business, content) actually fits your resources. Complete onboarding to define your first life areas."
        action={
          <Button asChild variant="accent">
            <Link href="/onboarding">Go to onboarding</Link>
          </Button>
        }
      />
    </div>
  );
}
