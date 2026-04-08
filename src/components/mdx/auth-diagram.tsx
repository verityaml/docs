"use client";

import { useState } from "react";

const C = {
  bg: "#F2F0EB",
  panel: "#FAFAF7",
  card: "#FFFFFF",
  border: "#2A382E22",
  text: "#1C1C1B",
  dim: "#6B7567",
  green: "#15803D",
  blue: "#1D4ED8",
  purple: "#6D28D9",
  orange: "#C2410C",
  red: "#B91C1C",
  cyan: "#0E7490",
  pink: "#BE185D",
  yellow: "#A16207",
  amber: "#B45309",
};

const MONO = "'JetBrains Mono', 'SF Mono', monospace";
const SANS = "'Inter', system-ui, sans-serif";

const TABS = [
  { id: "sessions", label: "Sessions", color: C.green },
  { id: "connector-oauth", label: "Connector OAuth", color: C.purple },
  { id: "desktop", label: "Desktop Tokens", color: C.blue },
  { id: "token-map", label: "Token Map", color: C.cyan },
  { id: "feature-matrix", label: "Feature Matrix", color: C.orange },
];

function SB({
  x, y, w = 160, h = 44, name, detail, color, icon,
}: {
  x: number; y: number; w?: number; h?: number; name: string; detail?: string; color: string; icon?: string;
}) {
  const labelY = detail ? y + h * 0.45 : y + h * 0.56;
  const subY = y + h * 0.75;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={C.card} stroke={color + "AA"} strokeWidth={1} />
      <rect x={x} y={y} width={4} height={h} rx={2} fill={color} />
      {icon && (
        <text x={x + 14} y={labelY + 2} fontSize={12} fill={color}>
          {icon}
        </text>
      )}
      <text x={x + (icon ? 30 : 12)} y={labelY} fontSize={10} fill={C.text} fontWeight="600" fontFamily={MONO}>
        {name}
      </text>
      {detail && (
        <text x={x + (icon ? 30 : 12)} y={subY} fontSize={8} fill={C.dim} fontFamily={SANS}>
          {detail}
        </text>
      )}
    </g>
  );
}

