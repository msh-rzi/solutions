import { Skeleton } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';

export function AttributionBreakdownSection() {
  return (
    <AnalyticsSectionCard
      title="Attribution Breakdown"
      instruction="Implement channel attribution chart here (paid, organic, referral, direct)."
      className="lg:col-span-4"
    >
      <Skeleton className="h-36 w-full" />
    </AnalyticsSectionCard>
  );
}

