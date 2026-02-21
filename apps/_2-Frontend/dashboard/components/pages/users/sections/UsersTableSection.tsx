import { Button, cn } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';
import { USERS } from './usersData';

export function UsersTableSection() {
  return (
    <UsersSectionCard
      title="Users Table"
      instruction="Tenant users with role, status, team membership, and security posture."
      className="lg:col-span-8"
    >
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">User</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Team</th>
              <th className="px-3 py-2 font-medium">Last Active</th>
              <th className="px-3 py-2 font-medium">MFA</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-3 py-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground">{user.email}</p>
                </td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      user.status === 'Active' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                      user.status === 'Invited' && 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
                      user.status === 'Suspended' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-3 py-2">{user.team}</td>
                <td className="px-3 py-2 tabular-nums">{user.lastActive}</td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      user.mfaEnabled ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {user.mfaEnabled ? 'Enabled' : 'Not set'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="xs">
          View Full Directory
        </Button>
      </div>
    </UsersSectionCard>
  );
}
