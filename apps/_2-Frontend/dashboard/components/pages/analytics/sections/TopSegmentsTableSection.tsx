import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function TopSegmentsTableSection() {
  return (
    <AnalyticsSectionCard
      title="Top Segments Table"
      instruction="Implement ranked segments table here (ARR, growth, churn risk, conversion rate)."
      className="lg:col-span-7"
    >
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
    </AnalyticsSectionCard>
  );
}

