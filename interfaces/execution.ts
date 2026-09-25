/**
 * Illustrative public contract — execution, verification & recovery.
 * Describes outcomes and strategies, not the runtime that produces them.
 */
import type { Id, Timestamp } from './common';

export type ExecutionStatus = 'executed' | 'failed' | 'ambiguous';

export type VerificationStatus = 'verified' | 'verification_failed' | 'ambiguous';

/** Execution and verification are separate facts — never conflated. */
export interface ExecutionResult {
  proposalId: Id;
  attempt: number;
  status: ExecutionStatus;
  startedAt: Timestamp;
  finishedAt: Timestamp;
  failureClass?: FailureClass;
}

export interface VerificationResult {
  proposalId: Id;
  status: VerificationStatus;
  /** What was re-read or checked to confirm the effect. */
  checkedAgainst: string;
  verifiedAt: Timestamp;
}

export type FailureClass =
  | 'transient_timeout'
  | 'rate_limited'
  | 'ambiguous_write'
  | 'storage_interrupted'
  | 'process_crash'
  | 'stale_approval'
  | 'stale_context'
  | 'verification_failed'
  | 'duplicate'
  | 'budget_exhausted'
  | 'reasoning_unavailable';

export type RecoveryStrategy =
  | 'retry_bounded'
  | 'defer'
  | 'reconcile'
  | 'fail_closed'
  | 'resume'
  | 'require_new_approval'
  | 'block'
  | 'rollback'
  | 'dedupe'
  | 'escalate';

export interface RecoveryAction {
  proposalId: Id;
  failureClass: FailureClass;
  strategy: RecoveryStrategy;
  /** Only reversible actions may roll back; irreversible ones escalate. */
  outcome: 'recovered' | 'rolled_back' | 'escalated' | 'deferred' | 'abandoned';
  decidedAt: Timestamp;
  notes?: string;
}

export type ActionLifecycle =
  | 'proposed'
  | 'blocked'
  | 'awaiting_approval'
  | 'rejected'
  | 'expired'
  | 'prepared'
  | 'executing'
  | 'retrying'
  | 'reconciling'
  | 'verifying'
  | 'verified'
  | 'rolling_back'
  | 'rolled_back'
  | 'escalated';
