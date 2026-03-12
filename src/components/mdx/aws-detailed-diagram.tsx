"use client";

import { useState } from "react";

const C = {
  bg: "#080A0F",
  panel: "#0D1017",
  card: "#131720",
  border: "#1E2433",
  text: "#D4D8E3",
  dim: "#6B7280",
  green: "#34D399",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  orange: "#F59E0B",
  red: "#EF4444",
  cyan: "#06B6D4",
  pink: "#EC4899",
  yellow: "#EAB308",
  amber: "#D97706",
};

const MONO = "'JetBrains Mono', 'SF Mono', monospace";
const SANS = "'Inter', system-ui, sans-serif";

const TABS = [
  { id: "overview", label: "Full System", color: C.green },
  { id: "network", label: "Network", color: C.blue },
  { id: "data", label: "Data Flows", color: C.cyan },
  { id: "queues", label: "SQS + Step Functions", color: C.purple },
  { id: "cicd", label: "CI/CD + Cutover", color: C.orange },
];

function SB({ x, y, w = 150, h = 52, name, detail, color, port, icon }: {
  x: number; y: number; w?: number; h?: number; name: string; detail: string; color: string; port?: string; icon?: string;
}) {
  const nameY = y + h * 0.42;
  const detailY = y + h * 0.75;
  const iconY = nameY;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={C.card} stroke={color + "50"} strokeWidth={1} />
      <rect x={x} y={y} width={4} height={h} rx={2} fill={color} />
      {icon && <text x={x + 14} y={iconY} fontSize={12} fill={color}>{icon}</text>}
      <text x={x + (icon ? 30 : 14)} y={nameY} fontSize={11} fill={C.text} fontWeight="600" fontFamily={MONO}>{name}</text>
      {detail && <text x={x + (icon ? 30 : 14)} y={detailY} fontSize={9} fill={C.dim} fontFamily={SANS}>{detail}</text>}
      {port && (
        <g>
          <rect x={x + w - 38} y={y + 4} width={34} height={16} rx={3} fill={color + "20"} stroke={color + "40"} strokeWidth={0.5} />
          <text x={x + w - 21} y={y + 15} fontSize={8} fill={color} fontFamily={MONO} textAnchor="middle">{port}</text>
        </g>
      )}
    </g>
  );
}

function Cn({ x1, y1, x2, y2, color = C.dim, label, dashed }: {
  x1: number; y1: number; x2: number; y2: number; color?: string; label?: string; dashed?: boolean;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l = Math.sqrt(dx * dx + dy * dy);
  if (!l) return null;
  const ux = dx / l;
  const uy = dy / l;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - ux * 5} y2={y2 - uy * 5} stroke={color + "60"} strokeWidth={1} strokeDasharray={dashed ? "4,3" : "none"} />
      <polygon points={`${x2},${y2} ${x2 - ux * 6 - uy * 3},${y2 - uy * 6 + ux * 3} ${x2 - ux * 6 + uy * 3},${y2 - uy * 6 - ux * 3}`} fill={color + "70"} />
      {label && (
        <g>
          <rect x={mx - label.length * 3 - 4} y={my - 8} width={label.length * 6 + 8} height={14} rx={3} fill={C.bg} stroke={color + "30"} strokeWidth={0.5} />
          <text x={mx} y={my + 2} fontSize={7.5} fill={color} fontFamily={MONO} textAnchor="middle">{label}</text>
        </g>
      )}
    </g>
  );
}

function Zn({ x, y, w, h, label, color, sub }: {
  x: number; y: number; w: number; h: number; label: string; color: string; sub?: string;
}) {
  const labelWidth = label.length * 7.5 + 16;
  const bgHeight = sub ? 30 : 18;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={color + "06"} stroke={color + "25"} strokeWidth={1} strokeDasharray="6,4" />
      {label && <rect x={x + 3} y={y + 1} width={Math.min(labelWidth, w - 6)} height={bgHeight} rx={4} fill={color + "06"} />}
      <text x={x + 10} y={y + 14} fontSize={9} fill={color} fontWeight="700" fontFamily={MONO} letterSpacing="0.08em">{label}</text>
      {sub && <text x={x + 10} y={y + 26} fontSize={7.5} fill={C.dim} fontFamily={SANS}>{sub}</text>}
    </g>
  );
}

