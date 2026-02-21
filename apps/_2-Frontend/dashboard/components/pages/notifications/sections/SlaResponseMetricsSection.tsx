import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function SlaResponseMetricsSection() {
  return (
    <NotificationsSectionCard
      title="SLA & Response Metrics"
      instruction="Implement SLA breach and response time metrics chart here."
      className="lg:col-span-4"
    >
      <Skeleton className="h-36 w-full" />
    </NotificationsSectionCard>
  );
}

