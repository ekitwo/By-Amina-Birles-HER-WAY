/**
 * HER WAY — core data model.
 *
 * These types are the single source of truth for entities described in the
 * product architecture (Part 8). They are storage-agnostic: the mock
 * repository (src/lib/data/mock) and the future Supabase repository both
 * implement `Repository` (src/lib/data/repository.ts) against these shapes.
 *
 * Naming convention: `*Id` fields are foreign keys (string uuid).
 */

export type Uuid = string;
export type IsoDateString = string; // e.g. "2026-09-11"
export type IsoDateTimeString = string; // e.g. "2026-09-11T08:30:00.000Z"

export type LifeAreaKey =
  | "career"
  | "money"
  | "business"
  | "health"
  | "body"
  | "relationships"
  | "family"
  | "personal_brand"
  | "learning"
  | "lifestyle"
  | "adventure"
  | "contribution";

export type TimeHorizon = "this_week" | "this_quarter" | "this_year" | "1_year" | "3_year" | "5_year";
export type ImpactLevel = "low" | "medium" | "high";
export type EffortLevel = "low" | "medium" | "high";
export type RiskLevel = "low" | "medium" | "high";
export type GoalStatus = "not_started" | "active" | "at_risk" | "achieved" | "abandoned";
export type SeasonRole = "primary" | "maintenance" | "paused";

// ---------------------------------------------------------------------------
// User & Profile
// ---------------------------------------------------------------------------

export interface User {
  id: Uuid;
  email: string;
  displayName: string;
  createdAt: IsoDateTimeString;
}