function OverviewView() {
  return (
    <svg viewBox="0 0 800 880" style={{ width: "100%" }}>
      {/* EDGE */}
      <Zn x={10} y={5} w={760} h={68} label="EDGE — CLOUDFLARE DNS + CLOUDFRONT + WAF" color={C.blue} />
      <SB x={25} y={30} w={105} h={34} name="CF DNS" detail="verityaml.com" color={C.blue} icon="◎" />
      <SB x={140} y={30} w={110} h={34} name="CloudFront" detail="CDN + Shield" color={C.blue} icon="◈" />
      <SB x={260} y={30} w={78} h={34} name="WAF" detail="OWASP" color={C.red} icon="⊘" />
      <SB x={348} y={30} w={75} h={34} name="ACM" detail="TLS" color={C.blue} icon="⊗" />
      <SB x={433} y={30} w={100} h={34} name="ALB" detail="Origin" color={C.blue} icon="⇌" port=":443" />
      <Cn x1={130} y1={47} x2={140} y2={47} color={C.blue} />
      <Cn x1={250} y1={47} x2={260} y2={47} color={C.blue} />
      <Cn x1={338} y1={47} x2={348} y2={47} color={C.blue} />
      <Cn x1={423} y1={47} x2={433} y2={47} color={C.blue} />
      <SB x={555} y={30} w={130} h={34} name="CDK Pipes" detail="Self-mutating" color={C.pink} icon="◇" />

      {/* VPC */}
      <Zn x={10} y={81} w={760} h={440} label="VPC — 10.0.0.0/16 • US-EAST-1 • NAT GW ($34/mo)" color={C.green} sub="CloudFront → ALB (origin, HTTPS-only). sg-alb allows CloudFront IPs only." />

      {/* Compute */}
      <Zn x={25} y={115} w={380} h={210} label="PRIVATE — COMPUTE" color={C.green} sub="ECS Fargate: 0.25 vCPU, 512MB ($9.50/mo)" />
      <SB x={40} y={148} w={170} h={48} name="Next.js 16 (ECS)" detail="App Router + SSR" color={C.green} icon="▲" port=":3000" />
      <SB x={220} y={148} w={170} h={48} name="BetterAuth" detail="Sessions, RBAC, org" color={C.cyan} icon="⊡" />
      <SB x={40} y={208} w={170} h={48} name="Lambda: auto-match" detail="Evidence (300s)" color={C.purple} icon="⟳" />
      <SB x={220} y={208} w={170} h={48} name="Lambda: propagate" detail="Cross-exam (60s)" color={C.purple} icon="⟳" />
      <SB x={40} y={268} w={170} h={28} name="Lambda: backfill" detail="Links (120s)" color={C.purple} icon="⟳" />
      <SB x={220} y={268} w={170} h={28} name="Lambda: parse" detail="SM steps (30-300s)" color={C.purple} icon="⟳" />
      <Cn x1={483} y1={65} x2={130} y2={148} color={C.blue} label="target group :3000" />

      {/* SQS */}
      <Zn x={420} y={115} w={340} h={210} label="SQS + STEP FUNCTIONS" color={C.purple} />
      <SB x={435} y={138} w={155} h={38} name="SQS: parse" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={600} y={138} w={145} h={38} name="SQS: match" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={435} y={184} w={155} h={38} name="SQS: backfill" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={600} y={184} w={145} h={38} name="SQS: email" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={435} y={233} w={310} h={48} name="Step Fn: ExamParsing" detail="Lookup → Validate → Bedrock → Map" color={C.purple} icon="⟳" />
      <Cn x1={395} y1={232} x2={435} y2={157} color={C.purple} label="SendMessage" />

      {/* Data */}
      <Zn x={25} y={338} w={735} h={170} label="PRIVATE — DATA" color={C.cyan} />
      <SB x={40} y={363} w={225} h={44} name="RDS Postgres 16" detail="t4g.micro, pgvector ($13)" color={C.cyan} icon="⊞" port=":5432" />
      <SB x={275} y={363} w={230} h={44} name="S3: verity-files" detail="SSE-S3, 365d Glacier" color={C.cyan} icon="◫" />
      <SB x={515} y={363} w={235} h={44} name="ECR" detail="SHA-tagged images" color={C.orange} icon="◧" />
      <SB x={40} y={417} w={225} h={44} name="pgvector + HNSW" detail="4 KB tables, 1024-dim" color={C.cyan} icon="◈" />
      <SB x={275} y={417} w={230} h={44} name="Drizzle ORM" detail="DATABASE_URL → RDS" color={C.cyan} icon="⇌" />
      <text x={40} y={483} fontSize={8} fill={C.dim} fontFamily={MONO}>No RDS Proxy • No ElastiCache • HNSW indexes from Supabase</text>
      <Cn x1={130} y1={298} x2={157} y2={363} color={C.cyan} label=":5432" />
      <Cn x1={310} y1={298} x2={405} y2={363} color={C.cyan} label="S3 SDK" />

      {/* Security — horizontal row */}
      <Zn x={10} y={530} w={760} h={75} label="SECURITY + MONITORING" color={C.red} />
      <SB x={25} y={553} w={135} h={38} name="Secrets Mgr" detail="DB, auth ($2)" color={C.red} icon="⊘" />
      <SB x={170} y={553} w={130} h={38} name="Sec Groups" detail="CF→ALB→ECS→RDS" color={C.green} icon="⊡" />
      <SB x={310} y={553} w={120} h={38} name="CloudTrail" detail="Free tier" color={C.orange} icon="◉" />
      <SB x={440} y={553} w={140} h={38} name="CW Alarms ×6" detail="CPU, 5xx, DLQ" color={C.orange} icon="⊛" />
      <SB x={590} y={553} w={160} h={38} name="WAF+CF Logs" detail="SOC 2 CC6.6" color={C.orange} icon="◎" />

      {/* External */}
      <Zn x={10} y={615} w={760} h={75} label="EXTERNAL" color={C.dim} />
      <SB x={25} y={638} w={175} h={38} name="Bedrock (Claude)" detail="IAM auth ($5-15)" color={C.amber} icon="◈" />
      <SB x={210} y={638} w={170} h={38} name="Voyage AI (kept)" detail="voyage-law-2 1024d" color={C.dim} icon="⊹" />
      <SB x={390} y={638} w={115} h={38} name="SES" detail="Replaces Resend" color={C.dim} icon="✉" />
      <text x={520} y={653} fontSize={9} fill={C.green} fontFamily={MONO}>Bedrock: IAM, no API key.</text>
      <text x={520} y={668} fontSize={9} fill={C.dim} fontFamily={MONO}>Voyage: legal-domain quality.</text>

      {/* Cost */}
      <Zn x={10} y={700} w={760} h={40} label="COST: ~$120-150/mo (AWS CREDITS)" color={C.yellow} />
      <text x={30} y={724} fontSize={7.5} fill={C.dim} fontFamily={MONO}>ECS $9.50 • ALB $16.50 • RDS $13 • NAT $34 • CF ~$3 • WAF ~$6 • S3+SQS+Λ ~$1 • Bedrock $5-15</text>

      {/* CDK */}
      <Zn x={10} y={748} w={760} h={50} label="CDK SINGLE STACK + CDK PIPELINES" color={C.pink} />
      <text x={30} y={773} fontSize={7.5} fill={C.pink} fontFamily={MONO}>VPC + RDS + S3 + SQS(×8) + ECR + ALB + CF + WAF + ECS + Lambda(×4) + StepFn + ACM</text>
      <text x={30} y={786} fontSize={7.5} fill={C.pink} fontFamily={MONO}>CDK Pipelines: Source → synth → cdk-nag → Staging → Approval → Production</text>

      {/* GitHub Actions label */}
      <text x={30} y={810} fontSize={9} fill={C.orange} fontFamily={MONO}>GitHub Actions: App CI (lint, test, OIDC → ECR, ECS deploy)</text>
    </svg>
  );
}

