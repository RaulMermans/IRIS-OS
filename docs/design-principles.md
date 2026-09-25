# Design principles

1. **Attention before action.** The first product is a good decision about what matters. Actions follow from that.
2. **Deterministic substrate first.** Schemas, permissions, traces and recovery come before autonomy. Model reasoning operates inside that substrate, never around it.
3. **Evidence or it didn't happen.** Priorities, claims and plans must point at real source records.
4. **Propose, don't self-authorize.** Agents propose; a deterministic policy and, where needed, a human decide.
5. **Autonomy is declared, not inferred.** An action's autonomy level is fixed when it is registered and can't be argued up at runtime.
6. **Verify, don't assume.** Execution success and verified outcome are separate facts.
7. **Fail closed.** Unknown, stale, ambiguous or over-budget means stop and surface it.
8. **One authority per concern.** One router, one attention engine, one action pipeline, one trace contract. Competing second paths are defects.
9. **Truthful status.** Components state what they can't do (`degraded`, `unavailable`, limitations) instead of hiding it.
10. **Data is not instructions.** Anything retrieved from the outside world is untrusted input.
11. **Memory is curated.** Long-term knowledge is proposed and reviewed, never written as a side effect.
12. **Observable by design.** If the system does something, a person can see what, when, why and on whose authority. The interface shows real state, not decoration.
13. **Earn each capability.** A capability moves from contracted to proven to action-ready only with evidence.
14. **Privacy by construction.** Raw personal content doesn't cross boundaries it doesn't need to cross.
