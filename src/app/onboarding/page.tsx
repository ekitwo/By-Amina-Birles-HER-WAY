"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <span className="mb-4 text-xs font-medium uppercase tracking-widest text-accent">
          Onboarding
        </span>
        <h1 className="max-w-md font-display text-3xl leading-snug tracking-tight text-ink text-balance">
          Good to have you, {name || "there"}.
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Noted: <span className="text-ink-soft">{focus || "your focus"}</span> is where we start.
        </p>
        <Button asChild variant="accent" className="mt-8">
          <Link href="/today">Go to Today</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
        className="flex w-full max-w-sm flex-col gap-5"
      >
        <div className="text-center">
          <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-accent">
            Onboarding
          </span>
          <h1 className="font-display text-2xl tracking-tight text-ink">Let's start simple.</h1>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amina"
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-ink outline-none focus:ring-1 focus:ring-ring"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          One thing you want to focus on right now
          <input
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Growing my consulting income"
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-ink outline-none focus:ring-1 focus:ring-ring"
          />
        </label>

        <Button type="submit" variant="accent">
          Continue
        </Button>
      </form>
    </div>
  );
}
