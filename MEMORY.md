# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-06
- **Latest merged PR:** #434 (fix(docker): copy nested workspace node_modules into builder)
- **Main repo commit:** 61a3a190156a6b41bf8879df08304f71625a68bc
- **Merged at:** 2026-04-06

## PRs Included in This Sync

PRs since last checkpoint (#385):

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

### Impact

- **roadmap.mdx**: Added specs #34 Evidence Bridge (Complete), #35 Library Evidence Classification (In Progress), #36 Classification FDR Tuning (In Progress). Spec counts updated to 33 complete / 3 in progress / 1 removed. New "Recently completed" entry for Evidence Bridge and "In progress" entries for Classification FDR Tuning and Library Evidence Classification.
- **walkthrough.mdx**: Scene 10 (Evidence Library) now covers library auto-classification (text extract → chunk → embed → match → link). Scene 14 (Google Drive Connector) rewritten for `drive.readonly` default scope, two-stage funnel classification (Stage 1 embedding retrieval, Stage 2 Haiku confirmation, metadata fallback), reconnect banner for legacy connectors. New "Evidence bridge" subsection under cross-obligation linking. New "Bridge criteria to request items" step in the Full Loop.
- **index.mdx**: Added "Evidence bridge" and "Library auto-classification" feature cards.
- **todo.mdx**: New "Library evidence classification — Deferred" section (auto-refresh embeddings, retroactive classification, manual reclassify, reclassification on criteria change). Added "Validate metadata-only classification accuracy" to Google Drive V2 deferred list.
- **architecture.mdx**: Added `classify-library-evidence` Lambda + SQS queue to Application layer and Background job diagrams. Propagate lambda label updated to cover both semantic and criterion-key (evidence bridge) propagation. SYNC now shows funnel classify flow. Service breakdown row updated to include library classification and nightly recompute.
- **features/evidence.mdx**: Replaced "Supabase Storage" reference with AWS S3 via `backend/src/lib/storage.ts`. Library auto-classification pipeline documented. New "Evidence bridge" subsection.
