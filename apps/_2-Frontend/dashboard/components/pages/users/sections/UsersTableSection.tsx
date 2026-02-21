import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function UsersTableSection() {
  return (
    <UsersSectionCard
      title="Users Table"
      instruction="Implement main users table here (name, email, role, status, last active, actions)."
      className="lg:col-span-8"
    >
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </UsersSectionCard>
  );
}

