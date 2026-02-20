'use client';

import React from 'react';
import { Skeleton } from '@repo/ui-shadcn';
import { authClient, type DemoAuthSession } from '../../lib/auth-client';

type LayoutPreset = 'executive' | 'operations' | 'analyst';

const SETTINGS_STORAGE_KEY = 'dashboard.preferences.v1';
const PREFERENCES_UPDATED_EVENT = 'dashboard:preferences-updated';

function getSavedLayout(): LayoutPreset {
  if (typeof window === 'undefined') {
    return 'executive';
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return 'executive';
    }

    const parsed = JSON.parse(raw) as { layout?: LayoutPreset };
    if (parsed.layout === 'executive' || parsed.layout === 'operations' || parsed.layout === 'analyst') {
      return parsed.layout;
    }

    return 'executive';
  } catch {
    return 'executive';
  }
}

function PlaceholderCard({
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

function ExecutiveLayout() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <PlaceholderCard title="Revenue KPI" instruction="Implement MRR and ARR metric widget here." className="lg:col-span-3">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3 w-28" />
      </PlaceholderCard>
      <PlaceholderCard title="Cash Flow KPI" instruction="Implement cash-in versus cash-out metric here." className="lg:col-span-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-28" />
      </PlaceholderCard>
      <PlaceholderCard title="Burn Rate KPI" instruction="Implement monthly burn rate metric here." className="lg:col-span-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-28" />
      </PlaceholderCard>
      <PlaceholderCard title="Net Margin KPI" instruction="Implement net margin trend metric here." className="lg:col-span-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-28" />
      </PlaceholderCard>

      <PlaceholderCard title="Financial Performance" instruction="Implement financial chart here (revenue, costs, margin)." className="lg:col-span-8">
        <Skeleton className="h-44 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </PlaceholderCard>

      <PlaceholderCard title="Risk & Alerts" instruction="Implement executive risk feed and critical alerts here." className="lg:col-span-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Top Accounts" instruction="Implement top enterprise accounts table here." className="lg:col-span-7">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Executive Notes" instruction="Implement decision notes and action items panel here." className="lg:col-span-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </PlaceholderCard>
    </div>
  );
}

function OperationsLayout() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <PlaceholderCard title="Incident Queue" instruction="Implement active incidents queue with SLA badges here." className="lg:col-span-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Workflow Throughput" instruction="Implement operations throughput chart here." className="lg:col-span-8">
        <Skeleton className="h-36 w-full" />
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </PlaceholderCard>

      <PlaceholderCard title="Task Pipeline" instruction="Implement kanban pipeline health summary here." className="lg:col-span-6">
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </PlaceholderCard>

      <PlaceholderCard title="Team Capacity" instruction="Implement staffing and shift capacity chart here." className="lg:col-span-3">
        <Skeleton className="h-28 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Automation Runs" instruction="Implement job runs and failed tasks summary here." className="lg:col-span-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Runbook Timeline" instruction="Implement live timeline of operations events here." className="lg:col-span-12">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </PlaceholderCard>
    </div>
  );
}

function AnalystLayout() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <PlaceholderCard title="Query Filters" instruction="Implement advanced filter builder for analysis here." className="lg:col-span-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Primary Analysis Chart" instruction="Implement main time-series analysis chart here." className="lg:col-span-9">
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-3 w-40" />
      </PlaceholderCard>

      <PlaceholderCard title="Cohort / Segment Heatmap" instruction="Implement cohort retention heatmap here." className="lg:col-span-7">
        <Skeleton className="h-36 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Distribution Breakdown" instruction="Implement histogram and distribution chart here." className="lg:col-span-5">
        <Skeleton className="h-36 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Drill-down Table" instruction="Implement raw data drill-down table here." className="lg:col-span-8">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
      </PlaceholderCard>

      <PlaceholderCard title="Insights Summary" instruction="Implement generated insights and anomaly notes here." className="lg:col-span-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </PlaceholderCard>
    </div>
  );
}

function LayoutSection({ layout }: { layout: LayoutPreset }) {
  if (layout === 'operations') {
    return <OperationsLayout />;
  }

  if (layout === 'analyst') {
    return <AnalystLayout />;
  }

  return <ExecutiveLayout />;
}

const Main = () => {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;
  const [layout, setLayout] = React.useState<LayoutPreset>('executive');

  const readLayout = React.useCallback(() => {
    setLayout(getSavedLayout());
  }, []);

  React.useEffect(() => {
    readLayout();

    const onStorage = (event: StorageEvent) => {
      if (event.key === SETTINGS_STORAGE_KEY) {
        readLayout();
      }
    };

    const onPreferencesUpdated = () => {
      readLayout();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(PREFERENCES_UPDATED_EVENT, onPreferencesUpdated);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(PREFERENCES_UPDATED_EVENT, onPreferencesUpdated);
    };
  }, [readLayout]);

  const layoutLabel =
    layout === 'operations' ? 'Operations' : layout === 'analyst' ? 'Analyst' : 'Executive';

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Skeleton layout mode: {layoutLabel}. Each box explains what to implement in that widget.</p>

      <div className="mt-6 rounded-lg border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Active Tenant Context</p>
        <p className="mt-2 text-sm font-medium">{demoSession?.organization?.name ?? '-'}</p>
        <p className="text-xs text-muted-foreground">
          User: {demoSession?.user?.name ?? '-'} ({demoSession?.user?.email ?? '-'})
        </p>
      </div>

      <div className="mt-4">
        <LayoutSection layout={layout} />
      </div>
    </section>
  );
};

export default Main;
