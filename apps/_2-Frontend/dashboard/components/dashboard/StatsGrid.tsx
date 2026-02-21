'use client';

import * as React from 'react';
import type { DashboardDensity } from './useDashboardPreferences';
import type { DashboardStat } from './mock-data';
import Stat from './ui/Stat';
import { cn } from '@repo/ui-shadcn';

interface StatsGridProps {
  stats: readonly DashboardStat[];
  density: DashboardDensity;
  loading?: boolean;
}

export const StatsGrid = React.memo(function StatsGrid({ stats, density, loading = false }: StatsGridProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', density === 'compact' && 'gap-3')}>
      {stats.map((stat) => (
        <Stat key={stat.title} {...stat} loading={loading} />
      ))}
    </div>
  );
});

