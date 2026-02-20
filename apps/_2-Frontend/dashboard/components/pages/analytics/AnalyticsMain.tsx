'use client';

import React from 'react';
import { Skeleton } from '@repo/ui-shadcn';
import { authClient, type DemoAuthSession } from '../../../lib/auth-client';

function AnalyticsSlot({
  title,
  instruction,
  className,
  children,
}: {
  title: string;
  instruction: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`rounded-lg border bg-card p-4 ${className ?? ''}`}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{instruction}</p>
      <div className="mt-4 space-y-2">{children}</div>
    </article>
  );
}

export default function AnalyticsMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skeleton analytics workspace. Every card includes what to implement in that section.
      </p>

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Scope</p>
        <p className="mt-2 text-sm font-medium">{demoSession?.organization?.name ?? '-'}</p>
        <p className="text-xs text-muted-foreground">
          Implement organization-scoped analytics queries and access control here.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <AnalyticsSlot
          title="Traffic & Conversion Trend"
          instruction="Implement multi-series trend chart here (sessions, signups, conversions)."
          className="lg:col-span-8"
        >
          <Skeleton className="h-44 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Filters Panel"
          instruction="Implement date range, segment, channel, and campaign filters here."
          className="lg:col-span-4"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Attribution Breakdown"
          instruction="Implement channel attribution chart here (paid, organic, referral, direct)."
          className="lg:col-span-4"
        >
          <Skeleton className="h-36 w-full" />
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Funnel Steps"
          instruction="Implement conversion funnel visualization here (visit -> signup -> activation -> paid)."
          className="lg:col-span-4"
        >
          <Skeleton className="h-36 w-full" />
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Cohort Retention"
          instruction="Implement retention cohort heatmap here (weekly and monthly cohorts)."
          className="lg:col-span-4"
        >
          <Skeleton className="h-36 w-full" />
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Top Segments Table"
          instruction="Implement ranked segments table here (ARR, growth, churn risk, conversion rate)."
          className="lg:col-span-7"
        >
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Anomaly Feed"
          instruction="Implement anomaly detection feed here (spikes, drops, and threshold breaches)."
          className="lg:col-span-5"
        >
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </AnalyticsSlot>

        <AnalyticsSlot
          title="Exports & Reports"
          instruction="Implement report export actions here (CSV, PDF, scheduled email digest)."
          className="lg:col-span-12"
        >
          <div className="grid gap-2 sm:grid-cols-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </AnalyticsSlot>
      </div>
    </section>
  );
}