function NetworkView() {
  return (
    <svg viewBox="0 0 780 580" style={{ width: "100%" }}>
      <Zn x={7} y={5} w={765} h={50} label="EDGE" color={C.blue} />
      <text x={148} y={35} fontSize={10} fill={C.text} fontFamily={MONO}>Browser → CF DNS → CloudFront → WAF → ALB (HTTPS)</text>

      <Zn x={7} y={62} w={765} h={510} label="VPC: 10.0.0.0/16 • us-east-1" color={C.green} sub="CloudFront → ALB: HTTPS-only origin. sg-alb: CF prefix list only." />

      <Zn x={22} y={95} w={365} h={465} label="AZ-A (us-east-1a)" color={C.blue} />
      <Zn x={33} y={118} w={342} h={75} label="PUBLIC SUBNET A • 10.0.1.0/24" color={C.blue} />
      <SB x={44} y={142} w={100} h={38} name="ALB (ENI)" detail="Origin" color={C.blue} icon="⇌" port=":443" />
      <SB x={155} y={142} w={115} h={38} name="NAT Gateway" detail="Single AZ ($34)" color={C.green} icon="⬡" />
      <text x={282} y={161} fontSize={8} fill={C.dim} fontFamily={MONO}>No bastion</text>

      <Zn x={33} y={203} w={342} h={160} label="PRIVATE A — COMPUTE • 10.0.10.0/24" color={C.green} />
      <SB x={44} y={230} w={158} h={46} name="ECS: verity" detail="Next.js standalone" color={C.green} icon="▲" port=":3000" />
      <SB x={212} y={230} w={152} h={46} name="Lambda (×4)" detail="VPC, sg-lambda" color={C.purple} icon="⟳" />
      <text x={44} y={298} fontSize={7.5} fill={C.dim} fontFamily={MONO}>sg-ecs: in :3000 from sg-alb • out: :5432, :443</text>
      <text x={44} y={310} fontSize={7.5} fill={C.dim} fontFamily={MONO}>sg-lambda: no inbound • out: :5432, :443</text>
      <text x={44} y={325} fontSize={7.5} fill={C.dim} fontFamily={MONO}>sg-alb: in :443 from CF prefix list ONLY</text>

      <Zn x={33} y={373} w={342} h={100} label="PRIVATE A — DATA • 10.0.20.0/24" color={C.cyan} />
      <SB x={44} y={398} w={158} h={46} name="RDS Postgres 16" detail="t4g.micro, 20GB" color={C.cyan} icon="⊞" port=":5432" />
      <SB x={212} y={398} w={152} h={46} name="pgvector+HNSW" detail="4 KB, 1024-dim" color={C.cyan} icon="◈" />
      <text x={44} y={460} fontSize={8} fill={C.dim} fontFamily={MONO}>sg-rds: in :5432 from sg-ecs + sg-lambda</text>

      <Zn x={394} y={95} w={367} h={375} label="AZ-B (us-east-1b)" color={C.blue} />
      <Zn x={405} y={118} w={345} h={75} label="PUBLIC SUBNET B • 10.0.2.0/24" color={C.blue} />
      <SB x={416} y={142} w={100} h={38} name="ALB (ENI)" detail="Cross-zone LB" color={C.blue} icon="⇌" />
      <text x={528} y={161} fontSize={8} fill={C.dim} fontFamily={MONO}>No NAT in AZ-b</text>

      <Zn x={405} y={203} w={345} h={110} label="PRIVATE B — COMPUTE • 10.0.11.0/24" color={C.green} />
      <text x={416} y={248} fontSize={9} fill={C.dim} fontFamily={MONO}>{"Empty — scale when tasks > 1"}</text>
      <text x={416} y={265} fontSize={8} fill={C.dim} fontFamily={SANS}>ECS auto-places across AZs when desiredCount increases</text>

      <Zn x={405} y={323} w={345} h={70} label="PRIVATE B — DATA • 10.0.21.0/24" color={C.cyan} />
      <text x={416} y={365} fontSize={9} fill={C.dim} fontFamily={MONO}>RDS Multi-AZ standby (if enabled, +$13/mo)</text>

      <Zn x={394} y={480} w={367} h={85} label="KEY: CLOUDFRONT SECURITY" color={C.blue} />
      <text x={405} y={505} fontSize={8.5} fill={C.text} fontFamily={MONO} fontWeight="600">sg-alb uses CloudFront managed prefix list</text>
      <text x={405} y={520} fontSize={8} fill={C.dim} fontFamily={SANS}>ALB not directly accessible — only CloudFront IPs inbound.</text>
      <text x={405} y={535} fontSize={8} fill={C.dim} fontFamily={SANS}>WAF rules evaluated at edge before traffic reaches VPC.</text>
      <text x={405} y={550} fontSize={8} fill={C.dim} fontFamily={SANS}>DNS cutover: CF CNAME → CloudFront dist, proxy off.</text>

      <Cn x1={96} y1={180} x2={126} y2={230} color={C.blue} label="target group" />
      <Cn x1={126} y1={310} x2={126} y2={398} color={C.cyan} label=":5432" />
    </svg>
  );
}

