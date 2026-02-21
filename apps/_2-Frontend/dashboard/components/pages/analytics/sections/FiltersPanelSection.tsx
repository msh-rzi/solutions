import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function FiltersPanelSection() {
  return (
    <AnalyticsSectionCard
      title="Filters Panel"
      instruction="Implement date range, segment, channel, and campaign filters here."
      className="lg:col-span-4"
    >
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </AnalyticsSectionCard>
  );
}

