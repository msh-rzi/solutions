'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton, cn } from '@repo/ui-shadcn';
import type { RevenuePoint } from './mock-data';
import type { DashboardAccent, DashboardDensity } from './useDashboardPreferences';

const FinancialChart = dynamic(() => import('./ui/Chart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

type Timeframe = '12m' | '24m' | 'all';

interface DashboardChartProps {
  data: readonly RevenuePoint[];
  density: DashboardDensity;
  accent: DashboardAccent;
  loading?: boolean;
  className?: string;
}

const accentPalette: Record<DashboardAccent, { revenue: string; expenses: string }> = {
  slate: { revenue: '#475b63', expenses: '#2e2c2f' },
  emerald: { revenue: '#047857', expenses: '#065f46' },
  blue: { revenue: '#1d4ed8', expenses: '#1e3a8a' },
  amber: { revenue: '#b45309', expenses: '#92400e' },
};

const ChartSkeleton = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-2">
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
    </div>
    <Skeleton className="h-72 w-full rounded-lg" />
  </div>
);

const yTickFormatter = (value: number) => `$${Math.round(value / 1000)}k`;

const DashboardChart = ({ data, density, accent, loading = false, className }: DashboardChartProps) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('24m');
  const palette = accentPalette[accent];

  const filteredData = React.useMemo(() => {
    if (timeframe === 'all') {
      return data;
    }

    const length = timeframe === '12m' ? 12 : 24;
    return data.slice(-length);
  }, [data, timeframe]);

  const chartSeries = React.useMemo(
    () => [
      { key: 'revenue', label: 'Revenue', color: palette.revenue },
      { key: 'expenses', label: 'Expenses', color: palette.expenses },
    ],
    [palette.expenses, palette.revenue],
  );

  return (
    <Card className={cn('dashboard-panel flex flex-col', className)}>
      <CardHeader className={cn('pb-2', density === 'compact' && 'pb-1')}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>Financial performance</CardTitle>
            <CardDescription>Revenue and expense trends optimized for large datasets.</CardDescription>
          </div>

          <div className="flex items-center gap-1 rounded-md border bg-muted/30 p-1">
            {(['12m', '24m', 'all'] as const).map((period) => (
              <Button
                key={period}
                size="sm"
                variant={timeframe === period ? 'secondary' : 'ghost'}
                className="h-7 px-2 text-xs"
                onClick={() => setTimeframe(period)}
              >
                {period === 'all' ? 'All' : period.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn('space-y-3', density === 'compact' && 'space-y-2')}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Points: {filteredData.length}</Badge>
          <Badge variant="outline">Mode: High throughput</Badge>
        </div>

        {loading ? (
          <ChartSkeleton />
        ) : (
          <FinancialChart
            data={filteredData}
            xKey="month"
            series={chartSeries}
            yTickFormatter={yTickFormatter}
            tooltipLabelFormatter={(value) => `Month: ${value}`}
            dotRadius={density === 'compact' ? 2 : 2.8}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(DashboardChart);

