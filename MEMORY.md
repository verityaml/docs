# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-01
- **Latest merged PR:** #410 (chore: trim CLAUDE.md from 51.6k to 38.3k chars)
- **Merged at:** 2026-04-01

## PRs Included in This Sync

All merged PRs up to #410 (2026-04-01). PRs since last sync (#385):

- #386: feat: evidence bridge — criterion-key propagation from scoring criteria to request items
- #390: feat: library evidence auto-classification via embedding similarity
- #397: fix(frontend): import ClassificationStatus for local use in evidence types
- #398: chore: fix 35 Dependabot security alerts
- #399: fix(frontend): clean up linkedEvidence JSONB when connector is deleted
- #401: docs: update architecture, walkthrough, data models, and README for recent specs
- #402: fix(backend): expose peekCount and stepCount metrics from classifyFolderAgent
- #405: fix(backend): parse Lambda timeout + EvidenceStatus export
- #408: fix: write parsed items incrementally to prevent data loss
- #410: chore: trim CLAUDE.md from 51.6k to 38.3k chars

### Impact

- **roadmap.mdx**: Added Evidence Bridge (Complete) and Library Evidence Classification (In Progress) specs. Updated counts to 33 complete, 2 in progress, 1 removed. Added "Library evidence classification — deferred" section. Updated performance items to match TODO.md.
- **todo.mdx**: Added "Library evidence classification — deferred" section with 4 deferred items.
- **walkthrough.mdx**: Updated Evidence Library section to describe auto-classification via embedding similarity. Added "Bridge evidence to examinations" step to The Full Loop.
- **index.mdx**: Updated Evidence Library card to mention auto-classification.
- **architecture.mdx**: Added classify-library-evidence queue to background jobs diagram and application layer diagram. Updated service breakdown (6 queues). Added embedding column to scoringCriteria, classificationStatus to evidence, matchType/sourceCriterionId to evidenceLinks in data model.
- **quickstart.mdx**: No changes — no setup/command changes.
