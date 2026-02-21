import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function DeliveryChannelsSection() {
  return (
    <NotificationsSectionCard
      title="Delivery Channels"
      instruction="Implement channel controls here (in-app, email, SMS, Slack, webhook)."
      className="lg:col-span-4"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </NotificationsSectionCard>
  );
}

