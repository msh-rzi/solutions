import { Button, ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent, cn } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { ANOMALY_FEED, ANOMALY_TREND } from './analyticsData';

export function AnomalyFeedSection() {
  return (
    <AnalyticsSectionCard
      title="Anomaly Feed"
      instruction="Detected spikes and drops across major metrics with severity and ownership."
      className="lg:col-span-5"
    >
      <ChartContainer className="h-28" config={{ anomalies: { label: 'Anomalies', color: '#7c3aed' } }}>
        <ChartPrimitives.AreaChart data={ANOMALY_TREND} margin={{ top: 8, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="anomaly-trend-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-anomalies)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--color-anomalies)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="day" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis allowDecimals={false} tickLine={false} axisLine={false} width={22} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} detections`}
              />
            }
          />
          <ChartPrimitives.Area
            dataKey="anomalies"
            type="monotone"
            stroke="var(--color-anomalies)"
            fill="url(#anomaly-trend-gradient)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.AreaChart>
      </ChartContainer>

      <div className="space-y-2">
        {ANOMALY_FEED.map((item) => (
          <div key={item.id} className="rounded-md border p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                  item.severity === 'High' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                  item.severity === 'Medium' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                  item.severity === 'Low' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                )}
              >
                {item.severity}
              </span>
              <span
                className={cn(
                  'text-[11px] font-medium',
                  item.changePercent >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400',
                )}
              >
                {item.changePercent >= 0 ? '+' : ''}
                {item.changePercent.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs font-medium leading-snug">{item.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {item.metric} • {item.owner} • {item.detectedAt}
            </p>
          </div>
        ))}
      </div>

      <Button variant="outline" size="xs" className="w-full">
        Open Anomaly Workbench
      </Button>
    </AnalyticsSectionCard>
  );
}
