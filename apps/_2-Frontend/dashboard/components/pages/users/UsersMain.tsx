'use client';

import React from 'react';
import { Skeleton } from '@repo/ui-shadcn';
import { authClient, type DemoAuthSession } from '../../../lib/auth-client';

function UsersSlot({
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

export default function UsersMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skeleton user management workspace. Every card includes what to implement in that section.
      </p>

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Tenant Scope</p>
        <p className="mt-2 text-sm font-medium">{demoSession?.organization?.name ?? '-'}</p>
        <p className="text-xs text-muted-foreground">
          Implement tenant-scoped user queries, RBAC, and audit boundaries here.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <UsersSlot
          title="User Search & Filters"
          instruction="Implement search, role filter, status filter, and team filter here."
          className="lg:col-span-4"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </UsersSlot>

        <UsersSlot
          title="Bulk Actions"
          instruction="Implement bulk invite, deactivate, role assignment, and export actions here."
          className="lg:col-span-8"
        >
          <div className="grid gap-2 sm:grid-cols-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </UsersSlot>

        <UsersSlot
          title="Users Table"
          instruction="Implement main users table here (name, email, role, status, last active, actions)."
          className="lg:col-span-8"
        >
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </UsersSlot>

        <UsersSlot
          title="Role Distribution"
          instruction="Implement role distribution chart here (admin, manager, analyst, viewer)."
          className="lg:col-span-4"
        >
          <Skeleton className="h-36 w-full" />
        </UsersSlot>

        <UsersSlot
          title="Pending Invitations"
          instruction="Implement pending invites list and resend/revoke actions here."
          className="lg:col-span-6"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </UsersSlot>

        <UsersSlot
          title="Access Exceptions"
          instruction="Implement temporary access grants and exception approvals here."
          className="lg:col-span-6"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </UsersSlot>

        <UsersSlot
          title="Audit Trail"
          instruction="Implement user activity audit log here (role changes, login events, status updates)."
          className="lg:col-span-12"
        >
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </UsersSlot>
      </div>
    </section>
  );
}
