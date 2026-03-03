# Verity Docs

Documentation site for [Verity](https://verityaml.com) — the governance layer for compliance program effectiveness.

Built with Next.js (static export) and deployed to Cloudflare Pages at `docs.verityaml.com`.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to preview locally.

## Build

```bash
npm run build
```

Produces a static site in `out/` with 24 HTML pages.

## Project structure

```
content/              # MDX content files (unchanged from authoring)
  ├── index.mdx
  ├── walkthrough.mdx
  ├── features/       # Product feature docs
  ├── developers/     # Developer guides
  └── api-reference/  # REST API documentation
public/               # Static assets (images, logo, favicon)
src/
  ├── app/            # Next.js App Router (layout, catch-all route, 404)
  ├── components/
  │   ├── layout/     # Navbar, sidebar, mobile nav, footer
  │   └── mdx/        # MDX components (callouts, cards, steps, etc.)
  └── lib/            # Content loader, navigation config
```

## Deployment

Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `out`
- CNAME `docs.verityaml.com` → Pages project

## Design

Fonts: Fraunces (headings), Inter (body), JetBrains Mono (code)

| Token | Hex | Usage |
|-------|-----|-------|
| paper | #F2F0EB | Page background |
| ink | #1C1C1B | Body text |
| forest | #2A382E | Headings, sidebar, primary actions |
| clay | #C9A690 | Borders, decorative |
| stone | #D0DCD9 | Neutral accents |
| highlight | #D4E157 | Tips, success |
