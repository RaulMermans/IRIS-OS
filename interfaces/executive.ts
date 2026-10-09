/**
 * Illustrative public contract — the executive layer (POLARIS Supervisor),
 * goal/plan/action evaluation, Shadow Mode, human decisions and governed learning.
 *
 * Re-authored for the public edition. Field names are simplified, and no
 * weights, thresholds, policy versions or routing rules are included.
 */
import type { AgentId, EvidenceRef, Id, NonEmptyArray, Timestamp } from './common';
import type { Priority } from './work-item';

/* ------------------------------------------------------------------ */
/* Executive Policy: a pure function over evidence, never over free text */
/* ------------------------------------------------------------------ */

/** Computed before, and independently of, priority. A model cannot change it. */
export type AutonomyDisposition =
  | 'autonomous_safe'
  | 'approval_required'
  | 'explicit_confirmation_required'
  | 'forbidden';

export type NotificationDisposition = 'silent' | 'digest' | 'notify' | 'decision_required';

export interface ExecutiveAssessment {
  workItemId: Id;
  relevant: boolean;
  priority: Priority;
  autonomy: AutonomyDisposition;
  notification: NotificationDisposition;
  /** 0..1, lowered by any model interpretation, raised only by trusted-system evidence. */
  confidence: number;
  risk: 'low' | 'elevated' | 'high';
  /** Named reasons, each pointing at evidence. No hidden scoring. */
  reasons: Array<{ code: string; evidenceIds: Id[] }>;
  assessedAt: Timestamp;
}

/* ------------------------------------------------------------------ */
/* Supervisor: decides which existing authority owns the work           */
/* ------------------------------------------------------------------ */

export type ExecutionTarget =
  | { kind: 'native_agent'; agent: AgentId; capability: string }
  | { kind: 'workflow'; workflow: string }
  | { kind: 'governed_action'; actionType: string } // proposal only; ActionRuntime decides
  | { kind: 'human'; reason: string }
  /** Present in the contract; refused at runtime until a department registry exists. */
  | { kind: 'department'; capability: string };

export interface SupervisorDecision {
  workItemId: Id;
  target: ExecutionTarget;
  /** Optional bounded plan; re-validated before any execution. */
  plan?: { steps: NonEmptyArray<{ capability: string; dependsOn: number[] }>; maxReplans: number };
  /** Deterministic invariant checks run on every decision. */
  invariantViolations: string[];
  decidedAt: Timestamp;
}

/* ------------------------------------------------------------------ */
/* GPA: does a truthful result actually achieve what was asked?         */
/* ------------------------------------------------------------------ */

export type GPALevel = 'action' | 'plan' | 'goal';
export type GPAVerdict = 'pass' | 'retry' | 'replan' | 'escalate' | 'fail';

export interface GPAEvaluation {
  level: GPALevel;
  verdict: GPAVerdict;
  /** L0 runtime invariants always win; L1 deterministic rules are always on; L2 can only tighten. */
  tier: 'L0' | 'L1' | 'L2';
  issueCodes: string[]; // bounded vocabulary, no free text
  evidenceRefs: Id[];
}

/** Applied only through existing authorities, under explicit budgets. */
export type AdaptiveDecision = 'continue' | 'complete' | 'retry' | 'reassign' | 'replan' | 'escalate' | 'fail';

/* ------------------------------------------------------------------ */
/* Shadow Mode: counterfactual execution, fenced from side effects      */
/* ------------------------------------------------------------------ */

export type RunMode = 'production' | 'shadow';

export interface ShadowEvalLabel {
  dimension: 'attention' | 'priority' | 'route' | 'skill' | 'planner' | 'gpa' | 'notification' | 'autonomy';
  /** Deterministic invariants outrank operator labels, which outrank evaluator and model labels. */
  source: 'deterministic_invariant' | 'operator' | 'historical_outcome' | 'evaluator' | 'model';
  /** Missing labels stay unknown and are excluded from every denominator. */
  expected: string | 'unknown';
  observed: string;
}

/* ------------------------------------------------------------------ */
/* Human decisions: transport-neutral, the source runtime stays the authority */
/* ------------------------------------------------------------------ */

export interface DecisionRequest {
  id: Id;
  workspaceId: Id;
  /** Bound to the exact proposal and policy version shown to the human. */
  proposalFingerprint: string;
  title: string;
  summary: string; // bounded; no payloads, raw traces or document bodies
  risk: 'low' | 'elevated' | 'high';
  options: NonEmptyArray<'approve' | 'reject' | 'request_changes'>;
  evidence: EvidenceRef[];
  expiresAt: Timestamp;
  status: 'pending' | 'resolved' | 'expired' | 'cancelled' | 'superseded';
}

export interface DecisionResponse {
  requestId: Id;
  option: 'approve' | 'reject' | 'request_changes';
  /** An authenticated, workspace-bound principal, never a raw chat user id. */
  principalId: Id;
  /** Duplicate clicks and replayed callbacks resolve to the same response. */
  idempotencyKey: string;
  feedback?: string; // bounded length; never becomes policy or memory automatically
  respondedAt: Timestamp;
}

/* ------------------------------------------------------------------ */
/* Governed learning: candidates, never self-modification               */
/* ------------------------------------------------------------------ */

export type PromotionTarget =
  | 'regression_case'
  | 'skill_revision'
  | 'routing_rule'
  | 'semantic_memory'
  | 'procedural_memory'
  | 'policy'
  | 'runbook';

export interface LearningCandidate {
  id: Id;
  /** Append-only. There is no automatic transition out of 'candidate'. */
  status: 'candidate';
  pattern: string;
  proposedTarget: PromotionTarget;
  /** Production and Shadow evidence are counted separately; Shadow alone cannot promote. */
  support: { production: number; shadow: number; contradicting: number };
  evidenceRefs: NonEmptyArray<Id>;
  createdAt: Timestamp;
}
