# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-07
- **Latest merged PR:** #438 (fix(backend): tighten Stage 2 funnel + plumb sustained-failure guard end-to-end)
- **Main repo commit:** 966239a8e40173f95a9f1ca89393d227bf82bd97
- **Merged at:** 2026-04-07

## PRs Included in This Sync

PRs since previous checkpoint (#434):

- #438 fix(backend): tighten Stage 2 funnel + plumb sustained-failure guard end-to-end — refactors `ConfirmMatchResult` to use `outcome` as the sole source of truth (#431), adds a per-sync Stage 2 error+timeout rate guard (50% threshold over a minimum 5-decision sample) that propagates across batch/folder boundaries (#432), and plumbs new `deferredFileList` / `stage2WarningMessage` fields end-to-end so the UI can surface non-fatal degradations.

### Impact

- **walkthrough.mdx**: Scene 14 (Google Drive Connector) — added one paragraph on the sustained-failure guard: 50% error+timeout threshold over 5 decisions, propagates across batches, surfaces `deferredFileList` distinct from `unmatchedFileList`, non-fatal warning on the connector card.
- No other pages updated — #438 is a robustness fix under the existing "Classification FDR Tuning" in-progress spec (#36), which the previous sync (PR #434) already documented.

---

## Previous Sync (2026-04-06)

- **Latest merged PR:** #434 (fix(docker): copy nested workspace node_modules into builder)
- **Main repo commit:** 61a3a190156a6b41bf8879df08304f71625a68bc

PRs since checkpoint #385 (pre-2026-04-06 sync):

- #386 feat: evidence bridge — criterion-key propagation from scoring criteria to request items
- #390 feat: library evidence auto-classification via embedding similarity
- #396 chore(deps): bump yaml and aws-cdk-lib in /infra
- #397 fix(frontend): import ClassificationStatus for local use in evidence types
- #398 chore: fix 35 Dependabot security alerts
- #399 fix(frontend): clean up linkedEvidence JSONB when connector is deleted
- #401 docs: update architecture, walkthrough, data models, and README for recent specs
- #402 fix(backend): expose peekCount and stepCount metrics from classifyFolderAgent
- #405 fix(backend): parse Lambda timeout + EvidenceStatus export
- #407 fix: parse grantedScope to string[] at write boundary
- #408 fix: write parsed items incrementally to prevent data loss
- #409 fix: add token refresh to GoogleDriveClient for agent classifications
- #410 chore: trim CLAUDE.md
- #411 chore: update copilot code review instructions for current architecture
- #412 fix: cast GaxiosError constructor args in test to satisfy strict tsconfig
- #413 fix(infra): bump classify-library-evidence Lambda memory to 1024MB
- #416 chore(tooling): add flow trace, /flow skill, and PR description sync
- #417 chore(tooling): fix flow trace and PR body robustness issues
- #418 feat(backend): two-stage funnel classification for connector sync (#379)
- #425 docs: add planning docs for classification, upload, and domain migration
- #426 fix: connector sync robustness — 403 retry, error handling, dispatch alerting
- #427 chore(backend): clean up stale single-shot refs, unused params, and dead SyncResults fields
- #428 fix(backend): add missing orgId arg to classifyFileBatch call sites
- #433 fix(frontend): unify drizzle-orm versions and fix test type errors
- #434 fix(docker): copy nested workspace node_modules into builder

### Impact (previous sync)

- **roadmap.mdx**: Added specs #34 Evidence Bridge (Complete), #35 Library Evidence Classification (In Progress), #36 Classification FDR Tuning (In Progress). Spec counts updated to 33 complete / 3 in progress / 1 removed.
- **walkthrough.mdx**: Scene 10 now covers library auto-classification. Scene 14 rewritten for `drive.readonly` default and two-stage funnel classification. New "Evidence bridge" subsection and Full Loop step.
- **index.mdx**: Added "Evidence bridge" and "Library auto-classification" feature cards.
- **todo.mdx**: New "Library evidence classification — Deferred" section. Added metadata-threshold validation item to Google Drive V2 deferred list.
- **architecture.mdx**: Added `classify-library-evidence` Lambda + SQS queue to both internal application and background job flow diagrams. Propagate lambda relabeled to cover the evidence bridge path. SYNC lambda shows funnel classify flow.
- **features/evidence.mdx**: Replaced Supabase Storage reference with S3 via `storage.ts`. Documented library classification pipeline and evidence bridge.
