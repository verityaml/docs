# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-04-07
- **Latest merged PR:** #428 (fix(backend): add missing orgId arg to classifyFileBatch call sites)
- **Merged at:** 2026-04-05

## PRs Included in This Sync

PRs since last sync (#417):

- #418: feat(backend): two-stage funnel classification for connector sync (#379) (merged 2026-04-05)
- #425: docs: add planning docs for classification, upload, and domain migration (merged 2026-04-05)
- #428: fix(backend): add missing orgId arg to classifyFileBatch call sites (merged 2026-04-05)

### Impact

- **roadmap.mdx**: Added spec #36 (Classification FDR Tuning, In Progress) to the table. Updated total to 36 specs (33 complete, 3 in progress, 1 removed). Added "Classification FDR Tuning" description to the In progress section covering the two-stage funnel (embedding retrieval + LLM binary confirmation), `embedAndMatch()` helper, `drive.readonly` scope upgrade, and reconnect banner.
- **todo.mdx**: No changes — TODO.md source has no new items since #417.
- **walkthrough.mdx**: No changes — source WALKTHROUGH.md unchanged; Google Drive scope still documented as `drive.metadata.readonly` in source.
- **index.mdx**: No changes — no new user-facing feature cards needed.
- **architecture.mdx**: No changes — no new diagram elements; classify-library-evidence Lambda already documented.
- **quickstart.mdx**: No changes — no setup/command changes.

### Notes

- **#418** implements spec #36 (Classification FDR Tuning) — two-stage funnel classification replacing single-shot metadata-only. Includes shared `embedAndMatch()` helper used by both connector funnel and library classification, default `drive.readonly` OAuth scope, reconnect banner for connectors missing the scope, and a CI eval workflow. Source SPECLOG.md entry dated 2026-04-04.
- **#425** adds internal planning docs for classification, upload, and domain migration under `docs/plans/` — no user-facing docs changes.
- **#428** fixes missing `orgId` arg in `classifyFileBatch` call sites — internal bug fix, no doc-visible changes.
