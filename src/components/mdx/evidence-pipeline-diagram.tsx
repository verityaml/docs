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
  { id: "pipeline", label: "Pipeline", color: C.green },
  { id: "matching", label: "Matching", color: C.purple },
  { id: "events", label: "Events", color: C.cyan },
];

function SB({ x, y, w = 150, h = 52, name, detail, color, icon }: {
  x: number; y: number; w?: number; h?: number; name: string; detail: string; color: string; icon?: string;
}) {
  const labelY = detail ? y + h * 0.48 : y + h * 0.56;
  const subY = y + h * 0.72;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={C.card} stroke={color + "50"} strokeWidth={1} />
      <rect x={x} y={y} width={4} height={h} rx={2} fill={color} />
      {icon && <text x={x + 14} y={labelY + 2} fontSize={12} fill={color}>{icon}</text>}
      <text x={x + (icon ? 30 : 14)} y={labelY} fontSize={11} fill={C.text} fontWeight="600" fontFamily={MONO}>{name}</text>
      {detail && <text x={x + (icon ? 30 : 14)} y={subY} fontSize={9} fill={C.dim} fontFamily={SANS}>{detail}</text>}
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

function PipelineView() {
  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.green} fontFamily={MONO} fontWeight="700">EVIDENCE PIPELINE: 5-STEP FLOW</text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>From exam upload through scoring. Evidence is never evaluated -- matching is based on item metadata, not file content.</text>

      {/* Step 1: PARSE */}
      <Zn x={10} y={50} w={210} h={200} label="1. PARSE" color={C.green} />
      <SB x={22} y={78} w={186} h={36} name="Upload PDF" detail="User uploads exam" color={C.green} icon="◎" />
      <SB x={22} y={122} w={186} h={36} name="Claude Extract" detail="Parse items from PDF" color={C.amber} icon="◈" />
      <SB x={22} y={166} w={186} h={36} name="Voyage Embed" detail="1024-dim per item" color={C.dim} icon="⊹" />
      <SB x={22} y={210} w={186} h={28} name="KB Search" detail="Enrich guidance" color={C.cyan} icon="⊞" />
      <Cn x1={115} y1={114} x2={115} y2={122} color={C.green} />
      <Cn x1={115} y1={158} x2={115} y2={166} color={C.amber} />
      <Cn x1={115} y1={202} x2={115} y2={210} color={C.dim} />

      {/* Step 2: ATTACH */}
      <Zn x={230} y={50} w={210} h={200} label="2. ATTACH" color={C.cyan} />
      <SB x={242} y={78} w={186} h={36} name="Attach to Item" detail="Or upload to domain" color={C.cyan} icon="◎" />
      <SB x={242} y={122} w={186} h={36} name="Supabase Storage" detail="File stored in bucket" color={C.cyan} icon="◫" />
      <SB x={242} y={166} w={186} h={36} name="DB Insert" detail="evidence_attachments" color={C.cyan} icon="⊞" />
      <Cn x1={335} y1={114} x2={335} y2={122} color={C.cyan} />
      <Cn x1={335} y1={158} x2={335} y2={166} color={C.cyan} />

      {/* Arrow from Parse to Attach */}
      <Cn x1={220} y1={150} x2={230} y2={150} color={C.green} />

      {/* Step 3: AUTO-MATCH */}
      <Zn x={450} y={50} w={210} h={200} label="3. AUTO-MATCH" color={C.purple} />
      <SB x={462} y={78} w={186} h={36} name="Match Items" detail="Items to criteria" color={C.purple} icon="⟳" />
      <SB x={462} y={122} w={186} h={52} name="Priority Cascade" detail="Key > Source > Category" color={C.purple} icon="◈" />
      <SB x={462} y={182} w={186} h={36} name="Link Evidence" detail="Within obligation" color={C.purple} icon="⊡" />
      <Cn x1={555} y1={114} x2={555} y2={122} color={C.purple} />
      <Cn x1={555} y1={174} x2={555} y2={182} color={C.purple} />

      {/* Arrow from Attach to Auto-Match */}
      <Cn x1={440} y1={150} x2={450} y2={150} color={C.cyan} />

      {/* Step 4: PROPAGATE */}
      <Zn x={670} y={50} w={210} h={200} label="4. PROPAGATE" color={C.blue} />
      <SB x={682} y={78} w={186} h={36} name="Embed Similarity" detail="Cosine distance" color={C.blue} icon="◈" />
      <SB x={682} y={122} w={186} h={52} name={"Threshold \u2265 0.82"} detail="Cross-examination links" color={C.blue} icon="⊹" />
      <SB x={682} y={182} w={186} h={36} name="evidence_links" detail="Max 5 per upload" color={C.blue} icon="⊞" />
      <Cn x1={775} y1={114} x2={775} y2={122} color={C.blue} />
      <Cn x1={775} y1={174} x2={775} y2={182} color={C.blue} />

      {/* Arrow from Auto-Match to Propagate */}
      <Cn x1={660} y1={150} x2={670} y2={150} color={C.purple} />

      {/* Step 5: SCORE */}
      <Zn x={890} y={50} w={180} h={200} label="5. SCORE" color={C.orange} />
      <SB x={902} y={78} w={156} h={40} name="Recompute" detail="Domain scores" color={C.orange} icon="⊙" />
      <SB x={902} y={126} w={156} h={52} name="Formula" detail="(suff*100+part*50)/total" color={C.orange} icon="◉" />
      <SB x={902} y={186} w={156} h={36} name="Update Domain" detail="New score persisted" color={C.orange} icon="⊞" />
      <Cn x1={980} y1={118} x2={980} y2={126} color={C.orange} />
      <Cn x1={980} y1={178} x2={980} y2={186} color={C.orange} />

      {/* Arrow from Propagate to Score */}
      <Cn x1={880} y1={150} x2={890} y2={150} color={C.blue} />

      {/* Side note */}
      <Zn x={10} y={268} w={1060} h={60} label="KEY PRINCIPLE" color={C.dim} />
      <text x={30} y={300} fontSize={10} fill={C.text} fontFamily={MONO} fontWeight="600">Evidence is never evaluated -- matching is based on item metadata, not file content.</text>
      <text x={30} y={316} fontSize={9} fill={C.dim} fontFamily={SANS}>Auto-match uses structured field matching (keys, sources, categories). Propagate uses embedding similarity of exam items, not evidence files.</text>

      {/* Detailed flow */}
      <text x={20} y={355} fontSize={12} fill={C.green} fontFamily={MONO} fontWeight="700">DETAILED DATA FLOW</text>

      <Zn x={10} y={365} w={350} h={120} label="PARSE DETAIL" color={C.green} />
      <SB x={22} y={393} w={160} h={34} name="PDF Upload" detail="multipart/form-data" color={C.green} icon="◎" />
      <SB x={192} y={393} w={156} h={34} name="Claude Vision" detail="Extract line items" color={C.amber} icon="◈" />
      <SB x={22} y={435} w={160} h={34} name="Voyage AI" detail="voyage-law-2 embed" color={C.dim} icon="⊹" />
      <SB x={192} y={435} w={156} h={34} name="KB Lookup" detail="Guidance enrichment" color={C.cyan} icon="⊞" />
      <Cn x1={182} y1={410} x2={192} y2={410} color={C.green} />
      <Cn x1={115} y1={427} x2={115} y2={435} color={C.amber} />

      <Zn x={370} y={365} w={350} h={120} label="ATTACH + MATCH DETAIL" color={C.cyan} />
      <SB x={382} y={393} w={158} h={34} name="Store File" detail="Supabase bucket" color={C.cyan} icon="◫" />
      <SB x={550} y={393} w={158} h={34} name="Create Row" detail="evidence_attachments" color={C.cyan} icon="⊞" />
      <SB x={382} y={435} w={326} h={34} name="Auto-Match Triggered" detail="Key match, source match, or category match" color={C.purple} icon="⟳" />
      <Cn x1={540} y1={410} x2={550} y2={410} color={C.cyan} />
      <Cn x1={540} y1={427} x2={540} y2={435} color={C.cyan} />

      <Zn x={730} y={365} w={340} h={120} label="PROPAGATE + SCORE DETAIL" color={C.blue} />
      <SB x={742} y={393} w={158} h={34} name="Cosine Search" detail="pgvector HNSW" color={C.blue} icon="◈" />
      <SB x={910} y={393} w={148} h={34} name="Create Links" detail="evidence_links" color={C.blue} icon="⊞" />
      <SB x={742} y={435} w={316} h={34} name="Recompute Score" detail="(sufficient*100 + partial*50) / total_criteria" color={C.orange} icon="◉" />
      <Cn x1={900} y1={410} x2={910} y2={410} color={C.blue} />

      {/* Arrows between detail sections */}
      <Cn x1={360} y1={445} x2={370} y2={445} color={C.green} />
      <Cn x1={720} y1={445} x2={730} y2={445} color={C.purple} />

      <Zn x={10} y={500} w={1060} h={110} label="DATA STORES" color={C.dim} />
      <SB x={22} y={528} w={200} h={36} name="examination_items" detail="Parsed items + embeddings" color={C.green} icon="⊞" />
      <SB x={232} y={528} w={200} h={36} name="evidence_attachments" detail="Files attached to items" color={C.cyan} icon="⊞" />
      <SB x={442} y={528} w={200} h={36} name="scoring_criteria" detail="Criteria per domain" color={C.purple} icon="⊞" />
      <SB x={652} y={528} w={200} h={36} name="evidence_links" detail="Cross-exam propagation" color={C.blue} icon="⊞" />
      <SB x={862} y={528} w={196} h={36} name="domain_scores" detail="Computed percentages" color={C.orange} icon="⊞" />
      <text x={22} y={584} fontSize={8} fill={C.dim} fontFamily={MONO}>Supabase Storage: evidence files (PDFs, images). PostgreSQL + pgvector: all structured data + 1024-dim embeddings (HNSW index).</text>
    </svg>
  );
}

