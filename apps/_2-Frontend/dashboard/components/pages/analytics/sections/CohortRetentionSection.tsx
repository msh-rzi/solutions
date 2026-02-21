import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function CohortRetentionSection() {
  return (
    <AnalyticsSectionCard
      title="Cohort Retention"
      instruction="Implement retention cohort heatmap here (weekly and monthly cohorts)."
      className="lg:col-span-4"
    >
      <Skeleton className="h-36 w-full" />
    </AnalyticsSectionCard>
  );
}

