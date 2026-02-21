'use client';

import { authClient, type DemoAuthSession } from '../../../lib/auth-client';
import {
  AnomalyFeedSection,
  AttributionBreakdownSection,
  CohortRetentionSection,
  ExportsReportsSection,
  FiltersPanelSection,
  FunnelStepsSection,
  ScopeCard,
  TopSegmentsTableSection,
  TrafficConversionTrendSection,
} from './sections';

export default function AnalyticsMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skeleton analytics workspace. Every card includes what to implement in that section.
      </p>

      <ScopeCard organizationName={demoSession?.organization?.name} />

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <TrafficConversionTrendSection />
        <FiltersPanelSection />
        <AttributionBreakdownSection />
        <FunnelStepsSection />
        <CohortRetentionSection />
        <TopSegmentsTableSection />
        <AnomalyFeedSection />
        <ExportsReportsSection />
      </div>
    </section>
  );
}