function DataFlowView() {
  return (
    <svg viewBox="0 0 780 630" style={{ width: "100%" }}>
      <text x={15} y={20} fontSize={11} fill={C.cyan} fontFamily={MONO} fontWeight="700">DATA FLOW: EXAM PARSING (SQS + STEP FN + BEDROCK)</text>
      <text x={15} y={36} fontSize={8} fill={C.dim} fontFamily={SANS}>Inngest parse-examination → Step Functions SM (or single 15-min Lambda). Bedrock Claude via @ai-sdk/amazon-bedrock.</text>

      <Zn x={7} y={48} w={178} h={100} label="1. UPLOAD" color={C.green} />
      <SB x={18} y={72} w={155} h={34} name="Browser POST" detail="multipart" color={C.text} icon="◎" />
      <SB x={18} y={112} w={155} h={34} name="API: /upload" detail="Validate, store" color={C.green} icon="▲" />
      <Zn x={192} y={48} w={178} h={100} label="2. STORE" color={C.cyan} />
      <SB x={203} y={72} w={155} h={34} name="S3: PutObject" detail="PDF → SSE-S3" color={C.cyan} icon="◫" />
      <SB x={203} y={112} w={155} h={34} name="RDS: INSERT" detail="status=parsing" color={C.cyan} icon="⊞" />
      <Cn x1={174} y1={129} x2={203} y2={89} color={C.cyan} />
      <Zn x={377} y={48} w={185} h={100} label="3. TRIGGER" color={C.purple} />
      <SB x={388} y={72} w={163} h={34} name="SQS: SendMsg" detail="StartExecution" color={C.purple} icon="◈" />
      <SB x={388} y={112} w={163} h={34} name="examId+s3Key" detail="→ Lambda" color={C.purple} icon="⟳" />
      <Cn x1={359} y1={129} x2={388} y2={89} color={C.purple} />

      <Zn x={7} y={160} w={765} h={155} label="4. STEP FUNCTIONS STATE MACHINE" color={C.purple} sub="Or single 15-min Lambda: 20 items × 22s = ~7 min. Start simple, add SM if needed." />
      <SB x={18} y={195} w={95} h={40} name="Lookup" detail="Λ 30s" color={C.purple} icon="⬡" />
      <SB x={123} y={195} w={95} h={40} name="Validate" detail="Λ 30s" color={C.green} icon="⊡" />
      <SB x={228} y={195} w={100} h={40} name="Parse" detail="Bedrock 300s" color={C.amber} icon="◈" />
      <Cn x1={113} y1={215} x2={123} y2={215} color={C.purple} />
      <Cn x1={218} y1={215} x2={228} y2={215} color={C.purple} />
      <Zn x={340} y={188} w={192} h={64} label="MAP STATE (per item)" color={C.amber} />
      <SB x={351} y={212} w={81} h={32} name="Wait 22s" detail="" color={C.orange} icon="⊙" />
      <SB x={442} y={212} w={81} h={32} name="Save" detail="" color={C.cyan} icon="⊞" />
      <Cn x1={328} y1={215} x2={351} y2={228} color={C.purple} />
      <Cn x1={433} y1={228} x2={442} y2={228} color={C.cyan} />
      <SB x={544} y={195} w={95} h={40} name="Complete" detail="Λ 30s" color={C.green} icon="◉" />
      <SB x={649} y={195} w={95} h={40} name="Backfill" detail="SQS msg" color={C.purple} icon="◈" />
      <Cn x1={533} y1={219} x2={544} y2={215} color={C.purple} />
      <Cn x1={639} y1={215} x2={649} y2={215} color={C.purple} />
      <text x={18} y={260} fontSize={7.5} fill={C.dim} fontFamily={MONO}>{"Bedrock: bedrock(\"us.anthropic.claude-sonnet-4-6-v1\") via @ai-sdk/amazon-bedrock"}</text>
      <text x={18} y={274} fontSize={7.5} fill={C.dim} fontFamily={MONO}>Voyage AI: voyage-law-2, 1024-dim. 22s rate limit. Through NAT Gateway.</text>
      <text x={18} y={288} fontSize={7.5} fill={C.dim} fontFamily={MONO}>{"Error: Step Fn Retry(3x) per state. Catch → SQS DLQ → CW Alarm."}</text>

      <text x={15} y={335} fontSize={11} fill={C.cyan} fontFamily={MONO} fontWeight="700">3 SQS-DRIVEN LAMBDAS (REPLACING INNGEST)</text>
      <Zn x={7} y={345} w={250} h={110} label="AUTO-MATCH EVIDENCE" color={C.purple} />
      <SB x={18} y={369} w={108} h={36} name="SQS: match" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={134} y={369} w={112} h={36} name="Lambda 300s" detail="pgvector" color={C.purple} icon="⟳" />
      <Cn x1={126} y1={387} x2={134} y2={387} color={C.purple} />
      <SB x={18} y={414} w={228} h={32} name="Voyage embed → cosine → INS" detail="" color={C.cyan} icon="⊞" />

      <Zn x={265} y={345} w={245} h={110} label="PROPAGATE EVIDENCE" color={C.purple} />
      <SB x={276} y={369} w={108} h={36} name="SQS: propagate" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={392} y={369} w={108} h={36} name="Lambda 60s" detail="Cross-exam" color={C.purple} icon="⟳" />
      <Cn x1={384} y1={387} x2={392} y2={387} color={C.purple} />
      <SB x={276} y={414} w={222} h={32} name="Find similar → pending" detail="" color={C.cyan} icon="⊞" />

      <Zn x={518} y={345} w={252} h={110} label="BACKFILL LINKS" color={C.purple} />
      <SB x={529} y={369} w={108} h={36} name="SQS: backfill" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={645} y={369} w={115} h={36} name="Lambda 120s" detail="Link evid" color={C.purple} icon="⟳" />
      <Cn x1={637} y1={387} x2={645} y2={387} color={C.purple} />
      <SB x={529} y={414} w={230} h={32} name="Match existing → link" detail="" color={C.cyan} icon="⊞" />

      <Zn x={7} y={468} w={765} h={150} label="MIGRATION MAP: INNGEST → AWS" color={C.orange} />
      <text x={22} y={495} fontSize={8.5} fill={C.orange} fontFamily={MONO} fontWeight="600">New: backend/src/queue/index.ts — SQS send replacing inngest.send()</text>
      <text x={22} y={513} fontSize={8.5} fill={C.dim} fontFamily={MONO}>6 call sites: exams/upload, evidence/route, items, auto-match, domains, parse</text>
      <text x={22} y={533} fontSize={8.5} fill={C.orange} fontFamily={MONO} fontWeight="600">Pattern mapping:</text>
      <text x={22} y={551} fontSize={8.5} fill={C.dim} fontFamily={MONO}>{"inngest.send(\"exam/parse\")     → sqs.sendMessage(queue, payload)"}</text>
      <text x={22} y={567} fontSize={8.5} fill={C.dim} fontFamily={MONO}>{"step.run(\"embed-item\")          → Lambda handler (no wrapper)"}</text>
      <text x={22} y={583} fontSize={8.5} fill={C.dim} fontFamily={MONO}>{"step.sleep(\"rate-limit\",\"22s\") → Step Fn Wait(22s) OR sleep(22000)"}</text>
      <text x={22} y={599} fontSize={8.5} fill={C.dim} fontFamily={MONO}>{"Inngest dashboard               → Step Fn console + CW Logs"}</text>
    </svg>
  );
}

