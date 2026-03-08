"use client";

import { useState } from "react";

const C = {
  bg: "#0F1117",
  surface: "#161822",
  surfaceLight: "#1E2030",
  border: "#2A2D3E",
  text: "#E2E4ED",
  dim: "#8B8FA3",
  green: "#4ADE80",
  orange: "#FB923C",
  blue: "#60A5FA",
  purple: "#A78BFA",
  red: "#F87171",
  cyan: "#22D3EE",
  yellow: "#FACC15",
  pink: "#EC4899",
  amber: "#D97706",
};

const MONO = "'JetBrains Mono', 'SF Mono', monospace";
const SANS = "'Inter', system-ui, sans-serif";

function SB({ x, y, w, h, label, sub, color, icon, sm, onClick, on }: {
  x: number; y: number; w: number; h: number; label: string; sub?: string; color: string; icon?: string; sm?: boolean; onClick?: () => void; on?: boolean;
}) {
  return (
    <g style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={on ? color + "18" : C.surface} stroke={on ? color : C.border} strokeWidth={on ? 1.5 : 1} />
      {icon && <text x={x + 10} y={y + (sm ? 17 : 20)} fontSize={sm ? 11 : 13} fill={color}>{icon}</text>}
      <text x={icon ? x + (sm ? 24 : 28) : x + w / 2} y={y + (sm ? 17 : 20)} fontSize={sm ? 10.5 : 11.5} fill={C.text} fontWeight="600" fontFamily={MONO} textAnchor={icon ? "start" : "middle"}>{label}</text>
      {sub && <text x={icon ? x + (sm ? 24 : 28) : x + w / 2} y={y + (sm ? 30 : 35)} fontSize={9.5} fill={C.dim} fontFamily={SANS} textAnchor={icon ? "start" : "middle"}>{sub}</text>}
    </g>
  );
}

function Zn({ x, y, w, h, label, color, children }: {
  x: number; y: number; w: number; h: number; label: string; color: string; children?: React.ReactNode;
}) {
  const labelWidth = label.length * 8.5 + 20;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={color + "08"} stroke={color + "30"} strokeWidth={1} strokeDasharray="8,4" />
      {label && <rect x={x + 4} y={y + 2} width={labelWidth} height={18} rx={4} fill={color + "08"} />}
      <text x={x + 12} y={y + 16} fontSize={10} fill={color} fontWeight="700" fontFamily={MONO} letterSpacing="0.08em">{label}</text>
      {children}
    </g>
  );
}

function Ar({ x1, y1, x2, y2, color = C.border }: {
  x1: number; y1: number; x2: number; y2: number; color?: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l = Math.sqrt(dx * dx + dy * dy);
  if (!l) return null;
  const ux = dx / l;
  const uy = dy / l;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - ux * 4} y2={y2 - uy * 4} stroke={color + "80"} strokeWidth={1.2} />
      <polygon points={`${x2},${y2} ${x2 - ux * 7 - uy * 3.5},${y2 - uy * 7 + ux * 3.5} ${x2 - ux * 7 + uy * 3.5},${y2 - uy * 7 - ux * 3.5}`} fill={color + "80"} />
    </g>
  );
}

interface DetailSection {
  t: string;
  p: string[];
}

