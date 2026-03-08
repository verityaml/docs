"use client";

import { useState } from "react";

const COLORS = {
  ink: "#1C1C1B",
  forest: "#2A382E",
  clay: "#C9A690",
  stone: "#D0DCD9",
  highlight: "#D4E157",
  white: "#FFFFFF",
  vpcBg: "#F8F7F4",
  publicSubnet: "#E8F5E9",
  privateSubnet: "#FFF3E0",
  lambda: "#FF9900",
  sqs: "#FF4F8B",
  s3: "#569A31",
  rds: "#3B48CC",
  bedrock: "#7B61FF",
  ses: "#DD344C",
  ecs: "#FF9900",
  alb: "#8C4FFF",
  route53: "#8C4FFF",
  secretsManager: "#DD344C",
  cloudwatch: "#FF4F8B",
  ecr: "#FF9900",
  cloudfront: "#8C4FFF",
  waf: "#DD344C",
  codepipeline: "#2196F3",
};

function ServiceBox({ x, y, width = 140, height = 80, color, label, sublabel, onClick }: {
  x: number; y: number; width?: number; height?: number; color: string; label: string; sublabel?: string; onClick?: () => void;
}) {
  return (
    <g style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <rect x={x} y={y} width={width} height={height} rx={8} fill={COLORS.white} stroke={color} strokeWidth={2} />
      <rect x={x} y={y} width={width} height={4} rx={2} fill={color} />
      <text x={x + width / 2} y={y + (sublabel ? 48 : 52)} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLORS.ink} fontFamily="Inter, system-ui, sans-serif">{label}</text>
      {sublabel && <text x={x + width / 2} y={y + 65} textAnchor="middle" fontSize={10} fill="#666" fontFamily="Inter, system-ui, sans-serif">{sublabel}</text>}
    </g>
  );
}

function SubnetBox({ x, y, width, height, label, color, children }: {
  x: number; y: number; width: number; height: number; label: string; color: string; children: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={color}
        stroke={color === COLORS.publicSubnet ? "#81C784" : "#FFB74D"} strokeWidth={1} strokeDasharray="4 2" />
      <text x={x + 10} y={y + 18} fontSize={10} fontWeight={600} fill="#555"
        fontFamily="JetBrains Mono, monospace" letterSpacing={0.5}>{label}</text>
      {children}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, dashed, color = "#999" }: {
  x1: number; y1: number; x2: number; y2: number; label?: string; dashed?: boolean; color?: string;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const id = `wa-${x1}-${y1}-${x2}-${y2}`;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "6 3" : undefined} markerEnd={`url(#${id})`} />
      {label && <text x={midX} y={midY - 6} textAnchor="middle" fontSize={9} fill="#888" fontFamily="JetBrains Mono, monospace">{label}</text>}
    </g>
  );
}