function QueuesView() {
  return (
    <svg viewBox="0 0 780 500" style={{ width: "100%" }}>
      <text x={15} y={20} fontSize={11} fill={C.purple} fontFamily={MONO} fontWeight="700">SQS QUEUES (4 + 4 DLQs) + STEP FUNCTIONS</text>
      <Zn x={7} y={38} w={375} h={100} label="PARSE" color={C.purple} />
      <SB x={18} y={62} w={168} h={42} name="SQS: parse" detail="Standard, 14d" color={C.purple} icon="◈" />
      <SB x={196} y={62} w={168} h={42} name="DLQ: parse-dlq" detail="MaxReceive: 3" color={C.red} icon="⊘" />
      <Cn x1={186} y1={83} x2={196} y2={83} color={C.red} label="3 fails" />
      <SB x={18} y={112} w={345} h={22} name="Consumer: Step Fn SM or Lambda (15 min)" detail="" color={C.purple} icon="⟳" />

      <Zn x={392} y={38} w={375} h={100} label="MATCH" color={C.purple} />
      <SB x={403} y={62} w={168} h={42} name="SQS: match" detail="Standard, SSE" color={C.purple} icon="◈" />
      <SB x={581} y={62} w={168} h={42} name="DLQ: match-dlq" detail="MaxReceive: 3" color={C.red} icon="⊘" />
      <Cn x1={571} y1={83} x2={581} y2={83} color={C.red} label="3 fails" />
      <SB x={403} y={112} w={345} h={22} name="Consumer: Lambda auto-match (300s)" detail="" color={C.purple} icon="⟳" />

      <Zn x={7} y={148} w={375} h={100} label="BACKFILL" color={C.purple} />
      <SB x={18} y={172} w={168} h={42} name="SQS: backfill" detail="Standard, SSE" color={C.purple} icon="◈" />
      <SB x={196} y={172} w={168} h={42} name="DLQ: backfill-dlq" detail="MaxReceive: 3" color={C.red} icon="⊘" />
      <Cn x1={186} y1={193} x2={196} y2={193} color={C.red} label="3 fails" />
      <SB x={18} y={222} w={345} h={22} name="Consumer: Lambda backfill (120s)" detail="" color={C.purple} icon="⟳" />

      <Zn x={392} y={148} w={375} h={100} label="EMAIL" color={C.orange} />
      <SB x={403} y={172} w={168} h={42} name="SQS: email" detail="Standard, SSE" color={C.orange} icon="✉" />
      <SB x={581} y={172} w={168} h={42} name="DLQ: email-dlq" detail="MaxReceive: 3" color={C.red} icon="⊘" />
      <Cn x1={571} y1={193} x2={581} y2={193} color={C.red} label="3 fails" />
      <SB x={403} y={222} w={345} h={22} name="Consumer: Lambda email (30s, SES)" detail="" color={C.orange} icon="⟳" />

      <Zn x={7} y={260} w={760} h={100} label="STEP FUNCTIONS: ExamParsing" color={C.purple} sub="Start simple: single Lambda first. Add SM when visibility matters." />
      <SB x={18} y={294} w={95} h={32} name="Lookup" detail="Λ 30s" color={C.purple} icon="⬡" />
      <SB x={123} y={294} w={95} h={32} name="Validate" detail="Λ 30s" color={C.green} icon="⊡" />
      <SB x={228} y={294} w={95} h={32} name="Parse" detail="Λ 300s" color={C.amber} icon="◈" />
      <SB x={333} y={294} w={120} h={32} name="Map+Save" detail="Per item" color={C.cyan} icon="⟳" />
      <SB x={463} y={294} w={95} h={32} name="Complete" detail="Λ 30s" color={C.green} icon="◉" />
      <SB x={568} y={294} w={95} h={32} name="Backfill" detail="SQS msg" color={C.purple} icon="◈" />
      <Cn x1={113} y1={310} x2={123} y2={310} color={C.purple} />
      <Cn x1={218} y1={310} x2={228} y2={310} color={C.purple} />
      <Cn x1={323} y1={310} x2={333} y2={310} color={C.purple} />
      <Cn x1={453} y1={310} x2={463} y2={310} color={C.purple} />
      <Cn x1={558} y1={310} x2={568} y2={310} color={C.purple} />
      <text x={18} y={349} fontSize={7.5} fill={C.green} fontFamily={MONO}>{"Decision: \"Start with single Lambda. Add Step Functions only if needed.\""}</text>

      <Zn x={7} y={372} w={760} h={120} label="CLOUDWATCH ALARMS" color={C.orange} />
      <SB x={18} y={396} w={175} h={40} name="DLQ Depth > 0" detail="Any DLQ → alert" color={C.red} icon="⊛" />
      <SB x={203} y={396} w={175} h={40} name="Λ Errors > 3/5m" detail="Per-function" color={C.red} icon="⊛" />
      <SB x={388} y={396} w={175} h={40} name="ECS CPU > 80%" detail="+ tasks < 1" color={C.orange} icon="⊙" />
      <SB x={573} y={396} w={175} h={40} name="ALB 5xx > 10/5m" detail="+ RDS CPU" color={C.orange} icon="⊙" />
      <text x={18} y={460} fontSize={7.5} fill={C.dim} fontFamily={MONO}>All alarms → SNS → email. CW Logs: /ecs/verity-app + /aws/lambda/verity-* (30d).</text>
      <text x={18} y={475} fontSize={7.5} fill={C.dim} fontFamily={MONO}>CDK Pipelines deploy = CC8.1 audit. WAF + CF logs = CC6.6 evidence.</text>
    </svg>
  );
}

