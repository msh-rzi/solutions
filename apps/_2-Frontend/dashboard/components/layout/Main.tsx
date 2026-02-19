'use client';

import React from 'react';
import { authClient, type DemoAuthSession } from '../../lib/auth-client';

const Main = () => {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Session is server-side cookie based and supports organization switching.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Active Organization</p>
          <p className="mt-2 font-medium">{demoSession?.organization?.name ?? '-'}</p>
          <p className="text-xs text-muted-foreground">{demoSession?.organization?.id ?? '-'}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">User</p>
          <p className="mt-2 font-medium">{demoSession?.user?.name ?? '-'}</p>
          <p className="text-xs text-muted-foreground">{demoSession?.user?.email ?? '-'}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Available Organizations</p>
        <ul className="mt-2 space-y-1 text-sm">
          {(demoSession?.organizations ?? []).map((organization) => (
            <li key={organization.id}>
              {organization.name} <span className="text-xs text-muted-foreground">({organization.slug})</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;
