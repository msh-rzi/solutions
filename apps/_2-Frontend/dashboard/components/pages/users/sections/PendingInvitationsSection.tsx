import { Skeleton } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';

export function PendingInvitationsSection() {
  return (
    <UsersSectionCard
      title="Pending Invitations"
      instruction="Implement pending invites list and resend/revoke actions here."
      className="lg:col-span-6"
    >
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </UsersSectionCard>
  );
}

