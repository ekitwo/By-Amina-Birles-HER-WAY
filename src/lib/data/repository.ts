import type {
  Action,
  AlignmentScoreSnapshot,
  AnnualStrategy,
  ConflictRecord,
  Decision,
  Goal,
  LifeArea,
  MonthlyReview,
  Opportunity,
  PriorityScore,
  Profile,
  QuarterlyStrategy,
  StrategicSeason,
  User,
  Value,
  Vision,
  WeeklyReview,
} from "@/lib/types";

/**
 * Storage-agnostic data access contract.
 *
 * Every screen reads through this interface, never through a concrete
 * backend directly. Phase 0 ships `MockRepository` (in-memory, seeded).
 * A `SupabaseRepository` implementing the same interface is a drop-in
 * replacement once a Supabase project is wired up (see
 * src/lib/supabase/client.ts and supabase/migrations/0001_init.sql, which
 * already mirror this exact shape).
 */
export interface Repository {
  getCurrentUser(): Promise<User | null>;
  getProfile(userId: string): Promise<Profile | null>;

  listValues(userId: string): Promise<Value[]>;
  listLifeAreas(userId: string): Promise<LifeArea[]>;
  listVisions(userId: string): Promise<Vision[]>;

  listGoals(userId: string): Promise<Goal[]>;
  getGoal(goalId: string): Promise<Goal | null>;

  listActions(userId: string, opts?: { onlyToday?: boolean }): Promise<Action[]>;

  listPriorityScores(userId: string): Promise<PriorityScore[]>;
  getLatestConflictRecord(userId: string): Promise<ConflictRecord | null>;

  getActiveSeason(userId: string): Promise<StrategicSeason | null>;
  getAnnualStrategy(userId: string, year: number): Promise<AnnualStrategy | null>;
  getQuarterlyStrategy(userId: string, quarter: string): Promise<QuarterlyStrategy | null>;

  listWeeklyReviews(userId: string): Promise<WeeklyReview[]>;
  listMonthlyReviews(userId: string): Promise<MonthlyReview[]>;

  listDecisions(userId: string): Promise<Decision[]>;
  listOpportunities(userId: string): Promise<Opportunity[]>;

  getLatestAlignmentScore(userId: string): Promise<AlignmentScoreSnapshot | null>;
}