function MatchingView() {
  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.purple} fontFamily={MONO} fontWeight="700">AUTO-MATCH PRIORITY CASCADE + PROPAGATION LOGIC</text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>Structured field matching within an obligation vs. embedding similarity across examinations.</text>

      {/* Left side: Auto-Match Priority Cascade */}
      <Zn x={10} y={48} w={500} h={420} label="AUTO-MATCH PRIORITY CASCADE" color={C.purple} sub="Items matched to criteria within a single obligation" />

      {/* P1 */}
      <Zn x={25} y={84} w={470} h={100} label="P1: DEFINITION KEY MATCH (MOST PRECISE)" color={C.green} />
      <SB x={37} y={112} w={220} h={36} name="criterion.definitionKey" detail="Unique key from regulation" color={C.green} icon="◎" />
      <SB x={267} y={112} w={216} h={36} name="item.scoringCriterionKey" detail="Key from exam item" color={C.green} icon="◎" />
      <text x={37} y={170} fontSize={9} fill={C.green} fontFamily={MONO}>{"criterion.definitionKey === item.scoringCriterionKey"}</text>

      {/* P2 */}
      <Zn x={25} y={192} w={470} h={100} label="P2: REGULATORY SOURCE MATCH (STRUCTURAL)" color={C.cyan} />
      <SB x={37} y={220} w={220} h={36} name="criterion.regulatorySourceId" detail="Source regulation ID" color={C.cyan} icon="◈" />
      <SB x={267} y={220} w={216} h={36} name="item.ffiecSection" detail="FFIEC section reference" color={C.cyan} icon="◈" />
      <text x={37} y={278} fontSize={9} fill={C.cyan} fontFamily={MONO}>{"criterion.regulatorySourceId === item.ffiecSection"}</text>

      {/* P3 */}
      <Zn x={25} y={300} w={470} h={100} label="P3: CATEGORY/DOMAIN ALIGNMENT (BROADEST)" color={C.orange} />
      <SB x={37} y={328} w={220} h={36} name="item.category" detail="Item category label" color={C.orange} icon="⊡" />
      <SB x={267} y={328} w={216} h={36} name="criterion.domainKey" detail="Domain classification" color={C.orange} icon="⊡" />
      <text x={37} y={386} fontSize={9} fill={C.orange} fontFamily={MONO}>{"item.category === criterion.domainKey"}</text>

      {/* Arrows between priorities (fallback) */}
      <Cn x1={260} y1={184} x2={260} y2={192} color={C.purple} label="fallback" />
      <Cn x1={260} y1={292} x2={260} y2={300} color={C.purple} label="fallback" />

      {/* Skip note */}
      <Zn x={25} y={408} w={470} h={50} label="SKIP RULE" color={C.red} />
      <text x={37} y={440} fontSize={9} fill={C.red} fontFamily={MONO}>If both have keys but DON&apos;T match: skip (no fallback)</text>

      {/* Right side: Comparison */}
      <Zn x={520} y={48} w={550} h={420} label="AUTO-MATCH vs PROPAGATE" color={C.blue} />

      {/* Auto-Match column */}
      <Zn x={535} y={84} w={255} h={370} label="AUTO-MATCH" color={C.purple} />
      <SB x={547} y={112} w={231} h={40} name="Items to Criteria" detail="Link items to scoring criteria" color={C.purple} icon="⟳" />
      <SB x={547} y={162} w={231} h={40} name="Structured Matching" detail="Key, source, category fields" color={C.purple} icon="◈" />
      <SB x={547} y={212} w={231} h={40} name="Within Obligation" detail="Single exam scope" color={C.purple} icon="⊡" />
      <SB x={547} y={262} w={231} h={40} name="JSONB Arrays" detail="Stored inline on criteria" color={C.purple} icon="⊞" />
      <SB x={547} y={316} w={231} h={52} name="Trigger" detail="evidence/uploaded or domain upload" color={C.purple} icon="◎" />
      <SB x={547} y={380} w={231} h={40} name="Result" detail="Criteria linked to evidence" color={C.green} icon="◉" />

      {/* Propagate column */}
      <Zn x={800} y={84} w={255} h={370} label="PROPAGATE" color={C.blue} />
      <SB x={812} y={112} w={231} h={40} name="Items to Items" detail="Link items across exams" color={C.blue} icon="⟳" />
      <SB x={812} y={162} w={231} h={40} name="Embedding Similarity" detail="Cosine distance on vectors" color={C.blue} icon="◈" />
      <SB x={812} y={212} w={231} h={40} name="Across Examinations" detail="Cross-exam scope" color={C.blue} icon="⊡" />
      <SB x={812} y={262} w={231} h={40} name="evidence_links Table" detail="Dedicated junction table" color={C.blue} icon="⊞" />
      <SB x={812} y={316} w={231} h={52} name="Trigger" detail="evidence/uploaded event" color={C.blue} icon="◎" />
      <SB x={812} y={380} w={231} h={40} name="Result" detail="Max 5 cross-links per upload" color={C.green} icon="◉" />

      {/* Bottom summary */}
      <Zn x={10} y={480} w={1060} h={130} label="MATCHING STORAGE" color={C.dim} />
      <text x={30} y={510} fontSize={10} fill={C.purple} fontFamily={MONO} fontWeight="600">Auto-Match Storage:</text>
      <text x={30} y={528} fontSize={9} fill={C.dim} fontFamily={SANS}>Matched evidence IDs stored as JSONB arrays directly on scoring_criteria rows. Updated in-place on each match run.</text>
      <text x={30} y={550} fontSize={10} fill={C.blue} fontFamily={MONO} fontWeight="600">Propagate Storage:</text>
      <text x={30} y={568} fontSize={9} fill={C.dim} fontFamily={SANS}>{"Cross-examination links stored in evidence_links table: source_item_id, target_item_id, similarity_score, status (pending_review | accepted | rejected)."}</text>
      <text x={30} y={590} fontSize={10} fill={C.orange} fontFamily={MONO} fontWeight="600">Scoring Formula:</text>
      <text x={30} y={605} fontSize={9} fill={C.dim} fontFamily={MONO}>{"domain_score = (sufficient_count * 100 + partial_count * 50) / total_criteria_count"}</text>
    </svg>
  );
}