function Cn({
  x1, y1, x2, y2, color = C.dim, label, dashed,
}: {
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
      <line
        x1={x1} y1={y1}
        x2={x2 - ux * 5} y2={y2 - uy * 5}
        stroke={color + "C0"} strokeWidth={1}
        strokeDasharray={dashed ? "4,3" : "none"}
      />
      <polygon
        points={`${x2},${y2} ${x2 - ux * 6 - uy * 3},${y2 - uy * 6 + ux * 3} ${x2 - ux * 6 + uy * 3},${y2 - uy * 6 - ux * 3}`}
        fill={color + "DD"}
      />
      {label && (
        <g>
          <rect
            x={mx - label.length * 3 - 4} y={my - 8}
            width={label.length * 6 + 8} height={14}
            rx={3} fill={C.bg} stroke={color + "60"} strokeWidth={0.5}
          />
          <text x={mx} y={my + 2} fontSize={7.5} fill={color} fontFamily={MONO} textAnchor="middle">
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

function Zn({
  x, y, w, h, label, color, sub,
}: {
  x: number; y: number; w: number; h: number; label: string; color: string; sub?: string;
}) {
  const labelWidth = label.length * 7.5 + 16;
  const bgHeight = sub ? 30 : 18;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={color + "10"} stroke={color + "55"} strokeWidth={1} strokeDasharray="6,4" />
      {label && (
        <rect x={x + 3} y={y + 1} width={Math.min(labelWidth, w - 6)} height={bgHeight} rx={4} fill={C.bg} />
      )}
      <text x={x + 10} y={y + 14} fontSize={9} fill={color} fontWeight="700" fontFamily={MONO} letterSpacing="0.08em">
        {label}
      </text>
      {sub && (
        <text x={x + 10} y={y + 26} fontSize={7.5} fill={C.dim} fontFamily={SANS}>
          {sub}
        </text>
      )}
    </g>
  );
}

/* ─── Tab 1: Sessions ─── */
function SessionsView() {
  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.green} fontFamily={MONO} fontWeight="700">
        BETTERAUTH SESSIONS
      </text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>
        Login/signup through cookie-based session auth. Public paths bypass the session check entirely.
      </text>

      {/* Zone: LOGIN/SIGNUP */}
      <Zn x={10} y={48} w={190} h={250} label="LOGIN / SIGNUP" color={C.green} />
      <SB x={22} y={78} w={166} h={40} name="User submits creds" detail="email + password" color={C.green} icon="◎" />
      <SB x={22} y={126} w={166} h={40} name="BetterAuth scrypt" detail="password hash verify" color={C.green} icon="◈" />
      <SB x={22} y={174} w={166} h={40} name="DB: user table" detail="identity record" color={C.cyan} icon="⊞" />
      <SB x={22} y={222} w={166} h={40} name="DB: session table" detail="session row created" color={C.cyan} icon="⊞" />
      <SB x={22} y={270} w={166} h={26} name="Signed cookie set" color={C.green} icon="◎" />
      <Cn x1={105} y1={118} x2={105} y2={126} color={C.green} />
      <Cn x1={105} y1={166} x2={105} y2={174} color={C.green} />
      <Cn x1={105} y1={214} x2={105} y2={222} color={C.cyan} />
      <Cn x1={105} y1={262} x2={105} y2={270} color={C.cyan} />

      {/* Zone: REQUEST FLOW */}
      <Zn x={215} y={48} w={300} h={250} label="REQUEST FLOW" color={C.blue} sub="5min session cookie cache" />
      <SB x={227} y={86} w={133} h={40} name="Browser request" detail="with cookie header" color={C.blue} icon="◎" />
      <SB x={227} y={134} w={133} h={40} name="proxy.ts" detail="Next.js middleware" color={C.blue} icon="⟳" />
      <SB x={227} y={182} w={133} h={40} name="getSessionCookie()" detail="optimistic check" color={C.blue} icon="◈" />

      {/* Public path branch */}
      <SB x={374} y={134} w={130} h={40} name="Public path" detail="/login /signup /api/auth/*" color={C.dim} icon="⊡" />
      <SB x={374} y={182} w={130} h={40} name="bypass" detail="no session needed" color={C.dim} icon="◎" />
      <SB x={227} y={234} w={276} h={36} name="Protected route" detail="session required → continue to handler" color={C.green} icon="◉" />

      <Cn x1={293} y1={118} x2={293} y2={134} color={C.blue} />
      <Cn x1={293} y1={174} x2={293} y2={182} color={C.blue} />
      <Cn x1={360} y1={154} x2={374} y2={154} color={C.dim} label="public" />
      <Cn x1={439} y1={174} x2={439} y2={182} color={C.dim} />
      <Cn x1={293} y1={222} x2={293} y2={234} color={C.blue} label="protected" />

      {/* Arrow: login → request flow */}
      <Cn x1={200} y1={172} x2={215} y2={172} color={C.green} />

      {/* Zone: API HANDLER */}
      <Zn x={530} y={48} w={300} h={250} label="API HANDLER" color={C.purple} />
      <SB x={542} y={78} w={140} h={40} name="requireAuth()" detail="enforces session" color={C.purple} icon="◎" />
      <SB x={542} y={126} w={140} h={40} name="auth.api.getSession()" detail="full DB lookup" color={C.purple} icon="◈" />
      <SB x={542} y={174} w={270} h={40} name="getOrgId() from session.activeOrganizationId" color={C.purple} icon="⊡" />
      <SB x={542} y={222} w={270} h={40} name="handler runs" detail="multi-tenancy via activeOrganizationId" color={C.green} icon="◉" />
      <Cn x1={612} y1={118} x2={612} y2={126} color={C.purple} />
      <Cn x1={612} y1={166} x2={612} y2={174} color={C.purple} />
      <Cn x1={677} y1={214} x2={677} y2={222} color={C.purple} />

      {/* Arrow: request flow → api handler */}
      <Cn x1={515} y1={172} x2={530} y2={172} color={C.blue} />

      {/* Zone: ORG PROVISIONING */}
      <Zn x={845} y={48} w={225} h={250} label="ORG PROVISIONING" color={C.amber} sub="fires on first org create" />
      <SB x={857} y={86} w={200} h={40} name="afterCreateOrg hook" detail="BetterAuth lifecycle" color={C.amber} icon="◈" />
      <SB x={857} y={134} w={200} h={40} name="provisionDefaultPrograms()" color={C.amber} icon="⟳" />
      <SB x={857} y={182} w={200} h={40} name="audit_log insert" detail="org + program created" color={C.cyan} icon="⊞" />
      <Cn x1={957} y1={126} x2={957} y2={134} color={C.amber} />
      <Cn x1={957} y1={174} x2={957} y2={182} color={C.amber} />

      {/* Key notes zone */}
      <Zn x={10} y={310} w={1060} h={110} label="KEY FACTS" color={C.dim} />
      <text x={26} y={340} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Session cookie cache:
      </text>
      <text x={175} y={340} fontSize={9} fill={C.dim} fontFamily={MONO}>
        5-minute window — proxy.ts uses optimistic cookie check; full DB lookup only in API handlers via auth.api.getSession()
      </text>
      <text x={26} y={360} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Multi-tenancy:
      </text>
      <text x={175} y={360} fontSize={9} fill={C.dim} fontFamily={MONO}>
        activeOrganizationId on the session drives all org-scoped queries — every handler calls getOrgId() first
      </text>
      <text x={26} y={380} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Public paths:
      </text>
      <text x={175} y={380} fontSize={9} fill={C.dim} fontFamily={MONO}>
        /login, /signup, /api/auth/*, /api/health, /invite — these bypass session checks in proxy.ts
      </text>
      <text x={26} y={400} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Role helpers:
      </text>
      <text x={175} y={400} fontSize={9} fill={C.dim} fontFamily={MONO}>
        requireAuth() / requireAdmin() / requireWriteAccess() — all read from the active session
      </text>

      {/* Data stores */}
      <Zn x={10} y={432} w={1060} h={80} label="DATA STORES" color={C.dim} />
      <SB x={22} y={460} w={230} h={36} name="sessions (BetterAuth)" detail="session table — opaque token, ~30d TTL" color={C.green} icon="⊞" />
      <SB x={262} y={460} w={230} h={36} name="users (BetterAuth)" detail="user table — scrypt-hashed password" color={C.green} icon="⊞" />
      <SB x={502} y={460} w={230} h={36} name="organizations" detail="BetterAuth org table" color={C.amber} icon="⊞" />
      <SB x={742} y={460} w={315} h={36} name="audit_log" detail="org provisioning events written on org create" color={C.cyan} icon="⊞" />
    </svg>
  );
}

