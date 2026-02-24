export type MemoryOrganization = {
  id: string;
  slug: string;
  name: string;
};

export type MemoryUser = {
  id: string;
  name: string;
  email: string;
  tenantId: string;
  organizationIds: string[];
  activeOrganizationId: string;
};

export type MemorySession = {
  id: string;
  userId: string;
  expiresAt: string;
};

export type DemoAuthSession = {
  user: MemoryUser;
  session: MemorySession;
  organization: MemoryOrganization;
  organizations: MemoryOrganization[];
  tenant: MemoryOrganization;
};

export type DemoAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  tenant: MemoryOrganization;
  organizations: MemoryOrganization[];
  defaultOrganizationId: string;
};

const ORGANIZATIONS: readonly MemoryOrganization[] = [
  {
    id: 'org-acme-hq',
    slug: 'acme-hq',
    name: 'Acme HQ',
  },
  {
    id: 'org-acme-labs',
    slug: 'acme-labs',
    name: 'Acme Labs',
  },
  {
    id: 'org-globex-core',
    slug: 'globex-core',
    name: 'Globex Core',
  },
  {
    id: 'org-globex-research',
    slug: 'globex-research',
    name: 'Globex Research',
  },
] as const;

const getOrganizationsByIds = (ids: readonly string[]): MemoryOrganization[] =>
  ids
    .map((id) => ORGANIZATIONS.find((org) => org.id === id) ?? null)
    .filter((org): org is MemoryOrganization => Boolean(org));

const requireOrganization = (id: string): MemoryOrganization => {
  const organization = ORGANIZATIONS.find((org) => org.id === id);
  if (!organization) {
    throw new Error(`Missing demo organization: ${id}`);
  }
  return organization;
};

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  {
    id: 'user-acme-admin',
    name: 'Ava Johnson',
    email: 'ava@acme.com',
    password: 'acme1234',
    defaultOrganizationId: 'org-acme-hq',
    organizations: getOrganizationsByIds(['org-acme-hq', 'org-acme-labs']),
    tenant: requireOrganization('org-acme-hq'),
  },
  {
    id: 'user-globex-admin',
    name: 'Noah Smith',
    email: 'noah@globex.com',
    password: 'globex1234',
    defaultOrganizationId: 'org-globex-core',
    organizations: getOrganizationsByIds(['org-globex-core', 'org-globex-research']),
    tenant: requireOrganization('org-globex-core'),
  },
] as const;

export const AUTH_COOKIE_NAME = 'dashboard.demo-auth-session.v2';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

type TokenPayload = {
  user: MemoryUser;
  organizations: MemoryOrganization[];
  activeOrganizationId: string;
  exp: number;
};

function getAuthSecret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev-only-dashboard-secret-change-me';
}

function bytesToBinary(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
}

function binaryToBytes(binary: string): Uint8Array {
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function toBase64(binary: string): string {
  if (typeof btoa === 'function') {
    return btoa(binary);
  }

  // Node.js fallback
  return Buffer.from(binary, 'binary').toString('base64');
}

function fromBase64(base64: string): string {
  if (typeof atob === 'function') {
    return atob(base64);
  }

  // Node.js fallback
  return Buffer.from(base64, 'base64').toString('binary');
}

function base64UrlEncode(bytes: Uint8Array): string {
  const base64 = toBase64(bytesToBinary(bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
  return binaryToBytes(fromBase64(padded));
}

async function sign(input: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(getAuthSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(input));
  return base64UrlEncode(new Uint8Array(signature));
}

function toSession(payload: TokenPayload): DemoAuthSession | null {
  const activeOrganization = payload.organizations.find((org) => org.id === payload.activeOrganizationId);
  if (!activeOrganization) {
    return null;
  }

  const expiresAt = new Date(payload.exp).toISOString();

  return {
    user: {
      ...payload.user,
      tenantId: activeOrganization.id,
      activeOrganizationId: activeOrganization.id,
    },
    organization: activeOrganization,
    organizations: payload.organizations,
    tenant: activeOrganization,
    session: {
      id: `session-${payload.user.id}`,
      userId: payload.user.id,
      expiresAt,
    },
  };
}

async function issueSessionFromPayload(payload: TokenPayload): Promise<{ token: string; session: DemoAuthSession } | null> {
  const session = toSession(payload);
  if (!session) {
    return null;
  }

  const payloadRaw = JSON.stringify(payload);
  const payloadEncoded = base64UrlEncode(encoder.encode(payloadRaw));
  const signature = await sign(payloadEncoded);

  return {
    token: `${payloadEncoded}.${signature}`,
    session,
  };
}

async function decodeAndVerifyToken(token: string | null | undefined): Promise<TokenPayload | null> {
  if (!token) {
    return null;
  }

  const [payloadEncoded, signature] = token.split('.');
  if (!payloadEncoded || !signature) {
    return null;
  }

  const expected = await sign(payloadEncoded);
  if (signature !== expected) {
    return null;
  }

  try {
    const payloadRaw = decoder.decode(base64UrlDecode(payloadEncoded));
    const payload = JSON.parse(payloadRaw) as TokenPayload;

    if (!payload?.user?.id || !payload?.user?.email || !Array.isArray(payload.organizations) || typeof payload.exp !== 'number') {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    if (!payload.user.activeOrganizationId || !payload.activeOrganizationId) {
      return null;
    }

    if (!payload.user.organizationIds?.includes(payload.activeOrganizationId)) {
      return null;
    }

    if (!payload.organizations.some((org) => org.id === payload.activeOrganizationId)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function createSessionToken(account: DemoAccount): Promise<{ token: string; session: DemoAuthSession } | null> {
  const activeOrganizationId = account.defaultOrganizationId;

  const payload: TokenPayload = {
    user: {
      id: account.id,
      name: account.name,
      email: account.email,
      tenantId: activeOrganizationId,
      organizationIds: account.organizations.map((org) => org.id),
      activeOrganizationId,
    },
    organizations: account.organizations,
    activeOrganizationId,
    exp: Date.now() + SESSION_TTL_MS,
  };

  return issueSessionFromPayload(payload);
}

export async function switchSessionOrganization(
  token: string | null | undefined,
  organizationId: string,
): Promise<{ token: string; session: DemoAuthSession } | null> {
  const payload = await decodeAndVerifyToken(token);
  if (!payload) {
    return null;
  }

  const canUseOrganization =
    payload.user.organizationIds.includes(organizationId) &&
    payload.organizations.some((organization) => organization.id === organizationId);

  if (!canUseOrganization) {
    return null;
  }

  const nextPayload: TokenPayload = {
    ...payload,
    activeOrganizationId: organizationId,
    user: {
      ...payload.user,
      tenantId: organizationId,
      activeOrganizationId: organizationId,
    },
  };

  return issueSessionFromPayload(nextPayload);
}

export async function verifySessionToken(token: string | null | undefined): Promise<DemoAuthSession | null> {
  const payload = await decodeAndVerifyToken(token);
  if (!payload) {
    return null;
  }

  return toSession(payload);
}

export function findDemoAccount(email: string, password: string): DemoAccount | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  return DEMO_ACCOUNTS.find((candidate) => candidate.email === normalizedEmail && candidate.password === normalizedPassword);
}

export function getSessionMaxAgeSeconds(): number {
  return Math.floor(SESSION_TTL_MS / 1000);
}
