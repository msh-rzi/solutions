import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';
import { ROLE_DISTRIBUTION } from './usersData';

export function RoleDistributionSection() {
  const totalUsers = ROLE_DISTRIBUTION.reduce((sum, role) => sum + role.count, 0);

  return (
    <UsersSectionCard
      title="Role Distribution"
      instruction="Access-level mix across admins, managers, analysts, and viewers."
      className="lg:col-span-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold tabular-nums">{totalUsers}</p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">Total users</span>
      </div>

      <ChartContainer className="h-40" config={{ count: { label: 'Users', color: '#2563eb' } }}>
        <ChartPrimitives.PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} users`}
              />
            }
          />
          <ChartPrimitives.Pie
            data={ROLE_DISTRIBUTION}
            dataKey="count"
            nameKey="role"
            innerRadius={36}
            outerRadius={60}
            strokeWidth={3}
            isAnimationActive={false}
          >
            {ROLE_DISTRIBUTION.map((entry) => (
              <ChartPrimitives.Cell key={entry.role} fill={entry.fill} />
            ))}
          </ChartPrimitives.Pie>
        </ChartPrimitives.PieChart>
      </ChartContainer>

      <div className="space-y-1.5">
        {ROLE_DISTRIBUTION.map((entry) => (
          <div key={entry.role} className="flex items-center justify-between rounded-md border px-2 py-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-[2px]" style={{ backgroundColor: entry.fill }} />
              <span className="font-medium">{entry.role}</span>
            </div>
            <span className="tabular-nums">{entry.count}</span>
          </div>
        ))}
      </div>
    </UsersSectionCard>
  );
}
