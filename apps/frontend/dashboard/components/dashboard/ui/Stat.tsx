'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge, Card, CardContent, CardHeader, cn } from '@repo/ui-shadcn';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatProps {
  title: string;
  value: string | number;
  description?: string;
  change?: string;
  trend?: StatTrend;
  icon?: LucideIcon;
  className?: string;
  loading?: boolean;
}

const trendConfig: Record<StatTrend, { icon: LucideIcon; badgeClass: string }> = {
  up: {
    icon: TrendingUp,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  down: {
    icon: TrendingDown,
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  neutral: {
    icon: Minus,
    badgeClass: 'bg-muted text-muted-foreground border-border',
  },
};

const StatSkeleton = ({ className }: { className?: string }) => (
  <Card className={cn('animate-pulse', className)}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="h-8 w-8 rounded-md bg-muted" />
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="h-8 w-32 rounded bg-muted" />
      <div className="h-3 w-20 rounded bg-muted" />
    </CardContent>
  </Card>
);

const Stat = ({ title, value, description, change, trend = 'neutral', icon: Icon, className, loading = false }: StatProps) => {
  if (loading) {
    return <StatSkeleton className={className} />;
  }

  const { icon: TrendIcon, badgeClass } = trendConfig[trend];

  return (
    <Card className={cn('relative overflow-hidden transition-shadow duration-200 hover:shadow-md', className)}>
      <span aria-hidden className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <span className="text-sm font-medium tracking-wide text-muted-foreground">{title}</span>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-1">
        <p className="text-3xl font-bold tracking-tight tabular-nums">{value}</p>

        <div className="flex flex-wrap items-center gap-2">
          {change && (
            <Badge className={cn('gap-1 py-0 text-xs font-medium', badgeClass)}>
              <TrendIcon className="h-3 w-3" />
              {change}
            </Badge>
          )}
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(Stat);

