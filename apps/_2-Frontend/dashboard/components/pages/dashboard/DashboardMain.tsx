'use client';

import React from 'react';
import { authClient, type DemoAuthSession } from '../../../lib/auth-client';
import { ActiveTenantContextCard, type DashboardLayoutPreset, LayoutSections } from './sections';

const SETTINGS_STORAGE_KEY = 'dashboard.preferences.v1';
const PREFERENCES_UPDATED_EVENT = 'dashboard:preferences-updated';

function getSavedLayout(): DashboardLayoutPreset {
  if (typeof window === 'undefined') {
    return 'executive';
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return 'executive';
    }

    const parsed = JSON.parse(raw) as { layout?: DashboardLayoutPreset };
    if (parsed.layout === 'executive' || parsed.layout === 'operations' || parsed.layout === 'analyst') {
      return parsed.layout;
    }

    return 'executive';
  } catch {
    return 'executive';
  }
}

function getLayoutLabel(layout: DashboardLayoutPreset): string {
  if (layout === 'operations') {
    return 'Operations';
  }

  if (layout === 'analyst') {
    return 'Analyst';
  }

  return 'Executive';
}

export default function DashboardMain() {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;
  const [layout, setLayout] = React.useState<DashboardLayoutPreset>('executive');

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

  const layoutLabel = getLayoutLabel(layout);

  return (
    <section className="h-full flex-1 overflow-auto rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skeleton layout mode: {layoutLabel}. Each box explains what to implement in that widget.
      </p>

      <ActiveTenantContextCard
        organizationName={demoSession?.organization?.name}
        userName={demoSession?.user?.name}
        userEmail={demoSession?.user?.email}
      />

      <div className="mt-4">
        <LayoutSections layout={layout} />
      </div>
    </section>
  );
}

