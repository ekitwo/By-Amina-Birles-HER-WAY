import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="mb-4 text-xs font-medium uppercase tracking-widest text-accent">
        Onboarding
      </span>
      <h1 className="max-w-lg font-display text-3xl leading-snug tracking-tight text-ink text-balance">
        The conversational onboarding flow lands in Phase 1.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        Phase 0 is the foundation — design system, data model, and navigation
        shell. The adaptive intake that builds your Profile and first Life
        Map is next.
      </p>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/today">Back to Today</Link>
      </Button>
    </div>
  );
}
