"use client";

import { useState } from "react";

const COLORS = {
  bg: "#F2F0EB",
  ink: "#1C1C1B",
  forest: "#2A382E",
  clay: "#C9A690",
  stone: "#D0DCD9",
  highlight: "#D4E157",
  white: "#FFFFFF",
  vercel: "#000000",
  supabase: "#3ECF8E",
  inngest: "#6366F1",
  voyageai: "#0EA5E9",
  anthropic: "#D97706",
  resend: "#000000",
  cloudflare: "#F48120",
};

function ServiceBox({ x, y, width = 140, height = 80, color, label, sublabel, onClick }: {
  x: number; y: number; width?: number; height?: number; color: string; label: string; sublabel?: string; onClick?: () => void;
}) {
  const labelY = sublabel ? y + height * 0.48 : y + height * 0.56;
  const subY = y + height * 0.72;
  return (
    <g style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <rect x={x} y={y} width={width} height={height} rx={8} fill={COLORS.white} stroke={color} strokeWidth={2} />
      <rect x={x} y={y} width={width} height={4} rx={2} fill={color} />
      <text x={x + width / 2} y={labelY} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLORS.ink} fontFamily="Inter, system-ui, sans-serif">{label}</text>
      {sublabel && <text x={x + width / 2} y={subY} textAnchor="middle" fontSize={10} fill="#666" fontFamily="Inter, system-ui, sans-serif">{sublabel}</text>}
    </g>
  );
}

function ZoneBox({ x, y, width, height, label, color, borderColor, children }: {
  x: number; y: number; width: number; height: number; label: string; color: string; borderColor: string; children: React.ReactNode;
}) {
  const labelWidth = label.length * 10 + 20;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={color} stroke={borderColor} strokeWidth={2} />
      <rect x={x + 4} y={y + 2} width={labelWidth} height={22} rx={4} fill={color} />
      <text x={x + 14} y={y + 20} fontSize={11} fontWeight={700} fill={borderColor} fontFamily="JetBrains Mono, monospace" letterSpacing={0.5}>{label}</text>
      {children}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, dashed, color = "#999" }: {
  x1: number; y1: number; x2: number; y2: number; label?: string; dashed?: boolean; color?: string;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const id = `a-${x1}-${y1}-${x2}-${y2}`;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} strokeDasharray={dashed ? "6 3" : undefined} markerEnd={`url(#${id})`} />
      {label && <text x={midX} y={midY - 6} textAnchor="middle" fontSize={9} fill="#888" fontFamily="JetBrains Mono, monospace">{label}</text>}
    </g>
  );
}

function ElbowArrow({ x1, y1, x2, y2, midY: customMidY, label, color = "#999" }: {
  x1: number; y1: number; x2: number; y2: number; midY?: number; label?: string; color?: string;
}) {
  const midY = customMidY || (y1 + y2) / 2;
  const path = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  const id = `e-${x1}-${y1}-${x2}-${y2}`;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} />
        </marker>
      </defs>
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} markerEnd={`url(#${id})`} />
      {label && <text x={(x1 + x2) / 2} y={midY - 6} textAnchor="middle" fontSize={9} fill="#888" fontFamily="JetBrains Mono, monospace">{label}</text>}
    </g>
  );
}

function CostBadge({ x, y, cost }: { x: number; y: number; cost: string }) {
  return (
    <g>
      <rect x={x} y={y} width={60} height={18} rx={9} fill={COLORS.highlight} opacity={0.8} />
      <text x={x + 30} y={y + 13} textAnchor="middle" fontSize={9} fontWeight={600} fill={COLORS.forest} fontFamily="JetBrains Mono, monospace">{cost}</text>
    </g>
  );
}

interface DetailInfo {
  title: string;
  desc: string;
  cost: string;
}

function DetailPanel({ info, onClose }: { info: DetailInfo; onClose: () => void }) {
  return (
    <div style={{ marginTop: 16, padding: 20, background: COLORS.white, borderRadius: 12, border: `1px solid ${COLORS.stone}`, position: "relative" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#999" }}>x</button>
      <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, color: COLORS.forest, margin: "0 0 8px" }}>{info.title}</h3>
      <p style={{ fontSize: 14, color: COLORS.ink, margin: "0 0 8px", lineHeight: 1.5 }}>{info.desc}</p>
      <span style={{ display: "inline-block", padding: "4px 12px", background: COLORS.highlight, borderRadius: 12, fontSize: 12, fontWeight: 600, fontFamily: "JetBrains Mono, monospace", color: COLORS.forest }}>{info.cost}</span>
    </div>
  );
}

