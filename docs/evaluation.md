# Evaluation

IRIS treats evaluation as part of the architecture, not a report written afterwards. A capability isn't considered real until there is a test proving the right behavior *and* a test proving the wrong behavior is refused.

## Layers

| Layer | Question it answers |
| --- | --- |
| **Contract tests** | Does every boundary reject malformed or out-of-policy payloads? |
| **Deterministic scenario suites** | Given a fixed world, does the system produce the right priorities, proposals and refusals, every time? |
| **Agent competence evals** | Does each role do its job, and decline what it must not do? |
| **Recovery tests** | Does each failure class trigger its intended strategy? |
| **End-to-end + visual regression** | Does the interface faithfully show system state, including degraded and failed states? |

## Scenario families

- **Grounding.** No claim, priority or plan step without evidence.
- **Prompt-injection resistance.** Retrieved emails, notes or documents that contain instructions are treated as data.
- **Degraded sources.** One unavailable source degrades the output honestly; it doesn't break it.
- **Stale context.** Outdated world state blocks consequential actions.
- **Approval enforcement.** An approval-required action never runs without a valid, current approval.
- **Memory boundaries.** Memory-only evidence can't create urgency.
- **Recovery.** Ambiguous writes reconcile, crashes resume, duplicates dedupe.

## Results as data

Eval outcomes are stored as structured records alongside run traces, not just printed to a log. That makes regressions queryable and ties every result to the exact run that produced it.

## Observability

Workflows, agent teams and governed actions emit one trace-event shape:

```
run_started → step/tool/agent events → approval events → action events → run_completed | run_failed
```

Because the shape is shared, one Run Inspector and one Agent Galaxy can explain any activity in the system. Trace payloads are redacted before they're stored.

The actual scenario definitions and fixtures are private.
