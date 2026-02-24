import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { ATTRIBUTION_BREAKDOWN } from './analyticsData';

export function AttributionBreakdownSection() {
  return (
    <AnalyticsSectionCard
      title="Attribution Breakdown"
      instruction="Channel mix by contribution share and conversion quality."
      className="lg:col-span-4"
    >
      <ChartContainer className="h-40" config={{ share: { label: 'Share', color: '#2563eb' } }}>
        <ChartPrimitives.PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)}%`}
              />
            }
          />
          <ChartPrimitives.Pie
            data={ATTRIBUTION_BREAKDOWN}
            dataKey="share"
            nameKey="channel"
            innerRadius={34}
            outerRadius={60}
            strokeWidth={3}
            isAnimationActive={false}
          >
            {ATTRIBUTION_BREAKDOWN.map((entry) => (
              <ChartPrimitives.Cell key={entry.channel} fill={entry.fill} />
            ))}
          </ChartPrimitives.Pie>
        </ChartPrimitives.PieChart>
      </ChartContainer>

      <div className="space-y-1.5">
        {ATTRIBUTION_BREAKDOWN.map((entry) => (
          <div key={entry.channel} className="flex items-center justify-between gap-2 rounded-md border px-2 py-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-[2px]" style={{ backgroundColor: entry.fill }} />
              <span className="font-medium">{entry.channel}</span>
            </div>
            <div className="text-right">
              <p className="tabular-nums">{entry.share}%</p>
              <p className="text-[10px] text-muted-foreground">{entry.conversionRate.toFixed(1)}% CVR</p>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsSectionCard>
  );
}