/* ─── Tab 2: Connector OAuth ─── */
function ConnectorOAuthView() {
  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.purple} fontFamily={MONO} fontWeight="700">
        CONNECTOR OAUTH (PKCE + KMS ENVELOPE ENCRYPTION)
      </text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>
        Google Drive OAuth 2.0 with PKCE S256, signed state JWT, and AES-256-GCM KMS envelope encryption for stored tokens.
      </text>

      {/* Phase 1: INITIATE */}
      <Zn x={10} y={48} w={320} h={220} label="PHASE 1: INITIATE" color={C.purple} />
      <SB x={22} y={78} w={294} h={36} name="GET /api/auth/google-drive/authorize" color={C.purple} icon="◎" />
      <SB x={22} y={122} w={140} h={36} name="requireAuth()" detail="session check" color={C.purple} icon="◎" />
      <SB x={170} y={122} w={146} h={36} name="hasFeature()" detail="connectors_enabled flag" color={C.orange} icon="◈" />
      <SB x={22} y={166} w={140} h={36} name="generatePkce()" detail="S256 code challenge" color={C.purple} icon="◈" />
      <SB x={170} y={166} w={146} h={36} name="sign state JWT" detail="HS256, 5min, secret" color={C.purple} icon="◈" />
      <SB x={22} y={210} w={294} h={36} name="302 redirect" detail="accounts.google.com + challenge" color={C.blue} icon="◎" />
      <Cn x1={165} y1={114} x2={165} y2={122} color={C.purple} />
      <Cn x1={92} y1={158} x2={92} y2={166} color={C.purple} />
      <Cn x1={243} y1={158} x2={243} y2={166} color={C.purple} />
      <Cn x1={165} y1={202} x2={165} y2={210} color={C.purple} />

      {/* Phase 2: CALLBACK */}
      <Zn x={345} y={48} w={380} h={220} label="PHASE 2: CALLBACK" color={C.blue} />
      <SB x={357} y={78} w={356} h={36} name="GET /callback?code&state" detail="Google redirects back" color={C.blue} icon="◎" />
      <SB x={357} y={122} w={170} h={36} name="verify state JWT" detail="exp + nonce check" color={C.purple} icon="◈" />
      <SB x={535} y={122} w={170} h={36} name="duplicate check" detail="by googleSub" color={C.orange} icon="◈" />
      <SB x={357} y={166} w={170} h={36} name="POST /token" detail="oauth2.googleapis.com" color={C.blue} icon="⟳" />
      <SB x={535} y={166} w={170} h={36} name="verify id_token" detail="JWKS + nonce" color={C.purple} icon="◈" />
      <SB x={357} y={210} w={356} h={36} name="tokens ready for storage" detail="access + refresh from Google" color={C.green} icon="◉" />
      <Cn x1={535} y1={114} x2={535} y2={122} color={C.blue} />
      <Cn x1={442} y1={158} x2={442} y2={166} color={C.purple} />
      <Cn x1={620} y1={158} x2={620} y2={166} color={C.blue} />
      <Cn x1={535} y1={202} x2={535} y2={210} color={C.blue} />

      {/* Arrow phase 1 → 2 */}
      <Cn x1={330} y1={160} x2={345} y2={160} color={C.purple} label="redirect" />

      {/* Phase 3: KMS ENCRYPT */}
      <Zn x={740} y={48} w={330} h={220} label="PHASE 3: KMS ENCRYPT" color={C.amber} />
      <SB x={752} y={78} w={306} h={36} name="encryptCredentials()" detail="called after token exchange" color={C.amber} icon="◈" />
      <SB x={752} y={122} w={306} h={36} name="KMS GenerateDataKey" detail="AES_256 — CONNECTOR_KMS_KEY_ARN" color={C.amber} icon="⟳" />
      <SB x={752} y={166} w={306} h={36} name="AES-256-GCM encrypt" detail="12B IV + 16B authTag + ciphertext" color={C.amber} icon="◈" />
      <SB x={752} y={210} w={145} h={36} name="zero plaintext key" detail="key wiped after use" color={C.red} icon="◎" />
      <SB x={905} y={210} w={145} h={36} name="insert connector_configs" detail="encrypted blob stored" color={C.cyan} icon="⊞" />
      <Cn x1={905} y1={114} x2={905} y2={122} color={C.amber} />
      <Cn x1={905} y1={158} x2={905} y2={166} color={C.amber} />
      <Cn x1={825} y1={202} x2={825} y2={210} color={C.red} />
      <Cn x1={978} y1={202} x2={978} y2={210} color={C.cyan} />

      {/* Arrow phase 2 → 3 */}
      <Cn x1={725} y1={160} x2={740} y2={160} color={C.blue} label="encrypt" />

      {/* State JWT payload detail */}
      <Zn x={10} y={280} w={500} h={100} label="STATE JWT PAYLOAD" color={C.purple} />
      <text x={26} y={310} fontSize={9} fill={C.text} fontFamily={MONO}>
        {"{ userId, orgId, nonce, codeVerifier }"}
      </text>
      <text x={26} y={330} fontSize={8} fill={C.dim} fontFamily={SANS}>
        Signed with BETTER_AUTH_SECRET (HS256). TTL: 5 minutes. Carried in the OAuth state parameter.
      </text>
      <text x={26} y={350} fontSize={8} fill={C.dim} fontFamily={SANS}>
        The codeVerifier is embedded in the state JWT — never sent to Google directly until the token exchange.
      </text>
      <text x={26} y={368} fontSize={8} fill={C.dim} fontFamily={SANS}>
        PKCE challenge: SHA-256(codeVerifier), base64url-encoded (S256 method).
      </text>

      {/* KMS envelope detail */}
      <Zn x={525} y={280} w={545} h={100} label="KMS ENVELOPE ENCRYPTION DETAIL" color={C.amber} />
      <text x={541} y={310} fontSize={9} fill={C.text} fontFamily={MONO}>
        Plaintext key from KMS used once to encrypt credentials, then immediately zeroed.
      </text>
      <text x={541} y={330} fontSize={8} fill={C.dim} fontFamily={SANS}>
        Encrypted data key stored alongside ciphertext in connector_configs. To decrypt: call KMS Decrypt to recover
      </text>
      <text x={541} y={346} fontSize={8} fill={C.dim} fontFamily={SANS}>
        the data key, then AES-256-GCM decrypt using stored IV and authTag. Key ARN: CONNECTOR_KMS_KEY_ARN env var.
      </text>
      <text x={541} y={362} fontSize={8} fill={C.dim} fontFamily={SANS}>
        Envelope encryption means KMS never sees the credential plaintext — only the data key exchange happens via API.
      </text>

      {/* Data stores */}
      <Zn x={10} y={392} w={1060} h={80} label="DATA STORES" color={C.dim} />
      <SB x={22} y={420} w={300} h={36} name="connector_configs" detail="encrypted blob + encrypted data key + IV + authTag" color={C.amber} icon="⊞" />
      <SB x={332} y={420} w={270} h={36} name="KMS (AWS)" detail="CONNECTOR_KMS_KEY_ARN — key management only" color={C.amber} icon="⊡" />
      <SB x={612} y={420} w={270} h={36} name="Google OAuth" detail="accounts.google.com — token endpoint" color={C.blue} icon="⊡" />
      <SB x={892} y={420} w={174} h={36} name="Google JWKS" detail="id_token verification" color={C.blue} icon="⊡" />

      {/* Note */}
      <Zn x={10} y={484} w={1060} h={70} label="SECURITY NOTES" color={C.dim} />
      <text x={26} y={510} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Duplicate prevention: if a connector with the same googleSub already exists for the org, the flow aborts before storing new tokens.
      </text>
      <text x={26} y={528} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Nonce: embedded in state JWT and in the id_token — verified at callback to bind the token to this specific flow.
      </text>
      <text x={26} y={546} fontSize={9} fill={C.dim} fontFamily={MONO}>
        hasFeature check ensures only orgs with connectors_enabled can initiate — prevents unauthorized OAuth flows.
      </text>
    </svg>
  );
}