function EventsView() {
  return (
    <svg viewBox="0 0 1080 540" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.cyan} fontFamily={MONO} fontWeight="700">INNGEST EVENT CHAINS</text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>Three trigger flows: exam parsing, evidence attachment, and domain upload. Each fires a chain of Inngest functions.</text>

      {/* Flow 1: Exam Parse */}
      <Zn x={10} y={48} w={1060} h={130} label="FLOW 1: USER UPLOADS EXAM" color={C.green} sub="Parse examination, generate embeddings, backfill evidence links" />
      <SB x={22} y={86} w={130} h={40} name="Upload Exam" detail="User action" color={C.green} icon="◎" />
      <SB x={164} y={86} w={155} h={40} name="exam/parse.requested" detail="Inngest event" color={C.green} icon="◈" />
      <SB x={331} y={86} w={155} h={40} name="parse-examination" detail="Inngest function" color={C.amber} icon="⟳" />
      <SB x={498} y={86} w={135} h={40} name="Generate Embeds" detail="Voyage AI" color={C.dim} icon="⊹" />
      <SB x={645} y={86} w={120} h={40} name="Search KB" detail="Guidance notes" color={C.cyan} icon="⊞" />
      <SB x={777} y={86} w={120} h={40} name="Save Items" detail="DB insert" color={C.cyan} icon="⊞" />
      <Cn x1={152} y1={106} x2={164} y2={106} color={C.green} />
      <Cn x1={319} y1={106} x2={331} y2={106} color={C.green} />
      <Cn x1={486} y1={106} x2={498} y2={106} color={C.amber} />
      <Cn x1={633} y1={106} x2={645} y2={106} color={C.dim} />
      <Cn x1={765} y1={106} x2={777} y2={106} color={C.cyan} />
      <SB x={22} y={134} w={130} h={34} name="obligation/parsed" detail="Inngest event" color={C.green} icon="◈" />
      <SB x={164} y={134} w={175} h={34} name="backfill-evidence-links" detail="Inngest function" color={C.blue} icon="⟳" />
      <Cn x1={897} y1={106} x2={897} y2={134} color={C.cyan} />
      <Cn x1={897} y1={151} x2={339} y2={151} color={C.blue} />
      <Cn x1={152} y1={151} x2={164} y2={151} color={C.green} />

      {/* Flow 2: Evidence Attachment */}
      <Zn x={10} y={188} w={1060} h={130} label="FLOW 2: USER ATTACHES EVIDENCE TO ITEM" color={C.cyan} sub="Propagate to similar items on other exams, auto-match within obligation, recompute scores" />
      <SB x={22} y={226} w={140} h={40} name="Attach Evidence" detail="User action" color={C.cyan} icon="◎" />
      <SB x={174} y={226} w={155} h={40} name="evidence/uploaded" detail="Inngest event" color={C.cyan} icon="◈" />

      {/* Two parallel branches */}
      <SB x={345} y={210} w={175} h={40} name="propagate-evidence" detail="Inngest function" color={C.blue} icon="⟳" />
      <SB x={534} y={210} w={145} h={40} name={"cosine \u2265 0.82"} detail="Cross-exam links" color={C.blue} icon="◈" />
      <Cn x1={329} y1={246} x2={345} y2={230} color={C.cyan} />
      <Cn x1={520} y1={230} x2={534} y2={230} color={C.blue} />

      <SB x={345} y={258} w={175} h={40} name="auto-match.requested" detail="Inngest event" color={C.purple} icon="◈" />
      <SB x={534} y={258} w={175} h={40} name="auto-match-evidence" detail="Inngest function" color={C.purple} icon="⟳" />
      <Cn x1={329} y1={246} x2={345} y2={278} color={C.cyan} />
      <Cn x1={520} y1={278} x2={534} y2={278} color={C.purple} />

      <SB x={725} y={234} w={160} h={40} name="Recompute Scores" detail="Domain recalculation" color={C.orange} icon="◉" />
      <Cn x1={679} y1={250} x2={725} y2={254} color={C.blue} />
      <Cn x1={709} y1={278} x2={725} y2={254} color={C.purple} />

      {/* Flow 3: Domain Upload */}
      <Zn x={10} y={328} w={1060} h={110} label="FLOW 3: USER UPLOADS TO DOMAIN DIRECTLY" color={C.orange} sub="Auto-match against all criteria in the domain, then recompute score" />
      <SB x={22} y={366} w={140} h={40} name="Domain Upload" detail="User action" color={C.orange} icon="◎" />
      <SB x={174} y={366} w={195} h={40} name="auto-match.requested" detail="Inngest event (domain path)" color={C.purple} icon="◈" />
      <SB x={381} y={366} w={175} h={40} name="auto-match-evidence" detail="Domain path" color={C.purple} icon="⟳" />
      <SB x={568} y={366} w={175} h={40} name="Suggest on All" detail="All criteria in domain" color={C.purple} icon="⊡" />
      <SB x={755} y={366} w={160} h={40} name="Recompute Score" detail="Domain recalculation" color={C.orange} icon="◉" />
      <Cn x1={162} y1={386} x2={174} y2={386} color={C.orange} />
      <Cn x1={369} y1={386} x2={381} y2={386} color={C.purple} />
      <Cn x1={556} y1={386} x2={568} y2={386} color={C.purple} />
      <Cn x1={743} y1={386} x2={755} y2={386} color={C.purple} />

      {/* Legend */}
      <Zn x={10} y={448} w={1060} h={85} label="EVENT NAMING CONVENTIONS" color={C.dim} />
      <text x={30} y={478} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">Events (triggers):</text>
      <text x={200} y={478} fontSize={9} fill={C.dim} fontFamily={MONO}>exam/parse.requested, obligation/parsed, evidence/uploaded, scoring/auto-match.requested</text>
      <text x={30} y={498} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">Functions (handlers):</text>
      <text x={200} y={498} fontSize={9} fill={C.dim} fontFamily={MONO}>parse-examination, backfill-evidence-links, propagate-evidence, auto-match-evidence</text>
      <text x={30} y={518} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">Pattern:</text>
      <text x={200} y={518} fontSize={9} fill={C.dim} fontFamily={MONO}>{"User action \u2192 Inngest event \u2192 Inngest function(s) \u2192 DB writes \u2192 score recomputation"}</text>
    </svg>
  );
}

const VIEWS: Record<string, React.ReactNode> = {
  pipeline: <PipelineView />,
  matching: <MatchingView />,
  events: <EventsView />,
};

const LEGEND = [
  { color: C.green, label: "Parse" },
  { color: C.cyan, label: "Attach" },
  { color: C.purple, label: "Auto-Match" },
  { color: C.blue, label: "Propagate" },
  { color: C.orange, label: "Score" },
  { color: C.amber, label: "Claude AI" },
  { color: C.dim, label: "Voyage AI" },
];

export function EvidencePipelineDiagram() {
  const [tab, setTab] = useState("pipeline");

  return (
    <div className="not-prose my-6" style={{ fontFamily: SANS, color: C.text }}>
      <div style={{ background: C.bg, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}` }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: MONO, color: C.green, margin: 0 }}>EVIDENCE PIPELINE</h3>
          <p style={{ fontSize: 11, color: C.dim, margin: "4px 0 0" }}>How evidence flows from exam upload through auto-matching, propagation, and scoring. Click tabs for matching logic and event chains.</p>
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
