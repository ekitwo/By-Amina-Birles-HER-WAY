# HER WAY — AI Strategic Life OS

Turn ambition into strategy. Turn strategy into action. Turn action into a
life you deliberately build.

This repo is the web app for HER WAY, built against the architecture
established for the product (life areas, goals, priority/conflict engines,
weekly review loop, decision journal — see the product architecture doc for
the full model). Development proceeds in phases; **do not** re-architect
working modules between phases without cause.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS + hand-rolled shadcn/ui-style primitives (`src/components/ui`)
- Supabase (Postgres + Auth) — schema ready in `supabase/migrations`, wired
  in behind a repository interface so the UI never talks to it directly
- Claude API — powers the Vision / Goal / Priority / Conflict / Strategy
  engines (not yet integrated; lands with the engines that need it)

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

By default the app runs entirely on an **in-memory mock repository**
(`NEXT_PUBLIC_USE_MOCK_DATA=true`) so it's fully explorable with zero
external setup. To point it at a real Supabase project instead, fill in the
Supabase keys in `.env.local`, set `NEXT_PUBLIC_USE_MOCK_DATA=false`, and
implement `SupabaseRepository` against `src/lib/data/repository.ts` (the SQL
schema in `supabase/migrations/0001_init.sql` already matches it 1:1).

## Architecture

```
src/
  app/                     Routes (App Router)
    (app)/                 The 9 core screens, behind the shared shell
    onboarding/            Stub — real flow lands in Phase 1
  components/
    ui/                    Design-system primitives (Button, Card, Badge, ...)
    layout/                AppShell, SidebarNav
    shared/                EmptyState, SectionHeader — reused across screens
  lib/
    types.ts               The full data model (Part 8) — single source of truth
    data/
      repository.ts        Storage-agnostic interface every screen reads through
      get-repository.ts    Picks mock vs. Supabase based on env
      mock/                In-memory implementation + seed data
    supabase/               Browser/server Supabase client scaffolding
supabase/
  migrations/0001_init.sql  Postgres schema mirroring src/lib/types.ts, with RLS
```

### Design language

Luxury editorial + quiet technology: warm ivory ground, ink-charcoal text, a
single muted bronze/clay accent (`--accent` in `globals.css`) used only where
it carries meaning — priority, focus, the North Star. Display type is
Fraunces (serif, editorial), body is Inter. No pink, no saturated gradients,
no motivational-poster tone — in copy or in visuals.

### Why every screen is "empty" right now

Phase 0 ships the shell, the design system, and the full data model — not
the strategic engines. Every one of the 9 screens (`Today`, `My Way`,
`Goals`, `Strategy`, `Opportunity Radar`, `Decisions`, `Weekly CEO`,
`Progress`, `Profile`) renders a real, considered empty state through
`EmptyState`, explaining what it becomes and why, rather than fake seed data
standing in for unbuilt features.

## Status

- [x] **Phase 0 — Foundations**: design system, data model, Supabase schema,
      repository pattern, navigation shell, all 9 screens with real empty states
- [ ] **Phase 1 — Understanding Layer**: conversational onboarding, Profile
      Engine, Life Map
- [ ] **Phase 2 — Strategic Cognition I**: Vision Engine, Goal Engine, Reverse
      Engineering Engine
- [ ] **Phase 3 — Priority & Conflict**: Priority Engine, Conflict Engine
- [ ] **Phase 4 — Strategy & Execution Loop**: Strategy Engine, Today / Action Engine
- [ ] **Phase 5 — Weekly CEO Meeting**
- [ ] **Phase 6 — Scenario Simulator + Decision Journal**
- [ ] **Phase 7 — Progress + Review Engine**
- [ ] **Phase 8 — Polish**: copywriting, empty states, microinteractions, IA pass
