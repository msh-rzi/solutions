import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function SubscribedTopicsSection() {
  return (
    <NotificationsSectionCard
      title="Subscribed Topics"
      instruction="Implement topic subscription management here (security, billing, product, incidents)."
      className="lg:col-span-6"
    >
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </NotificationsSectionCard>
  );
}

