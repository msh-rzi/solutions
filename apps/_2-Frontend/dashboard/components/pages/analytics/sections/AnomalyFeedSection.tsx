import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function AnomalyFeedSection() {
  return (
    <AnalyticsSectionCard
      title="Anomaly Feed"
      instruction="Implement anomaly detection feed here (spikes, drops, and threshold breaches)."
      className="lg:col-span-5"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </AnalyticsSectionCard>
  );
}

