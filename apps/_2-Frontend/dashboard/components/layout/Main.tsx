'use client';

import React from 'react';
import { authClient, type DemoAuthSession } from '../../lib/auth-client';
import { StatsGrid } from '../dashboard/StatsGrid';
import Chart from '../dashboard/Chart';
import Transactions from '../dashboard/TransactionList';
import { Avatar, AvatarFallback, Separator, cn } from '@repo/ui-shadcn';
import { Building2, User2 } from 'lucide-react';

// ─── Session Info Card ────────────────────────────────────────────────────────

const SessionCard = ({ icon: Icon, label, primary, secondary }: { icon: React.ElementType; label: string; primary?: string; secondary?: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{label}</p>
      <p className="truncate text-sm font-semibold text-foreground leading-tight">{primary ?? '—'}</p>
      <p className="truncate text-xs text-muted-foreground">{secondary ?? '—'}</p>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Main = () => {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  const initials = demoSession?.user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="h-full flex-1 flex flex-col gap-6 rounded-xl border bg-card p-6 overflow-auto">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Multi-tenant demo state is client-side only and stored in memory.</p>
        </div>

        {/* Session chips */}
        <div className="flex items-center gap-4 rounded-lg border bg-muted/40 px-4 py-2.5 flex-wrap">
          <SessionCard icon={Building2} label="Tenant" primary={demoSession?.tenant?.name} secondary={demoSession?.tenant?.id} />
          <Separator orientation="vertical" className="h-8 hidden sm:block" />
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">{initials ?? <User2 className="h-4 w-4" />}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">User</p>
              <p className="truncate text-sm font-semibold text-foreground leading-tight">{demoSession?.user?.name ?? '—'}</p>
              <p className="truncate text-xs text-muted-foreground">{demoSession?.user?.email ?? '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <StatsGrid />

      {/* ── Chart + Transactions ── */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Chart />
        <Transactions />
      </div>
    </section>
  );
};

export default Main;
