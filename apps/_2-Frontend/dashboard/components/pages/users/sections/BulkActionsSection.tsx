import { Button, ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent, Separator } from '@repo/ui-shadcn';
import { UsersSectionCard } from './UsersSectionCard';
import { BULK_ACTIVITY } from './usersData';

export function BulkActionsSection() {
  const latest = BULK_ACTIVITY[BULK_ACTIVITY.length - 1];

  return (
    <UsersSectionCard
      title="Bulk Actions"
      instruction="Execute high-volume user lifecycle operations with guardrails."
      className="lg:col-span-8"
    >
      <div className="grid gap-2 sm:grid-cols-4">
        <Button>Bulk Invite</Button>
        <Button variant="outline">Deactivate</Button>
        <Button variant="outline">Assign Role</Button>
        <Button variant="ghost">Export Users</Button>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Selected users</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">18</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Pending approvals</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">3</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Recent role changes</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.roleChanges ?? 0}</p>
        </div>
      </div>

      <Separator />

      <ChartContainer
        className="h-36"
        config={{
          invites: { label: 'Invites', color: '#2563eb' },
          deactivations: { label: 'Deactivations', color: '#dc2626' },
          roleChanges: { label: 'Role changes', color: '#16a34a' },
        }}
      >
        <ChartPrimitives.ComposedChart data={BULK_ACTIVITY} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="week" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={26} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} actions`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="invites" fill="var(--color-invites)" radius={[4, 4, 0, 0]} maxBarSize={20} />
          <ChartPrimitives.Line
            dataKey="deactivations"
            type="monotone"
            stroke="var(--color-deactivations)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ChartPrimitives.Line
            dataKey="roleChanges"
            type="monotone"
            stroke="var(--color-roleChanges)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>
    </UsersSectionCard>
  );
}