const CURRENT_DETAILS: Record<string, DetailInfo> = {
  cloudflare: { title: "Cloudflare DNS", desc: "DNS only (proxy disabled). CNAME app.verityaml.com to cname.vercel-dns.com. TTL managed by Cloudflare. No CDN/WAF — Vercel handles edge.", cost: "Free" },
  vercel: { title: "Vercel", desc: "Next.js 16 App Router on US region serverless functions. SSR pages, API routes, and proxy.ts session gate all run here. Auto-deploy on push to main. PR branches get preview deployments.", cost: "~$20/mo" },
  betterauth: { title: "BetterAuth", desc: "Self-hosted auth running inside Next.js. Organization-based multi-tenancy. Scrypt password hashing. Cookie-based sessions.", cost: "Free (OSS)" },
  proxyts: { title: "proxy.ts (Session Gate)", desc: "Next.js 16 proxy (replaces middleware.ts). Fast path: checks session cookie presence only — no token verification. Redirects unauthenticated users to /login.", cost: "—" },
  supabase: { title: "Supabase PostgreSQL", desc: "Managed PostgreSQL 16 with pgvector extension. Transaction-mode pooler (port 6543) requires prepare: false. 1024-dim HNSW indexes on 5 embedding columns. RLS enabled with service_role policies.", cost: "~$25/mo" },
  storage: { title: "Supabase Storage", desc: "File storage for evidence uploads, exam documents, correspondence, and generated reports. Presigned URLs for downloads (5min expiry). Max 50MB per file.", cost: "Included" },
  inngest: { title: "Inngest", desc: "4 background functions with step-based execution. Steps checkpoint independently — each stays under Vercel's 60s timeout. At-least-once semantics with onConflictDoNothing() for idempotency.", cost: "Free tier" },
  parse: { title: "parse-examination", desc: "Parses uploaded PDFs into structured request items. Steps: validate, download, LLM parse, per-item (rate-limited 22s): embed, KB search, insert, mark complete, trigger backfill.", cost: "—" },
  automatch: { title: "auto-match-evidence", desc: "Matches uploaded evidence to scoring criteria. Exam evidence: 3-tier priority (key > source > category). Domain uploads: suggest against all criteria. Updates JSONB linked_evidence + recomputes domain scores.", cost: "—" },
  propagate: { title: "propagate-evidence", desc: "Forward propagation. When evidence is uploaded to a request item, finds similar items on other examinations via cosine similarity and creates evidence_links rows.", cost: "—" },
  backfill: { title: "backfill-evidence-links", desc: "Reverse propagation. After parsing a new examination, searches existing evidence for items similar to newly parsed ones and creates cross-links.", cost: "—" },
  voyageai: { title: "Voyage AI", desc: "voyage-law-2 model (1024 dimensions). Legal-domain-specific embeddings used for KB search, item matching, and evidence propagation. Free tier: 3 RPM.", cost: "Free tier" },
  anthropic: { title: "Anthropic Claude", desc: "Claude Sonnet 4.6 via Vercel AI SDK. Used only for document parsing — classification and extraction, never content generation. streamObject for large PDFs. ~50 parses/month.", cost: "~$5-15/mo" },
  resend: { title: "Resend Email", desc: "Transactional email: password resets, invitations, welcome emails, direct member additions. Graceful no-op when RESEND_API_KEY is missing.", cost: "Free tier" },
  github: { title: "GitHub Actions", desc: "PR checks only: lint, unit tests, build check. No deployment responsibility — Vercel handles all deploys on push to main.", cost: "Free tier" },
};

