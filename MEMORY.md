# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-05
- **Latest merged PR:** #428 (fix(backend): add missing orgId arg to classifyFileBatch call sites)
- **Merged at:** 2026-04-05

## PRs Included in This Sync

All merged PRs up to #428 (2026-04-05). PRs since last sync (#385):

- #386: feat: evidence bridge — criterion-key propagation from scoring criteria to request items
- #390: feat: library evidence auto-classification via embedding similarity
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
- #412: fix: cast GaxiosError constructor args in test
- #413: fix(infra): bump classify-library-evidence Lambda memory to 1024MB
- #416: chore(tooling): add flow trace, /flow skill, and PR description sync
- #417: chore(tooling): fix flow trace and PR body robustness issues
- #418: feat(backend): two-stage funnel classification for connector sync (#379)
- #425: docs: add planning docs for classification, upload, and domain migration
- #428: fix(backend): add missing orgId arg to classifyFileBatch call sites

### Impact

- **roadmap.mdx**: Added 3 new specs (#34 Evidence Bridge complete, #35 Library Evidence Classification in progress, #36 Classification FDR Tuning in progress). Updated counts from 31→32 complete, 1→3 in progress. Added Evidence Bridge to recently completed, new in-progress sections. Added FDR validation to V2 deferred.
- **todo.mdx**: Added "Library Evidence Classification — Deferred" section with 4 items. Added FDR validation to Google Drive V2 deferred.
- **walkthrough.mdx**: Updated evidence library section with auto-classification description (embedding similarity, classification badges). Added "Bridge evidence to examinations" step to the full loop.
- **architecture.mdx**: Added classify-library-evidence SQS queue + Lambda to application layer, background jobs, and service breakdown diagrams. Added scoring_criteria.embedding, evidence.classificationStatus, and evidenceLinks.matchType/sourceCriterionId to ER diagram. Updated queue count from 5→6.
- **index.mdx**: Updated evidence library card with auto-classification mention. Updated cross-obligation linking card with evidence bridge.
- **quickstart.mdx**: No changes — no setup/command changes.
