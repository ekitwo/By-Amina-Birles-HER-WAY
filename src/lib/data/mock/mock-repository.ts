import type { Repository } from "@/lib/data/repository";
import { MOCK_USER } from "@/lib/data/mock/mock-data";

/**
 * In-memory implementation of `Repository`. See mock-data.ts for why every
 * collection beyond the current user is empty in Phase 0.
 */
export class MockRepository implements Repository {
  async getCurrentUser() {
    return MOCK_USER;
  }
  async getProfile() {
    return null;
  }
  async listValues() {
    return [];
  }
  async listLifeAreas() {
    return [];
  }
  async listVisions() {
    return [];
  }
  async listGoals() {
    return [];
  }
  async getGoal() {
    return null;
  }
  async listActions() {
    return [];
  }
  async listPriorityScores() {
    return [];
  }
  async getLatestConflictRecord() {
    return null;
  }
  async getActiveSeason() {
    return null;
  }
  async getAnnualStrategy() {
    return null;
  }
  async getQuarterlyStrategy() {
    return null;
  }
  async listWeeklyReviews() {
    return [];
  }
  async listMonthlyReviews() {
    return [];
  }
  async listDecisions() {
    return [];
  }
  async listOpportunities() {
    return [];
  }
  async getLatestAlignmentScore() {
    return null;
  }
}