const DETAILS: Record<string, DetailSection> = {
  cicd: {
    t: "CI/CD — GitHub Actions (App) + CDK Pipelines (Infra)",
    p: [
      "Two-track: GitHub Actions for app CI (test, build, ECR push via OIDC). CDK Pipelines (CodePipeline) for infrastructure deploy.",
      "CDK Pipelines is self-mutating — pipeline definition changes auto-update on next run. No manual pipeline management.",
      "Pipeline stages: Source (GitHub) → cdk synth → cdk-nag → Deploy Staging (auto) → ManualApprovalStep → Deploy Production.",
      "Every PR runs `cdk diff` via GitHub Actions, posts CloudFormation change set as PR comment for readable infra change review.",
      "ManualApprovalStep between staging and production — auditable who-approved-when. CC8.1 change management evidence.",
      "Blue-green DNS cutover: Vercel stays live. CNAME switch from vercel-dns to CloudFront distribution. Rollback = switch back.",
    ],
  },
  cdk: {
    t: "CDK — Single Stack + CDK Pipelines",
    p: [
      "One CDK stack with all resources. CDK Pipelines wraps it for staging → approval → production. Right-sized for 1-2 devs.",
      "Stack: VPC, RDS, S3, SQS (4+4 DLQs), ECR, ALB, CloudFront, WAF, ECS, Lambdas, Step Functions, Secrets Manager, ACM. DNS stays on Cloudflare.",
      "cdk-nag on every synth — AWS Solutions + HIPAA rules. Non-compliant infra fails build before reaching AWS.",
      "Environment config: staging (smaller, short retention, deletion allowed) vs production (deletion protection, longer retention).",
      "`cdk synth` produces CloudFormation on demand for bank security team review. CDK Pipeline event history = CC8.1 audit trail.",
    ],
  },
  edge: {
    t: "Edge — Cloudflare DNS + CloudFront + WAF",
    p: [
      "DNS on Cloudflare (existing). CNAME → CloudFront distribution, proxy disabled (DNS-only mode). ACM cert validated via manual Cloudflare CNAME.",
      "CloudFront in front of ALB: DDoS Shield Standard (free), static asset caching, US geo-restriction option for data residency.",
      "WAF on CloudFront: AWS managed rule groups for OWASP Top 10 — rate limiting, SQLi, XSS, bot detection. ~$6/mo.",
      "ALB as CloudFront custom origin (HTTPS-only). No direct internet access to ALB — only CloudFront IPs allowed via security group.",
      "CloudFront ~$1-5/mo at current traffic. WAF logs and CloudFront access logs to S3 — CC6.6 (external threats) audit evidence.",
      "DNS cutover: update Cloudflare CNAME from cname.vercel-dns.com → d1234.cloudfront.net. Rollback = switch CNAME back (~60s).",
    ],
  },
  compute: {
    t: "Compute — ECS Fargate + Lambda",
    p: [
      "Next.js standalone container on ECS Fargate: 0.25 vCPU, 512MB ($9.50/mo). Docker already exists from docker/ demo.",
      "ALB target group → ECS :3000. Health check /api/health. CloudFront origin points to ALB (not directly to ECS).",
      "4 Lambda functions replace 4 Inngest functions: auto-match (300s), propagate (60s), backfill (120s), parse steps (30-300s).",
      "Lambda VPC cold starts 1-5s — acceptable for background jobs. Not on user hot path.",
      "BetterAuth inside Next.js — zero migration. ECS task role + Lambda execution roles scoped per-service.",
    ],
  },
  parse: {
    t: "Step Functions — Exam Parsing",
    p: [
      "State machine: LookupConfig → ValidateUpload → DownloadAndParse (Bedrock, 300s) → Map[Wait(22s)+SaveItem] → MarkComplete → TriggerBackfill.",
      "Map state: sequential (MaxConcurrency:1) due to Voyage AI 22s rate limit. 20 items × 22s = ~7 min total.",
      "Alternative: single 15-min Lambda with await sleep(22000) loop. Start simple, add Step Functions if orchestration visibility needed.",
      "Error: Retry(3x) per state, Catch → SQS DLQ → CloudWatch Alarm. Execution history = audit trail.",
    ],
  },
  data: {
    t: "Data — RDS + S3",
    p: [
      "RDS PostgreSQL 16 on db.t4g.micro, 20GB gp3 ($13/mo). pgvector supported. No RDS Proxy, no ElastiCache — not needed at under 100 DAU.",
      "Single S3 bucket (verity-files-prod). SSE-S3, block public access, 365-day Glacier lifecycle.",
      "17 route files migrated from Supabase Storage SDK to S3 SDK. pg_dump/pg_restore for database. Verify HNSW indexes + embeddings.",
      "Drizzle ORM: change DATABASE_URL. Remove `prepare: false` (no longer needed without Supabase pooler).",
    ],
  },
  bedrock: {
    t: "Bedrock + Voyage AI",
    p: [
      "Bedrock Claude Sonnet 4.6 replaces Anthropic API. @ai-sdk/amazon-bedrock swap. IAM auth, no API key ($5-15/mo).",
      "Keep Voyage AI (voyage-law-2) — legal-domain quality, 1024-dim across 5 KB tables. Re-embedding cost too high for Titan.",
      "Bedrock + Voyage via NAT. Add VPC endpoint for Bedrock when cost justifies. Anthropic key as fallback during transition.",
    ],
  },
  security: {
    t: "Security and Monitoring",
    p: [
      "WAF: OWASP rules, rate limit, bot detect on CloudFront. Shield Standard for DDoS. CloudFront + WAF logs to S3.",
      "Secrets Manager ($2/mo): DB creds (auto-rotate), BETTER_AUTH_SECRET, VOYAGE_API_KEY. Security groups: CF→ALB→ECS→RDS.",
      "NACLs: data subnet (10.0.20.0/24) restricts inbound to :5432 from compute subnet (10.0.10.0/24) only. Defense-in-depth beyond security groups.",
      "6 CW alarms: ECS CPU over 80%, tasks under 1, ALB 5xx over 10, RDS CPU over 80%, storage under 2GB, DLQ over 0. Budget alarm 80%.",
      "CloudTrail (free). CW Logs 30d. CDK Pipeline history for CC8.1. WAF/CF logs for CC6.6.",
      "SOC 2 evidence: Git commits (CC8.1), PR reviews (CC8.1), CFN change sets (CC8.1), ManualApproval log (CC8.1), cdk-nag reports (CC6.1), WAF/CF logs (CC6.6), CloudTrail (CC6.1/CC7.2), ECR image digests, test reports.",
    ],
  },
};

