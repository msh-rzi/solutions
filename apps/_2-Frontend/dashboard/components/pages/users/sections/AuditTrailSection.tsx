import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function AuditTrailSection() {
  return (
    <UsersSectionCard
      title="Audit Trail"
      instruction="Implement user activity audit log here (role changes, login events, status updates)."
      className="lg:col-span-12"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </UsersSectionCard>
  );
}