function CICDView() {
  return (
    <svg viewBox="0 0 780 600" style={{ width: "100%" }}>
      <text x={15} y={20} fontSize={11} fill={C.orange} fontFamily={MONO} fontWeight="700">CI/CD: GITHUB ACTIONS + CDK PIPELINES</text>
      <text x={15} y={36} fontSize={8} fill={C.dim} fontFamily={SANS}>App CI in GitHub Actions (OIDC → ECR). Infra deploy via CDK Pipelines (self-mutating).</text>

      <Zn x={7} y={48} w={765} h={100} label="TRACK 1 — APP CI (GITHUB ACTIONS)" color={C.yellow} sub=".github/workflows/ci.yml — on PR and push to main" />
      <SB x={18} y={82} w={85} h={44} name="PR/Push" detail="to main" color={C.yellow} icon="⬡" />
      <SB x={112} y={82} w={82} h={44} name="Lint+tsc" detail="Types" color={C.yellow} icon="⚙" />
      <SB x={203} y={82} w={78} h={44} name="Test" detail="vitest" color={C.yellow} icon="◎" />
      <SB x={290} y={82} w={78} h={44} name="E2E" detail="Playwright" color={C.yellow} icon="⊹" />
      <SB x={377} y={82} w={85} h={44} name="OIDC" detail="Assume role" color={C.yellow} icon="⊗" />
      <SB x={471} y={82} w={88} h={44} name="Docker+ECR" detail="SHA-tagged" color={C.orange} icon="◧" />
      <SB x={568} y={82} w={88} h={44} name="ECS Deploy" detail="Force deploy" color={C.green} icon="▷" />
      <SB x={665} y={82} w={85} h={44} name="Health" detail="/api/health" color={C.green} icon="◉" />
      <Cn x1={103} y1={104} x2={112} y2={104} color={C.yellow} />
      <Cn x1={194} y1={104} x2={203} y2={104} color={C.yellow} />
      <Cn x1={281} y1={104} x2={290} y2={104} color={C.yellow} />
      <Cn x1={368} y1={104} x2={377} y2={104} color={C.yellow} />
      <Cn x1={462} y1={104} x2={471} y2={104} color={C.yellow} />
      <Cn x1={559} y1={104} x2={568} y2={104} color={C.orange} />
      <Cn x1={656} y1={104} x2={665} y2={104} color={C.green} />

      <Zn x={7} y={158} w={765} h={130} label="TRACK 2 — INFRA (CDK PIPELINES)" color={C.pink} sub="Self-mutating: pipeline definition in infra/ auto-updates on next run." />
      <SB x={18} y={192} w={96} h={44} name="Source" detail="GitHub main" color={C.pink} icon="⬡" />
      <SB x={124} y={192} w={89} h={44} name="cdk synth" detail="Generate CFN" color={C.pink} icon="◇" />
      <SB x={223} y={192} w={81} h={44} name="cdk-nag" detail="Policy gate" color={C.red} icon="⊘" />
      <SB x={314} y={192} w={89} h={44} name="Self-Mutate" detail="Update pipe" color={C.pink} icon="⟳" />
      <Cn x1={114} y1={214} x2={124} y2={214} color={C.pink} />
      <Cn x1={213} y1={214} x2={223} y2={214} color={C.pink} />
      <Cn x1={304} y1={214} x2={314} y2={214} color={C.red} />

      <SB x={18} y={250} w={163} h={24} name="Deploy → Staging" detail="" color={C.green} icon="▷" />
      <SB x={192} y={250} w={126} h={24} name="Smoke Tests" detail="" color={C.yellow} icon="◎" />
      <SB x={329} y={250} w={133} h={24} name="ManualApproval" detail="" color={C.orange} icon="⊙" />
      <SB x={474} y={250} w={163} h={24} name="Deploy → Prod" detail="" color={C.green} icon="◉" />
      <Cn x1={403} y1={214} x2={100} y2={250} color={C.pink} />
      <Cn x1={181} y1={262} x2={192} y2={262} color={C.green} />
      <Cn x1={318} y1={262} x2={329} y2={262} color={C.yellow} />
      <Cn x1={462} y1={262} x2={474} y2={262} color={C.orange} />

      <Zn x={7} y={298} w={765} h={140} label="DNS CUTOVER — BLUE-GREEN VIA CLOUDFRONT" color={C.green} sub="Vercel stays live as rollback. Cloudflare CNAME → CloudFront. Proxy off." />
      <SB x={18} y={332} w={175} h={44} name="1. TTL → 60s" detail="24h before cutover" color={C.orange} icon="◎" />
      <SB x={203} y={332} w={175} h={44} name="2. Data sync" detail="pg_dump + s3 sync" color={C.cyan} icon="⊞" />
      <SB x={388} y={332} w={178} h={44} name="3. Switch CF" detail="CNAME → d1234.cf" color={C.green} icon="⇌" />
      <SB x={576} y={332} w={175} h={44} name="4. Verify" detail="Auth, upload, parse" color={C.green} icon="◉" />
      <Cn x1={193} y1={354} x2={203} y2={354} color={C.orange} />
      <Cn x1={378} y1={354} x2={388} y2={354} color={C.cyan} />
      <Cn x1={566} y1={354} x2={576} y2={354} color={C.green} />
      <SB x={18} y={392} w={355} h={36} name="5. Rollback: CNAME → vercel (~60s)" detail="Sessions survive — same domain" color={C.orange} icon="⟳" />
      <SB x={388} y={392} w={363} h={36} name="6. After 1 week: cancel old services" detail="Remove env vars, delete projects" color={C.red} icon="⊘" />

      <Zn x={7} y={448} w={765} h={145} label="SOC 2 EVIDENCE GENERATED BY CI/CD" color={C.orange} />
      <SB x={18} y={475} w={140} h={40} name="Git commits" detail="Who changed what" color={C.yellow} icon="⬡" />
      <SB x={168} y={475} w={140} h={40} name="PR reviews" detail="Approver + notes" color={C.yellow} icon="⊘" />
      <SB x={318} y={475} w={140} h={40} name="CFN changeset" detail="cdk diff output" color={C.pink} icon="△" />
      <SB x={468} y={475} w={140} h={40} name="Pipeline exec" detail="Timestamps" color={C.orange} icon="◉" />
      <SB x={618} y={475} w={135} h={40} name="Approval log" detail="Who approved" color={C.orange} icon="⊙" />
      <SB x={18} y={525} w={140} h={40} name="cdk-nag report" detail="Compliance" color={C.red} icon="⊡" />
      <SB x={168} y={525} w={140} h={40} name="ECR digest" detail="Immutable image" color={C.orange} icon="◧" />
      <SB x={318} y={525} w={140} h={40} name="WAF+CF logs" detail="CC6.6 evidence" color={C.blue} icon="◈" />
      <SB x={468} y={525} w={140} h={40} name="CloudTrail" detail="API audit" color={C.orange} icon="◎" />
      <SB x={618} y={525} w={135} h={40} name="Test reports" detail="Unit + E2E" color={C.yellow} icon="◎" />
      <text x={18} y={585} fontSize={7.5} fill={C.dim} fontFamily={MONO}>CDK Pipelines + ManualApproval + CFN = CC8.1. WAF/CF logs = CC6.6. CloudTrail = CC6.1/CC7.2.</text>
    </svg>
  );
}

