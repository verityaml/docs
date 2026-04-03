# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-03
- **Latest merged PR:** #412 (fix: cast GaxiosError constructor args in test to satisfy strict tsconfig)
- **Merged at:** 2026-04-03T00:00:00Z

## PRs Included in This Sync

All merged PRs up to #412 (2026-04-03). PRs since last sync (#385):

- #386: feat: evidence bridge — criterion-key propagation from scoring criteria to request items
- #390: feat: library evidence auto-classification via embedding similarity
- #396: chore(deps): bump yaml and aws-cdk-lib in /infra
- #397: fix(frontend): import ClassificationStatus for local use in evidence types
- #398: chore: fix 35 Dependabot security alerts
- #399: fix(frontend): clean up linkedEvidence JSONB when connector is deleted
- #401: docs: update architecture, walkthrough, data models, and README for recent specs
- #402: fix(backend): expose peekCount and stepCount metrics from classifyFolderAgent
- #405: fix(backend): parse Lambda timeout + EvidenceStatus export
- #407: fix: parse grantedScope to string[] at write boundary
- #408: fix: write parsed items incrementally to prevent data loss
- #409: fix: add token refresh to GoogleDriveClient for agent classifications
- #410: chore: trim CLAUDE.md from 51.6k to 38.3k chars
- #411: chore: update copilot code review instructions for current architecture
- #412: fix: cast GaxiosError constructor args in test to satisfy strict tsconfig

### Impact

- **roadmap.mdx**: Updated spec count from 33→35, totals from 31→33 complete / 1→2 in progress. Added Evidence Bridge (complete) and Library Evidence Classification (in progress) specs.
- **walkthrough.mdx**: Added library evidence auto-classification description to evidence library section. Added "Evidence bridge" step to the Full Loop.
- **todo.mdx**: Added "Library Evidence Classification — Deferred" section with 4 items.
- **architecture.mdx**: Added `classify-library-evidence` SQS queue + Lambda to all three diagrams. Added `embedding` column on scoringCriteria, `classificationStatus` on evidence, `matchType`/`sourceCriterionId` on evidenceLinks. Added criterion-key bridge relationship.
- **index.mdx**: Updated evidence library card to mention auto-classification.
- **quickstart.mdx**: No changes — no setup/command changes.
