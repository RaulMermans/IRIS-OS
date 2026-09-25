# Security

## Scope of this repository

This is a documentation and contracts showcase. It contains no runnable service, no credentials, no infrastructure configuration and no personal data. The examples are entirely synthetic, and the screenshots were rendered from synthetic fixtures.

## Security posture of the system it describes

- **Least privilege by default.** Tools declare permission classes. Agents run in an isolated process with no database connection and no external-system SDKs.
- **Propose, then authorize.** Consequential actions go through a deterministic policy and, where required, human approval that expires and is bound to a single run.
- **Fail closed.** Unknown action types, stale context and ambiguous states stop execution.
- **Untrusted input.** Retrieved content (email, documents, memory) is treated as data, never as instructions, and this is regression-tested against prompt injection.
- **Credential hygiene.** Connector credentials are encrypted at rest, kept server-side, and never exposed to agents or the UI.
- **Redaction.** Trace payloads are redacted before they are stored. Raw personal content doesn't cross boundaries it doesn't need.
- **Kill switch.** Live external side effects can be disabled deployment-wide by a single policy.

## Reporting

If you believe something in this repository exposes sensitive information, please open a private security advisory on this repository or contact the owner through GitHub. Please don't file a public issue.
