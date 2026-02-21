import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function RoleDistributionSection() {
  return (
    <UsersSectionCard
      title="Role Distribution"
      instruction="Implement role distribution chart here (admin, manager, analyst, viewer)."
      className="lg:col-span-4"
    >
      <Skeleton className="h-36 w-full" />
    </UsersSectionCard>
  );
}

