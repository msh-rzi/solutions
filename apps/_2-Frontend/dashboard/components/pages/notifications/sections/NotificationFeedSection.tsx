import { Button, ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent, cn } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { NOTIFICATION_FEED, NOTIFICATION_VOLUME } from './notificationsData';

function priorityTone(priority: 'P1' | 'P2' | 'P3'): string {
  if (priority === 'P1') {
    return 'bg-rose-500/15 text-rose-700 dark:text-rose-400';
  }
  if (priority === 'P2') {
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-400';
  }
  return 'bg-blue-500/15 text-blue-700 dark:text-blue-400';
}

function stateTone(state: 'Unread' | 'Acknowledged' | 'Resolved'): string {
  if (state === 'Unread') {
    return 'bg-rose-500/15 text-rose-700 dark:text-rose-400';
  }
  if (state === 'Acknowledged') {
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-400';
  }
  return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400';
}

export function NotificationFeedSection() {
  return (
    <NotificationsSectionCard
      title="Notification Feed"
      instruction="Unified stream of alerts, mentions, system events, and approvals."
      className="lg:col-span-8"
    >
      <ChartContainer
        className="h-32"
        config={{
          notifications: { label: 'Notifications', color: '#2563eb' },
          incidents: { label: 'Incidents', color: '#dc2626' },
        }}
      >
        <ChartPrimitives.ComposedChart data={NOTIFICATION_VOLUME} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="day" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={24} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} events`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="notifications" fill="var(--color-notifications)" radius={[4, 4, 0, 0]} maxBarSize={22} />
          <ChartPrimitives.Line
            dataKey="incidents"
            type="monotone"
            stroke="var(--color-incidents)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="space-y-2">
        {NOTIFICATION_FEED.map((item) => (
          <div key={item.id} className="rounded-md border p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', priorityTone(item.priority))}>
                  {item.priority}
                </span>
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', stateTone(item.state))}>
                  {item.state}
                </span>
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{item.type}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">{item.createdAt}</span>
            </div>
            <p className="text-xs font-medium leading-snug">{item.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {item.source} • {item.assignee} • {item.channel}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="xs">
          Open Full Feed
        </Button>
      </div>
    </NotificationsSectionCard>
  );
}
