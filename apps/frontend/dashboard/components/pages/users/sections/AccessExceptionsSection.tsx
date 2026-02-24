import { Button, cn } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';
import { ACCESS_EXCEPTIONS } from './usersData';

export function AccessExceptionsSection() {
  return (
    <UsersSectionCard
      title="Access Exceptions"
      instruction="Temporary privileged access grants and approval workflow."
      className="lg:col-span-6"
    >
      <div className="space-y-2">
        {ACCESS_EXCEPTIONS.map((exception) => (
          <div key={`${exception.user}-${exception.resource}`} className="rounded-md border p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{exception.user}</p>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  exception.status === 'Approved' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                  exception.status === 'Pending' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                  exception.status === 'Expiring' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                )}
              >
                {exception.status}
              </span>
            </div>

            <p className="text-xs text-muted-foreground">
              {exception.resource} • {exception.reason}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {exception.startAt} - {exception.endAt} • Approver: {exception.approver}
            </p>

            <div className="mt-2 flex justify-end gap-1.5">
              <Button size="xs" variant="outline">
                Approve
              </Button>
              <Button size="xs" variant="ghost">
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </div>
    </UsersSectionCard>
  );
}
