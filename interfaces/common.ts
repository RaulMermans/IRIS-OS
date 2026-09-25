/**
 * JARVIS OS — illustrative public contracts.
 *
 * Written from scratch for the public edition. These types show the shape of
 * the system's core concepts; they are NOT the production schemas, and they
 * carry no implementation, weights, thresholds or policy.
 */

/** ISO-8601 timestamp. */
export type Timestamp = string;

/** Opaque identifier. */
export type Id = string;

export type ContextSource =
  | 'calendar'
  | 'gmail'
  | 'task'
  | 'project'
  | 'relationship'
  | 'memory';

/** A pointer back to the real record that justifies a claim. */
export interface EvidenceRef {
  id: Id;
  source: ContextSource;
  sourceRecordId: Id;
  /** Short, already-bounded label; never a raw body. */
  title: string;
  occurredAt: Timestamp;
}

/** At least one element — "no evidence, no item" as a type. */
export type NonEmptyArray<T> = [T, ...T[]];

/** Health a component reports about itself instead of failing silently. */
export interface ComponentStatus {
  health: 'ready' | 'degraded' | 'unavailable';
  /** How the component is currently wired: synthetic data, controlled (no live side effects), live, or off. */
  wiring: 'synthetic' | 'controlled' | 'live' | 'off';
  lastRefresh?: Timestamp;
  knownGaps: string[];
}

/** Who did something — used for provenance and approvals. */
export type Actor =
  | { kind: 'human'; id: Id }
  | { kind: 'agent'; id: AgentId }
  | { kind: 'system'; component: string };

export type AgentId =
  | 'POLARIS'
  | 'VOYAGER'
  | 'PRISM'
  | 'VECTOR'
  | 'SENTINEL'
  | 'SIGNAL'
  | 'NEXUS'
  | 'FORGE';
