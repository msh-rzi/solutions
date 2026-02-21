import { Button, cn } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { ESCALATION_RULES } from './notificationsData';

export function EscalationRulesSection() {
  return (
    <NotificationsSectionCard
      title="Escalation Rules"
      instruction="Policy rules for timeout-based escalation and fallback ownership."
      className="lg:col-span-4"
    >
      <div className="space-y-2">
        {ESCALATION_RULES.map((rule) => (
          <div key={rule.name} className="rounded-md border p-2.5">
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{rule.name}</p>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  rule.status === 'Active' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-muted text-muted-foreground',
                )}
              >
                {rule.status}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {rule.severity} • Timeout {rule.timeoutMinutes}m • Fallback: {rule.fallbackOwner}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Triggered today: {rule.triggeredToday}</span>
              <div className="flex gap-1.5">
                <Button size="xs" variant="outline">
                  Edit
                </Button>
                <Button size="xs" variant="ghost">
                  {rule.status === 'Active' ? 'Pause' : 'Resume'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button size="xs" className="w-full">
        Add Escalation Rule
      </Button>
    </NotificationsSectionCard>
  );
}
