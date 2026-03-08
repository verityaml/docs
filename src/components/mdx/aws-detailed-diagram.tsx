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
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={C.card} stroke={color + "50"} strokeWidth={1} />
      <rect x={x} y={y} width={4} height={h} rx={2} fill={color} />
      {icon && <text x={x + 14} y={y + 20} fontSize={12} fill={color}>{icon}</text>}
      <text x={x + (icon ? 30 : 14)} y={y + 20} fontSize={11} fill={C.text} fontWeight="600" fontFamily={MONO}>{name}</text>
      <text x={x + (icon ? 30 : 14)} y={y + 36} fontSize={9} fill={C.dim} fontFamily={SANS}>{detail}</text>
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
    <svg viewBox="0 0 1080 760" style={{ width: "100%" }}>
      <Zn x={10} y={5} w={1060} h={68} label="EDGE — CLOUDFLARE DNS + CLOUDFRONT + WAF" color={C.blue} />
      <SB x={30} y={30} w={130} h={34} name="Cloudflare DNS" detail="app.verityaml.com" color={C.blue} icon="◎" />
      <SB x={175} y={30} w={130} h={34} name="CloudFront" detail="CDN + Shield + cache" color={C.blue} icon="◈" />
      <SB x={320} y={30} w={110} h={34} name="WAF" detail="OWASP Top 10" color={C.red} icon="⊘" />
      <SB x={445} y={30} w={90} h={34} name="ACM" detail="TLS certs" color={C.blue} icon="⊗" />
      <SB x={550} y={30} w={140} h={34} name="ALB" detail="Origin for CF" color={C.blue} icon="⇌" port=":443" />
      <Cn x1={160} y1={47} x2={175} y2={47} color={C.blue} />
      <Cn x1={305} y1={47} x2={320} y2={47} color={C.blue} />
      <Cn x1={430} y1={47} x2={445} y2={47} color={C.blue} />
      <Cn x1={535} y1={47} x2={550} y2={47} color={C.blue} />
      <SB x={720} y={30} w={160} h={34} name="CDK Pipelines" detail="Self-mutating deploy" color={C.pink} icon="◇" />
      <SB x={895} y={30} w={160} h={34} name="GitHub Actions" detail="App CI + OIDC → ECR" color={C.orange} icon="⬡" />

      <Zn x={10} y={81} w={1060} h={460} label="VPC — 10.0.0.0/16 • US-EAST-1 • 1 NAT GATEWAY ($34/mo)" color={C.green} sub="CloudFront → ALB (origin, HTTPS-only). No direct internet access to ALB — sg-alb allows CloudFront IPs only." />

      <Zn x={25} y={115} w={440} h={210} label="PRIVATE SUBNET — COMPUTE" color={C.green} sub="ECS Fargate: 0.25 vCPU, 512MB ($9.50/mo)" />
      <SB x={40} y={148} w={200} h={48} name="Next.js 16 (ECS)" detail="App Router + API Routes + SSR" color={C.green} icon="▲" port=":3000" />
      <SB x={250} y={148} w={200} h={48} name="BetterAuth" detail="Sessions, RBAC, org tenancy" color={C.cyan} icon="⊡" />
      <SB x={40} y={208} w={200} h={48} name="Lambda: auto-match" detail="Evidence matching (300s)" color={C.purple} icon="⟳" />
      <SB x={250} y={208} w={200} h={48} name="Lambda: propagate" detail="Cross-obligation (60s)" color={C.purple} icon="⟳" />
      <SB x={40} y={268} w={200} h={28} name="Lambda: backfill" detail="Evidence links (120s)" color={C.purple} icon="⟳" />
      <SB x={250} y={268} w={200} h={28} name="Lambda: parse steps" detail="SM activities (30-300s)" color={C.purple} icon="⟳" />
      <Cn x1={620} y1={65} x2={140} y2={148} color={C.blue} label="target group :3000" />

      <Zn x={480} y={115} w={310} h={210} label="SQS + STEP FUNCTIONS" color={C.purple} />
      <SB x={495} y={138} w={140} h={38} name="SQS: parse" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={645} y={138} w={130} h={38} name="SQS: match" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={495} y={184} w={140} h={38} name="SQS: backfill" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={645} y={184} w={130} h={38} name="SQS: email" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={495} y={233} w={280} h={48} name="Step Functions: ExamParsing" detail="Lookup → Validate → Bedrock → Map → Complete" color={C.purple} icon="⟳" />
      <Cn x1={450} y1={232} x2={495} y2={157} color={C.purple} label="SendMessage" />

      <Zn x={25} y={338} w={765} h={190} label="PRIVATE SUBNET — DATA" color={C.cyan} />
      <SB x={40} y={363} w={235} h={48} name="RDS PostgreSQL 16" detail="db.t4g.micro, 20GB, pgvector ($13/mo)" color={C.cyan} icon="⊞" port=":5432" />
      <SB x={285} y={363} w={240} h={48} name="S3: verity-files-prod" detail="SSE-S3, block public, 365d Glacier" color={C.cyan} icon="◫" />
      <SB x={535} y={363} w={240} h={48} name="ECR" detail="Container images (SHA-tagged)" color={C.orange} icon="◧" />
      <SB x={40} y={421} w={235} h={48} name="pgvector + HNSW" detail="4 KB tables, 1024-dim embeddings" color={C.cyan} icon="◈" />
      <SB x={285} y={421} w={240} h={48} name="Drizzle ORM" detail="DATABASE_URL → RDS direct" color={C.cyan} icon="⇌" />
      <text x={40} y={491} fontSize={8} fill={C.dim} fontFamily={MONO}>No RDS Proxy • No ElastiCache • HNSW indexes transfer from Supabase intact</text>
      <Cn x1={140} y1={298} x2={157} y2={363} color={C.cyan} label=":5432" />
      <Cn x1={340} y1={298} x2={405} y2={363} color={C.cyan} label="S3 SDK" />

      <Zn x={805} y={115} w={255} h={413} label="SECURITY" color={C.red} />
      <SB x={820} y={138} w={225} h={36} name="Secrets Manager" detail="DB, auth, Voyage key ($2)" color={C.red} icon="⊘" />
      <SB x={820} y={182} w={225} h={36} name="Security Groups" detail="CF→ALB→ECS→RDS" color={C.green} icon="⊡" />
      <SB x={820} y={226} w={225} h={36} name="CloudTrail" detail="Free tier, account-level" color={C.orange} icon="◉" />
      <SB x={820} y={270} w={225} h={36} name="CW Alarms (×6)" detail="CPU, 5xx, DLQ, storage, tasks" color={C.orange} icon="⊛" />
      <SB x={820} y={314} w={225} h={36} name="IAM Roles" detail="ECS task + Lambda exec" color={C.red} icon="⊛" />
      <SB x={820} y={358} w={225} h={36} name="NAT Gateway" detail="1 AZ ($34) or inst ($3)" color={C.green} icon="⬡" />
      <SB x={820} y={402} w={225} h={36} name="Budget Alarm" detail="80% monthly spend" color={C.yellow} icon="⊙" />
      <SB x={820} y={446} w={225} h={36} name="WAF + CF Logs" detail="→ S3 for SOC 2 CC6.6" color={C.orange} icon="◎" />
      <SB x={820} y={490} w={225} h={36} name="CDK Pipeline History" detail="→ CC8.1 change mgmt" color={C.pink} icon="◇" />

      <Zn x={10} y={551} w={1060} h={97} label="EXTERNAL" color={C.dim} />
      <SB x={30} y={575} w={210} h={48} name="Bedrock (Claude)" detail="Vision parsing, IAM auth ($5-15)" color={C.amber} icon="◈" />
      <SB x={255} y={575} w={195} h={48} name="Voyage AI (kept)" detail="voyage-law-2 1024d, via NAT" color={C.dim} icon="⊹" />
      <SB x={465} y={575} w={140} h={48} name="SES" detail="Replaces Resend" color={C.dim} icon="✉" />
      <text x={625} y={595} fontSize={9} fill={C.green} fontFamily={MONO}>Bedrock: no API key (IAM). Voyage: legal-domain quality worth keeping.</text>
      <text x={625} y={610} fontSize={9} fill={C.dim} fontFamily={MONO}>Fallback: Anthropic API key in Secrets Manager during transition.</text>

      <Zn x={10} y={656} w={1060} h={45} label="COST: ~$120-150/mo (COVERED BY AWS CREDITS)" color={C.yellow} />
      <text x={30} y={682} fontSize={9} fill={C.dim} fontFamily={MONO}>ECS $9.50 • ALB $16.50 • RDS $13 • NAT $34 • CF ~$3 • WAF ~$6 • S3 $0.25 • SQS $0.01 • Lambda $0.10 • Secrets $2 • CW $3 • Bedrock $5-15</text>

      <Zn x={10} y={708} w={1060} h={45} label="CDK SINGLE STACK + CDK PIPELINES (SELF-MUTATING)" color={C.pink} />
      <text x={30} y={735} fontSize={9} fill={C.pink} fontFamily={MONO}>One stack: VPC + RDS + S3 + SQS(×8) + ECR + ALB + CF + WAF + ECS + Lambda(×4) + StepFn + Secrets + ACM (DNS on Cloudflare)</text>
      <text x={30} y={748} fontSize={9} fill={C.pink} fontFamily={MONO}>CDK Pipelines: Source → synth → cdk-nag → Staging (auto) → ManualApproval → Production</text>
    </svg>
  );
}

