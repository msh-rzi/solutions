import { cn } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { COHORT_RETENTION } from './analyticsData';

function retentionTone(value: number): string {
  if (value >= 75) {
    return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300';
  }
  if (value >= 60) {
    return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
  }
  if (value >= 45) {
    return 'bg-amber-500/20 text-amber-700 dark:text-amber-300';
  }
  return 'bg-rose-500/20 text-rose-700 dark:text-rose-300';
}

export function CohortRetentionSection() {
  return (
    <AnalyticsSectionCard
      title="Cohort Retention"
      instruction="Weekly retention by cohort with decay pattern highlighting."
      className="lg:col-span-4"
    >
      <div className="overflow-auto rounded-md border">
        <table className="w-full text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-2 py-2 text-left font-medium">Cohort</th>
              <th className="px-2 py-2 font-medium">W0</th>
              <th className="px-2 py-2 font-medium">W1</th>
              <th className="px-2 py-2 font-medium">W2</th>
              <th className="px-2 py-2 font-medium">W3</th>
              <th className="px-2 py-2 font-medium">W4</th>
              <th className="px-2 py-2 font-medium">W5</th>
            </tr>
          </thead>
          <tbody>
            {COHORT_RETENTION.map((row) => (
              <tr key={row.cohort} className="border-t">
                <td className="px-2 py-2 font-medium">{row.cohort}</td>
                {row.retention.map((value, index) => (
                  <td key={`${row.cohort}-${index}`} className="px-1.5 py-1.5">
                    <div className={cn('rounded px-1 py-1 text-center text-[11px] font-medium', retentionTone(value))}>
                      {value}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-emerald-500/60" />
          Strong
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-amber-500/60" />
          Moderate
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-rose-500/60" />
          Weak
        </div>
      </div>
    </AnalyticsSectionCard>
  );
}
