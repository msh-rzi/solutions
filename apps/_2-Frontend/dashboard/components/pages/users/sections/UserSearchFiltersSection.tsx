import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function UserSearchFiltersSection() {
  return (
    <UsersSectionCard
      title="User Search & Filters"
      instruction="Implement search, role filter, status filter, and team filter here."
      className="lg:col-span-4"
    >
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </UsersSectionCard>
  );
}
