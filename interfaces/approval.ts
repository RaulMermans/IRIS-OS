/**
 * Illustrative public contract — governed action proposals & approvals.
 * Autonomy levels are shown; which action types map to which level is private policy.
 */
import type { Actor, AgentId, EvidenceRef, Id, NonEmptyArray, Timestamp } from './common';

/** A0 read · A1 internal low-risk · A2 internal consequential · A3 external · A4 destructive (explicit confirmation; none enabled). */
export type AutonomyLevel = 'A0' | 'A1' | 'A2' | 'A3' | 'A4';

export type Reversibility = 'reversible' | 'irreversible';

export type PolicyDecision = 'allow_auto' | 'require_approval' | 'block';

export interface ActionProposal {
  id: Id;
  /** Must be a registered action type; unknown types fail closed. */
  actionType: string;
  proposedBy: { kind: 'agent'; id: AgentId } | { kind: 'system'; component: string };
  /** Human-readable description of the concrete effect. */
  intent: string;
  target: { system: string; reference: string };
  reversibility: Reversibility;
  evidence: NonEmptyArray<EvidenceRef>;
  workItemId?: Id;
  runId: Id;
  createdAt: Timestamp;
}

/** Result of a pure, deterministic policy evaluation. */
export interface PolicyEvaluation {
  proposalId: Id;
  /** Taken from the action's registration — never from the proposal. */
  autonomyLevel: AutonomyLevel;
  decision: PolicyDecision;
  reasons: string[];
}

export interface ApprovalRequest {
  id: Id;
  proposalId: Id;
  /** Approvals are bound to exactly one run. */
  runId: Id;
  summary: string;
  whyNow: string;
  evidence: NonEmptyArray<EvidenceRef>;
  requestedAt: Timestamp;
  /** Stale approvals are never resurrected; a new one must be requested. */
  expiresAt: Timestamp;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
}

export interface ApprovalDecision {
  approvalId: Id;
  decision: 'approved' | 'rejected';
  decidedBy: Extract<Actor, { kind: 'human' }>;
  decidedAt: Timestamp;
  note?: string;
}
