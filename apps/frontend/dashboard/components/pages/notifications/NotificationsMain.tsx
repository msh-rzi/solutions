'use client';

import { authClient, type DemoAuthSession } from '../../../lib/auth-client';
import {
  BulkActionsSection,
  DeliveryAuditLogSection,
  DeliveryChannelsSection,
  EscalationRulesSection,
  FilterTriageSection,
  NotificationFeedSection,
  SlaResponseMetricsSection,
  SubscribedTopicsSection,
  TenantScopeCard,
} from './sections';

export default function NotificationsMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Single-layout notification operations center for triage, escalation, delivery, and audit.
      </p>

      <TenantScopeCard organizationName={demoSession?.organization?.name} />

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <NotificationFeedSection />
        <FilterTriageSection />
        <DeliveryChannelsSection />
        <EscalationRulesSection />
        <SlaResponseMetricsSection />
        <BulkActionsSection />
        <SubscribedTopicsSection />
        <DeliveryAuditLogSection />
      </div>
    </section>
  );
}