function NetworkView() {
  return (
    <svg viewBox="0 0 1080 580" style={{ width: "100%" }}>
      <Zn x={10} y={5} w={1060} h={50} label="EDGE" color={C.blue} />
      <text x={200} y={35} fontSize={11} fill={C.text} fontFamily={MONO}>Browser → Cloudflare DNS → CloudFront (CDN + Shield) → WAF (OWASP) → ALB (origin, HTTPS-only)</text>

      <Zn x={10} y={62} w={1060} h={510} label="VPC: 10.0.0.0/16 • us-east-1" color={C.green} sub="CloudFront → ALB: custom origin, HTTPS-only. sg-alb inbound: CloudFront managed prefix list only." />

      <Zn x={30} y={95} w={505} h={465} label="AZ-A (us-east-1a)" color={C.blue} />
      <Zn x={45} y={118} w={475} h={75} label="PUBLIC SUBNET A • 10.0.1.0/24" color={C.blue} />
      <SB x={60} y={142} w={140} h={38} name="ALB (ENI)" detail="Origin for CloudFront" color={C.blue} icon="⇌" port=":443" />
      <SB x={215} y={142} w={160} h={38} name="NAT Gateway" detail="Single AZ ($34/mo)" color={C.green} icon="⬡" />
      <text x={390} y={161} fontSize={8} fill={C.dim} fontFamily={MONO}>No bastion initially</text>

      <Zn x={45} y={203} w={475} h={160} label="PRIVATE SUBNET A — COMPUTE • 10.0.10.0/24" color={C.green} />
      <SB x={60} y={230} w={220} h={46} name="ECS: verity-app" detail="Next.js standalone container" color={C.green} icon="▲" port=":3000" />
      <SB x={295} y={230} w={210} h={46} name="Lambda (×4)" detail="VPC-attached, sg-lambda" color={C.purple} icon="⟳" />
      <text x={60} y={298} fontSize={8} fill={C.dim} fontFamily={MONO}>sg-ecs: in :3000 from sg-alb • out: :5432 (RDS), :443 (NAT)</text>
      <text x={60} y={310} fontSize={8} fill={C.dim} fontFamily={MONO}>sg-lambda: no inbound • out: :5432 (RDS), :443 (NAT)</text>
      <text x={60} y={325} fontSize={8} fill={C.dim} fontFamily={MONO}>sg-alb: in :443 from CloudFront prefix list ONLY</text>

      <Zn x={45} y={373} w={475} h={100} label="PRIVATE SUBNET A — DATA • 10.0.20.0/24" color={C.cyan} />
      <SB x={60} y={398} w={220} h={46} name="RDS PostgreSQL 16" detail="db.t4g.micro, 20GB gp3" color={C.cyan} icon="⊞" port=":5432" />
      <SB x={295} y={398} w={210} h={46} name="pgvector + HNSW" detail="4 KB tables, 1024-dim" color={C.cyan} icon="◈" />
      <text x={60} y={460} fontSize={8} fill={C.dim} fontFamily={MONO}>sg-rds: in :5432 from sg-ecs + sg-lambda only</text>

      <Zn x={545} y={95} w={510} h={375} label="AZ-B (us-east-1b)" color={C.blue} />
      <Zn x={560} y={118} w={480} h={75} label="PUBLIC SUBNET B • 10.0.2.0/24" color={C.blue} />
      <SB x={575} y={142} w={140} h={38} name="ALB (ENI)" detail="Cross-zone LB" color={C.blue} icon="⇌" />
      <text x={730} y={161} fontSize={8} fill={C.dim} fontFamily={MONO}>No NAT in AZ-b yet</text>

      <Zn x={560} y={203} w={480} h={110} label="PRIVATE B — COMPUTE • 10.0.11.0/24 (RESERVED)" color={C.green} />
      <text x={575} y={248} fontSize={10} fill={C.dim} fontFamily={MONO}>{"Empty — scale target when min tasks > 1"}</text>
      <text x={575} y={265} fontSize={9} fill={C.dim} fontFamily={SANS}>ECS auto-places across AZs when desiredCount increases</text>

      <Zn x={560} y={323} w={480} h={70} label="PRIVATE B — DATA • 10.0.21.0/24 (RESERVED)" color={C.cyan} />
      <text x={575} y={365} fontSize={10} fill={C.dim} fontFamily={MONO}>RDS Multi-AZ standby (if enabled, +$13/mo)</text>

      <Zn x={545} y={480} w={510} h={85} label="KEY: CLOUDFRONT SECURITY BENEFIT" color={C.blue} />
      <text x={560} y={505} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">sg-alb uses CloudFront managed prefix list</text>
      <text x={560} y={520} fontSize={9} fill={C.dim} fontFamily={SANS}>ALB not directly accessible from internet — only CloudFront IPs inbound.</text>
      <text x={560} y={535} fontSize={9} fill={C.dim} fontFamily={SANS}>WAF rules evaluated at edge before traffic reaches VPC.</text>
      <text x={560} y={550} fontSize={9} fill={C.dim} fontFamily={SANS}>DNS cutover: Cloudflare CNAME → CloudFront distribution, proxy off. Not ALB directly.</text>

      <Cn x1={130} y1={180} x2={170} y2={230} color={C.blue} label="target group" />
      <Cn x1={170} y1={310} x2={170} y2={398} color={C.cyan} label=":5432" />
    </svg>
  );
}

