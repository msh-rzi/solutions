import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function FunnelStepsSection() {
  return (
    <AnalyticsSectionCard
      title="Funnel Steps"
      instruction="Implement conversion funnel visualization here (visit -> signup -> activation -> paid)."
      className="lg:col-span-4"
    >
      <Skeleton className="h-36 w-full" />
    </AnalyticsSectionCard>
  );
}

