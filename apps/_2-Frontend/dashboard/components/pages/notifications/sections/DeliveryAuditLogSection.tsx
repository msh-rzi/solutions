import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function DeliveryAuditLogSection() {
  return (
    <NotificationsSectionCard
      title="Delivery Audit Log"
      instruction="Implement delivery audit trail here (channel, status, retries, error details)."
      className="lg:col-span-12"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </NotificationsSectionCard>
  );
}

