# Verity Docs

Documentation site for Verity (compliance governance platform). Next.js 15 static export + MDX + Tailwind CSS, deployed to Cloudflare Pages.

## Agents

- `@diagram-creator` — Creates interactive SVG architecture diagrams as React TSX components. Use for any new diagram work. See `.claude/agents/diagram-creator.md` for full rules on layout, text sizing, and overflow prevention.
- `@code-reviewer` — Reviews staged git changes against conventions.

## Interactive SVG Diagrams

Three diagram components exist in `src/components/mdx/`:

| Component | File | Theme | Description |
|-----------|------|-------|-------------|
| `CurrentArchDiagram` | `architecture-diagram.tsx` | Light | Current Vercel/Supabase/Inngest production stack |
| `AWSArchDiagram` | `aws-architecture-diagram.tsx` | Dark | High-level AWS migration overview with detail panels |
| `AWSDetailedDiagram` | `aws-detailed-diagram.tsx` | Dark | 5-tab detailed AWS infrastructure deep dive |

All diagram components must be registered in `src/components/mdx/index.ts` to use in MDX.

### Critical SVG rules (learned the hard way)

1. **Zone labels need background rects** — Dashed border strokes render through label text without a solid background rect behind it
2. **Zone children must clear labels** — Minimum 28px gap between zone top and first child element; 36px if zone has a subtitle
3. **Text positioning must be proportional** — Never use fixed y-offsets like `y + 55` for sublabels; use `y + height * 0.72` so it works for any box height
4. **Check text width vs box width** — JetBrains Mono 11px ≈ 6.6px/char; with icon offset (30px) and port badge (38px), available width = `box_width - 72`
5. **Unique SVG marker IDs** — Multiple diagrams on one page need unique arrow marker ID prefixes to avoid collisions

## Dev Server

- Default port 3003 (`npx next dev -p 3003`) since main Verity app uses 3000
- Delete `.next/` and restart if you see "Cannot find module vendor-chunks" errors (stale webpack cache)