const PHASES = [
  { ph: "Phase 0-1", t: "Wk 1-2", d: "CDK stack + Pipeline: VPC, RDS, S3, SQS, ECR, ALB, CloudFront, WAF, Secrets, ACM. Health endpoint.", c: C.pink },
  { ph: "Phase 2", t: "Wk 2", d: "DB: pg_dump → pg_restore to RDS. Verify pgvector + HNSW + embeddings.", c: C.cyan },
  { ph: "Phase 3", t: "Wk 2-3", d: "Storage: S3 client abstraction. 17 route files migrated from Supabase SDK.", c: C.cyan },
  { ph: "Phase 4", t: "Wk 3-4", d: "SQS + Lambda: 3 Lambdas + 1 Step Functions SM. 6 inngest.send() call sites.", c: C.purple },
  { ph: "Phase 5", t: "Wk 4", d: "Bedrock: @ai-sdk/amazon-bedrock. Verify parse quality vs Anthropic API.", c: C.amber },
  { ph: "Phase 6", t: "Wk 4", d: "SES: domain verify, update email.ts. Optional — Resend can stay temporarily.", c: C.dim },
  { ph: "Phase 7", t: "Wk 4-5", d: "ECS deploy via CDK Pipeline. E2E tests staging. CloudWatch alarms.", c: C.green },
  { ph: "Phase 8", t: "Wk 5", d: "Cloudflare CNAME → CloudFront. Rollback = CNAME back to Vercel. 1 wk stable → cancel old.", c: C.green },
];

