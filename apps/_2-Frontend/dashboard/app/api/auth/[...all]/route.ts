import { NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  findDemoAccount,
  getSessionMaxAgeSeconds,
  switchSessionOrganization,
  verifySessionToken,
} from '../../../../lib/auth-session';

function json(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

function endpointFromPath(pathname: string): string {
  const prefix = '/api/auth';
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) || '/' : pathname;
}

function readCookieFromHeader(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  const value = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${key}=`))
    ?.slice(key.length + 1);

  return value ?? null;
}

function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getSessionMaxAgeSeconds(),
  });
}

export async function GET(request: Request) {
  const endpoint = endpointFromPath(new URL(request.url).pathname);

  if (endpoint === '/get-session') {
    const token = readCookieFromHeader(request.headers.get('cookie'), AUTH_COOKIE_NAME);
    const session = await verifySessionToken(token);
    return json(session);
  }

  return json({ message: `No handler for GET ${endpoint}` }, { status: 404 });
}

export async function POST(request: Request) {
  const endpoint = endpointFromPath(new URL(request.url).pathname);

  if (endpoint === '/sign-in/email') {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const account = findDemoAccount(body.email, body.password);
    if (!account) {
      return json({ message: 'Invalid credentials. Use one of the demo users.' }, { status: 401 });
    }

    const result = await createSessionToken(account);
    if (!result) {
      return json({ message: 'Unable to create session.' }, { status: 500 });
    }

    const response = json(result.session);
    setSessionCookie(response, result.token);
    return response;
  }

  if (endpoint === '/switch-organization') {
    const body = (await request.json().catch(() => ({}))) as {
      organizationId?: string;
    };

    if (!body.organizationId) {
      return json({ message: 'organizationId is required.' }, { status: 400 });
    }

    const token = readCookieFromHeader(request.headers.get('cookie'), AUTH_COOKIE_NAME);
    const result = await switchSessionOrganization(token, body.organizationId);

    if (!result) {
      return json({ message: 'You do not have access to this organization.' }, { status: 403 });
    }

    const response = json(result.session);
    setSessionCookie(response, result.token);
    return response;
  }

  if (endpoint === '/sign-out') {
    const response = json({ success: true });
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: '',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    });

    return response;
  }

  return json({ message: `No handler for POST ${endpoint}` }, { status: 404 });
}
