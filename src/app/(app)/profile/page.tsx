import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

const SECTIONS = [
  {
    title: "Current Reality",
    description: "Work, income, health, relationships, and the load you're carrying today.",
  },
  {
    title: "Values",
    description: "What you've told the system actually matters, ranked.",
  },
  {
    title: "Constraints",
    description: "Time, money, location, and obligations the strategy has to respect.",
  },
  {
    title: "Resources",
    description: "Skills, network, audience, and assets available to work with.",
  },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Profile"
        title="Profile"
        description="Everything the system knows about your reality — visible to you, editable by you, and never used without being traceable back to a recommendation."
      />

      <EmptyState
        title="Your profile is empty."
        description="Onboarding is the fastest way to fill this in properly — it's a short conversation, not a form with forty fields."
        action={
          <Button asChild variant="accent">
            <Link href="/onboarding">Start onboarding</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{section.description}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground/70">
                Nothing recorded yet
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
