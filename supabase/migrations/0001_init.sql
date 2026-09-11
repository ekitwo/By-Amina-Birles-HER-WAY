-- HER WAY — initial schema (Part 8 data model)
--
-- Mirrors src/lib/types.ts. Every table (other than `profiles`, which is
-- 1:1 with auth.users) carries a `user_id` column and a row-level security
-- policy scoping reads/writes to `auth.uid()` — a user only ever sees her
-- own strategic data.
--
-- Not implemented yet: the SupabaseRepository in src/lib/data that reads/
-- writes through these tables (lands with Phase 1). This migration exists
-- so schema and app-level types evolve together from day one.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profile & onboarding facts
-- ---------------------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  age_range text,
  location text,
  occupation text,
  role text,
  income_range text,
  career_situation text,
  education text,
  has_business boolean,
  audience_size text,
  health_summary text,
  activity_level text,
  relationship_status text,
  has_family_obligations boolean,
  weekly_free_hours numeric,
  current_load_summary text,
  onboarding_completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table values_ (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  description text,
  rank int not null
);

create table constraints_ (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('time', 'money', 'location', 'obligation', 'energy', 'other')),
  label text not null,
  detail text,
  weekly_hours_impact numeric
);

create table resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('skill', 'education', 'network', 'money', 'audience', 'experience', 'asset', 'opportunity')),
  label text not null,
  detail text,
  strength text check (strength in ('low', 'medium', 'high'))
);

-- ---------------------------------------------------------------------------
-- Life Map & Vision
-- ---------------------------------------------------------------------------

create table life_areas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null check (key in (
    'career','money','business','health','body','relationships','family',
    'personal_brand','learning','lifestyle','adventure','contribution'
  )),
  label text not null,
  is_active boolean not null default true,
  current_state text,
  desired_state text,
  gap_summary text,
  priority_rank int,
  horizon text check (horizon in ('this_week','this_quarter','this_year','1_year','3_year','5_year'))
);

create table visions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  life_area_id uuid references life_areas(id) on delete cascade,
  horizon text not null check (horizon in ('1_year','3_year','5_year')),
  statement text not null,
  themes text[] not null default '{}',
  created_at timestamptz not null default now(),
  superseded_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Goals, milestones, projects, actions
-- ---------------------------------------------------------------------------

create table goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  life_area_id uuid not null references life_areas(id) on delete cascade,
  vision_id uuid references visions(id) on delete set null,
  title text not null,
  outcome text not null,
  metric_label text not null,
  metric_current numeric,
  metric_target numeric,
  metric_unit text,
  deadline date,
  why_it_matters text not null,
  mechanism text,
  fit_score numeric check (fit_score between 0 and 100),
  status text not null default 'not_started' check (status in ('not_started','active','at_risk','achieved','abandoned')),
  season_role text check (season_role in ('primary','maintenance','paused')),
  depends_on_goal_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table milestones (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references goals(id) on delete cascade,
  title text not null,
  target_date date,
  completed_at timestamptz
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references goals(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'not_started' check (status in ('not_started','active','done','paused'))
);

create table actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  goal_id uuid references goals(id) on delete set null,
  is_life_admin boolean not null default false,
  title text not null,
  why text,
  scheduled_for date,
  completed_at timestamptz,
  estimated_minutes int,
  constraint action_must_link_goal_or_be_admin
    check (is_life_admin or goal_id is not null)
);

-- ---------------------------------------------------------------------------
-- Priority & Conflict
-- ---------------------------------------------------------------------------

create table priority_scores (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references goals(id) on delete cascade,
  computed_at timestamptz not null default now(),
  impact text not null check (impact in ('low','medium','high')),
  urgency text not null check (urgency in ('low','medium','high')),
  strategic_leverage numeric not null check (strategic_leverage between 0 and 100),
  values_alignment numeric not null check (values_alignment between 0 and 100),
  effort text not null check (effort in ('low','medium','high')),
  opportunity_cost_weight numeric not null check (opportunity_cost_weight between 0 and 100),
  score numeric not null,
  rank int not null
);

create table conflict_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  computed_at timestamptz not null default now(),
  goal_ids uuid[] not null,
  required_weekly_hours numeric not null,
  available_weekly_hours numeric not null,
  energy_demand text check (energy_demand in ('low','medium','high')),
  financial_demand text check (financial_demand in ('low','medium','high')),
  is_overcommitted boolean not null
);

create table conflict_scenarios (
  id uuid primary key default gen_random_uuid(),
  conflict_record_id uuid not null references conflict_records(id) on delete cascade,
  key text not null,
  label text not null,
  description text,
  trade_offs text[] not null default '{}',
  goal_ids_kept uuid[] not null default '{}',
  goal_ids_paused_or_dropped uuid[] not null default '{}'
);

-- ---------------------------------------------------------------------------
-- Strategy: seasons, annual, quarterly
-- ---------------------------------------------------------------------------

create table strategic_seasons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  quarter text not null,
  primary_goal_ids uuid[] not null default '{}',
  maintenance_goal_ids uuid[] not null default '{}',
  paused_goal_ids uuid[] not null default '{}'
);

create table annual_strategies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year int not null,
  theme text not null,
  top_outcome_goal_ids uuid[] not null default '{}',
  supporting_goal_ids uuid[] not null default '{}',
  not_this_year text[] not null default '{}',
  unique (user_id, year)
);

create table quarterly_strategies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quarter text not null,
  top_outcome_goal_ids uuid[] not null default '{}',
  key_project_ids uuid[] not null default '{}',
  risks text[] not null default '{}',
  required_habits text[] not null default '{}',
  unique (user_id, quarter)
);

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------

