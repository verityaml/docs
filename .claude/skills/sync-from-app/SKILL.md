# Sync docs from main Verity app

Synchronise the documentation site with the latest state of the main Verity application repository.

## Trigger

Use when the user says `/sync-from-app`, "sync the docs", "update docs from app", or similar.

## Inputs

- **Main repo path**: `/Users/callumke/Projects/verity` (local clone of `https://github.com/verityaml/verity`)
- **Docs repo path**: `/Users/callumke/Projects/verity-docs`

## Process

### Phase 1 — Read source-of-truth files from the main repo

Read these files from the main Verity repo and hold their contents in context:

1. `CHANGELOG.md` — release notes and unreleased changes
2. `SPECLOG.md` — spec implementation status (20 specs with completion dates)
3. `TODO.md` — active build items, planned post-partnership work, infrastructure
4. `SPEC.md` — product specification (capabilities, data model)
5. `README.md` — project overview, setup, commands
6. `CLAUDE.md` — conventions, architecture decisions, gotchas
7. `WALKTHROUGH.md` — feature walkthrough script

Also check for recent git changes:
```bash
cd /Users/callumke/Projects/verity && git log --oneline -20
```

### Phase 2 — Diff against current docs

Compare the source-of-truth files against the corresponding docs pages. Identify:

- **New features** in CHANGELOG `[Unreleased]` that aren't documented in feature pages
- **Changed architecture** or conventions that conflict with developer docs
- **New or changed API endpoints** that need API reference updates
- **TODO.md changes** that need the build tracker page updated
- **SPECLOG status changes** that affect the roadmap page
- **New commands or setup steps** that affect the quickstart

### Phase 3 — Update docs pages

Apply changes to the docs content files. The mapping is:

| Source file | Docs pages affected |
|-------------|-------------------|
| `CHANGELOG.md` | Feature pages in `content/features/*.mdx`, `content/index.mdx`, `content/walkthrough.mdx` |
| `TODO.md` | `content/developers/todo.mdx` (build tracker page) |
| `SPECLOG.md` | `content/developers/roadmap.mdx` |
| `SPEC.md` | `content/index.mdx`, feature pages |
| `README.md` | `content/developers/quickstart.mdx` |
| `CLAUDE.md` | `content/developers/conventions.mdx`, `content/developers/architecture.mdx`, `content/developers/claude-code.mdx` |

When updating pages:
- Preserve the existing MDX component style (use `<Note>`, `<Tip>`, `<Warning>`, `<Steps>`, `<Step>`, `<Card>`, `<CardGroup>`, `<CodeGroup>`, `<ParamField>`, `<ResponseField>`)
- Keep the warm, concise tone — active voice, second person ("you"), one idea per sentence
- Use sentence case for headings
- Bold for UI elements, code formatting for file names/commands/paths

### Phase 4 — Screenshot refresh (sub-agents)

Dispatch parallel sub-agents to capture fresh screenshots of the running app. This requires the Verity dev server to be running at `http://localhost:3000`.

**Before launching screenshot agents**, check if the server is up:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

If the server is NOT running, skip this phase and tell the user:
> "Screenshots skipped — start the Verity dev server (`cd /Users/callumke/Projects/verity && npm run dev`) and re-run `/sync-from-app` to capture fresh screenshots."

If the server IS running, launch parallel sub-agents using the Agent tool. Each agent should:

1. Use Bash to run a Playwright script that navigates to a specific page and takes a full-page screenshot
2. Save the screenshot to `/Users/callumke/Projects/verity-docs/public/images/`
3. Overwrite the existing screenshot file (same filename)

The Playwright screenshot script pattern:

```bash
cd /Users/callumke/Projects/verity && npx playwright test --project=chromium -g "screenshot" 2>/dev/null || \
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: 'frontend/e2e/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000{ROUTE}');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: '/Users/callumke/Projects/verity-docs/public/images/{FILENAME}',
    fullPage: false
  });
  // For scroll variants, scroll down and capture again
  await browser.close();
})();
"
```

**Screenshot routes and filenames:**

| Route | Filename | Description |
|-------|----------|-------------|
| `/` | `home-top.png` | Dashboard top view |
| `/` (scrolled 600px) | `home-scroll-1.png` | Dashboard domain cards |
| `/` (scrolled 1200px) | `home-scroll-2.png` | Snapshots and quick links |
| `/compliance/[programId]/[domainId]` | `evidence-internal-controls-top.png` | Domain detail with criteria table |
| `/compliance/[programId]/[domainId]` (scrolled) | `evidence-internal-controls-scroll-1.png` | More criteria rows |
| `/evidence` | `evidence-library.png` | Evidence library page |
| `/compliance/library` | `library-top.png` | Regulatory reference library |
| `/examinations/[id]` | `response-package-top.png` | Examination detail view |
| Archive section in sidebar | `archive-top.png` | Response archive |

**Discovery**: The agent must first visit `/` to extract dynamic IDs (program IDs, domain IDs, examination IDs) from page links before navigating to detail pages.

**Important**: If the E2E auth state file (`frontend/e2e/.auth/user.json`) doesn't exist, the agent should run the global setup first:
```bash
cd /Users/callumke/Projects/verity/frontend && npx playwright test --global-setup=e2e/global-setup.ts
```

If screenshot capture fails for any page (e.g., no seeded data, auth expired), log the failure but continue with other pages. Report all failures at the end.

### Phase 5 — Summary

After all updates, output a summary:

```
## Docs sync complete

### Pages updated
- [list of modified MDX files with brief description of changes]

### Screenshots
- [captured/skipped/failed status for each screenshot]

### Manual review needed
- [any changes that need human judgement — e.g., new features that need entirely new doc pages]
```

## Style rules

- Match existing page structure when updating — don't reorganise sections
- Add new content at the logical insertion point, don't append to the bottom
- If a feature is brand new and has no existing page, create a new MDX file in the appropriate directory and update `src/lib/navigation.ts`
- Keep the TODO/build tracker page (`content/developers/todo.mdx`) as a faithful representation of `TODO.md` — use checkmarks, progress indicators, and the same priority labels
