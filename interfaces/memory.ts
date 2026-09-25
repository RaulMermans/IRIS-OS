/**
 * Illustrative public contract — memory.
 * No retrieval, ranking, embedding or indexing strategy is implied.
 */
import type { Actor, EvidenceRef, Id, Timestamp } from './common';

export type MemoryKind = 'working' | 'episodic' | 'semantic' | 'procedural';

export type PrivacyCeiling = 'public' | 'internal' | 'private' | 'restricted';

export interface MemoryScope {
  workspaceId: Id;
  /** Person, project or topic the memory is about. */
  subjectIds: Id[];
  privacy: PrivacyCeiling;
}

export interface Provenance {
  recordedBy: Actor;
  /** The run, action or review that produced this record. */
  originId: Id;
  evidence: EvidenceRef[];
}

export interface MemoryRecord {
  id: Id;
  kind: MemoryKind;
  scope: MemoryScope;
  provenance: Provenance;
  content: string;
  confidence: 'low' | 'medium' | 'high';
  observedAt: Timestamp;
  recordedAt: Timestamp;
  lastConfirmedAt?: Timestamp;
  /** Stale memory is flagged, not silently trusted. */
  stale: boolean;
}

/** Long-term memory changes only through reviewed proposals. */
export interface MemoryProposal {
  id: Id;
  operation: 'create' | 'update' | 'retire';
  targetKind: Exclude<MemoryKind, 'working'>;
  draft: Omit<MemoryRecord, 'id' | 'recordedAt'>;
  rationale: string;
  status: 'proposed' | 'accepted' | 'rejected';
  reviewedBy?: Actor;
}

export interface RetrievalRequest {
  query: string;
  scope: Pick<MemoryScope, 'workspaceId'>;
  /** Callers never see records above their ceiling. */
  privacyCeiling: PrivacyCeiling;
  kinds?: MemoryKind[];
  limit: number;
}

/** A bounded, provenance-carrying context pack for a single run. */
export interface ContextPack {
  runId: Id;
  records: MemoryRecord[];
  truncated: boolean;
  assembledAt: Timestamp;
}
