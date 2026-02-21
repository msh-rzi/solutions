import { Skeleton } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';

export function EscalationRulesSection() {
  return (
    <NotificationsSectionCard
      title="Escalation Rules"
      instruction="Implement escalation policy builder here (severity, timeout, fallback owner)."
      className="lg:col-span-4"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </NotificationsSectionCard>
  );
}

