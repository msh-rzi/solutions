import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function AccessExceptionsSection() {
  return (
    <UsersSectionCard
      title="Access Exceptions"
      instruction="Implement temporary access grants and exception approvals here."
      className="lg:col-span-6"
    >
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </UsersSectionCard>
  );
}

