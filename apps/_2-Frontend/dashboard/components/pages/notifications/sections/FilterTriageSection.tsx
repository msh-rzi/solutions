import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function FilterTriageSection() {
  return (
    <NotificationsSectionCard
      title="Filter & Triage"
      instruction="Implement filters by priority, type, source, assignee, and unread status."
      className="lg:col-span-4"
    >
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </NotificationsSectionCard>
  );
}

