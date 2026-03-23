# Docs Sync Memory

Checkpoint for `/sync-from-app` runs. Used to determine which PRs are new since the last sync.

## Last Sync

- **Date:** 2026-03-22
- **Latest merged PR:** #309 (chore(tooling): extract shared PR body template for consistent PRs)
- **Merged at:** 2026-03-21T21:21:04Z

## PRs Included in This Sync

All merged PRs up to #309 (2026-03-21). Key PRs that affected docs:

- #304: refactor: rename examinations table to obligations (#213)
- #305: fix: post-merge fixes for PR #304
- #273: refactor: rename evidence_attachments table to evidence (#214)
- #267: perf: add missing database indexes for session, invitation, audit_log (#220)
- #270: perf: add GIN index on linked_evidence JSONB for evidence library queries (#221)
- #271: test: add evidence library unit tests and extract shared upload component (#219)
- #262: feat: score notifications — Phase 1-2 foundation (config, schema, engine)
- #285: feat: connector framework phases 4-6 — Drive client, provider, OAuth routes (#236)
- #269: refactor: replace evidence_source_invariants CHECK with trigger function (#256)
- #299: fix: align DB timestamp columns to timestamptz (#278)
