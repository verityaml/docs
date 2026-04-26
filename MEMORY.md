# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-26
- **Latest merged PR:** #464 (chore(claude): delete workspace .claude/ harness duplicates)
- **Main repo commit:** 5e047c890ac23a535e453ad9543e3b59ff200c0e
- **Merged at:** 2026-04-23

## PRs Included in This Sync

PRs since previous checkpoint (#461):

- #463 chore(claude): reconcile calsuite skills, drop workspace harness duplicates — adopts calsuite skill rewrites (/ship, /execute, /review, /babysit-pr, /retro, /skill-builder, /receiving-pr-feedback), adds /customise skill, drops /reconcile-targets, removes workspace-level harness duplicates (backend/.claude and frontend/.claude no longer carry their own skills/agents/config — only root .claude/ is the harness). Internal Claude Code tooling only, no user-visible impact.
- #464 chore(claude): delete workspace .claude/ harness duplicates — removes orphaned pre-refactor artifacts from backend/.claude/scripts/ and frontend/.claude/scripts/ (hook scripts, lib utilities, settings.json) that were never being read. Internal tooling cleanup only, no user-visible impact.

### Impact

- No docs pages updated. Both PRs are purely internal Claude Code harness/skills cleanup. No user-facing features, API routes, database schema, or application behaviour changed. Full diff of all 5 source-of-truth files (CHANGELOG.md, TODO.md, SPECLOG.md, WALKTHROUGH.md, README.md) between checkpoint f2ac533 and current main 5e047c8 confirmed zero changes. All 6 docs pages (roadmap, architecture, quickstart, index, walkthrough, todo) remain current with no drift.

### Build verification

- No MDX files changed — build verification not required.

---

## Previous Sync (2026-04-21)

- **Date:** 2026-04-21
- **Latest merged PR:** #461 (chore(claude): add calsuite skills, configs, and ESLint baseline)
- **Main repo commit:** f2ac5334f7d48268ba8b9f46459a0187f7915017
- **Merged at:** 2026-04-19

PRs since previous checkpoint (#452):

- #460 chore(skills): adopt calsuite retro/review improvements — adopts retro v1.1.0 (author-scoped git queries, skill usage telemetry, learning loop) and review v3.2.0 (hardened --converse CLI allowlist, run_adversary helper, Greptile bot comment triage). Internal Claude Code tooling only, no user-visible impact.
- #461 chore(claude): add calsuite skills, configs, and ESLint baseline — vendors portable calsuite additions: guardian/learn skills, guardian-rules.json, suggest-compact.cjs, root .eslintrc.json, .gitignore patterns for per-developer symlinks. Renames hook .js → .cjs for CommonJS correctness. Converts hardcoded user paths to $CLAUDE_PROJECT_DIR. Removes redundant workspace .claude/ duplicates. Adds README "calsuite setup (per-developer)" subsection. Internal tooling only, no user-visible impact.

### Impact

- No docs pages updated. Both PRs are purely internal Claude Code developer tooling changes — skill definitions, ESLint configs, hook script renames, gitignore patterns, and README calsuite setup instructions. No user-facing features, API routes, database schema, or application behaviour changed. The only source-of-truth file modified was README.md (calsuite setup subsection under "Claude Code Tooling"), which is not mirrored in any docs page. Roadmap, architecture, quickstart, index, walkthrough, and todo pages are all current.

### Build verification

- No MDX files changed — build verification not required.

---

## Previous Sync (2026-04-13)

- **Date:** 2026-04-13
- **Latest merged PR:** #452 (chore: add layman skill and auto permissions)
- **Main repo commit:** 98230dd46b2ea0824a3b02896b472ed01f4ffc0c
- **Merged at:** 2026-04-12

PRs since previous checkpoint (#450):

- #451 feat: calibrate RETRIEVAL_THRESHOLD to 0.50 + docs (phases 5-6) — completes all 6 phases of the funnel eval calibration spec (#37, closes #430). Ran `--calibrate` 5 times against the staging `verity-eval` org with `voyage-law-2` embeddings; best stable results at threshold 0.50: ~87% accuracy, ~5% FDR — passes the ≥ 80% accuracy / ≤ 10% FDR merge gate. Lowered `RETRIEVAL_THRESHOLD` from 0.55 to 0.50 in `embedding-classification-config.ts`. Enriched 10 golden set cases' `contentPreview` fields from ~200 to ~800–1200 chars to match production `getFileContent()` output, accepted 13 valid "added" matches, removed 5 unrealistic expectations, reclassified 3 criteria-ambiguity cases. Final golden set: 41 cases, 49 expected matches. Fixed `seed-eval-org.ts` Date serialization (ISO string + `::timestamptz` for postgres.js). Updated CHANGELOG, root CLAUDE.md, backend/CLAUDE.md, and spec tasks.md. Emitted `funnel-sweep-results.md` and `calibration-diff.md` artifacts.
- #452 chore: add layman skill and auto permissions — adds the `/layman` skill for plain-language code change summaries and enables auto permission mode in Claude Code settings. Also adds a `/simplify` step to the `/execute` skill workflow. Internal tooling only, no user-visible impact.

### Impact

- **roadmap.mdx**: Rewrote the "Funnel Eval Calibration (Specified)" in-progress section to reflect that all 6 phases are complete (PR #448 phases 1–4 tooling, PR #451 phases 5–6 calibration + docs). Now documents the calibration result (`RETRIEVAL_THRESHOLD` 0.50, ~87% accuracy, ~5% FDR), golden set enrichments (contentPreview expansion, 13 added, 5 removed, 3 reclassified), and condenses the tooling summary. SPECLOG.md still reads "Specified" for spec #37 so the status row is unchanged.
- No other pages updated. #451 is a config/eval change with no user-visible behavior change (threshold tuning is internal to connector classification). #452 is purely internal Claude Code tooling. Walkthrough, index, todo, and architecture pages are unaffected.

### Build verification

- `next build` blocked in sandbox by Google Fonts network access (unrelated — same as previous syncs).
- Changed MDX file (`roadmap.mdx`) compiles cleanly via `@mdx-js/mdx`.
- Pre-existing tsc errors (missing `@types/node`, unrelated to docs changes).

---

## Previous Sync (2026-04-11)

- **Date:** 2026-04-11
- **Latest merged PR:** #450 (chore(deps): bump the npm_and_yarn group across 2 directories with 1 update)
- **Main repo commit:** 15eee8beb6997696343fce2882be7ec9cfc003fd
- **Merged at:** 2026-04-11

PRs since previous checkpoint (#444):

- #448 feat: funnel eval calibration phases 1-4 — silent-degradation fix + tooling — lands the tooling spine for spec #37 (#430). Phase 1 adds shared `criteria-embeddings.ts`, Phase 2 wires into all 5 hot paths, Phase 3 adds eval-org infrastructure, Phase 4 adds `--calibrate` mode. Operator calibration run was still pending.
- #449 fix: allowlist backfill-criteria-embeddings.mjs in `.dockerignore` — follow-up to #448. No user-visible impact.
- #450 chore(deps): bump the npm_and_yarn group across 2 directories with 1 update — Dependabot bump. No user-visible impact.

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
