import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent } from '@repo/ui-shadcn';
import { NotificationsSectionCard } from './NotificationsSectionCard';
import { SLA_METRICS } from './notificationsData';

export function SlaResponseMetricsSection() {
  const latest = SLA_METRICS[SLA_METRICS.length - 1];

  return (
    <NotificationsSectionCard
      title="SLA & Response Metrics"
      instruction="Response latency, breach counts, and acknowledgement rate trends."
      className="lg:col-span-4"
    >
      <ChartContainer
        className="h-40"
        config={{
          avgResponseMinutes: { label: 'Response (min)', color: '#2563eb' },
          breaches: { label: 'Breaches', color: '#dc2626' },
          ackRate: { label: 'Ack Rate', color: '#16a34a' },
        }}
      >
        <ChartPrimitives.ComposedChart data={SLA_METRICS} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="day" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis yAxisId="left" tickLine={false} axisLine={false} width={28} />
          <ChartPrimitives.YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            width={34}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value, name) => {
                  const numericValue = typeof value === 'number' ? value : Number(value ?? 0);
                  return String(name).toLowerCase().includes('ack') ? `${numericValue.toFixed(1)}%` : numericValue.toFixed(1);
                }}
              />
            }
          />
          <ChartPrimitives.Bar yAxisId="left" dataKey="breaches" fill="var(--color-breaches)" radius={[4, 4, 0, 0]} maxBarSize={20} />
          <ChartPrimitives.Line
            yAxisId="left"
            dataKey="avgResponseMinutes"
            type="monotone"
            stroke="var(--color-avgResponseMinutes)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ChartPrimitives.Line
            yAxisId="right"
            dataKey="ackRate"
            type="monotone"
            stroke="var(--color-ackRate)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Avg response</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.avgResponseMinutes.toFixed(1) ?? '-'}m</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Breaches</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.breaches ?? 0}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Ack rate</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.ackRate.toFixed(1) ?? '-'}%</p>
        </div>
      </div>
    </NotificationsSectionCard>
  );
}
