import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function BulkActionsSection() {
  return (
    <NotificationsSectionCard
      title="Bulk Actions"
      instruction="Implement mark-read, assign-owner, suppress, and archive actions here."
      className="lg:col-span-6"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </NotificationsSectionCard>
  );
}