export function AWSArchDiagram() {
  const [selected, setSelected] = useState("cdk");
  const detail = DETAILS[selected];

  return (
    <div className="not-prose my-6" style={{ fontFamily: SANS, color: C.text }}>
      <div style={{ background: C.bg, borderRadius: 12, padding: "20px 24px", border: `1px solid ${C.border}` }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: MONO, color: C.green, margin: 0, letterSpacing: "-0.02em" }}>VERITY — AWS MIGRATION</h3>
            <span style={{ fontSize: 12, color: C.dim }}>~$120-150/mo • CloudFront + WAF + CDK Pipelines</span>
          </div>
          <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>Click any section for details. CDK Pipelines for infra, GitHub Actions for app CI, Cloudflare DNS + CloudFront + WAF on edge.</p>
        </div>

        <svg viewBox="0 0 980 680" style={{ width: "100%", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}>
          {/* CI/CD pipeline */}
          <Zn x={20} y={10} w={940} h={68} label="CI/CD — GITHUB ACTIONS (APP) + CDK PIPELINES (INFRA)" color={C.yellow}>
            <g onClick={() => setSelected("cicd")} style={{ cursor: "pointer" }}>
              <SB x={40} y={34} w={110} h={34} label="GitHub" sub="OIDC auth" color={C.yellow} icon="⬡" sm on={selected === "cicd"} />
              <SB x={162} y={34} w={115} h={34} label="Test+Build" sub="ECR push" color={C.yellow} icon="⚙" sm on={selected === "cicd"} />
              <SB x={289} y={34} w={100} h={34} label="cdk synth" sub="Gen CFN" color={C.pink} icon="◇" sm on={selected === "cicd"} />
              <SB x={401} y={34} w={90} h={34} label="cdk-nag" sub="Policy" color={C.red} icon="⊘" sm on={selected === "cicd"} />
              <SB x={503} y={34} w={105} h={34} label="→ Staging" sub="Auto" color={C.green} icon="▷" sm on={selected === "cicd"} />
              <SB x={620} y={34} w={95} h={34} label="Approval" sub="Manual" color={C.orange} icon="⊙" sm on={selected === "cicd"} />
              <SB x={727} y={34} w={85} h={34} label="→ Prod" sub="" color={C.green} icon="◉" sm on={selected === "cicd"} />
              <Ar x1={152} y1={51} x2={162} y2={51} color={C.yellow} />
              <Ar x1={277} y1={51} x2={289} y2={51} color={C.yellow} />
              <Ar x1={389} y1={51} x2={401} y2={51} color={C.pink} />
              <Ar x1={491} y1={51} x2={503} y2={51} color={C.red} />
              <Ar x1={608} y1={51} x2={620} y2={51} color={C.green} />
              <Ar x1={715} y1={51} x2={727} y2={51} color={C.orange} />
              <text x={830} y={48} fontSize={9} fill={C.pink} fontFamily={MONO}>Self-mutating</text>
              <text x={830} y={60} fontSize={9} fill={C.dim} fontFamily={MONO}>CodePipeline</text>
            </g>
          </Zn>

          {/* CDK stack */}
          <Zn x={20} y={86} w={940} h={52} label="CDK SINGLE STACK + CDK PIPELINES" color={C.pink}>
            <g onClick={() => setSelected("cdk")} style={{ cursor: "pointer" }}>
              <SB x={40} y={108} w={125} h={22} label="VPC+NAT" sub="" color={C.pink} icon="⬡" sm on={selected === "cdk"} />
              <SB x={178} y={108} w={100} h={22} label="RDS+S3" sub="" color={C.pink} icon="⊞" sm on={selected === "cdk"} />
              <SB x={291} y={108} w={110} h={22} label="ECS+ALB" sub="" color={C.pink} icon="▲" sm on={selected === "cdk"} />
              <SB x={414} y={108} w={120} h={22} label="CF+WAF" sub="" color={C.pink} icon="◈" sm on={selected === "cdk"} />
              <SB x={547} y={108} w={100} h={22} label="SQS+λ" sub="" color={C.pink} icon="⟳" sm on={selected === "cdk"} />
              <SB x={660} y={108} w={90} h={22} label="StepFn" sub="" color={C.pink} icon="◈" sm on={selected === "cdk"} />
              <SB x={763} y={108} w={95} h={22} label="Secrets" sub="" color={C.pink} icon="⊘" sm on={selected === "cdk"} />
              <SB x={871} y={108} w={75} h={22} label="ACM" sub="" color={C.pink} icon="⊗" sm on={selected === "cdk"} />
            </g>
          </Zn>

          {/* Edge */}
          <Zn x={20} y={146} w={940} h={52} label="EDGE — CLOUDFLARE DNS + CLOUDFRONT + WAF" color={C.blue}>
            <g onClick={() => setSelected("edge")} style={{ cursor: "pointer" }}>
              <SB x={40} y={168} w={120} h={22} label="Cloudflare" sub="" color={C.blue} icon="◎" sm on={selected === "edge"} />
              <SB x={173} y={168} w={120} h={22} label="CloudFront" sub="" color={C.blue} icon="◈" sm on={selected === "edge"} />
              <SB x={306} y={168} w={100} h={22} label="WAF" sub="" color={C.red} icon="⊘" sm on={selected === "edge"} />
              <SB x={419} y={168} w={90} h={22} label="ACM" sub="" color={C.blue} icon="⊗" sm on={selected === "edge"} />
              <SB x={522} y={168} w={130} h={22} label="ALB (origin)" sub="" color={C.blue} icon="⇌" sm on={selected === "edge"} />
              <Ar x1={160} y1={179} x2={173} y2={179} color={C.blue} />
              <Ar x1={293} y1={179} x2={306} y2={179} color={C.blue} />
              <Ar x1={406} y1={179} x2={419} y2={179} color={C.blue} />
              <Ar x1={509} y1={179} x2={522} y2={179} color={C.blue} />
              <text x={670} y={179} fontSize={8.5} fill={C.dim} fontFamily={MONO}>CF ~$3/mo • WAF ~$6/mo • Shield Standard free</text>
            </g>
          </Zn>

          {/* VPC */}
          <Zn x={20} y={206} w={940} h={328} label="VPC — 10.0.0.0/16 • US-EAST-1 • 1 NAT GATEWAY" color={C.green}>
            {/* Compute */}
            <Zn x={38} y={237} w={380} h={165} label="PRIVATE — COMPUTE" color={C.green}>
              <g onClick={() => setSelected("compute")} style={{ cursor: "pointer" }}>
                <SB x={55} y={265} w={165} h={42} label="ECS Fargate" sub="Next.js + BetterAuth" color={C.green} icon="▲" on={selected === "compute"} />
                <SB x={235} y={265} w={165} h={42} label="0.25vCPU/512MB" sub="$9.50/mo" color={C.green} icon="◈" on={selected === "compute"} />
                <SB x={55} y={318} w={345} h={42} label="Lambda (×4)" sub="auto-match • propagate • backfill • parse steps" color={C.purple} icon="⟳" on={selected === "compute"} />
                <text x={55} y={380} fontSize={8} fill={C.dim} fontFamily={MONO}>Cold starts 1-5s (ok for bg)</text>
              </g>
            </Zn>

            {/* SQS + Step Functions */}
            <Zn x={432} y={237} w={250} h={165} label="SQS + STEP FUNCTIONS" color={C.purple}>
              <g onClick={() => setSelected("parse")} style={{ cursor: "pointer" }}>
                <SB x={448} y={265} w={218} h={36} label="ExamParsing SM" sub="6 steps + Map state" color={C.purple} icon="⟳" on={selected === "parse"} />
                <SB x={448} y={309} w={218} h={36} label="SQS (4 + 4 DLQs)" sub="parse, match, propagate, backfill" color={C.purple} icon="◈" on={selected === "parse"} />
                <text x={448} y={365} fontSize={8} fill={C.dim} fontFamily={MONO}>Or: single 15-min Lambda</text>
              </g>
            </Zn>
            <Ar x1={450} y1={339} x2={464} y2={283} color={C.purple} />

            {/* Data */}
            <Zn x={38} y={412} w={644} h={110} label="PRIVATE — DATA" color={C.cyan}>
              <g onClick={() => setSelected("data")} style={{ cursor: "pointer" }}>
                <SB x={55} y={440} w={195} h={42} label="RDS Postgres 16" sub="t4g.micro, pgvector ($13)" color={C.cyan} icon="⊞" on={selected === "data"} />
                <SB x={265} y={440} w={195} h={42} label="S3: verity-files" sub="SSE-S3, Glacier lifecycle" color={C.cyan} icon="◫" on={selected === "data"} />
                <SB x={475} y={440} w={195} h={42} label="ECR" sub="SHA-tagged images" color={C.orange} icon="◧" on={selected === "data"} />
                <text x={55} y={502} fontSize={8} fill={C.dim} fontFamily={MONO}>No Proxy, no ElastiCache — add when scaling</text>
              </g>
            </Zn>
            <Ar x1={180} y1={402} x2={153} y2={440} color={C.cyan} />

            {/* Security */}
            <Zn x={696} y={237} w={250} h={285} label="SECURITY" color={C.red}>
              <g onClick={() => setSelected("security")} style={{ cursor: "pointer" }}>
                <SB x={710} y={265} w={222} h={26} label="Secrets Manager" sub="" color={C.red} icon="⊘" sm on={selected === "security"} />
                <SB x={710} y={297} w={222} h={26} label="Security Groups" sub="" color={C.green} icon="⊡" sm on={selected === "security"} />
                <SB x={710} y={329} w={222} h={26} label="CloudTrail (free)" sub="" color={C.orange} icon="◉" sm on={selected === "security"} />
                <SB x={710} y={361} w={222} h={26} label="CW Alarms (×6)" sub="" color={C.orange} icon="⊛" sm on={selected === "security"} />
                <SB x={710} y={393} w={222} h={26} label="NAT Gateway ($34)" sub="" color={C.green} icon="⬡" sm on={selected === "security"} />
                <SB x={710} y={425} w={222} h={26} label="IAM Task Roles" sub="" color={C.red} icon="⊛" sm on={selected === "security"} />
                <SB x={710} y={457} w={222} h={26} label="Budget Alarm (80%)" sub="" color={C.yellow} icon="⊙" sm on={selected === "security"} />
                <SB x={710} y={489} w={222} h={26} label="WAF + CF Logs → S3" sub="" color={C.orange} icon="◎" sm on={selected === "security"} />
              </g>
            </Zn>
          </Zn>

          {/* External */}
          <Zn x={20} y={542} w={940} h={56} label="EXTERNAL" color={C.dim}>
            <g onClick={() => setSelected("bedrock")} style={{ cursor: "pointer" }}>
              <SB x={40} y={564} w={180} h={26} label="Bedrock (Claude)" sub="" color={C.amber} icon="◈" sm on={selected === "bedrock"} />
              <SB x={235} y={564} w={165} h={26} label="Voyage AI (kept)" sub="" color={C.dim} icon="⊹" sm on={selected === "bedrock"} />
              <SB x={415} y={564} w={110} h={26} label="SES" sub="" color={C.dim} icon="✉" sm />
            </g>
            <text x={545} y={580} fontSize={9} fill={C.dim} fontFamily={MONO}>Bedrock: IAM auth. Voyage: legal quality. SES replaces Resend.</text>
          </Zn>

          {/* Cost bar */}
          <Zn x={20} y={606} w={940} h={28} label="" color={C.yellow}>
            <text x={35} y={624} fontSize={9} fill={C.dim} fontFamily={MONO}>ECS $9.50 • ALB $16.50 • RDS $13 • NAT $34 • CF ~$3 • WAF ~$6 • S3+SQS+λ ~$1 • Secrets $2 • CW $3 • Bedrock $5-15 ≈ $120-150/mo</text>
          </Zn>

          {/* Phases bar */}
          <Zn x={20} y={640} w={940} h={35} label="" color={C.orange}>
            <text x={35} y={662} fontSize={9} fill={C.orange} fontFamily={MONO}>8 phases / 5 weeks: CDK+Pipeline → DB → Storage (17 routes) → SQS+Lambda (6 sites) → Bedrock → SES → ECS deploy → DNS→CloudFront cutover</text>
          </Zn>
        </svg>

        {/* Detail panel */}
        <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 24px" }}>
          <h4 style={{
            fontSize: 15,
            fontWeight: 700,
            fontFamily: MONO,
            color: selected === "cdk" ? C.pink : selected === "cicd" ? C.yellow : selected === "edge" ? C.blue : selected === "bedrock" ? C.amber : C.green,
            margin: "0 0 14px 0",
          }}>
            {detail.t}
          </h4>
          <div style={{ display: "grid", gap: 8 }}>
            {detail.p.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 10, fontFamily: MONO, color: C.dim, minWidth: 18, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: C.text, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Migration phases grid */}
        <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 24px" }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: C.orange, margin: "0 0 10px 0", letterSpacing: "0.06em" }}>MIGRATION PHASES (5 WEEKS)</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {PHASES.map((p) => (
              <div key={p.ph} style={{ padding: "8px 10px", background: C.surfaceLight, borderRadius: 6, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: p.c }}>{p.ph}</span>
                  <span style={{ fontSize: 9, color: C.dim, fontFamily: MONO }}>{p.t}</span>
                </div>
                <p style={{ fontSize: 10.5, color: C.dim, margin: 0, lineHeight: 1.4 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
