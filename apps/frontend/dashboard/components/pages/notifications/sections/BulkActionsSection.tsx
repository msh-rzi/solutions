import { Button, ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { BULK_ACTION_ACTIVITY } from './notificationsData';

export function BulkActionsSection() {
  return (
    <NotificationsSectionCard
      title="Bulk Actions"
      instruction="High-volume triage actions for grouped notification items."
      className="lg:col-span-6"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <Button>Mark Read</Button>
        <Button variant="outline">Assign Owner</Button>
        <Button variant="outline">Suppress</Button>
        <Button variant="ghost">Archive</Button>
      </div>

      <ChartContainer
        className="h-32"
        config={{
          markRead: { label: 'Mark Read', color: '#2563eb' },
          assigned: { label: 'Assigned', color: '#0ea5e9' },
          archived: { label: 'Archived', color: '#16a34a' },
        }}
      >
        <ChartPrimitives.LineChart data={BULK_ACTION_ACTIVITY} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="week" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} actions`}
              />
            }
          />
          <ChartPrimitives.Line dataKey="markRead" type="monotone" stroke="var(--color-markRead)" strokeWidth={2} dot={false} isAnimationActive={false} />
          <ChartPrimitives.Line dataKey="assigned" type="monotone" stroke="var(--color-assigned)" strokeWidth={2} dot={false} isAnimationActive={false} />
          <ChartPrimitives.Line dataKey="archived" type="monotone" stroke="var(--color-archived)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </ChartPrimitives.LineChart>
      </ChartContainer>
    </NotificationsSectionCard>
  );
}