export function CurrentArchDiagram() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="not-prose my-6">
      <svg viewBox="0 0 1060 784" style={{ width: "100%", background: COLORS.white, borderRadius: 12, border: `1px solid ${COLORS.stone}` }}>
        <rect width="1060" height="784" fill={COLORS.white} rx={12} />

        <text x={530} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={COLORS.ink} fontFamily="Inter, system-ui, sans-serif">Browser</text>
        <Arrow x1={530} y1={36} x2={530} y2={56} color={COLORS.forest} />

        <ServiceBox x={460} y={58} color={COLORS.cloudflare} label="Cloudflare DNS" sublabel="app.verityaml.com" onClick={() => setSelected("cloudflare")} />
        <CostBadge x={540} y={60} cost="Free" />
        <Arrow x1={530} y1={138} x2={530} y2={158} label="CNAME" color={COLORS.forest} />

        <ZoneBox x={60} y={160} width={940} height={294} label="VERCEL (US REGION)" color="#FAFAF9" borderColor={COLORS.vercel}>
          <ServiceBox x={380} y={192} width={300} height={90} color={COLORS.vercel} label="Next.js 16 App Router" sublabel="SSR + API Routes + proxy.ts" onClick={() => setSelected("vercel")} />
          <CostBadge x={620} y={194} cost="~$20/mo" />

          <g onClick={() => setSelected("proxyts")} style={{ cursor: "pointer" }}>
            <rect x={100} y={202} width={140} height={50} rx={6} fill="#F5F5F4" stroke={COLORS.stone} strokeWidth={1} />
            <text x={170} y={222} textAnchor="middle" fontSize={10} fontWeight={600} fill={COLORS.ink} fontFamily="JetBrains Mono, monospace">proxy.ts</text>
            <text x={170} y={237} textAnchor="middle" fontSize={9} fill="#888" fontFamily="Inter, system-ui, sans-serif">session gate</text>
          </g>
          <Arrow x1={240} y1={227} x2={378} y2={227} label="cookie check" color="#999" />

          <g onClick={() => setSelected("betterauth")} style={{ cursor: "pointer" }}>
            <rect x={100} y={268} width={140} height={50} rx={6} fill="#F5F5F4" stroke={COLORS.forest} strokeWidth={1} />
            <text x={170} y={288} textAnchor="middle" fontSize={10} fontWeight={600} fill={COLORS.forest} fontFamily="JetBrains Mono, monospace">BetterAuth</text>
            <text x={170} y={303} textAnchor="middle" fontSize={9} fill="#888" fontFamily="Inter, system-ui, sans-serif">self-hosted auth</text>
          </g>
          <Arrow x1={240} y1={293} x2={378} y2={260} label="session + org" color={COLORS.forest} />

          <ZoneBox x={80} y={340} width={900} height={100} label="INNGEST (4 BACKGROUND FUNCTIONS)" color="#EEF2FF" borderColor={COLORS.inngest}>
            <ServiceBox x={100} y={368} width={170} height={55} color={COLORS.inngest} label="parse-examination" sublabel="~7min, rate-limited" onClick={() => setSelected("parse")} />
            <ServiceBox x={290} y={368} width={170} height={55} color={COLORS.inngest} label="auto-match-evidence" sublabel="key > source > category" onClick={() => setSelected("automatch")} />
            <ServiceBox x={480} y={368} width={170} height={55} color={COLORS.inngest} label="propagate-evidence" sublabel="forward similarity" onClick={() => setSelected("propagate")} />
            <ServiceBox x={670} y={368} width={170} height={55} color={COLORS.inngest} label="backfill-links" sublabel="reverse similarity" onClick={() => setSelected("backfill")} />
            <CostBadge x={860} y={372} cost="Free" />
          </ZoneBox>
          <Arrow x1={530} y1={282} x2={530} y2={338} label="events" color={COLORS.inngest} />
        </ZoneBox>

        <ZoneBox x={60} y={492} width={400} height={160} label="SUPABASE" color="#F0FDF4" borderColor={COLORS.supabase}>
          <ServiceBox x={80} y={522} width={170} height={70} color={COLORS.supabase} label="PostgreSQL 16" sublabel="pgvector + RLS + pooler" onClick={() => setSelected("supabase")} />
          <CostBadge x={190} y={524} cost="~$25/mo" />
          <ServiceBox x={270} y={522} width={170} height={70} color={COLORS.supabase} label="Storage" sublabel="Evidence files (50MB max)" onClick={() => setSelected("storage")} />
          <CostBadge x={380} y={524} cost="Incl." />
        </ZoneBox>
        <Arrow x1={400} y1={454} x2={260} y2={490} label="Drizzle ORM" color={COLORS.supabase} />

        <ServiceBox x={520} y={514} width={160} height={70} color={COLORS.voyageai} label="Voyage AI" sublabel="voyage-law-2 (1024d)" onClick={() => setSelected("voyageai")} />
        <CostBadge x={620} y={516} cost="Free" />
        <ServiceBox x={720} y={514} width={160} height={70} color={COLORS.anthropic} label="Claude Sonnet 4.6" sublabel="Vercel AI SDK" onClick={() => setSelected("anthropic")} />
        <CostBadge x={820} y={516} cost="$5-15" />
        <ServiceBox x={900} y={514} width={140} height={70} color={COLORS.resend} label="Resend" sublabel="Transactional email" onClick={() => setSelected("resend")} />
        <CostBadge x={980} y={516} cost="Free" />

        <Arrow x1={530} y1={454} x2={580} y2={512} label="embed" color={COLORS.voyageai} />
        <Arrow x1={600} y1={454} x2={780} y2={512} label="parse PDF" color={COLORS.anthropic} />
        <Arrow x1={680} y1={454} x2={950} y2={512} dashed label="email" color="#999" />

        <ZoneBox x={60} y={684} width={940} height={86} label="CI/CD" color="#F5F5F4" borderColor="#666">
          <ServiceBox x={80} y={706} width={200} height={50} color={COLORS.vercel} label="Vercel Auto-Deploy" sublabel="main → prod, PR → preview" />
          <ServiceBox x={320} y={706} width={200} height={50} color="#333" label="GitHub Actions" sublabel="lint + test + build" onClick={() => setSelected("github")} />
          <CostBadge x={460} y={708} cost="Free" />
        </ZoneBox>

        <rect x={520} y={624} width={460} height={40} rx={6} fill="#FFF8E1" stroke="#FFB74D" strokeWidth={1} />
        <text x={530} y={642} fontSize={10} fontWeight={600} fill={COLORS.ink} fontFamily="Inter, system-ui, sans-serif">LLM constraint: Classification and retrieval only. No content generation.</text>
        <text x={530} y={657} fontSize={10} fill="#888" fontFamily="Inter, system-ui, sans-serif">All AI outputs require human review before acceptance.</text>

        <rect x={870} y={160} width={120} height={48} rx={8} fill={COLORS.forest} />
        <text x={930} y={180} textAnchor="middle" fontSize={11} fontWeight={600} fill={COLORS.white} fontFamily="Inter, system-ui, sans-serif">Est. Total</text>
        <text x={930} y={200} textAnchor="middle" fontSize={16} fontWeight={700} fill={COLORS.highlight} fontFamily="JetBrains Mono, monospace">~$50-60/mo</text>

        <ElbowArrow x1={185} y1={427} x2={185} y2={490} label="read/write" color={COLORS.supabase} />
        <ElbowArrow x1={375} y1={427} x2={600} y2={512} midY={474} label="embed items" color={COLORS.voyageai} />
        <ElbowArrow x1={185} y1={427} x2={800} y2={512} midY={482} color={COLORS.anthropic} />
      </svg>

      {selected && CURRENT_DETAILS[selected] && (
        <DetailPanel info={CURRENT_DETAILS[selected]} onClose={() => setSelected(null)} />
      )}

      <div style={{ marginTop: 12, display: "flex", gap: 20, flexWrap: "wrap", fontSize: 12, color: "#666" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 20, height: 3, background: COLORS.forest }} /><span>Request flow</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 20, height: 3, background: COLORS.inngest }} /><span>Background events</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 14, height: 14, background: "#FAFAF9", border: "2px solid #000", borderRadius: 3 }} /><span>Vercel</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 14, height: 14, background: "#F0FDF4", border: "2px solid #3ECF8E", borderRadius: 3 }} /><span>Supabase</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 14, height: 14, background: "#EEF2FF", border: "2px solid #6366F1", borderRadius: 3 }} /><span>Inngest</span></div>
      </div>
    </div>
  );
}
