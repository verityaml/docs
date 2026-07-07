# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-07-07
- **Latest merged PR:** #513 (chore(claude): sync calsuite skills to 4837536 (v2.40))
- **Main repo commit:** d3bf25ea2c04df90236b0882728e2c98ad1b9673
- **Merged at:** 2026-06-07

No new merged PRs since previous checkpoint (#513). Verity `main` has not moved — HEAD is still `d3bf25ea`.

### Impact

- No docs pages updated. No source-of-truth files (CHANGELOG.md, TODO.md, SPECLOG.md, WALKTHROUGH.md, README.md) were modified. All docs pages remain current.

### Build verification

- No MDX files changed — build verification not required.

---

## Previous Sync (2026-06-19)

- **Date:** 2026-06-19
- **Latest merged PR:** #513 (chore(claude): sync calsuite skills to 4837536 (v2.40))
- **Main repo commit:** d3bf25ea2c04df90236b0882728e2c98ad1b9673
- **Merged at:** 2026-06-07

PRs since previous checkpoint (#509):

- #510 feat(compliance): per-domain readiness threshold slider UI — Admin-only threshold slider on domain detail page. Null state shows "No target set" + "Set target" CTA initializing to 80% (spec default). Optimistic UI with 400ms debounced PATCH, AbortController for out-of-order prevention, fire-on-blur flush. Domain progress bar adopts threshold-relative semantics — fills to 100% at threshold, 3-band score color (forest/clay/red-600), amber ▲ glyph when below target — mirrored on dashboard domain cards. New Slider UI primitive (styled native range input, no Radix). Closes #455.
- #513 chore(claude): sync calsuite skills to 4837536 (v2.40) — Internal tooling only.

### Impact

- **walkthrough.mdx**: Added "Readiness threshold slider" subsection under "Domain detail: criteria and evidence" describing the admin-only slider, null state, 80% default, optimistic save, and threshold-relative progress bar with 3-band color and amber ▲ glyph.
- **features/scoring.mdx**: Enriched "Per-domain configurable thresholds" section with implementation details now that the UI is shipped — null state, 80% default, optimistic debounced PATCH, progress bar fills relative to threshold with 3-band color and amber ▲, mirrored on dashboard cards.
- **features/dashboard.mdx**: Updated domain cards description to describe threshold-relative progress bar behavior (fills to 100% at threshold, 3-band color, amber ▲, link to detail page slider).
- **developers/roadmap.mdx**: Updated "Scoring Refactor (Complete)" description to mention the threshold slider UI and progress bar semantics.

### Build verification

- `next build` passed — all 33 pages generated successfully.

---

## Previous Sync (2026-06-03)

- **Date:** 2026-06-03
- **Latest merged PR:** #509 (chore(claude): sync calsuite skills to dfaf5b4)
- **Main repo commit:** 3b10959f9161d2d9d834d7da1bb001c0287b3f8b
- **Merged at:** 2026-06-02

PRs since previous checkpoint (#495):

- #453 feat: scoring engine v2 — novelty-weighted additive model + trends page — **Major.**
- #465 chore(deps): bump rustls-webpki — Dependabot. No user-visible impact.
- #498 chore(deps): bump the npm_and_yarn group — Dependabot. No user-visible impact.
- #502 chore(claude): sync calsuite skills to 2.32 — Internal tooling only.
- #503 fix(claude): drop duplicate _origin in improve-prompt — Internal tooling only.
- #504 feat(trends): render historical v1 score snapshots as dashed series.
- #509 chore(claude): sync calsuite skills to dfaf5b4 — Internal tooling only.

### Impact

Major docs update across 11 pages for scoring engine v2 and v1 historical series.

### Build verification

- Pending — build will be run before committing.

---

## Previous Sync (2026-05-10)

- **Date:** 2026-05-05
- **Latest merged PR:** #495 (docs: add markdown copies of agent session transcripts)
- **Main repo commit:** aa0a2c32f4efa92062515a2946425cf9fc60df5e
- **Merged at:** 2026-05-05

PRs since previous checkpoint (#468):

- #470 chore(claude): reconcile calsuite skills + sync v2.23 — reconciles calsuite skill versions to v2.23. Internal Claude Code tooling only, no user-visible impact.
- #471 chore: add /humanize skill from calsuite — adds the `/humanize` skill for prose auditing. Internal tooling only.
- #472 chore: refresh _origin markers from calsuite@73b2e03 — refreshes `_origin` markers in skill files. Internal tooling only.
- #495 docs: add markdown copies of agent session transcripts — adds raw session transcript markdown files under `.claude/` for classification-fdr-tuning, gsuite-connector, score-notifications, and other specs. Internal developer documentation only, no user-visible impact.

### Impact

- No docs pages updated. All 4 PRs are purely internal Claude Code developer tooling changes — skill reconciliation, humanize skill addition, origin marker refresh, and session transcript archival. No source-of-truth files (CHANGELOG.md, TODO.md, SPECLOG.md, WALKTHROUGH.md, README.md) were modified. `git diff` of those 5 files between the previous checkpoint and current `origin/main` is empty. All docs pages (roadmap, architecture, quickstart, index, walkthrough, todo) remain current.

### Build verification

- No MDX files changed — build verification not required.

---

## Previous Sync (2026-04-28)

- **Date:** 2026-04-28
- **Latest merged PR:** #468 (chore(claude): bump calsuite skill fingerprints, drop workspace harness duplicates)
- **Main repo commit:** aa3e4d462343af42c1fd89e6e0ee6c5beaf54115
- **Merged at:** 2026-04-27

No new merged PRs since previous checkpoint (#468). Verity `main` has not moved.

### Impact

- No docs pages updated. Full diff of all 5 source-of-truth files confirmed no drift. All pages are current.

### Build verification

- No MDX files changed — build verification not required.

---

## Previous Sync (2026-04-27)

- **Date:** 2026-04-27
- **Latest merged PR:** #468 (chore(claude): bump calsuite skill fingerprints, drop workspace harness duplicates)
- **Main repo commit:** aa3e4d462343af42c1fd89e6e0ee6c5beaf54115
- **Merged at:** 2026-04-27

PRs since previous checkpoint (#461):

- #463 chore(claude): reconcile calsuite skills, drop workspace harness duplicates — reconciles calsuite skill versions and removes duplicated workspace `.claude/` harness files. Internal Claude Code tooling only, no user-visible impact.
- #464 chore(claude): delete workspace .claude/ harness duplicates — follow-up cleanup of workspace harness duplicate files. Internal tooling only.
- #468 chore(claude): bump calsuite skill fingerprints, drop workspace harness duplicates — bumps skill fingerprints and final workspace harness cleanup. Internal tooling only.

### Impact

- No docs pages updated. All 3 PRs are purely internal Claude Code developer tooling changes — skill fingerprint bumps, workspace `.claude/` harness deduplication, and settings reconciliation. No source-of-truth files (CHANGELOG.md, TODO.md, SPECLOG.md, WALKTHROUGH.md, README.md) were modified. `git diff` of those 5 files between the previous checkpoint and current `origin/main` is empty. All 6 docs pages (roadmap, architecture, quickstart, index, walkthrough, todo) remain current.

### Build verification

- No MDX files changed — build verification not required.

---

## Previous Sync (2026-04-21)

- **Date:** 2026-04-21
- **Latest merged PR:** #461 (chore(claude): add calsuite skills, configs, and ESLint baseline)
- **Main repo commit:** f2ac5334f7d48268ba8b9f46459a0187f7915017
- **Merged at:** 2026-04-19

No new merged PRs since previous checkpoint (#461). Verity `main` had not moved.

### Impact

- No docs pages updated. Full diff of all 5 source-of-truth files confirmed no drift. All pages were current.

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
