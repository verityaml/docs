# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-11
- **Latest merged PR:** #450 (chore(deps): bump the npm_and_yarn group across 2 directories with 1 update)
- **Main repo commit:** 15eee8beb6997696343fce2882be7ec9cfc003fd
- **Merged at:** 2026-04-11

## PRs Included in This Sync

PRs since previous checkpoint (#444):

- #448 feat: funnel eval calibration phases 1-4 — silent-degradation fix + tooling — lands the tooling spine for spec #37 (#430). Phase 1 adds shared `backend/src/lib/criteria-embeddings.ts` with `embedCriteria()` (hot path, never throws) and `embedMissingCriteria()` (cold path, batched per KB source table); Voyage chunking pushed into `generateEmbeddings()` (VOYAGE_MAX_BATCH=100). Phase 2 wires `embedCriteria()` into `POST /compliance-programs`, `POST /compliance-programs/[id]/scan`, and seed scripts; adds a lazy heal at `syncConnectorJob` entry that fails loudly on Voyage outage; surfaces "Classification will activate after the next embedding refresh" banners on the dashboard scan button and the create-program wizard (persistent, requires acknowledgement). Phase 3 adds `npm run seed:eval-org` (deterministic `verity-eval` slug-derived IDs, `--check` smoke mode, hash drift delete-and-re-seed), a `docker/backfill-criteria-embeddings.mjs` self-contained script, and a "Backfill criteria embeddings" `aws ecs run-task` step in both staging and production deploy jobs (after migrations, before service update, 5-min timeout). Phase 4 restructures the golden set with `metadata.voyage_model` + per-case `id`/`_calibrated_at`, adds `--calibrate` mode to `eval-connector-classification.ts` (pre-flight `checkEvalOrg`, Stage 2 cache at lowest threshold, offline scoring across `[0.45, 0.50, 0.55, 0.60, 0.65]`, model-drift forces full recalibration, sustained-failure guard ports into the loop, exit 1 on any broken sweep), and emits `calibration-diff.md` + `funnel-sweep-results.md`. Review hardening: human-readable ID generation now enforced via `generateId()` + `pg_advisory_xact_lock` on scan and create-program routes (caught a concurrent-scan lexicographic-max collision past 999 criteria), two new lint-gate rules (`no-inline-sequential-id-generation`, `seed-scripts-use-embedMissingCriteria`), docker backfill timeout + definition_key fallback + PgBouncer detection. Phases 1–4 ship the infrastructure; the operator calibration run + merge-gate review (≥ 80% accuracy / ≤ 10% FDR) is still pending.
- #449 fix: allowlist backfill-criteria-embeddings.mjs in `.dockerignore` — follow-up to #448, the Dockerfile `COPY` added in #448 was breaking the staging Docker build because the `.dockerignore` allowlist wasn't updated. No user-visible impact.
- #450 chore(deps): bump the npm_and_yarn group across 2 directories with 1 update — Dependabot bump of `next` from 16.1.7 to 16.2.3 in both root and `frontend/`. No user-visible impact.

### Impact

- **roadmap.mdx**: Rewrote the "Funnel Eval Calibration (Specified)" in-progress section to reflect that phases 1-4 have landed in PR #448. Enumerates the shared `criteria-embeddings.ts` helper (hot `embedCriteria` + cold `embedMissingCriteria`), the lazy heal at sync entry, the dashboard + create-program degradation banners, the deploy-time ECS `run-task` safety net, the `verity-eval` seed org + `--check` mode + hash-drift re-seed, the combined `--calibrate` mode with Stage 2 caching across thresholds, and the Voyage model-drift check + sustained-failure guard. Preserves the `≥ 80% accuracy / ≤ 10% FDR` merge gate as pending operator work, and notes the two new lint-gate rules. SPECLOG.md still reads "Specified" for spec #37, so the main roadmap table status row was left unchanged.
- **todo.mdx**: Added a new "Funnel eval calibration — deferred" section mirroring TODO.md line 69 — the staging `seed-eval-org --check` smoke job in `deploy.yml` is built and unit-tested but not wired into CI (needs its own ECS run-task wrapper since GHA can't reach private RDS). Deferred until drift becomes recurring.
- No other pages updated. #449 and #450 have no user-visible impact; #448 introduces no new product features (the dashboard/wizard banners are only visible on a Voyage outage or post-create embedding delay, so the walkthrough isn't affected).

### Build verification

- `next build` blocked in sandbox by Google Fonts network access (unrelated — same as previous syncs, blocks `next/font/google` for Fraunces/Inter/JetBrains Mono).
- Both changed MDX files compile cleanly via `@mdx-js/mdx`.
- `tsc --noEmit` passes.

---

## Previous Sync (2026-04-08)

- **Latest merged PR:** #444 (docs: spec for funnel eval calibration (#430))
- **Main repo commit:** c6a5913e5b2cfe897854bc2540269773e2bc6edd
- **Merged at:** 2026-04-08

PRs since previous checkpoint (#438):

- #435 feat: DOCX content extraction + content-processing disclosure (#255) — adds DOCX content extraction to `GoogleDriveClient.getFileContent()` and `extractTextFromBuffer()` via `mammoth`, so `.docx` files now flow through funnel classification with real content instead of falling back to metadata-only. Adds a content-processing disclosure on Google Drive connector setup cards (one-line explainer that file content is processed transiently, never stored, with link to DPA). Adds a public `/legal/dpa` page (Data Processing Addendum template) covering connector content reading, sub-processors (Anthropic, Voyage AI, AWS, Google), retention, and security measures. Also resolves 7 pre-existing `react-hooks/set-state-in-effect` and Playwright lint errors (#437) and renames the `no-failure-sentinel-return` rule to `no-bracketed-sentinel-return` with a wider pattern (#446).
- #447 fix(frontend): replace setInterval polling in examination-detail — replaces `setInterval(pollItems, 2000)` with the recursive `setTimeout` pattern (cancelled flag + cleanup) used in `notification-bell.tsx` to prevent overlapping polls and out-of-order state updates. Frontend internal fix, no doc impact (#446).
- #444 docs: spec for funnel eval calibration (#430) — adds `.claude/specs/funnel-eval-calibration/` (requirements, design, tasks, diagrams) and `docs/plans/2026-04-06-funnel-eval-calibration.md` for spec #37. Recalibrates the connector classification golden set against real Voyage embeddings (currently 12% accuracy vs 100% mocked). Shared `criteria-embeddings.ts` helper wired into all 5 scoring-criteria insert sites, lazy heal at sync entry, ECS `run-task` deploy backfill safety net, dedicated `verity-eval` seed org, combined `--calibrate` mode that caches Stage 2 across thresholds. Merge gate: global ≥ 80% accuracy / ≤ 10% FDR with per-domain breakdown for operator spot-check.

### Impact

- **roadmap.mdx**: Added spec #37 "Funnel Eval Calibration" (Specified) row + a new "Funnel Eval Calibration (Specified)" subsection under "In progress" describing the 5 insert sites + lazy heal + deploy backfill calibration plan. Updated header total from "All 36 feature specs" to "All 37 feature specs". Fixed pre-existing miscount: was "**33 complete**, 3 in progress, 1 removed" (off-by-one); now "**32 complete**, 3 in progress, 1 specified, 1 removed". Also added DOCX → mammoth note to the existing "Classification FDR Tuning" in-progress description.
- **walkthrough.mdx**: Google Drive connector section — added the content-processing disclosure paragraph with DPA link, and rewrote the Stage 1 / extraction sentence to enumerate the new content-extraction routes (Google Docs/Sheets/Slides export, PDF via `unpdf`, **DOCX via `mammoth`**, text/* direct) so Word docs now flow through the funnel with real content.
- **features/evidence.mdx**: Library auto-classification paragraph updated — `classify-library-evidence` Lambda now described as extracting text "via the shared `extractTextFromBuffer()` helper (PDF via `unpdf`, DOCX via `mammoth`, text/* directly)" instead of "(PDF, text/*)".
- No other pages updated — #447 is a frontend internal fix with no user-visible behaviour change.

### Build verification

- Full `next build` blocked in sandbox by Google Fonts network access (unrelated to docs changes).
- All three changed MDX files compile cleanly via `@mdx-js/mdx`.
- `tsc --noEmit` passes.

---

## Previous Sync (2026-04-07)

- **Latest merged PR:** #438 (fix(backend): tighten Stage 2 funnel + plumb sustained-failure guard end-to-end)
- **Main repo commit:** 966239a8e40173f95a9f1ca89393d227bf82bd97

PRs since previous checkpoint (#434):

- #438 fix(backend): tighten Stage 2 funnel + plumb sustained-failure guard end-to-end — refactors `ConfirmMatchResult` to use `outcome` as the sole source of truth (#431), adds a per-sync Stage 2 error+timeout rate guard (50% threshold over a minimum 5-decision sample) that propagates across batch/folder boundaries (#432), and plumbs new `deferredFileList` / `stage2WarningMessage` fields end-to-end so the UI can surface non-fatal degradations.

### Impact (previous sync)

- **walkthrough.mdx**: Scene 14 (Google Drive Connector) — added one paragraph on the sustained-failure guard: 50% error+timeout threshold over 5 decisions, propagates across batches, surfaces `deferredFileList` distinct from `unmatchedFileList`, non-fatal warning on the connector card.
- No other pages updated — #438 is a robustness fix under the existing "Classification FDR Tuning" in-progress spec (#36), which the previous sync (PR #434) already documented.

---

## Earlier Sync (2026-04-06)

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