export interface Profile {
  id: Uuid;
  userId: Uuid;
  /** Free-form but structured "current reality" facts gathered in onboarding. */
  ageRange?: string;
  location?: string;
  occupation?: string;
  role?: string;
  incomeRange?: string;
  careerSituation?: string;
  education?: string;
  hasBusiness?: boolean;
  audienceSize?: string;
  healthSummary?: string;
  activityLevel?: string;
  relationshipStatus?: string;
  hasFamilyObligations?: boolean;
  weeklyFreeHours?: number;
  currentLoadSummary?: string;
  onboardingCompletedAt?: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export interface Value {
  id: Uuid;
  userId: Uuid;
  label: string; // e.g. "Financial independence", "Creative freedom"
  description?: string;
  rank: number; // 1 = most important
}

export interface Constraint {
  id: Uuid;
  userId: Uuid;
  type: "time" | "money" | "location" | "obligation" | "energy" | "other";
  label: string;
  detail?: string;
  weeklyHoursImpact?: number;
}

export interface Resource {
  id: Uuid;
  userId: Uuid;
  type: "skill" | "education" | "network" | "money" | "audience" | "experience" | "asset" | "opportunity";
  label: string;
  detail?: string;
  strength?: ImpactLevel;
}

// ---------------------------------------------------------------------------
// Life Map & Vision
// ---------------------------------------------------------------------------

export interface LifeArea {
  id: Uuid;
  userId: Uuid;
  key: LifeAreaKey;
  label: string;
  isActive: boolean; // user has chosen this as a tracked area
  currentState?: string;
  desiredState?: string;
  gapSummary?: string;
  priorityRank?: number;
  horizon?: TimeHorizon;
}

export interface Vision {
  id: Uuid;
  userId: Uuid;
  lifeAreaId?: Uuid; // null = whole-life Personal Vision
  horizon: "1_year" | "3_year" | "5_year";
  statement: string; // structured vision text, not a motivational quote
  themes: string[]; // e.g. ["freedom", "recognition", "financial independence"]
  createdAt: IsoDateTimeString;
  supersededAt?: IsoDateTimeString;
}

// ---------------------------------------------------------------------------
// Goals, Milestones, Projects, Actions
// ---------------------------------------------------------------------------

export interface Goal {
  id: Uuid;
  userId: Uuid;
  lifeAreaId: Uuid;
  visionId?: Uuid;
  title: string;
  outcome: string;
  metricLabel: string;
  metricCurrent?: number;
  metricTarget?: number;
  metricUnit?: string;
  deadline?: IsoDateString;
  whyItMatters: string;
  mechanism?: string; // chosen path, e.g. "consulting", "salary growth"
  fitScore?: number; // 0-100, how realistic/aligned the mechanism is
  status: GoalStatus;
  seasonRole?: SeasonRole;
  dependsOnGoalIds: Uuid[];
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export interface Milestone {
  id: Uuid;
  goalId: Uuid;
  title: string;
  targetDate?: IsoDateString;
  completedAt?: IsoDateTimeString;
}

export interface Project {
  id: Uuid;
  goalId: Uuid;
  title: string;
  description?: string;
  status: "not_started" | "active" | "done" | "paused";
}

export interface Action {
  id: Uuid;
  userId: Uuid;
  projectId?: Uuid;
  goalId?: Uuid; // required unless isLifeAdmin
  isLifeAdmin: boolean; // true = not tied to strategy (errands etc.)
  title: string;
  why?: string; // "why this matters" shown on Today
  scheduledFor?: IsoDateString;
  completedAt?: IsoDateTimeString;
  estimatedMinutes?: number;
}

// ---------------------------------------------------------------------------
// Priority & Conflict
// ---------------------------------------------------------------------------

export interface PriorityScore {
  id: Uuid;
  goalId: Uuid;
  computedAt: IsoDateTimeString;
  impact: ImpactLevel;
  urgency: ImpactLevel;
  strategicLeverage: number; // 0-100, how many other goals this unblocks
  valuesAlignment: number; // 0-100
  effort: EffortLevel;
  opportunityCostWeight: number; // 0-100
  score: number; // final computed priority_score
  rank: number;
}

export interface ConflictRecord {
  id: Uuid;
  userId: Uuid;
  computedAt: IsoDateTimeString;
  goalIds: Uuid[];
  requiredWeeklyHours: number;
  availableWeeklyHours: number;
  energyDemand: ImpactLevel;
  financialDemand: ImpactLevel;
  isOvercommitted: boolean;
  scenarios: ConflictScenario[];
}

export interface ConflictScenario {
  key: string; // e.g. "career_first", "balanced"
  label: string;
  description: string;
  tradeOffs: string[];
  goalIdsKept: Uuid[];
  goalIdsPausedOrDropped: Uuid[];
}

// ---------------------------------------------------------------------------
// Strategy: Seasons, Annual, Quarterly
// ---------------------------------------------------------------------------

export interface StrategicSeason {
  id: Uuid;
  userId: Uuid;
  label: string; // e.g. "Career Expansion"
  quarter: string; // e.g. "2026-Q4"
  primaryGoalIds: Uuid[];
  maintenanceGoalIds: Uuid[];
  pausedGoalIds: Uuid[];
}

export interface AnnualStrategy {
  id: Uuid;
  userId: Uuid;
  year: number;
  theme: string;
  topOutcomeGoalIds: Uuid[]; // max 3
  supportingGoalIds: Uuid[];
  notThisYear: string[];
}

export interface QuarterlyStrategy {
  id: Uuid;
  userId: Uuid;
  quarter: string; // "2026-Q4"
  topOutcomeGoalIds: Uuid[];
  keyProjectIds: Uuid[];
  risks: string[];
  requiredHabits: string[];
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export interface WeeklyReview {
  id: Uuid;
  userId: Uuid;
  weekOf: IsoDateString;
  whatMattered?: string;
  whatMoved?: string;
  whatWasIgnored?: string;
  whatChanged?: string;
  whereWasted?: string;
  nextWeekTopOutcomeIds: Uuid[]; // Action ids for "Your 3 Moves"
  nextWeekDeprioritize?: string;
  riskToWatch?: string;
  createdAt: IsoDateTimeString;
}

export interface MonthlyReview {
  id: Uuid;
  userId: Uuid;
  monthOf: string; // "2026-09"
  keep: string[];
  stop: string[];
  start: string[];
  doubleDown: string[];
  createdAt: IsoDateTimeString;
}

// ---------------------------------------------------------------------------
// Decisions & Scenarios
// ---------------------------------------------------------------------------

export interface Decision {
  id: Uuid;
  userId: Uuid;
  title: string; // e.g. "Change Job"
  context?: string;
  optionIds: Uuid[]; // -> Scenario[]
  assumptions?: string[];
  chosenScenarioId?: Uuid;
  decidedAt?: IsoDateTimeString;
  followUpDueAt?: IsoDateTimeString;
  outcomeNotes?: string; // filled in during follow-up
  outcomeRecordedAt?: IsoDateTimeString;
  createdAt: IsoDateTimeString;
}

export interface Scenario {
  id: Uuid;
  decisionId: Uuid;
  label: string; // "Stay", "Change company", "Start business"
  description?: string;
  income?: string;
  risk?: RiskLevel;
  learning?: ImpactLevel;
  careerCapital?: ImpactLevel;
  timeDemand?: string;
  energyDemand?: ImpactLevel;
  optionality?: ImpactLevel;
  longTermUpside?: ImpactLevel;
  alignmentWithVision?: number; // 0-100
}

// ---------------------------------------------------------------------------
// Opportunities
// ---------------------------------------------------------------------------

export interface Opportunity {
  id: Uuid;
  userId: Uuid;
  title: string;
  description: string;
  category: string; // "consulting", "content", "role", "partnership", ...
  potentialImpact: ImpactLevel;
  effort: EffortLevel;
  fitScore: number; // 0-100
  risk: RiskLevel;
  timeToResult: string; // "2-4 weeks"
  whyItFits: string;
  status: "new" | "saved" | "dismissed" | "active";
  createdAt: IsoDateTimeString;
}

// ---------------------------------------------------------------------------
// Metrics & Alignment
// ---------------------------------------------------------------------------

export interface Metric {
  id: Uuid;
  goalId: Uuid;
  label: string;
  value: number;
  unit?: string;
  recordedAt: IsoDateTimeString;
}

export interface AlignmentScoreSnapshot {
  id: Uuid;
  userId: Uuid;
  computedAt: IsoDateTimeString;
  overallLabel: "high_alignment" | "moderate_alignment" | "low_alignment";
  components: {
    progress: number; // 0-100
    resourceAllocation: number;
    goalCoherence: number;
    executionConsistency: number;
    priorityAlignment: number;
  };
  explanation: string;
}

// ---------------------------------------------------------------------------
// Recommendation contract (Part 10) — shared shape for every engine output
// ---------------------------------------------------------------------------

export interface Recommendation {
  recommendation: string;
  why: string;
  supportsGoalId: Uuid | null;
  impact: ImpactLevel;
  effort: EffortLevel;
  risk: RiskLevel;
  timeHorizon: TimeHorizon;
  nextAction: string;
}
