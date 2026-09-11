import type { User } from "@/lib/types";

/**
 * Phase 0 seed data.
 *
 * Deliberately minimal: a single signed-in user who has not yet completed
 * onboarding. Every other collection (goals, visions, actions, reviews...)
 * is empty on purpose — Phase 0 is the shell + design system, not the
 * strategic engines. Every screen therefore renders its real empty state,
 * not placeholder content pretending to be a finished feature.
 *
 * Phase 1 (Onboarding + Profile Engine) will populate this from the actual
 * onboarding flow instead of a static seed.
 */
export const MOCK_USER: User = {
  id: "usr_amina",
  email: "amina@example.com",
  displayName: "Amina",
  createdAt: new Date().toISOString(),
};
