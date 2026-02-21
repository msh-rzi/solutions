import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function NotificationFeedSection() {
  return (
    <NotificationsSectionCard
      title="Notification Feed"
      instruction="Implement unified feed here (alerts, mentions, system events, approvals)."
      className="lg:col-span-8"
    >
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </NotificationsSectionCard>
  );
}

