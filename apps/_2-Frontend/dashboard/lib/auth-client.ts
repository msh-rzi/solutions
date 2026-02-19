'use client';

import { createAuthClient } from 'better-auth/react';
import type { DemoAuthSession, DemoAccount } from './auth-session';
import { DEMO_ACCOUNTS } from './auth-session';

export type { DemoAuthSession, DemoAccount };
export { DEMO_ACCOUNTS };

export const authClient = createAuthClient({
  baseURL: '',
  fetchOptions: {
    credentials: 'include',
  },
});

export async function switchOrganization(organizationId: string): Promise<{ error?: { message?: string } }> {
  try {
    const response = await fetch('/api/auth/switch-organization', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ organizationId }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      return { error: { message: payload?.message ?? 'Unable to switch organization.' } };
    }

    return {};
  } catch {
    return { error: { message: 'Unable to switch organization right now.' } };
  }
}
