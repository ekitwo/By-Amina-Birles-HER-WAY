import type { Repository } from "@/lib/data/repository";
import { MockRepository } from "@/lib/data/mock/mock-repository";

/**
 * Single entry point every screen/server component uses to get a repository
 * instance. Swaps between the mock and Supabase implementations based on
 * NEXT_PUBLIC_USE_MOCK_DATA — no screen code needs to change either way.
 */
let cached: Repository | null = null;

export function getRepository(): Repository {
  if (cached) return cached;

  const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

  if (useMock) {
    cached = new MockRepository();
  } else {
    // Phase 0 ships the schema + client scaffolding for this
    // (src/lib/supabase, supabase/migrations/0001_init.sql) but the
    // SupabaseRepository implementation lands with Phase 1, once the
    // onboarding flow needs to actually persist data.
    throw new Error(
      "SupabaseRepository is not implemented yet — set NEXT_PUBLIC_USE_MOCK_DATA=true, or implement src/lib/data/supabase/supabase-repository.ts."
    );
  }

  return cached;
}
