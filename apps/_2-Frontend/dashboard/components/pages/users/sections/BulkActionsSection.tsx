import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function BulkActionsSection() {
  return (
    <UsersSectionCard
      title="Bulk Actions"
      instruction="Implement bulk invite, deactivate, role assignment, and export actions here."
      className="lg:col-span-8"
    >
      <div className="grid gap-2 sm:grid-cols-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </UsersSectionCard>
  );
}

