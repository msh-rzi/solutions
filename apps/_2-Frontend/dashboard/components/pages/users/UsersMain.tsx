'use client';

import { authClient, type DemoAuthSession } from '../../../lib/auth-client';
import {
  AccessExceptionsSection,
  AuditTrailSection,
  BulkActionsSection,
  PendingInvitationsSection,
  RoleDistributionSection,
  TenantScopeCard,
  UserSearchFiltersSection,
  UsersTableSection,
} from './sections';

export default function UsersMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skeleton user management workspace. Every card includes what to implement in that section.
      </p>

      <TenantScopeCard organizationName={demoSession?.organization?.name} />

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <UserSearchFiltersSection />
        <BulkActionsSection />
        <UsersTableSection />
        <RoleDistributionSection />
        <PendingInvitationsSection />
        <AccessExceptionsSection />
        <AuditTrailSection />
      </div>
    </section>
  );
}
