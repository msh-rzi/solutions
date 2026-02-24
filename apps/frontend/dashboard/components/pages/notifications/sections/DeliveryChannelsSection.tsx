import { Button, ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent, cn } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { CHANNEL_HEALTH } from './notificationsData';

export function DeliveryChannelsSection() {
  return (
    <NotificationsSectionCard
      title="Delivery Channels"
      instruction="Channel reliability, volume, and status across delivery providers."
      className="lg:col-span-4"
    >
      <ChartContainer className="h-36" config={{ successRate: { label: 'Success Rate', color: '#16a34a' } }}>
        <ChartPrimitives.BarChart data={CHANNEL_HEALTH} margin={{ top: 8, right: 4, left: -14, bottom: 0 }}>
          <ChartPrimitives.XAxis dataKey="channel" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={28} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)}%`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="successRate" fill="var(--color-successRate)" radius={[4, 4, 0, 0]} />
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <div className="space-y-1.5">
        {CHANNEL_HEALTH.map((channel) => (
          <div key={channel.channel} className="flex items-center justify-between rounded-md border px-2 py-1.5 text-xs">
            <div>
              <p className="font-medium">{channel.channel}</p>
              <p className="text-[10px] text-muted-foreground tabular-nums">{channel.volume.toLocaleString()} msgs/day</p>
            </div>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                channel.successRate >= 98 ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
              )}
            >
              {channel.successRate.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <Button variant="outline" size="xs" className="w-full">
        Configure Channels
      </Button>
    </NotificationsSectionCard>
  );
}
