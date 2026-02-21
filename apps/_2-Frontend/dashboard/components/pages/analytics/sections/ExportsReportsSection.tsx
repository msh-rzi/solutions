import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function ExportsReportsSection() {
  return (
    <AnalyticsSectionCard
      title="Exports & Reports"
      instruction="Implement report export actions here (CSV, PDF, scheduled email digest)."
      className="lg:col-span-12"
    >
      <div className="grid gap-2 sm:grid-cols-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </AnalyticsSectionCard>
  );
}

