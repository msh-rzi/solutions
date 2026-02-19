'use client';

import { createAuthClient } from 'better-auth/react';

type MemoryTenant = {
  id: string;
  slug: string;
  name: string;
};

type MemoryUser = {
  id: string;
  name: string;
  email: string;
  tenantId: string;
};

type MemorySession = {
  id: string;
  userId: string;
  expiresAt: string;
};

type MemoryAuthPayload = {
  user: MemoryUser;
  session: MemorySession;
  tenant: MemoryTenant;
};

export type DemoAuthSession = MemoryAuthPayload;

export type DemoAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  tenant: MemoryTenant;
};

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  {
    id: 'user-acme-admin',
    name: 'Ava Johnson',
    email: 'ava@acme.com',
    password: 'acme1234',
    tenant: {
      id: 'tenant-acme',
      slug: 'acme',
      name: 'Acme Inc.',
    },
  },
  {
    id: 'user-globex-admin',
    name: 'Noah Smith',
    email: 'noah@globex.com',
    password: 'globex1234',
    tenant: {
      id: 'tenant-globex',
      slug: 'globex',
      name: 'Globex Corp.',
    },
  },
] as const;

const STORAGE_KEY = 'dashboard.demo-auth-session.v1';

const isExpired = (session: MemoryAuthPayload) => new Date(session.session.expiresAt).getTime() <= Date.now();

const readSessionFromStorage = (): MemoryAuthPayload | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as MemoryAuthPayload;
    if (!parsed?.session?.expiresAt || !parsed?.user?.id || !parsed?.tenant?.id || isExpired(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const writeSessionToStorage = (session: MemoryAuthPayload | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

let currentSession: MemoryAuthPayload | null = readSessionFromStorage();

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  });

const extractEndpoint = (url: URL) => {
  const authPrefix = '/api/auth';
  return url.pathname.startsWith(authPrefix) ? url.pathname.slice(authPrefix.length) || '/' : url.pathname;
};

const memoryFetch: typeof fetch = async (input, init) => {
  const request = new Request(input, init);
  const requestUrl = new URL(request.url, 'http://localhost');
  const endpoint = extractEndpoint(requestUrl);

  if (endpoint === '/get-session' && request.method === 'GET') {
    if (!currentSession) {
      currentSession = readSessionFromStorage();
    }

    return json(currentSession);
  }

  if (endpoint === '/sign-in/email' && request.method === 'POST') {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim().toLowerCase() ?? '';
    const password = body.password?.trim() ?? '';

    if (!email || !password) {
      return json(
        { message: 'Email and password are required.' },
        { status: 400, statusText: 'Bad Request' },
      );
    }

    const account = DEMO_ACCOUNTS.find((candidate) => candidate.email === email && candidate.password === password);

    if (!account) {
      return json(
        { message: 'Invalid credentials. Use one of the demo users.' },
        { status: 401, statusText: 'Unauthorized' },
      );
    }

    const sessionId = crypto.randomUUID();

    currentSession = {
      user: {
        id: account.id,
        name: account.name,
        email: account.email,
        tenantId: account.tenant.id,
      },
      session: {
        id: sessionId,
        userId: account.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      tenant: account.tenant,
    };
    writeSessionToStorage(currentSession);

    return json(currentSession);
  }

  if (endpoint === '/sign-out' && request.method === 'POST') {
    currentSession = null;
    writeSessionToStorage(null);
    return json({ success: true });
  }

  return json(
    { message: `No in-memory handler for ${request.method} ${endpoint}` },
    { status: 404, statusText: 'Not Found' },
  );
};

export const authClient = createAuthClient({
  fetchOptions: {
    customFetchImpl: memoryFetch,
  },
});
