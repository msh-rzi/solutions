import { Button, cn } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';
import { PENDING_INVITATIONS } from './usersData';

export function PendingInvitationsSection() {
  return (
    <UsersSectionCard
      title="Pending Invitations"
      instruction="Outstanding invitations with expiration windows and follow-up actions."
      className="lg:col-span-6"
    >
      <div className="space-y-2">
        {PENDING_INVITATIONS.map((invite) => (
          <div key={invite.email} className="rounded-md border p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{invite.email}</p>
                <p className="text-[11px] text-muted-foreground">
                  {invite.role} • {invite.team} • Invited by {invite.invitedBy}
                </p>
              </div>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  invite.expiresIn.startsWith('3') ? 'bg-rose-500/15 text-rose-700 dark:text-rose-400' : 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
                )}
              >
                Expires in {invite.expiresIn}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-[11px] text-muted-foreground">Sent {invite.sentAt}</p>
              <div className="flex gap-1.5">
                <Button size="xs" variant="outline">
                  Resend
                </Button>
                <Button size="xs" variant="ghost">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </UsersSectionCard>
  );
}
