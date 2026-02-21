import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent, cn } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { DELIVERY_AUDIT_LOG, DELIVERY_AUDIT_TREND } from './notificationsData';

export function DeliveryAuditLogSection() {
  return (
    <NotificationsSectionCard
      title="Delivery Audit Log"
      instruction="Delivery outcomes, retries, latency, and provider error visibility."
      className="lg:col-span-12"
    >
      <ChartContainer
        className="h-36"
        config={{
          delivered: { label: 'Delivered', color: '#16a34a' },
          failed: { label: 'Failed', color: '#dc2626' },
        }}
      >
        <ChartPrimitives.ComposedChart data={DELIVERY_AUDIT_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="day" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={34} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} messages`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="delivered" fill="var(--color-delivered)" radius={[4, 4, 0, 0]} maxBarSize={22} />
          <ChartPrimitives.Line
            dataKey="failed"
            type="monotone"
            stroke="var(--color-failed)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Time</th>
              <th className="px-3 py-2 font-medium">Notification</th>
              <th className="px-3 py-2 font-medium">Channel</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Retries</th>
              <th className="px-3 py-2 font-medium">Latency</th>
              <th className="px-3 py-2 font-medium">Error</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERY_AUDIT_LOG.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-3 py-2 tabular-nums">{entry.time}</td>
                <td className="px-3 py-2">{entry.notification}</td>
                <td className="px-3 py-2">{entry.channel}</td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      entry.status === 'Delivered' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                      entry.status === 'Retrying' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                      entry.status === 'Failed' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                    )}
                  >
                    {entry.status}
                  </span>
                </td>
                <td className="px-3 py-2 tabular-nums">{entry.retries}</td>
                <td className="px-3 py-2 tabular-nums">{entry.latencyMs > 0 ? `${entry.latencyMs}ms` : '-'}</td>
                <td className="px-3 py-2 text-muted-foreground">{entry.error ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NotificationsSectionCard>
  );
}