function DataFlowView() {
  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.cyan} fontFamily={MONO} fontWeight="700">DATA FLOW: EXAM PARSING (SQS + STEP FUNCTIONS + BEDROCK)</text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>Inngest parse-examination → Step Functions SM (or single 15-min Lambda). Bedrock Claude via @ai-sdk/amazon-bedrock.</text>

      <Zn x={10} y={48} w={240} h={90} label="1. UPLOAD" color={C.green} />
      <SB x={25} y={72} w={210} h={26} name="Browser POST" detail="multipart/form-data" color={C.text} icon="◎" />
      <SB x={25} y={106} w={210} h={26} name="API: /upload" detail="Validate, store, create record" color={C.green} icon="▲" />
      <Zn x={260} y={48} w={240} h={90} label="2. STORE" color={C.cyan} />
      <SB x={275} y={72} w={210} h={26} name="S3: PutObject" detail="PDF → SSE-S3" color={C.cyan} icon="◫" />
      <SB x={275} y={106} w={210} h={26} name="RDS: INSERT" detail="exam status=parsing" color={C.cyan} icon="⊞" />
      <Cn x1={235} y1={119} x2={275} y2={85} color={C.cyan} />
      <Zn x={510} y={48} w={260} h={90} label="3. TRIGGER" color={C.purple} />
      <SB x={525} y={72} w={230} h={26} name="SQS: SendMessage" detail="or StartExecution(SM)" color={C.purple} icon="◈" />
      <SB x={525} y={106} w={230} h={26} name="Payload: examId + s3Key" detail="→ Lambda consumer" color={C.purple} icon="⟳" />
      <Cn x1={485} y1={119} x2={525} y2={85} color={C.purple} />

      <Zn x={10} y={150} w={1060} h={155} label="4. STEP FUNCTIONS STATE MACHINE" color={C.purple} sub="Or single 15-min Lambda: 20 items × 22s rate limit = ~7 min. Start simple, add SM if needed." />
      <SB x={25} y={185} w={120} h={40} name="LookupConfig" detail="Lambda 30s" color={C.purple} icon="⬡" />
      <SB x={158} y={185} w={120} h={40} name="Validate" detail="Lambda 30s" color={C.green} icon="⊡" />
      <SB x={291} y={185} w={155} h={40} name="DownloadParse" detail="Bedrock Claude 300s" color={C.amber} icon="◈" />
      <Cn x1={145} y1={205} x2={158} y2={205} color={C.purple} />
      <Cn x1={278} y1={205} x2={291} y2={205} color={C.purple} />
      <Zn x={460} y={178} w={260} h={64} label="MAP STATE (per item)" color={C.amber} />
      <SB x={475} y={202} w={110} h={32} name="Wait(22s)" detail="Voyage rate limit" color={C.orange} icon="⊙" />
      <SB x={598} y={202} w={110} h={32} name="SaveItem" detail="Embed+KB+INSERT" color={C.cyan} icon="⊞" />
      <Cn x1={446} y1={205} x2={475} y2={218} color={C.purple} />
      <Cn x1={585} y1={218} x2={598} y2={218} color={C.cyan} />
      <SB x={735} y={185} w={110} h={40} name="Complete" detail="Lambda 30s" color={C.green} icon="◉" />
      <SB x={858} y={185} w={120} h={40} name="Backfill" detail="SQS trigger" color={C.purple} icon="◈" />
      <Cn x1={720} y1={209} x2={735} y2={205} color={C.purple} />
      <Cn x1={845} y1={205} x2={858} y2={205} color={C.purple} />
      <text x={25} y={250} fontSize={8} fill={C.dim} fontFamily={MONO}>{"Bedrock: bedrock(\"us.anthropic.claude-sonnet-4-6-v1\") via @ai-sdk/amazon-bedrock"}</text>
      <text x={25} y={264} fontSize={8} fill={C.dim} fontFamily={MONO}>Voyage AI: voyage-law-2, 1024-dim embeddings. 22s rate limit. Through NAT Gateway.</text>
      <text x={25} y={278} fontSize={8} fill={C.dim} fontFamily={MONO}>{"Error: Step Functions Retry(3x) per state. Catch → SQS DLQ → CW Alarm (DLQ depth > 0)."}</text>

      <text x={20} y={325} fontSize={12} fill={C.cyan} fontFamily={MONO} fontWeight="700">3 SQS-DRIVEN LAMBDAS (REPLACING INNGEST)</text>
      <Zn x={10} y={335} w={350} h={110} label="AUTO-MATCH EVIDENCE" color={C.purple} />
      <SB x={25} y={359} w={150} h={36} name="SQS: match" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={185} y={359} w={160} h={36} name="Lambda: 300s" detail="Embed+pgvector match" color={C.purple} icon="⟳" />
      <Cn x1={175} y1={377} x2={185} y2={377} color={C.purple} />
      <SB x={25} y={404} w={320} h={32} name="Voyage embed → cosine → INSERT" detail="" color={C.cyan} icon="⊞" />

      <Zn x={370} y={335} w={340} h={110} label="PROPAGATE EVIDENCE" color={C.purple} />
      <SB x={385} y={359} w={150} h={36} name="SQS: propagate" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={545} y={359} w={150} h={36} name="Lambda: 60s" detail="Cross-obligation" color={C.purple} icon="⟳" />
      <Cn x1={535} y1={377} x2={545} y2={377} color={C.purple} />
      <SB x={385} y={404} w={310} h={32} name="Find similar → create pending_review" detail="" color={C.cyan} icon="⊞" />

      <Zn x={720} y={335} w={350} h={110} label="BACKFILL LINKS" color={C.purple} />
      <SB x={735} y={359} w={150} h={36} name="SQS: backfill" detail="+ DLQ" color={C.purple} icon="◈" />
      <SB x={895} y={359} w={160} h={36} name="Lambda: 120s" detail="Link evidence" color={C.purple} icon="⟳" />
      <Cn x1={885} y1={377} x2={895} y2={377} color={C.purple} />
      <SB x={735} y={404} w={320} h={32} name="Match existing evidence → auto-link" detail="" color={C.cyan} icon="⊞" />

      <Zn x={10} y={458} w={1060} h={150} label="MIGRATION MAP: INNGEST → AWS" color={C.orange} />
      <text x={30} y={485} fontSize={9} fill={C.orange} fontFamily={MONO} fontWeight="600">New file: backend/src/queue/index.ts — SQS send abstraction replacing inngest.send()</text>
      <text x={30} y={505} fontSize={9} fill={C.dim} fontFamily={MONO}>6 call sites: examinations/upload, evidence/route, items/evidence, auto-match, domains/evidence, parse-examination</text>
      <text x={30} y={525} fontSize={9} fill={C.orange} fontFamily={MONO} fontWeight="600">Pattern mapping:</text>
      <text x={30} y={543} fontSize={9} fill={C.dim} fontFamily={MONO}>{"inngest.send(\"exam/parse\")         → sqs.sendMessage(parse-queue, payload)"}</text>
      <text x={30} y={560} fontSize={9} fill={C.dim} fontFamily={MONO}>{"step.run(\"embed-item\")              → Lambda handler (remove step.run wrapper)"}</text>
      <text x={30} y={577} fontSize={9} fill={C.dim} fontFamily={MONO}>{"step.sleep(\"rate-limit\", \"22s\")     → Step Functions Wait(22s) OR await sleep(22000)"}</text>
      <text x={30} y={594} fontSize={9} fill={C.dim} fontFamily={MONO}>{"Inngest dashboard                   → Step Functions console + CloudWatch Logs"}</text>
    </svg>
  );
}

