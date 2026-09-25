/**
 * Illustrative public contract — attention & prioritized work.
 * Not the production schema. No scoring logic, weights or thresholds.
 */
import type { EvidenceRef, Id, NonEmptyArray, Timestamp } from './common';

/** P0 act now · P1 today · P2 this week · P3 background. */
export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export type WorkCategory =
  | 'schedule'
  | 'reply_needed'
  | 'follow_up'
  | 'deliverable'
  | 'decision'
  | 'risk'
  | 'opportunity'
  | 'preparation';

/**
 * The factors a priority decision considers. Exposed here as qualitative
 * levels only; how they combine into a band is production policy.
 */
export interface PriorityFactors {
  importance: Level;
  urgency: Level;
  confidence: Level;
  risk: Level;
  autonomy: 'can_resolve' | 'needs_approval' | 'inform_only';
  notificationRelevance: 'interrupt' | 'brief' | 'silent';
}

export type Level = 'low' | 'medium' | 'high';

/** A named reason an item matters, always tied to evidence. */
export interface PrioritySignal {
  code: string;
  label: string;
  evidenceIds: NonEmptyArray<Id>;
}

export interface WorkItem {
  id: Id;
  title: string;
  /** Bounded summary; raw source content is never carried. */
  summary: string;
  category: WorkCategory;
  priority: Priority;
  factors: PriorityFactors;
  signals: PrioritySignal[];
  /** Schema-level guarantee: an item without evidence cannot exist. */
  evidence: NonEmptyArray<EvidenceRef>;
  rawContentIncluded: false;
  dueAt?: Timestamp;
  relatedPeople?: Id[];
  relatedProjects?: Id[];
  state: 'open' | 'in_progress' | 'waiting_for_approval' | 'resolved' | 'dismissed';
  createdAt: Timestamp;
}

/** The capped, explained answer to "what needs my attention today?". */
export interface AttentionBrief {
  generatedAt: Timestamp;
  topPriorities: WorkItem[];
  /** Which sources were covered, and how healthy each was. */
  sourceCoverage: Array<{
    source: EvidenceRef['source'];
    status: 'ready' | 'degraded' | 'unavailable';
  }>;
  limitations: string[];
}
