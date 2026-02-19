'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, Badge, Separator, cn } from '@repo/ui-shadcn';
import { Building2, User2 } from 'lucide-react';
import { authClient, type DemoAuthSession } from '../../lib/auth-client';
import DashboardChart from '../dashboard/Chart';
import { LayoutPicker } from '../dashboard/LayoutPicker';
import { StatsGrid } from '../dashboard/StatsGrid';
import DashboardTransactions from '../dashboard/TransactionList';
import { DASHBOARD_REVENUE_SERIES, DASHBOARD_STATS, DASHBOARD_TRANSACTIONS } from '../dashboard/mock-data';
import { type DashboardAccent, type DashboardLayoutPreset, useDashboardPreferences } from '../dashboard/useDashboardPreferences';

const accentColors: Record<DashboardAccent, string> = {
  slate: '#475b63',
  emerald: '#047857',
  blue: '#1d4ed8',
  amber: '#b45309',
};

const layoutGridClass: Record<DashboardLayoutPreset, string> = {
  balanced: 'grid gap-4 xl:grid-cols-[1.8fr_1fr]',
  analytics: 'grid gap-4',
  operations: 'grid gap-4 xl:grid-cols-[1fr_1.8fr]',
};

const SessionCard = ({ icon: Icon, label, primary, secondary }: { icon: React.ElementType; label: string; primary?: string; secondary?: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold leading-tight">{primary ?? '-'}</p>
      <p className="truncate text-xs text-muted-foreground">{secondary ?? '-'}</p>
    </div>
  </div>
);

const Main = () => {
  const { data: session } = authClient.useSession();
  const demoSession = session as DemoAuthSession | null;
  const userId = demoSession?.user?.id;
  const { preferences, isHydrated, setPreference, resetPreferences } = useDashboardPreferences(userId);

  const [isBootstrapping, setBootstrapping] = React.useState(true);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setBootstrapping(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, []);

  const initials = demoSession?.user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const accentColor = accentColors[preferences.accent];
  const showLoadingState = !isHydrated || isBootstrapping;
  const isCompact = preferences.density === 'compact';
  const isOperationsLayout = preferences.layout === 'operations';

  return (
    <section
      data-density={preferences.density}
      data-surface={preferences.surface}
      className={cn('dashboard-shell h-full flex-1 overflow-auto rounded-xl border bg-card transition-[padding,gap] duration-200', isCompact ? 'p-4' : 'p-6')}
      style={{ '--dashboard-accent': accentColor } as React.CSSProperties}
    >
      <div className={cn('flex flex-col', isCompact ? 'gap-4' : 'gap-6')}>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Heavy Dashboard</h1>
            <p className="text-sm text-muted-foreground">High-throughput analytics with virtualized transactions and user-customizable layout.</p>
          </div>
        </header>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className={cn('flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 px-4 py-2.5', isCompact && 'gap-2 px-3 py-2')}>
            <SessionCard icon={Building2} label="Tenant" primary={demoSession?.tenant?.name} secondary={demoSession?.tenant?.id} />
            <Separator orientation="vertical" className="hidden h-8 sm:block" />
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">{initials ?? <User2 className="h-4 w-4" />}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">User</p>
                <p className="truncate text-sm font-semibold leading-tight">{demoSession?.user?.name ?? '-'}</p>
                <p className="truncate text-xs text-muted-foreground">{demoSession?.user?.email ?? '-'}</p>
              </div>
            </div>
          </div>

          <LayoutPicker preferences={preferences} onChange={setPreference} onReset={resetPreferences} />
        </div>

        <StatsGrid stats={DASHBOARD_STATS} density={preferences.density} loading={showLoadingState} />

        <div className={layoutGridClass[preferences.layout]}>
          <DashboardChart
            data={DASHBOARD_REVENUE_SERIES}
            density={preferences.density}
            accent={preferences.accent}
            loading={showLoadingState}
            className={cn(isOperationsLayout && 'xl:order-2')}
          />

          <DashboardTransactions
            transactions={DASHBOARD_TRANSACTIONS}
            density={preferences.density}
            layout={preferences.layout}
            loading={showLoadingState}
            className={cn(isOperationsLayout && 'xl:order-1')}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;