/* ─── Tab 3: Desktop ─── */
function DesktopView() {
  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.blue} fontFamily={MONO} fontWeight="700">
        DESKTOP APP — DEVICE CODE + JWT TOKEN PAIR
      </text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>
        Browser-based device code flow with JWT access tokens and rotating refresh tokens stored in macOS Keychain.
      </text>

      {/* Phase 1: Device Code */}
      <Zn x={10} y={48} w={240} h={200} label="PHASE 1: DEVICE CODE" color={C.blue} />
      <SB x={22} y={78} w={216} h={36} name="Desktop opens browser" detail="system default browser" color={C.blue} icon="◎" />
      <SB x={22} y={122} w={216} h={36} name="/api/auth/desktop-callback" detail="user logs in via browser" color={C.blue} icon="⟳" />
      <SB x={22} y={166} w={104} h={36} name="generate 32B" detail="crypto random" color={C.blue} icon="◈" />
      <SB x={134} y={166} w={104} h={36} name="SHA-256 hash" detail="stored in DB" color={C.blue} icon="◈" />
      <SB x={22} y={210} w={216} h={30} name="deep link verity://callback" detail="prod: deep link / dev: polling" color={C.blue} icon="◎" />
      <Cn x1={130} y1={114} x2={130} y2={122} color={C.blue} />
      <Cn x1={130} y1={158} x2={130} y2={166} color={C.blue} />
      <Cn x1={74} y1={202} x2={74} y2={210} color={C.blue} />
      <Cn x1={186} y1={202} x2={186} y2={210} color={C.blue} />

      {/* Phase 2: Exchange */}
      <Zn x={265} y={48} w={230} h={130} label="PHASE 2: EXCHANGE" color={C.purple} />
      <SB x={277} y={78} w={205} h={36} name="POST /desktop-token" detail="{code, state} body" color={C.purple} icon="◎" />
      <SB x={277} y={122} w={98} h={40} name="atomic consume" detail="prevents race" color={C.purple} icon="◈" />
      <SB x={383} y={122} w={99} h={40} name="issueTokenPair()" detail="generates both" color={C.purple} icon="⟳" />
      <Cn x1={380} y1={114} x2={380} y2={122} color={C.purple} />

      {/* Arrow phase 1 → 2 */}
      <Cn x1={250} y1={113} x2={265} y2={113} color={C.blue} label="code" />

      {/* Phase 3: Token pair */}
      <Zn x={510} y={48} w={560} h={190} label="PHASE 3: TOKEN PAIR" color={C.green} sub="issued by issueTokenPair()" />
      {/* Access token column */}
      <Zn x={522} y={84} w={260} h={140} label="ACCESS TOKEN" color={C.cyan} />
      <SB x={534} y={112} w={236} h={36} name="JWT HS256" detail="signed with BETTER_AUTH_SECRET" color={C.cyan} icon="◈" />
      <SB x={534} y={156} w={110} h={36} name="1 hr TTL" detail="short lived" color={C.cyan} icon="◎" />
      <SB x={652} y={156} w={110} h={36} name="in-memory" detail="+ desktop_access_token cookie" color={C.cyan} icon="⊞" />
      <Cn x1={590} y1={148} x2={590} y2={156} color={C.cyan} />
      <Cn x1={707} y1={148} x2={707} y2={156} color={C.cyan} />

      {/* Refresh token column */}
      <Zn x={794} y={84} w={264} h={140} label="REFRESH TOKEN" color={C.blue} />
      <SB x={806} y={112} w={240} h={36} name="32B hex" detail="opaque random bytes" color={C.blue} icon="◈" />
      <SB x={806} y={156} w={112} h={36} name="30d TTL" detail="long lived" color={C.blue} icon="◎" />
      <SB x={926} y={156} w={112} h={36} name="macOS Keychain" detail="com.verityaml.desktop" color={C.blue} icon="⊞" />
      <Cn x1={862} y1={148} x2={862} y2={156} color={C.blue} />
      <Cn x1={982} y1={148} x2={982} y2={156} color={C.blue} />

      {/* Arrow phase 2 → 3 */}
      <Cn x1={495} y1={140} x2={510} y2={140} color={C.purple} label="pair" />

      {/* Phase 4: Refresh rotation */}
      <Zn x={10} y={258} w={480} h={130} label="PHASE 4: REFRESH ROTATION" color={C.orange} />
      <SB x={22} y={288} w={215} h={36} name="POST /desktop-token/refresh" detail="desktop sends refresh token" color={C.orange} icon="◎" />
      <SB x={245} y={288} w={95} h={36} name="hash lookup" detail="SHA-256 check" color={C.orange} icon="◈" />
      <SB x={348} y={288} w={130} h={36} name="mark old revoked" detail="atomic DB update" color={C.red} icon="◎" />
      <SB x={22} y={332} w={456} h={36} name="issue new pair" detail="new access JWT + new refresh token — rotation on every use" color={C.green} icon="◉" />
      <Cn x1={237} y1={306} x2={245} y2={306} color={C.orange} />
      <Cn x1={340} y1={306} x2={348} y2={306} color={C.orange} />
      <Cn x1={250} y1={324} x2={250} y2={332} color={C.orange} />

      {/* Phase 5: Request auth */}
      <Zn x={505} y={258} w={565} h={130} label="PHASE 5: REQUEST AUTH" color={C.blue} />
      <SB x={517} y={288} w={250} h={36} name="Desktop request" detail="X-Desktop-Token header or cookie" color={C.blue} icon="◎" />
      <SB x={775} y={288} w={282} h={36} name="requireAuth() JWT verify" detail="HS256 verify + extract claims" color={C.purple} icon="◈" />
      <SB x={517} y={332} w={540} h={36} name="extract userId / orgId / role from JWT payload" detail="no DB lookup needed for access token" color={C.green} icon="◉" />
      <Cn x1={767} y1={306} x2={775} y2={306} color={C.blue} />
      <Cn x1={787} y1={324} x2={787} y2={332} color={C.purple} />

      {/* Notes */}
      <Zn x={10} y={400} w={1060} h={115} label="IMPLEMENTATION NOTES" color={C.dim} />
      <text x={26} y={428} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Code storage:
      </text>
      <text x={140} y={428} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Raw code sent to desktop via deep link. SHA-256(code) stored in desktop_auth_codes. Prevents DB exposure of raw code.
      </text>
      <text x={26} y={448} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Atomic consume:
      </text>
      <text x={140} y={448} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Code is marked used in a single DB transaction. Prevents race conditions on rapid re-use of the same code.
      </text>
      <text x={26} y={468} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Refresh timing:
      </text>
      <text x={140} y={468} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Desktop proactively refreshes 5 minutes before access token expiry. Idempotent revoke handles network retries.
      </text>
      <text x={26} y={488} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Dev mode:
      </text>
      <text x={140} y={488} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Deep link unreliable in dev — polling fallback: desktop polls /api/auth/desktop-poll?state= until code appears.
      </text>
      <text x={26} y={508} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        JWT payload:
      </text>
      <text x={140} y={508} fontSize={9} fill={C.dim} fontFamily={MONO}>
        {"{ userId, orgId, role } — same shape as BetterAuth session; requireAuth() works identically for web and desktop."}
      </text>

      {/* Data stores */}
      <Zn x={10} y={526} w={1060} h={80} label="DATA STORES" color={C.dim} />
      <SB x={22} y={554} w={240} h={36} name="desktop_auth_codes" detail="SHA-256 code hash, 5min TTL, consumed flag" color={C.blue} icon="⊞" />
      <SB x={272} y={554} w={240} h={36} name="desktop_tokens" detail="SHA-256 refresh hash, 30d TTL, revoked flag" color={C.blue} icon="⊞" />
      <SB x={522} y={554} w={240} h={36} name="macOS Keychain" detail="com.verityaml.desktop — refresh token plaintext" color={C.cyan} icon="⊡" />
      <SB x={772} y={554} w={296} h={36} name="desktop_access_token cookie" detail="short-lived fallback; primary is in-memory" color={C.cyan} icon="⊡" />
    </svg>
  );
}

