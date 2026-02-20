'use client';

import React from 'react';
import { Skeleton } from '@repo/ui-shadcn';
import { authClient, type DemoAuthSession } from '../../../lib/auth-client';

function NotificationsSlot({
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

export default function NotificationsMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skeleton notification center. Every card includes what to implement in that section.
      </p>

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Tenant Scope</p>
        <p className="mt-2 text-sm font-medium">{demoSession?.organization?.name ?? '-'}</p>
        <p className="text-xs text-muted-foreground">
          Implement organization-scoped notification channels and delivery policies here.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <NotificationsSlot
          title="Notification Feed"
          instruction="Implement unified feed here (alerts, mentions, system events, approvals)."
          className="lg:col-span-8"
        >
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </NotificationsSlot>

        <NotificationsSlot
          title="Filter & Triage"
          instruction="Implement filters by priority, type, source, assignee, and unread status."
          className="lg:col-span-4"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </NotificationsSlot>

        <NotificationsSlot
          title="Delivery Channels"
          instruction="Implement channel controls here (in-app, email, SMS, Slack, webhook)."
          className="lg:col-span-4"
        >
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </NotificationsSlot>

        <NotificationsSlot
          title="Escalation Rules"
          instruction="Implement escalation policy builder here (severity, timeout, fallback owner)."
          className="lg:col-span-4"
        >
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </NotificationsSlot>

        <NotificationsSlot
          title="SLA & Response Metrics"
          instruction="Implement SLA breach and response time metrics chart here."
          className="lg:col-span-4"
        >
          <Skeleton className="h-36 w-full" />
        </NotificationsSlot>

        <NotificationsSlot
          title="Bulk Actions"
          instruction="Implement mark-read, assign-owner, suppress, and archive actions here."
          className="lg:col-span-6"
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </NotificationsSlot>

        <NotificationsSlot
          title="Subscribed Topics"
          instruction="Implement topic subscription management here (security, billing, product, incidents)."
          className="lg:col-span-6"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </NotificationsSlot>

        <NotificationsSlot
          title="Delivery Audit Log"
          instruction="Implement delivery audit trail here (channel, status, retries, error details)."
          className="lg:col-span-12"
        >
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </NotificationsSlot>
      </div>
    </section>
  );
}