function QueuesView() {
  return (
    <svg viewBox="0 0 1080 500" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.purple} fontFamily={MONO} fontWeight="700">SQS QUEUES (4 + 4 DLQs) + STEP FUNCTIONS</text>
      <Zn x={10} y={38} w={520} h={100} label="PARSE" color={C.purple} />
      <SB x={25} y={62} w={235} h={42} name="SQS: verity-parse" detail="Standard, 14d retention, SSE" color={C.purple} icon="◈" />
      <SB x={275} y={62} w={235} h={42} name="DLQ: verity-parse-dlq" detail="MaxReceiveCount: 3" color={C.red} icon="⊘" />
      <Cn x1={260} y1={83} x2={275} y2={83} color={C.red} label="3 fails" />
      <SB x={25} y={112} w={490} h={22} name="Consumer: Step Functions SM or single Lambda (15 min)" detail="" color={C.purple} icon="⟳" />

      <Zn x={550} y={38} w={520} h={100} label="MATCH" color={C.purple} />
      <SB x={565} y={62} w={235} h={42} name="SQS: verity-match" detail="Standard, SSE" color={C.purple} icon="◈" />
      <SB x={815} y={62} w={235} h={42} name="DLQ: verity-match-dlq" detail="MaxReceiveCount: 3" color={C.red} icon="⊘" />
      <Cn x1={800} y1={83} x2={815} y2={83} color={C.red} label="3 fails" />
      <SB x={565} y={112} w={490} h={22} name="Consumer: Lambda verity-auto-match (300s)" detail="" color={C.purple} icon="⟳" />

      <Zn x={10} y={148} w={520} h={100} label="BACKFILL" color={C.purple} />
      <SB x={25} y={172} w={235} h={42} name="SQS: verity-backfill" detail="Standard, SSE" color={C.purple} icon="◈" />
      <SB x={275} y={172} w={235} h={42} name="DLQ: verity-backfill-dlq" detail="MaxReceiveCount: 3" color={C.red} icon="⊘" />
      <Cn x1={260} y1={193} x2={275} y2={193} color={C.red} label="3 fails" />
      <SB x={25} y={222} w={490} h={22} name="Consumer: Lambda verity-backfill-links (120s)" detail="" color={C.purple} icon="⟳" />

      <Zn x={550} y={148} w={520} h={100} label="EMAIL" color={C.orange} />
      <SB x={565} y={172} w={235} h={42} name="SQS: verity-email" detail="Standard, SSE" color={C.orange} icon="✉" />
      <SB x={815} y={172} w={235} h={42} name="DLQ: verity-email-dlq" detail="MaxReceiveCount: 3" color={C.red} icon="⊘" />
      <Cn x1={800} y1={193} x2={815} y2={193} color={C.red} label="3 fails" />
      <SB x={565} y={222} w={490} h={22} name="Consumer: Lambda verity-send-email (30s, SES)" detail="" color={C.orange} icon="⟳" />

      <Zn x={10} y={260} w={1060} h={100} label="STEP FUNCTIONS: ExamParsing" color={C.purple} sub="Start simple: single Lambda first. Add SM when orchestration visibility matters." />
      <SB x={25} y={294} w={108} h={32} name="LookupCfg" detail="Λ 30s" color={C.purple} icon="⬡" />
      <SB x={143} y={294} w={100} h={32} name="Validate" detail="Λ 30s" color={C.green} icon="⊡" />
      <SB x={253} y={294} w={130} h={32} name="ParseBedrock" detail="Λ 300s" color={C.amber} icon="◈" />
      <SB x={393} y={294} w={175} h={32} name="Map[Wait(22s)+Save]" detail="Per item" color={C.cyan} icon="⟳" />
      <SB x={578} y={294} w={105} h={32} name="Complete" detail="Λ 30s" color={C.green} icon="◉" />
      <SB x={693} y={294} w={110} h={32} name="Backfill" detail="SQS msg" color={C.purple} icon="◈" />
      <Cn x1={133} y1={310} x2={143} y2={310} color={C.purple} />
      <Cn x1={243} y1={310} x2={253} y2={310} color={C.purple} />
      <Cn x1={383} y1={310} x2={393} y2={310} color={C.purple} />
      <Cn x1={568} y1={310} x2={578} y2={310} color={C.purple} />
      <Cn x1={683} y1={310} x2={693} y2={310} color={C.purple} />
      <text x={25} y={349} fontSize={8} fill={C.green} fontFamily={MONO}>{"Decision: \"Start with single Lambda. Add Step Functions only if needed.\""}</text>

      <Zn x={10} y={372} w={1060} h={120} label="CLOUDWATCH ALARMS" color={C.orange} />
      <SB x={25} y={396} w={245} h={40} name="DLQ Depth > 0" detail="Any DLQ → alert immediately" color={C.red} icon="⊛" />
      <SB x={285} y={396} w={245} h={40} name="Lambda Errors > 3 (5min)" detail="Per-function error rate" color={C.red} icon="⊛" />
      <SB x={545} y={396} w={245} h={40} name="ECS CPU > 80% (5min)" detail="+ ECS tasks < 1 (2min)" color={C.orange} icon="⊙" />
      <SB x={805} y={396} w={250} h={40} name="ALB 5xx > 10 (5min)" detail="+ RDS CPU, storage, budget" color={C.orange} icon="⊙" />
      <text x={25} y={460} fontSize={8} fill={C.dim} fontFamily={MONO}>All alarms → SNS → email. CW Logs: /ecs/verity-app + /aws/lambda/verity-* (30d retention).</text>
      <text x={25} y={475} fontSize={8} fill={C.dim} fontFamily={MONO}>CDK Pipelines deploy history = CC8.1 audit trail. WAF + CF logs = CC6.6 evidence.</text>
    </svg>
  );
}