/* ─── Tab 4: Token Map ─── */
function TokenMapView() {
  const headers = ["TOKEN", "FORMAT", "TTL", "STORAGE", "INTEGRITY"];
  const colX = [12, 200, 360, 470, 680];
  const colW = [185, 158, 108, 208, 388];
  const rows: [string, string, string, string, string, string][] = [
    [C.green, "BetterAuth session", "opaque string", "~30 days", "cookie + session table", "BetterAuth managed"],
    [C.cyan, "Desktop access token", "JWT HS256", "1 hour", "in-memory + cookie", "BETTER_AUTH_SECRET"],
    [C.blue, "Desktop refresh token", "32B hex", "30 days", "macOS Keychain + DB hash", "SHA-256"],
    [C.purple, "OAuth state JWT", "JWT HS256", "5 min", "URL param (state=)", "BETTER_AUTH_SECRET"],
    [C.amber, "Google OAuth tokens", "Google format", "Google TTL", "connector_configs (encrypted)", "KMS AES-256-GCM"],
    [C.orange, "Desktop auth code", "32B random", "5 min", "DB (SHA-256 hash only)", "SHA-256"],
    [C.dim, "PKCE verifier", "32B random", "5 min", "inside state JWT", "n/a"],
    [C.red, "KMS data key", "AES-256", "per-encrypt", "zeroed after use", "KMS envelope"],
  ];

  const rowH = 46;
  const startY = 80;
  const totalW = 1068;

  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.cyan} fontFamily={MONO} fontWeight="700">
        TOKENS IN-FLIGHT — COMPLETE REFERENCE
      </text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>
        Every token type used by Verity: format, lifetime, where it lives, and how it is protected.
      </text>

      {/* Header row */}
      <rect x={10} y={48} width={totalW} height={26} rx={4} fill={C.cyan + "15"} stroke={C.cyan + "30"} strokeWidth={1} />
      {headers.map((h, i) => (
        <text key={h} x={colX[i] + 8} y={65} fontSize={9} fill={C.cyan} fontWeight="700" fontFamily={MONO} letterSpacing="0.06em">
          {h}
        </text>
      ))}

      {/* Data rows */}
      {rows.map(([color, token, format, ttl, storage, integrity], ri) => {
        const y = startY + ri * rowH;
        const isEven = ri % 2 === 0;
        return (
          <g key={token}>
            <rect x={10} y={y} width={totalW} height={rowH} rx={3} fill={isEven ? C.card : C.panel} stroke={C.border} strokeWidth={0.5} />
            {/* color accent */}
            <rect x={10} y={y} width={3} height={rowH} rx={1} fill={color} />
            {/* col dividers */}
            {[1, 2, 3, 4].map((ci) => (
              <line key={ci} x1={colX[ci]} y1={y + 4} x2={colX[ci]} y2={y + rowH - 4} stroke={C.border} strokeWidth={0.5} />
            ))}
            {/* Token name */}
            <text x={colX[0] + 10} y={y + rowH * 0.56} fontSize={10} fill={color} fontWeight="600" fontFamily={MONO}>
              {token}
            </text>
            {/* Format */}
            <text x={colX[1] + 8} y={y + rowH * 0.56} fontSize={9} fill={C.text} fontFamily={MONO}>
              {format}
            </text>
            {/* TTL */}
            <text x={colX[2] + 8} y={y + rowH * 0.56} fontSize={9} fill={C.text} fontFamily={MONO}>
              {ttl}
            </text>
            {/* Storage */}
            <text x={colX[3] + 8} y={y + rowH * 0.56} fontSize={9} fill={C.dim} fontFamily={SANS}>
              {storage}
            </text>
            {/* Integrity */}
            <text x={colX[4] + 8} y={y + rowH * 0.56} fontSize={9} fill={C.dim} fontFamily={SANS}>
              {integrity}
            </text>
          </g>
        );
      })}

      {/* Summary note */}
      <Zn x={10} y={462} w={1060} h={150} label="SUMMARY" color={C.dim} />
      <text x={26} y={492} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        No API keys:
      </text>
      <text x={120} y={492} fontSize={9} fill={C.dim} fontFamily={MONO}>
        There is NO API key or bearer token mechanism for /api/* routes. All web access uses BetterAuth session cookies.
      </text>
      <text x={26} y={512} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Signing secret:
      </text>
      <text x={120} y={512} fontSize={9} fill={C.dim} fontFamily={MONO}>
        BETTER_AUTH_SECRET is the single signing key for JWT access tokens AND OAuth state JWTs. Rotation invalidates all active tokens.
      </text>
      <text x={26} y={532} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        KMS scope:
      </text>
      <text x={120} y={532} fontSize={9} fill={C.dim} fontFamily={MONO}>
        KMS is used exclusively for connector credential encryption (Google OAuth tokens). Session and desktop tokens use BETTER_AUTH_SECRET.
      </text>
      <text x={26} y={552} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Hashing:
      </text>
      <text x={120} y={552} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Desktop auth codes and refresh tokens are stored as SHA-256 hashes. Raw values sent only over TLS, never persisted in plaintext.
      </text>
      <text x={26} y={572} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        PKCE:
      </text>
      <text x={120} y={572} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Code verifier embedded in the state JWT (never sent to Google until exchange). S256 method — SHA-256(verifier) as code_challenge.
      </text>
      <text x={26} y={592} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        Rotation:
      </text>
      <text x={120} y={592} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Desktop refresh tokens rotate on every use. Old token atomically revoked before new pair is issued — prevents replay attacks.
      </text>
    </svg>
  );
}

/* ─── Tab 5: Feature Matrix ─── */
function FeatureMatrixView() {
  const headers = ["FEATURE AREA", "AUTH TYPE", "ORG SCOPING", "ROLE / GUARD"];
  const colX = [12, 240, 480, 700];
  const colW = [226, 238, 218, 368];
  const rows: [string, string, string, string, string][] = [
    [C.green, "Web app (browser)", "BetterAuth session cookie", "activeOrganizationId", "requireAuth / requireAdmin / requireWriteAccess"],
    [C.blue, "Desktop app", "Desktop JWT (HS256)", "orgId in JWT payload", "Same helpers as web"],
    [C.purple, "Google Drive OAuth", "State JWT + KMS creds", "orgId in state JWT", "connectors_enabled flag"],
    [C.amber, "Invite flow", "7d invite token (BetterAuth)", "Target org", "Invited role assigned on accept"],
    [C.orange, "Signup guard", "SIGNUP_INVITE_CODE env", "n/a", "Code checked before account creation"],
    [C.cyan, "Org provisioning", "afterCreateOrganization hook", "New org (just created)", "owner role implicit"],
    [C.dim, "Public paths", "bypass (no check)", "n/a", "No auth required"],
  ];

  const rowH = 50;
  const startY = 80;
  const totalW = 1068;

  return (
    <svg viewBox="0 0 1080 620" style={{ width: "100%" }}>
      <text x={20} y={20} fontSize={12} fill={C.orange} fontFamily={MONO} fontWeight="700">
        FEATURE AUTH MATRIX
      </text>
      <text x={20} y={36} fontSize={9} fill={C.dim} fontFamily={SANS}>
        Which auth mechanism protects each feature area, how org-scoping is applied, and what role/guard enforces access.
      </text>

      {/* Header row */}
      <rect x={10} y={48} width={totalW} height={26} rx={4} fill={C.orange + "15"} stroke={C.orange + "30"} strokeWidth={1} />
      {headers.map((h, i) => (
        <text key={h} x={colX[i] + 8} y={65} fontSize={9} fill={C.orange} fontWeight="700" fontFamily={MONO} letterSpacing="0.06em">
          {h}
        </text>
      ))}

      {/* Data rows */}
      {rows.map(([color, feature, authType, orgScope, roleGuard], ri) => {
        const y = startY + ri * rowH;
        const isEven = ri % 2 === 0;
        return (
          <g key={feature}>
            <rect x={10} y={y} width={totalW} height={rowH} rx={3} fill={isEven ? C.card : C.panel} stroke={C.border} strokeWidth={0.5} />
            <rect x={10} y={y} width={3} height={rowH} rx={1} fill={color} />
            {[1, 2, 3].map((ci) => (
              <line key={ci} x1={colX[ci]} y1={y + 4} x2={colX[ci]} y2={y + rowH - 4} stroke={C.border} strokeWidth={0.5} />
            ))}
            {/* Feature name */}
            <text x={colX[0] + 10} y={y + rowH * 0.42} fontSize={10} fill={color} fontWeight="600" fontFamily={MONO}>
              {feature}
            </text>
            {/* Auth type */}
            <text x={colX[1] + 8} y={y + rowH * 0.42} fontSize={9} fill={C.text} fontFamily={MONO}>
              {authType}
            </text>
            {/* Org scope */}
            <text x={colX[2] + 8} y={y + rowH * 0.42} fontSize={9} fill={C.dim} fontFamily={SANS}>
              {orgScope}
            </text>
            {/* Role / guard — may need wrapping; render on two lines if long */}
            {roleGuard.length > 38 ? (
              <>
                <text x={colX[3] + 8} y={y + rowH * 0.36} fontSize={8.5} fill={C.dim} fontFamily={SANS}>
                  {roleGuard.slice(0, 44)}
                </text>
                <text x={colX[3] + 8} y={y + rowH * 0.62} fontSize={8.5} fill={C.dim} fontFamily={SANS}>
                  {roleGuard.slice(44)}
                </text>
              </>
            ) : (
              <text x={colX[3] + 8} y={y + rowH * 0.42} fontSize={8.5} fill={C.dim} fontFamily={SANS}>
                {roleGuard}
              </text>
            )}
          </g>
        );
      })}

      {/* No API key note */}
      <Zn x={10} y={434} w={1060} h={80} label="IMPORTANT: NO API KEY MECHANISM" color={C.red} />
      <text x={26} y={462} fontSize={10} fill={C.red} fontFamily={MONO} fontWeight="600">
        There is NO API key or bearer token mechanism for /api/* routes.
      </text>
      <text x={26} y={482} fontSize={9} fill={C.dim} fontFamily={MONO}>
        All /api/* requests use session-based auth — either a BetterAuth session cookie (web) or a Desktop JWT (desktop app).
      </text>
      <text x={26} y={499} fontSize={9} fill={C.dim} fontFamily={MONO}>
        External callers cannot authenticate via API key. The docs API reference describes the session-scoped REST endpoints only.
      </text>

      {/* Role helpers detail */}
      <Zn x={10} y={524} w={1060} h={90} label="ROLE HELPER REFERENCE" color={C.dim} />
      <text x={26} y={552} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        requireAuth():
      </text>
      <text x={130} y={552} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Any authenticated session. Returns session + orgId or throws 401.
      </text>
      <text x={26} y={570} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        requireAdmin():
      </text>
      <text x={130} y={570} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Requires owner or admin role within the active org. Throws 403 otherwise.
      </text>
      <text x={26} y={588} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        requireWriteAccess():
      </text>
      <text x={150} y={588} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Requires owner, admin, or member role (excludes viewer). Used for mutation endpoints.
      </text>
      <text x={26} y={606} fontSize={9} fill={C.text} fontFamily={MONO} fontWeight="600">
        All helpers:
      </text>
      <text x={130} y={606} fontSize={9} fill={C.dim} fontFamily={MONO}>
        Work identically for web session cookies and desktop JWT tokens — requireAuth() is auth-mechanism agnostic.
      </text>
    </svg>
  );
}

