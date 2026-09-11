import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function MyWayPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="My Way"
        title="Your strategy map"
        description="Vision, strategic pillars, life areas, and the line from your 3-year horizon down to this year's strategy — as one interactive map, not a document you write once and forget."
      />

      <EmptyState
        eyebrow="Vision"
        title="No Vision yet."
        description="Your Personal Vision is built from onboarding, not typed in as a motivational quote. Once it exists, this screen shows your strategic pillars, active life areas, and how your 1-year strategy ladders up to your 3-year horizon."
        action={
          <Button asChild variant="accent">
            <Link href="/onboarding">Build your Vision</Link>
          </Button>
        }
      />
    </div>
  );
}
