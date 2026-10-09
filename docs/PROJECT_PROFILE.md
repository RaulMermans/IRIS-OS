# Project profile

A one-page maturity statement for the private IRIS system, using the evidence scale below. Updated with each public sync.

**Evidence scale:** 0 Missing · 1 Researched · 2 Canonicalized · 3 Specified · 4 Implemented · 5 Evaluated · 6 Production proven

| | |
| --- | --- |
| **Architecture** | Deterministic control plane with bounded model seams; isolated agent worker; MCP connector boundary; PostgreSQL durable state |
| **Current target maturity** | Controlled-mode personal operating system: every path runs, live external side effects stay disabled deployment-wide |
| **Last synced** | Private state as of October 2026 (Sprint 22F.2) |

## Required capabilities

| Capability | Evidence | Note |
| --- | --- | --- |
| Attention pipeline (collect → filter → dedupe → score → band → synthesize → validate) | 5 | Deterministic scenario suites |
| Executive Policy + P0–P3 prioritized durable queue | 5 | Eval pack labels were written with the policy spec: a regression gate, not independent labels |
| Supervisor routing to existing authorities | 5 | Same caveat |
| Governed actions (propose → authorize → approve → execute → verify → recover) | 5 | Controlled mode only |
| Durable, resumable work with leases | 5 | Two-process PostgreSQL restart tests |
| Agent competence contracts | 5 | Positive and negative evals per role |
| Trace contract and truthful UI projection | 5 | |
| Memory: episodic records | 4 | |
| Memory: semantic (reviewed facts) | 3 | Proposal-only write path exists; executive reader port not wired in production |

## Conditional capabilities

| Capability | Evidence | Note |
| --- | --- | --- |
| Runtime skills (procedural memory) | 4 | One skill production-ready, nine evaluation-only |
| GPA adaptive execution (retry, reassign, replan, escalate) | 5 | L1 deterministic evaluator; L2 seam has no provider wired |
| Shadow Mode runtime evaluation | 5 | 77-case corpus; sparse independent operator labels |
| Human decision surface (Slack transport) | 4 | Controlled transport only; partial |
| Governed learning loop | 4 | Candidates only; no promotion workflow |
| Department / team delegation | 3 | Target kind in the contract; refused at runtime |
| Alternative agent runtime (LangGraph) | 3 | Experimental spike behind a seam; not production |
| Local inference via HALO | 4 | Integration exists; no model runtime verified on target hardware |

## Evidence state

Nothing is at level 6. No live external provider has ever been enabled, hosted CI and a live Slack smoke test have not been run for the latest work, and accuracy figures come from small, partly self-authored labelled sets.

## Known gaps

- "Request changes" can't restart the originating work item yet; the old proposal is rejected and the outcome says so.
- Realized human-gate recall in Shadow is 0/4 observed cases (the policy disposition detects 4/4, but the decision controls were not exercised). This blocks the next sprint.
- No secure artifact links in chat surfaces until IRIS has authenticated browser sessions.
- Planner is deterministic; model-backed planning is a bounded seam with no provider.

## Production limitations

All live external side effects (email, calendar, Slack, GitHub) are blocked by one global policy. Production autonomy additionally requires a live Slack smoke test, hosted deployment evidence and an independently labelled evaluation set.
