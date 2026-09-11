import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { getRepository } from "@/lib/data/get-repository";

export default async function TodayPage() {
  const repo = getRepository();
  const user = await repo.getCurrentUser();
  const firstName = user?.displayName?.split(" ")[0] ?? "";

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Today"
        title={`Good morning, ${firstName}.`}
        description="This is where your three most strategically significant moves for the day will live — not a to-do list, a short, deliberate set of actions tied to what actually matters."
      />

      <EmptyState
        eyebrow="Your 3 Moves"
        title="Your strategy isn't built yet — so there's nothing to act on."
        description="Once your Vision and first goals exist, this screen shows at most three moves for today, each linked to the goal it serves and why it matters. Start with onboarding to give the system something to work with."
        action={
          <Button asChild variant="accent">
            <Link href="/onboarding">Start onboarding</Link>
          </Button>
        }
      />
    </div>
  );
}