create table weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_of date not null,
  what_mattered text,
  what_moved text,
  what_was_ignored text,
  what_changed text,
  where_wasted text,
  next_week_top_outcome_ids uuid[] not null default '{}',
  next_week_deprioritize text,
  risk_to_watch text,
  created_at timestamptz not null default now(),
  unique (user_id, week_of)
);

create table monthly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month_of text not null,
  keep text[] not null default '{}',
  stop text[] not null default '{}',
  start text[] not null default '{}',
  double_down text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (user_id, month_of)
);

-- ---------------------------------------------------------------------------
-- Decisions & Scenarios
-- ---------------------------------------------------------------------------

create table decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  context text,
  assumptions text[] not null default '{}',
  chosen_scenario_id uuid,
  decided_at timestamptz,
  follow_up_due_at timestamptz,
  outcome_notes text,
  outcome_recorded_at timestamptz,
  created_at timestamptz not null default now()
);

create table scenarios (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references decisions(id) on delete cascade,
  label text not null,
  description text,
  income text,
  risk text check (risk in ('low','medium','high')),
  learning text check (learning in ('low','medium','high')),
  career_capital text check (career_capital in ('low','medium','high')),
  time_demand text,
  energy_demand text check (energy_demand in ('low','medium','high')),
  optionality text check (optionality in ('low','medium','high')),
  long_term_upside text check (long_term_upside in ('low','medium','high')),
  alignment_with_vision numeric check (alignment_with_vision between 0 and 100)
);

alter table decisions
  add constraint decisions_chosen_scenario_fk
  foreign key (chosen_scenario_id) references scenarios(id) on delete set null;

-- ---------------------------------------------------------------------------
-- Opportunities
-- ---------------------------------------------------------------------------

create table opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  potential_impact text not null check (potential_impact in ('low','medium','high')),
  effort text not null check (effort in ('low','medium','high')),
  fit_score numeric not null check (fit_score between 0 and 100),
  risk text not null check (risk in ('low','medium','high')),
  time_to_result text,
  why_it_fits text not null,
  status text not null default 'new' check (status in ('new','saved','dismissed','active')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Metrics & Alignment
-- ---------------------------------------------------------------------------

create table metrics (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references goals(id) on delete cascade,
  label text not null,
  value numeric not null,
  unit text,
  recorded_at timestamptz not null default now()
);

create table alignment_score_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  computed_at timestamptz not null default now(),
  overall_label text not null check (overall_label in ('high_alignment','moderate_alignment','low_alignment')),
  progress numeric not null,
  resource_allocation numeric not null,
  goal_coherence numeric not null,
  execution_consistency numeric not null,
  priority_alignment numeric not null,
  explanation text not null
);

-- ---------------------------------------------------------------------------
-- Row Level Security — every user only ever sees her own data
-- ---------------------------------------------------------------------------

alter table profiles enable row level security;
alter table values_ enable row level security;
alter table constraints_ enable row level security;
alter table resources enable row level security;
alter table life_areas enable row level security;
alter table visions enable row level security;
alter table goals enable row level security;
alter table milestones enable row level security;
alter table projects enable row level security;
alter table actions enable row level security;
alter table priority_scores enable row level security;
alter table conflict_records enable row level security;
alter table conflict_scenarios enable row level security;
alter table strategic_seasons enable row level security;
alter table annual_strategies enable row level security;
alter table quarterly_strategies enable row level security;
alter table weekly_reviews enable row level security;
alter table monthly_reviews enable row level security;
alter table decisions enable row level security;
alter table scenarios enable row level security;
alter table opportunities enable row level security;
alter table metrics enable row level security;
alter table alignment_score_snapshots enable row level security;

create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own values" on values_ for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own constraints" on constraints_ for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own resources" on resources for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own life_areas" on life_areas for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own visions" on visions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own goals" on goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own actions" on actions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own conflict_records" on conflict_records for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own strategic_seasons" on strategic_seasons for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own annual_strategies" on annual_strategies for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own quarterly_strategies" on quarterly_strategies for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own weekly_reviews" on weekly_reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own monthly_reviews" on monthly_reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own decisions" on decisions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own opportunities" on opportunities for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own alignment_score_snapshots" on alignment_score_snapshots for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Child tables scoped through their parent's user_id
create policy "own milestones" on milestones for all
  using (exists (select 1 from goals g where g.id = milestones.goal_id and g.user_id = auth.uid()))
  with check (exists (select 1 from goals g where g.id = milestones.goal_id and g.user_id = auth.uid()));

create policy "own projects" on projects for all
  using (exists (select 1 from goals g where g.id = projects.goal_id and g.user_id = auth.uid()))
  with check (exists (select 1 from goals g where g.id = projects.goal_id and g.user_id = auth.uid()));

create policy "own priority_scores" on priority_scores for all
  using (exists (select 1 from goals g where g.id = priority_scores.goal_id and g.user_id = auth.uid()))
  with check (exists (select 1 from goals g where g.id = priority_scores.goal_id and g.user_id = auth.uid()));

create policy "own conflict_scenarios" on conflict_scenarios for all
  using (exists (select 1 from conflict_records c where c.id = conflict_scenarios.conflict_record_id and c.user_id = auth.uid()))
  with check (exists (select 1 from conflict_records c where c.id = conflict_scenarios.conflict_record_id and c.user_id = auth.uid()));

create policy "own scenarios" on scenarios for all
  using (exists (select 1 from decisions d where d.id = scenarios.decision_id and d.user_id = auth.uid()))
  with check (exists (select 1 from decisions d where d.id = scenarios.decision_id and d.user_id = auth.uid()));

create policy "own metrics" on metrics for all
  using (exists (select 1 from goals g where g.id = metrics.goal_id and g.user_id = auth.uid()))
  with check (exists (select 1 from goals g where g.id = metrics.goal_id and g.user_id = auth.uid()));
