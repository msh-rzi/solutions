import { Button, cn } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { TOP_SEGMENTS, formatCurrencyCompact } from './analyticsData';

export function TopSegmentsTableSection() {
  return (
    <AnalyticsSectionCard
      title="Top Segments Table"
      instruction="High-value segments ranked by ARR, growth, conversion, and churn risk."
      className="lg:col-span-7"
    >
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Segment</th>
              <th className="px-3 py-2 font-medium">ARR</th>
              <th className="px-3 py-2 font-medium">Growth</th>
              <th className="px-3 py-2 font-medium">Conversion</th>
              <th className="px-3 py-2 font-medium">Churn Risk</th>
            </tr>
          </thead>
          <tbody>
            {TOP_SEGMENTS.map((segment) => (
              <tr key={segment.segment} className="border-t">
                <td className="px-3 py-2 font-medium">{segment.segment}</td>
                <td className="px-3 py-2 tabular-nums">{formatCurrencyCompact(segment.arr)}</td>
                <td className="px-3 py-2 tabular-nums text-emerald-700 dark:text-emerald-400">
                  +{segment.growth.toFixed(1)}%
                </td>
                <td className="px-3 py-2 tabular-nums">{segment.conversionRate.toFixed(1)}%</td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      segment.churnRisk === 'Low' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                      segment.churnRisk === 'Medium' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                      segment.churnRisk === 'High' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                    )}
                  >
                    {segment.churnRisk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="xs">
          Open Segment Explorer
        </Button>
      </div>
    </AnalyticsSectionCard>
  );
}