function CICDView() {
  return (
    <svg viewBox="0 0 1080 600" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.orange} fontFamily={MONO} fontWeight="700">CI/CD: GITHUB ACTIONS (APP) + CDK PIPELINES (INFRA)</text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>App CI in GitHub Actions (OIDC → ECR). Infra deploy via CDK Pipelines (self-mutating CodePipeline).</text>

      <Zn x={10} y={48} w={1060} h={100} label="TRACK 1 — APP CI (GITHUB ACTIONS)" color={C.yellow} sub=".github/workflows/ci.yml — on PR and push to main" />
      <SB x={25} y={82} w={120} h={44} name="PR / Push" detail="to main" color={C.yellow} icon="⬡" />
      <SB x={158} y={82} w={115} h={44} name="Lint + tsc" detail="Type check" color={C.yellow} icon="⚙" />
      <SB x={286} y={82} w={110} h={44} name="Unit Tests" detail="vitest" color={C.yellow} icon="◎" />
      <SB x={409} y={82} w={110} h={44} name="E2E" detail="Playwright" color={C.yellow} icon="⊹" />
      <SB x={532} y={82} w={120} h={44} name="OIDC Auth" detail="Assume role" color={C.yellow} icon="⊗" />
      <SB x={665} y={82} w={125} h={44} name="Docker+ECR" detail="SHA-tagged push" color={C.orange} icon="◧" />
      <SB x={803} y={82} w={125} h={44} name="ECS Update" detail="Force deploy" color={C.green} icon="▷" />
      <SB x={941} y={82} w={115} h={44} name="Health ✓" detail="/api/health" color={C.green} icon="◉" />
      <Cn x1={145} y1={104} x2={158} y2={104} color={C.yellow} />
      <Cn x1={273} y1={104} x2={286} y2={104} color={C.yellow} />
      <Cn x1={396} y1={104} x2={409} y2={104} color={C.yellow} />
      <Cn x1={519} y1={104} x2={532} y2={104} color={C.yellow} />
      <Cn x1={652} y1={104} x2={665} y2={104} color={C.yellow} />
      <Cn x1={790} y1={104} x2={803} y2={104} color={C.orange} />
      <Cn x1={928} y1={104} x2={941} y2={104} color={C.green} />

      <Zn x={10} y={158} w={1060} h={130} label="TRACK 2 — INFRA DEPLOY (CDK PIPELINES → CODEPIPELINE)" color={C.pink} sub="Self-mutating: pipeline definition in infra/ auto-updates on next run." />
      <SB x={25} y={192} w={130} h={44} name="Source" detail="GitHub main" color={C.pink} icon="⬡" />
      <SB x={168} y={192} w={120} h={44} name="cdk synth" detail="Generate CFN" color={C.pink} icon="◇" />
      <SB x={301} y={192} w={110} h={44} name="cdk-nag" detail="Policy gate" color={C.red} icon="⊘" />
      <SB x={424} y={192} w={120} h={44} name="Self-Mutate" detail="Update pipeline" color={C.pink} icon="⟳" />
      <Cn x1={155} y1={214} x2={168} y2={214} color={C.pink} />
      <Cn x1={288} y1={214} x2={301} y2={214} color={C.pink} />
      <Cn x1={411} y1={214} x2={424} y2={214} color={C.red} />

      <SB x={25} y={250} w={220} h={24} name="Deploy → Staging (auto)" detail="" color={C.green} icon="▷" />
      <SB x={260} y={250} w={170} h={24} name="Smoke Tests (staging)" detail="" color={C.yellow} icon="◎" />
      <SB x={445} y={250} w={180} h={24} name="ManualApprovalStep" detail="" color={C.orange} icon="⊙" />
      <SB x={640} y={250} w={220} h={24} name="Deploy → Production" detail="" color={C.green} icon="◉" />
      <Cn x1={544} y1={214} x2={135} y2={250} color={C.pink} />
      <Cn x1={245} y1={262} x2={260} y2={262} color={C.green} />
      <Cn x1={430} y1={262} x2={445} y2={262} color={C.yellow} />
      <Cn x1={625} y1={262} x2={640} y2={262} color={C.orange} />

      <Zn x={10} y={298} w={1060} h={140} label="DNS CUTOVER — BLUE-GREEN VIA CLOUDFRONT (CLOUDFLARE CNAME SWITCH)" color={C.green} sub="Vercel stays live as rollback. Cloudflare CNAME switch points to CloudFront distribution. Proxy off (DNS-only)." />
      <SB x={25} y={332} w={240} h={44} name="1. TTL → 60s" detail="24h before cutover" color={C.orange} icon="◎" />
      <SB x={280} y={332} w={240} h={44} name="2. Final data sync" detail="pg_dump + s3 sync" color={C.cyan} icon="⊞" />
      <SB x={535} y={332} w={250} h={44} name="3. Switch Cloudflare" detail="CNAME → d1234.cloudfront.net" color={C.green} icon="⇌" />
      <SB x={800} y={332} w={255} h={44} name="4. Verify full flow" detail="Auth, upload, parse, evidence" color={C.green} icon="◉" />
      <Cn x1={265} y1={354} x2={280} y2={354} color={C.orange} />
      <Cn x1={520} y1={354} x2={535} y2={354} color={C.cyan} />
      <Cn x1={785} y1={354} x2={800} y2={354} color={C.green} />
      <SB x={25} y={392} w={490} h={36} name="5. Rollback: CNAME → cname.vercel-dns.com (~60s)" detail="Sessions survive — same domain, BetterAuth in migrated RDS" color={C.orange} icon="⟳" />
      <SB x={535} y={392} w={520} h={36} name="6. After 1 week: cancel Vercel, Supabase, Inngest, Resend" detail="Remove old env vars, delete projects" color={C.red} icon="⊘" />

      <Zn x={10} y={448} w={1060} h={145} label="SOC 2 EVIDENCE GENERATED BY CI/CD" color={C.orange} />
      <SB x={25} y={475} w={195} h={40} name="Git commit log" detail="Who changed what" color={C.yellow} icon="⬡" />
      <SB x={235} y={475} w={195} h={40} name="PR review record" detail="Approver + comments" color={C.yellow} icon="⊘" />
      <SB x={445} y={475} w={195} h={40} name="CFN change set" detail="cdk diff output" color={C.pink} icon="△" />
      <SB x={655} y={475} w={195} h={40} name="Pipeline execution" detail="Stage timestamps" color={C.orange} icon="◉" />
      <SB x={865} y={475} w={190} h={40} name="ManualApproval log" detail="Who approved prod" color={C.orange} icon="⊙" />
      <SB x={25} y={525} w={195} h={40} name="cdk-nag report" detail="Compliance per deploy" color={C.red} icon="⊡" />
      <SB x={235} y={525} w={195} h={40} name="ECR image digest" detail="Immutable artifact" color={C.orange} icon="◧" />
      <SB x={445} y={525} w={195} h={40} name="WAF + CF logs" detail="CC6.6 evidence" color={C.blue} icon="◈" />
      <SB x={655} y={525} w={195} h={40} name="CloudTrail" detail="API-level audit" color={C.orange} icon="◎" />
      <SB x={865} y={525} w={190} h={40} name="Test reports" detail="Unit + E2E" color={C.yellow} icon="◎" />
      <text x={25} y={585} fontSize={8} fill={C.dim} fontFamily={MONO}>CDK Pipelines + ManualApproval + CFN events = CC8.1. WAF/CF logs = CC6.6. CloudTrail = CC6.1/CC7.2.</text>
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
