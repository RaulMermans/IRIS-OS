/**
 * Illustrative public contract — observable agent state.
 * This is what the Agent Galaxy renders. Not the production schema.
 */
import type { AgentId, Id, Timestamp } from './common';

export type AgentRole =
  | 'manager'
  | 'research'
  | 'analyst'
  | 'action_planner'
  | 'critic'
  | 'lead_scorer'
  | 'crm_manager'
  | 'code_specialist';

export type AgentActivity =
  | 'idle'
  | 'thinking'
  | 'working'
  | 'reviewing'
  | 'waiting_for_approval'
  | 'blocked'
  | 'failed'
  | 'done';

export type CompetenceMaturity =
  | 'contracted'
  | 'tool_connected'
  | 'eval_proven'
  | 'action_ready';

export interface AgentIdentity {
  id: AgentId;
  role: AgentRole;
  maturity: CompetenceMaturity[];
  /** Agents only ever propose; this flags whether proposals may reach the action pipeline. */
  mayProposeActions: boolean;
}

export interface AgentState {
  agent: AgentIdentity;
  activity: AgentActivity;
  /** Short, human-readable current objective, e.g. "Review the research". */
  currentObjective?: string;
  runId?: Id;
  since: Timestamp;
}

/** A visible hand-off between agents (a line in the Agent Galaxy). */
export interface CollaborationLink {
  from: AgentId;
  to: AgentId;
  purpose: 'delegate' | 'return_result' | 'request_review' | 'review_verdict';
  runId: Id;
  at: Timestamp;
}

/** The whole system's presence, as projected to the interface. */
export interface SystemPresence {
  core: 'idle' | 'thinking' | 'working' | 'attention_needed' | 'degraded';
  agents: AgentState[];
  activeLinks: CollaborationLink[];
  pendingApprovals: number;
  watchedConditions: number;
}
