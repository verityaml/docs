# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-04
- **Latest merged PR:** #417 (chore(tooling): fix flow trace and PR body robustness issues)
- **Merged at:** 2026-04-04T14:10:25Z

## PRs Included in This Sync

All merged PRs up to #417 (2026-04-04). PRs since last sync (#385):

- #390: feat: library evidence auto-classification via embedding similarity (merged 2026-03-31)
- #396: chore(deps): bump yaml and aws-cdk-lib in /infra (merged 2026-04-01)
- #397: fix(frontend): import ClassificationStatus for local use in evidence types (merged 2026-04-01)
- #398: chore: fix 35 Dependabot security alerts (merged 2026-04-01)
- #399: fix(frontend): clean up linkedEvidence JSONB when connector is deleted (merged 2026-04-01)
- #401: docs: update architecture, walkthrough, data models, and README for recent specs (merged 2026-04-02)
- #402: fix(backend): expose peekCount and stepCount metrics from classifyFolderAgent (merged 2026-04-02)
- #405: fix(backend): parse Lambda timeout + EvidenceStatus export (merged 2026-04-02)
- #407: fix: parse grantedScope to string[] at write boundary (merged 2026-04-02)
- #408: fix: write parsed items incrementally to prevent data loss (merged 2026-04-03)
- #409: fix: add token refresh to GoogleDriveClient for agent classifications (merged 2026-04-03)
- #410: chore: trim CLAUDE.md from 51.6k to 38.3k chars (merged 2026-04-03)
- #411: chore: update copilot code review instructions (merged 2026-04-03)
- #412: fix: cast GaxiosError constructor args in test (merged 2026-04-03)
- #413: fix(infra): bump classify-library-evidence Lambda memory to 1024MB (merged 2026-04-04)
- #416: chore(tooling): add flow trace, /flow skill, and PR description sync (merged 2026-04-04)
- #417: chore(tooling): fix flow trace and PR body robustness issues (merged 2026-04-04)

### Impact

- **roadmap.mdx**: Added specs #34 (Evidence Bridge) and #35 (Library Evidence Classification) to spec table. Updated counts from "31 complete, 1 in progress" to "33 complete, 2 in progress". Added Evidence Bridge to "Recently completed" section and Library Evidence Classification to "In progress" section.
- **todo.mdx**: Added "Library Evidence Classification — Deferred" section with 4 deferred items from source TODO.md.
- **architecture.mdx**: Added `classify-library-evidence` SQS queue and Lambda handler to background jobs diagram and application layer diagram. Updated service breakdown to mention library classification.
- **walkthrough.mdx**: Updated Evidence Library section to describe auto-classification via embedding similarity. Added "Bridge evidence to request items" step to The Full Loop.
- **index.mdx**: Updated evidence library card to mention auto-classification.
- **quickstart.mdx**: No changes — no setup/command changes.
