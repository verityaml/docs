# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-02
- **Latest merged PR:** #412 (fix: cast GaxiosError constructor args in test to satisfy strict tsconfig)
- **Merged at:** 2026-04-02

## PRs Included in This Sync

All merged PRs up to #412 (2026-04-02). PRs since last sync (#385):

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
- #410: chore: trim CLAUDE.md
- #411: chore: update copilot code review instructions
- #412: fix: cast GaxiosError constructor args in test to satisfy strict tsconfig

### Impact

- **roadmap.mdx**: Added specs #34 (Evidence Bridge, Complete) and #35 (Library Evidence Classification, In Progress). Updated counts to 32 complete, 2 in progress, 1 removed. Added Evidence Bridge to recently completed section. Added Library Evidence Classification to in-progress section.
- **walkthrough.mdx**: Updated Evidence Library section with auto-classification description (classification status badges, embedding similarity matching). Added "Bridge evidence to examinations" step to the Full Loop.
- **architecture.mdx**: Added classify-library-evidence as 6th SQS queue + Lambda handler to background jobs diagram and application layer diagram. Added scoring criteria embedding column and evidence classificationStatus to data model. Added evidence bridge fields (sourceCriterionId, matchType) to evidenceLinks entity.
- **index.mdx**: Updated Evidence Library card with auto-classification mention. Updated Cross-obligation evidence linking card with evidence bridge description.
- **todo.mdx**: Added "Library evidence classification — deferred" section with 4 deferred items from TODO.md.
- **quickstart.mdx**: No changes — no setup/command changes in these PRs.
