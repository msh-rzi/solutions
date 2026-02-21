import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { TRAFFIC_TREND } from './analyticsData';

export function TrafficConversionTrendSection() {
  const latest = TRAFFIC_TREND[TRAFFIC_TREND.length - 1];

  return (
    <AnalyticsSectionCard
      title="Traffic & Conversion Trend"
      instruction="Weekly sessions, signups, and conversion rate trend."
      className="lg:col-span-8"
    >
      <ChartContainer
        className="h-56"
        config={{
          sessions: { label: 'Sessions', color: '#2563eb' },
          signups: { label: 'Signups', color: '#0ea5e9' },
          conversionRate: { label: 'Conversion Rate', color: '#16a34a' },
        }}
      >
        <ChartPrimitives.ComposedChart data={TRAFFIC_TREND} margin={{ top: 8, right: 10, left: 2, bottom: 0 }}>
          <defs>
            <linearGradient id="analytics-sessions-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-sessions)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--color-sessions)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="period" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            width={42}
            tickFormatter={(value) => `${Math.round(value / 1000)}k`}
          />
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
                  if (String(name).toLowerCase().includes('conversion')) {
                    return `${numericValue.toFixed(1)}%`;
                  }
                  return numericValue.toLocaleString();
                }}
              />
            }
          />
          <ChartPrimitives.Area
            yAxisId="left"
            dataKey="sessions"
            type="monotone"
            stroke="var(--color-sessions)"
            fill="url(#analytics-sessions-gradient)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ChartPrimitives.Bar yAxisId="left" dataKey="signups" fill="var(--color-signups)" radius={[4, 4, 0, 0]} maxBarSize={22} />
          <ChartPrimitives.Line
            yAxisId="right"
            dataKey="conversionRate"
            type="monotone"
            stroke="var(--color-conversionRate)"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Sessions (latest)</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.sessions.toLocaleString() ?? '-'}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Signups (latest)</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.signups.toLocaleString() ?? '-'}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Conversion rate</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latest?.conversionRate.toFixed(1) ?? '-'}%</p>
        </div>
      </div>
    </AnalyticsSectionCard>
  );
}