const VIEWS: Record<string, React.ReactNode> = {
  sessions: <SessionsView />,
  "connector-oauth": <ConnectorOAuthView />,
  desktop: <DesktopView />,
  "token-map": <TokenMapView />,
  "feature-matrix": <FeatureMatrixView />,
};

const LEGEND = [
  { color: C.green, label: "Sessions" },
  { color: C.purple, label: "OAuth" },
  { color: C.blue, label: "Desktop" },
  { color: C.cyan, label: "Tokens" },
  { color: C.orange, label: "Features" },
  { color: C.amber, label: "KMS/External" },
  { color: C.dim, label: "Crypto/Hashing" },
];

export function AuthDiagram() {
  const [tab, setTab] = useState("sessions");

  return (
    <div className="not-prose my-6" style={{ fontFamily: SANS, color: C.text }}>
      <div style={{ background: C.bg, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}` }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: MONO, color: C.green, margin: 0 }}>
            AUTHENTICATION &amp; AUTHORIZATION
          </h3>
          <p style={{ fontSize: 11, color: C.dim, margin: "4px 0 0" }}>
            Sessions, OAuth, desktop tokens, and KMS envelope encryption. Click tabs to explore each flow.
          </p>
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
        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            padding: "8px 12px",
            background: C.panel,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
          }}
        >
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
