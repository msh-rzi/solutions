import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { SCHEDULED_REPORTS } from './analyticsData';

export function ExportsReportsSection() {
  return (
    <AnalyticsSectionCard
      title="Exports & Reports"
      instruction="On-demand exports and scheduled analytics report delivery."
      className="lg:col-span-12"
    >
      <div className="grid gap-2 sm:grid-cols-4">
        <Button>Export CSV</Button>
        <Button variant="outline">Export PDF</Button>
        <Button variant="outline">Schedule Digest</Button>
        <Button variant="ghost">Share Snapshot</Button>
      </div>

      <Separator />

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-md border p-3">
          <p className="text-sm font-medium">Report Preset</p>
          <p className="mt-1 text-xs text-muted-foreground">Choose a saved report profile before exporting.</p>
          <div className="mt-3">
            <Select defaultValue="growth-overview">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth-overview">Growth Overview</SelectItem>
                <SelectItem value="cohort-retention">Cohort Retention</SelectItem>
                <SelectItem value="channel-performance">Channel Performance</SelectItem>
                <SelectItem value="exec-summary">Executive Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border p-3 lg:col-span-2">
          <p className="text-sm font-medium">Scheduled Reports</p>
          <p className="mt-1 text-xs text-muted-foreground">Automated deliveries configured for analytics stakeholders.</p>
          <div className="mt-3 overflow-hidden rounded-md border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Report</th>
                  <th className="px-3 py-2 font-medium">Format</th>
                  <th className="px-3 py-2 font-medium">Cadence</th>
                  <th className="px-3 py-2 font-medium">Next Run</th>
                  <th className="px-3 py-2 font-medium">Recipients</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULED_REPORTS.map((report) => (
                  <tr key={report.name} className="border-t">
                    <td className="px-3 py-2 font-medium">{report.name}</td>
                    <td className="px-3 py-2">{report.format}</td>
                    <td className="px-3 py-2">{report.cadence}</td>
                    <td className="px-3 py-2">{report.nextRun}</td>
                    <td className="px-3 py-2 tabular-nums">{report.recipients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnalyticsSectionCard>
  );
}
