import React from 'react';
import { TrendingUp, TrendingDown, Minus, LucideIcon, Badge } from 'lucide-react';
import { Card, CardContent, CardHeader, cn } from '@repo/ui-shadcn';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatProps {
  /** Headline label */
  title: string;
  /** Primary value to display */
  value: string | number;
  /** Optional supporting description */
  description?: string;
  /** Percentage or absolute change label, e.g. "+12.5%" */
  change?: string;
  /** Direction of the change */
  trend?: StatTrend;
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Additional class names on the card root */
  className?: string;
  /** Show a loading skeleton */
  loading?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const trendConfig: Record<StatTrend, { icon: LucideIcon; badgeClass: string; textClass: string }> = {
  up: {
    icon: TrendingUp,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    textClass: 'text-emerald-600',
  },
  down: {
    icon: TrendingDown,
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    textClass: 'text-rose-600',
  },
  neutral: {
    icon: Minus,
    badgeClass: 'bg-muted text-muted-foreground border-border',
    textClass: 'text-muted-foreground',
  },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const StatSkeleton = ({ className }: { className?: string }) => (
  <Card className={cn('animate-pulse', className)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="h-8 w-8 rounded-md bg-muted" />
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="h-8 w-32 rounded bg-muted" />
      <div className="h-3 w-20 rounded bg-muted" />
    </CardContent>
  </Card>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Stat = ({ title, value, description, change, trend = 'neutral', icon: Icon, className, loading = false }: StatProps) => {
  if (loading) return <StatSkeleton className={className} />;

  const { icon: TrendIcon, badgeClass, textClass } = trendConfig[trend];

  return (
    <Card className={cn('relative overflow-hidden transition-shadow duration-200 hover:shadow-md', className)}>
      {/* Subtle background accent */}
      <span aria-hidden className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <span className="text-sm font-medium text-muted-foreground tracking-wide">{title}</span>

        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-1">
        {/* Primary value */}
        <p className="text-3xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>

        {/* Change badge + description row */}
        <div className="flex items-center gap-2 flex-wrap">
          {change && (
            <Badge
              // variant="outline"
              className={cn('gap-1 py-0 text-xs font-medium', badgeClass)}
            >
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

export default Stat;
