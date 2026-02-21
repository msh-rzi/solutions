import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function TrafficConversionTrendSection() {
  return (
    <AnalyticsSectionCard
      title="Traffic & Conversion Trend"
      instruction="Implement multi-series trend chart here (sessions, signups, conversions)."
      className="lg:col-span-8"
    >
      <Skeleton className="h-44 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </AnalyticsSectionCard>
  );
}