const VIEWS: Record<string, React.ReactNode> = {
  overview: <OverviewView />,
  network: <NetworkView />,
  data: <DataFlowView />,
  queues: <QueuesView />,
  cicd: <CICDView />,
};

const LEGEND = [
  { color: C.green, label: "Compute" },
  { color: C.cyan, label: "Data" },
  { color: C.purple, label: "SQS+Lambda" },
  { color: C.amber, label: "Bedrock" },
  { color: C.blue, label: "Edge (CF+WAF)" },
  { color: C.red, label: "Security" },
  { color: C.orange, label: "CI/CD" },
  { color: C.pink, label: "CDK Pipelines" },
];

export function AWSDetailedDiagram() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="not-prose my-6" style={{ fontFamily: SANS, color: C.text }}>
      <div style={{ background: C.bg, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}` }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: MONO, color: C.green, margin: 0 }}>DETAILED INFRASTRUCTURE VIEW</h3>
          <p style={{ fontSize: 11, color: C.dim, margin: "4px 0 0" }}>Deep dive into each architectural layer. Click tabs for network topology, data flows, queues, and CI/CD pipeline details.</p>
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "6px 14px",
                fontSize: 11,
                fontFamily: MONO,
                fontWeight: tab === t.id ? 700 : 500,
                color: tab === t.id ? t.color : C.dim,
                background: tab === t.id ? t.color + "15" : C.panel,
                border: `1px solid ${tab === t.id ? t.color + "40" : C.border}`,
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
          {VIEWS[tab]}
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 16, flexWrap: "wrap", padding: "8px 12px", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8 }}>
          {LEGEND.map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontSize: 10, color: C.dim, fontFamily: MONO }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