function ElbowArrow({ x1, y1, x2, y2, midY: customMidY, label, color = "#999" }: {
  x1: number; y1: number; x2: number; y2: number; midY?: number; label?: string; color?: string;
}) {
  const midY = customMidY || (y1 + y2) / 2;
  const path = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  const id = `we-${x1}-${y1}-${x2}-${y2}`;
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

const AWS_DETAILS: Record<string, DetailInfo> = {
  route53: { title: "Route 53", desc: "DNS hosted zone for verityaml.com. A-record alias points to CloudFront distribution. TTL reduced to 60s before cutover for fast rollback.", cost: "$0.50/mo" },
  cloudfront: { title: "CloudFront", desc: "Edge CDN + Shield Standard (free L3/L4 DDoS protection). Caches _next/static/* (immutable, 365d TTL) and images. Dynamic requests (SSR, API) pass through to ALB uncached.", cost: "$5/mo" },
  waf: { title: "AWS WAF", desc: "Web ACL on CloudFront. Rate limiting (1000 req/5min per IP), AWSManagedRulesCommonRuleSet (SQLi, XSS, path traversal), KnownBadInputsRuleSet, SQLiRuleSet.", cost: "$11/mo" },
  alb: { title: "Application Load Balancer", desc: "CloudFront origin. Routes to ECS:3000. Health check on /api/health every 30s. Security group restricts inbound to CloudFront prefix list only.", cost: "$16.50/mo" },
  ecs: { title: "ECS Fargate", desc: "Single task: 0.25 vCPU, 512MB. Runs Next.js standalone server (node frontend/server.js). Handles SSR, API routes, auth.", cost: "$9.50/mo" },
  rds: { title: "RDS PostgreSQL 16", desc: "db.t4g.micro, 20GB gp3. pgvector extension for 1024-dim embeddings. HNSW indexes for similarity search. 7-day backups.", cost: "$13/mo" },
  s3: { title: "S3 Bucket", desc: "verity-files-prod. SSE-S3 encryption, public access blocked. Presigned URLs for downloads. Glacier lifecycle at 365 days.", cost: "$0.25/mo" },
  sqs: { title: "SQS Queues", desc: "4 standard queues + 4 DLQs. Replaces Inngest events. Messages trigger Lambda functions. DLQ alarm for failed jobs.", cost: "$0.01/mo" },
  lambda: { title: "Lambda Functions", desc: "4 functions in VPC: parse-examination (15min), auto-match-evidence (5min), propagate-evidence (1min), backfill-evidence-links (2min).", cost: "$0.10/mo" },
  bedrock: { title: "Amazon Bedrock", desc: "Claude Sonnet 4.6 for document parsing. IAM auth (no API key). streamObject via Vercel AI SDK. ~50 parses/month.", cost: "$5-15/mo" },
  ses: { title: "SES Email", desc: "Transactional email from noreply@verityaml.com. Password resets, invitations, welcome emails. DKIM + SPF verified.", cost: "$0.01/mo" },
  nat: { title: "NAT Gateway", desc: "Single AZ (us-east-1a). Enables private subnet to internet (Voyage AI, ECR pulls). Can swap to NAT instance ($3/mo) to save.", cost: "$34.25/mo" },
  secrets: { title: "Secrets Manager", desc: "5 secrets: DATABASE_URL (auto-rotated via RDS-native rotation), BETTER_AUTH_SECRET, VOYAGE_API_KEY, app config.", cost: "$2/mo" },
  voyage: { title: "Voyage AI (External)", desc: "voyage-law-2 embeddings (1024-dim). Legal domain-specific. 3 RPM free tier. Called from ECS (search) and Lambda (parse). Via NAT Gateway.", cost: "Free tier" },
  cdkpipelines: { title: "CDK Pipelines", desc: "Self-mutating infra CI/CD. CodePipeline + CodeBuild. Synth, cdk-nag (AWS Solutions + HIPAA), staging, ManualApprovalStep, production.", cost: "$1.50/mo" },
};

export function AWSArchDiagram() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="not-prose my-6">
      <svg viewBox="0 0 1060 880" style={{ width: "100%", background: COLORS.white, borderRadius: 12, border: `1px solid ${COLORS.stone}` }}>
        <rect width="1060" height="880" fill={COLORS.white} rx={12} />

        <text x={530} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={COLORS.ink} fontFamily="Inter, system-ui, sans-serif">Browser</text>
        <Arrow x1={530} y1={36} x2={530} y2={56} color={COLORS.forest} />

        <ServiceBox x={460} y={58} color={COLORS.route53} label="Route 53" sublabel="app.verityaml.com" onClick={() => setSelected("route53")} />
        <CostBadge x={540} y={60} cost="$0.50" />
        <Arrow x1={530} y1={138} x2={530} y2={152} color={COLORS.forest} />

        <ServiceBox x={460} y={154} width={140} height={60} color={COLORS.waf} label="AWS WAF" sublabel="SQLi, XSS, rate limit" onClick={() => setSelected("waf")} />
        <CostBadge x={540} y={156} cost="$11" />
        <Arrow x1={530} y1={214} x2={530} y2={228} color={COLORS.forest} />

        <ServiceBox x={460} y={230} color={COLORS.cloudfront} label="CloudFront" sublabel="CDN + Shield + TLS" onClick={() => setSelected("cloudfront")} />
        <CostBadge x={540} y={232} cost="$5" />
        <text x={380} y={268} textAnchor="end" fontSize={9} fill="#888" fontFamily="JetBrains Mono, monospace">_next/static/* cached (365d)</text>
        <Arrow x1={530} y1={310} x2={530} y2={328} label="origin" color={COLORS.forest} />

        <ServiceBox x={460} y={330} color={COLORS.alb} label="ALB" sublabel="Origin + /api/health" onClick={() => setSelected("alb")} />
        <CostBadge x={540} y={332} cost="$16.50" />
        <Arrow x1={530} y1={410} x2={530} y2={430} color={COLORS.forest} />

        {/* VPC */}
        <rect x={30} y={432} width={1000} height={300} rx={10} fill={COLORS.vpcBg} stroke={COLORS.forest} strokeWidth={2} />
        <text x={50} y={454} fontSize={12} fontWeight={700} fill={COLORS.forest} fontFamily="JetBrains Mono, monospace">VPC 10.0.0.0/16</text>

        <SubnetBox x={50} y={466} width={200} height={120} label="PUBLIC SUBNETS" color={COLORS.publicSubnet}>
          <ServiceBox x={70} y={498} width={160} height={70} color={COLORS.ecs} label="NAT Gateway" sublabel="us-east-1a" onClick={() => setSelected("nat")} />
        </SubnetBox>
        <CostBadge x={170} y={500} cost="$34.25" />

        <SubnetBox x={280} y={466} width={730} height={250} label="PRIVATE SUBNETS (COMPUTE + DATA)" color={COLORS.privateSubnet}>
          <ServiceBox x={310} y={498} width={180} height={80} color={COLORS.ecs} label="ECS Fargate" sublabel="Next.js (0.25 vCPU, 512MB)" onClick={() => setSelected("ecs")} />
          <CostBadge x={430} y={500} cost="$9.50" />
          <ServiceBox x={530} y={498} width={180} height={80} color={COLORS.rds} label="RDS PostgreSQL 16" sublabel="db.t4g.micro + pgvector" onClick={() => setSelected("rds")} />
          <CostBadge x={650} y={500} cost="$13" />
          <ServiceBox x={310} y={613} width={160} height={80} color={COLORS.lambda} label="parse-examination" sublabel="Lambda (15min)" onClick={() => setSelected("lambda")} />
          <ServiceBox x={490} y={613} width={160} height={80} color={COLORS.lambda} label="auto-match" sublabel="Lambda (5min)" onClick={() => setSelected("lambda")} />
          <ServiceBox x={670} y={613} width={160} height={80} color={COLORS.lambda} label="propagate + backfill" sublabel="Lambda (1-2min)" onClick={() => setSelected("lambda")} />
        </SubnetBox>

        <ServiceBox x={760} y={498} width={130} height={80} color={COLORS.secretsManager} label="Secrets Mgr" sublabel="5 secrets" onClick={() => setSelected("secrets")} />
        <CostBadge x={830} y={500} cost="$2" />

        <Arrow x1={490} y1={538} x2={528} y2={538} label=":5432" color={COLORS.rds} />
        <ElbowArrow x1={620} y1={578} x2={620} y2={611} color={COLORS.rds} />

        {/* Managed services */}
        <text x={440} y={763} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink} fontFamily="JetBrains Mono, monospace">AWS Managed Services</text>

        <ServiceBox x={40} y={778} width={130} height={80} color={COLORS.s3} label="S3" sublabel="verity-files-prod" onClick={() => setSelected("s3")} />
        <CostBadge x={110} y={780} cost="$0.25" />
        <ServiceBox x={190} y={778} width={130} height={80} color={COLORS.sqs} label="SQS" sublabel="4 queues + 4 DLQs" onClick={() => setSelected("sqs")} />
        <CostBadge x={260} y={780} cost="$0.01" />
        <ServiceBox x={340} y={778} width={130} height={80} color={COLORS.bedrock} label="Bedrock" sublabel="Claude Sonnet 4.6" onClick={() => setSelected("bedrock")} />
        <CostBadge x={410} y={780} cost="$5-15" />
        <ServiceBox x={490} y={778} width={130} height={80} color={COLORS.ses} label="SES" sublabel="noreply@verity..." onClick={() => setSelected("ses")} />
        <CostBadge x={560} y={780} cost="$0.01" />
        <ServiceBox x={640} y={778} width={130} height={80} color={COLORS.cloudwatch} label="CloudWatch" sublabel="Logs + Alarms" />
        <CostBadge x={710} y={780} cost="$3" />
        <ServiceBox x={790} y={778} width={130} height={80} color={COLORS.codepipeline} label="CDK Pipelines" sublabel="CI/CD (self-mutate)" onClick={() => setSelected("cdkpipelines")} />
        <CostBadge x={860} y={780} cost="$1.50" />
        <ServiceBox x={930} y={778} width={100} height={80} color={COLORS.ecr} label="ECR" sublabel="Docker imgs" />

        <Arrow x1={370} y1={732} x2={105} y2={776} dashed color={COLORS.s3} />
        <Arrow x1={400} y1={732} x2={255} y2={776} dashed color={COLORS.sqs} />
        <Arrow x1={470} y1={732} x2={405} y2={776} dashed color={COLORS.bedrock} />
        <Arrow x1={530} y1={732} x2={555} y2={776} dashed color={COLORS.ses} />
        <ElbowArrow x1={255} y1={778} x2={390} y2={695} midY={758} label="trigger" color={COLORS.lambda} />
        <Arrow x1={855} y1={778} x2={855} y2={760} dashed label="deploy" color={COLORS.codepipeline} />

        {/* Voyage AI external */}
        <g onClick={() => setSelected("voyage")} style={{ cursor: "pointer" }}>
          <rect x={50} y={603} width={160} height={60} rx={8} fill={COLORS.white} stroke={COLORS.clay} strokeWidth={2} strokeDasharray="6 3" />
          <text x={130} y={630} textAnchor="middle" fontSize={12} fontWeight={600} fill={COLORS.ink} fontFamily="Inter, system-ui, sans-serif">Voyage AI</text>
          <text x={130} y={646} textAnchor="middle" fontSize={10} fill="#666" fontFamily="Inter, system-ui, sans-serif">voyage-law-2 (external)</text>
        </g>
        <Arrow x1={150} y1={568} x2={150} y2={601} label="via NAT" color={COLORS.clay} />

        {/* Total cost */}
        <rect x={870} y={432} width={150} height={48} rx={8} fill={COLORS.forest} />
        <text x={945} y={452} textAnchor="middle" fontSize={11} fontWeight={600} fill={COLORS.white} fontFamily="Inter, system-ui, sans-serif">Est. Total</text>
        <text x={945} y={472} textAnchor="middle" fontSize={16} fontWeight={700} fill={COLORS.highlight} fontFamily="JetBrains Mono, monospace">~$120-150/mo</text>
      </svg>

      {selected && AWS_DETAILS[selected] && (
        <div style={{ marginTop: 16, padding: 20, background: COLORS.white, borderRadius: 12, border: `1px solid ${COLORS.stone}`, position: "relative" }}>
          <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#999" }}>x</button>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, color: COLORS.forest, margin: "0 0 8px" }}>{AWS_DETAILS[selected].title}</h3>
          <p style={{ fontSize: 14, color: COLORS.ink, margin: "0 0 8px", lineHeight: 1.5 }}>{AWS_DETAILS[selected].desc}</p>
          <span style={{ display: "inline-block", padding: "4px 12px", background: COLORS.highlight, borderRadius: 12, fontSize: 12, fontWeight: 600, fontFamily: "JetBrains Mono, monospace", color: COLORS.forest }}>{AWS_DETAILS[selected].cost}</span>
        </div>
      )}

      <div style={{ marginTop: 12, display: "flex", gap: 20, flexWrap: "wrap", fontSize: 12, color: "#666" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 20, height: 3, background: COLORS.forest }} /><span>Request flow</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 20, height: 3, background: "#999", borderTop: "2px dashed #999" }} /><span>AWS API call</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 14, height: 14, background: COLORS.publicSubnet, border: "1px dashed #81C784", borderRadius: 3 }} /><span>Public subnet</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 14, height: 14, background: COLORS.privateSubnet, border: "1px dashed #FFB74D", borderRadius: 3 }} /><span>Private subnet</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 14, height: 14, background: COLORS.white, border: "2px dashed #C9A690", borderRadius: 3 }} /><span>External service</span></div>
      </div>
    </div>
  );
}
