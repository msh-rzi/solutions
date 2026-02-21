import {
  Button,
  ChartContainer,
  ChartPrimitives,
  ChartTooltip,
  ChartTooltipContent,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  cn,
} from '@repo/ui-shadcn';
import { DashboardSectionCard } from './DashboardSectionCard';

type AnalysisPoint = {
  period: string;
  activeUsers: number;
  conversionRate: number;
  arpu: number;
};

type CohortRow = {
  cohort: string;
  retention: number[];
};

type DistributionPoint = {
  bucket: string;
  count: number;
};

type DrillDownRow = {
  segment: string;
  accounts: number;
  arr: number;
  conversion: number;
  churnRisk: 'Low' | 'Medium' | 'High';
};

type InsightItem = {
  title: string;
  summary: string;
  confidence: number;
  severity: 'High' | 'Medium' | 'Low';
};

const PRIMARY_ANALYSIS: AnalysisPoint[] = [
  { period: 'W1', activeUsers: 12400, conversionRate: 3.2, arpu: 83 },
  { period: 'W2', activeUsers: 13020, conversionRate: 3.4, arpu: 85 },
  { period: 'W3', activeUsers: 13610, conversionRate: 3.7, arpu: 86 },
  { period: 'W4', activeUsers: 14240, conversionRate: 3.8, arpu: 88 },
  { period: 'W5', activeUsers: 14980, conversionRate: 4.1, arpu: 90 },
  { period: 'W6', activeUsers: 15640, conversionRate: 4.3, arpu: 91 },
];

const COHORT_HEATMAP: CohortRow[] = [
  { cohort: 'Apr 07', retention: [100, 81, 70, 63, 58, 55, 51] },
  { cohort: 'Apr 14', retention: [100, 84, 72, 65, 60, 54, 49] },
  { cohort: 'Apr 21', retention: [100, 79, 67, 59, 54, 50, 46] },
  { cohort: 'Apr 28', retention: [100, 86, 74, 68, 63, 58, 53] },
  { cohort: 'May 05', retention: [100, 88, 77, 70, 66, 61, 56] },
];

const DISTRIBUTION: DistributionPoint[] = [
  { bucket: '0-10', count: 18 },
  { bucket: '10-20', count: 41 },
  { bucket: '20-30', count: 67 },
  { bucket: '30-40', count: 92 },
  { bucket: '40-50', count: 86 },
  { bucket: '50-60', count: 63 },
  { bucket: '60-70', count: 45 },
  { bucket: '70-80', count: 23 },
];

const DRILL_DOWN_ROWS: DrillDownRow[] = [
  { segment: 'Enterprise / Paid Search', accounts: 143, arr: 1240000, conversion: 5.2, churnRisk: 'Low' },
  { segment: 'Mid-Market / Organic', accounts: 267, arr: 980000, conversion: 4.4, churnRisk: 'Medium' },
  { segment: 'SMB / Referral', accounts: 412, arr: 615000, conversion: 3.6, churnRisk: 'High' },
  { segment: 'Enterprise / Partner', accounts: 88, arr: 570000, conversion: 5.9, churnRisk: 'Low' },
  { segment: 'Mid-Market / Direct', accounts: 194, arr: 730000, conversion: 4.1, churnRisk: 'Medium' },
];

const INSIGHTS: InsightItem[] = [
  {
    title: 'Partner channel cohorts retain 11% better after week 4',
    summary: 'Partner-sourced enterprise cohorts show the strongest retention and highest ARPU.',
    confidence: 92,
    severity: 'Low',
  },
  {
    title: 'SMB referral segment shows conversion softness',
    summary: 'Conversion rate declined 0.6pp over the last 3 weeks while trial volume stayed flat.',
    confidence: 87,
    severity: 'Medium',
  },
  {
    title: 'Activation uplift tied to onboarding workflow A/B',
    summary: 'New onboarding sequence contributes most of the conversion increase in W5-W6.',
    confidence: 95,
    severity: 'High',
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

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

function QueryFiltersSection() {
  return (
    <DashboardSectionCard
      title="Query Filters"
      instruction="Saved view controls for analysis scope, segmentation, and query text."
      className="lg:col-span-3"
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="analysis-range">Date Range</Label>
          <Select defaultValue="30d">
            <SelectTrigger id="analysis-range" className="w-full">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="analysis-segment">Segment</Label>
          <Select defaultValue="all">
            <SelectTrigger id="analysis-segment" className="w-full">
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All segments</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="mid-market">Mid-Market</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="analysis-channel">Channel</Label>
          <Select defaultValue="all">
            <SelectTrigger id="analysis-channel" className="w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All channels</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="analysis-query">Search</Label>
          <Input id="analysis-query" placeholder="segment:enterprise churn>4%" defaultValue="cohort:paid-search" />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">ARR {'>'} $500k</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Owner region: NA</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Cohort age: 12w</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button size="xs">Run Query</Button>
          <Button variant="outline" size="xs">
            Save View
          </Button>
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function PrimaryAnalysisChartSection() {
  const latestPoint = PRIMARY_ANALYSIS[PRIMARY_ANALYSIS.length - 1];

  return (
    <DashboardSectionCard
      title="Primary Analysis Chart"
      instruction="Weekly active users and conversion trend with ARPU context."
      className="lg:col-span-9"
    >
      <ChartContainer
        className="h-56"
        config={{
          activeUsers: { label: 'Active Users', color: '#2563eb' },
          conversionRate: { label: 'Conversion', color: '#16a34a' },
        }}
      >
        <ChartPrimitives.ComposedChart data={PRIMARY_ANALYSIS} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="analysis-active-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-activeUsers)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--color-activeUsers)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="period" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={42} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
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
            dataKey="activeUsers"
            type="monotone"
            stroke="var(--color-activeUsers)"
            fill="url(#analysis-active-gradient)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ChartPrimitives.Line
            dataKey="conversionRate"
            yAxisId="right"
            type="monotone"
            stroke="var(--color-conversionRate)"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border p-2.5">
          <p className="text-[11px] text-muted-foreground">Active users</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latestPoint?.activeUsers.toLocaleString() ?? '-'}</p>
        </div>
        <div className="rounded-md border p-2.5">
          <p className="text-[11px] text-muted-foreground">Conversion</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{latestPoint?.conversionRate.toFixed(1) ?? '-'}%</p>
        </div>
        <div className="rounded-md border p-2.5">
          <p className="text-[11px] text-muted-foreground">ARPU</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">
            {latestPoint ? formatCurrency(latestPoint.arpu) : '-'}
          </p>
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function CohortSegmentHeatmapSection() {
  return (
    <DashboardSectionCard
      title="Cohort / Segment Heatmap"
      instruction="Weekly retention decay by signup cohort."
      className="lg:col-span-7"
    >
      <div className="overflow-auto rounded-md border">
        <table className="w-full text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Cohort</th>
              <th className="px-2 py-2 font-medium">W0</th>
              <th className="px-2 py-2 font-medium">W1</th>
              <th className="px-2 py-2 font-medium">W2</th>
              <th className="px-2 py-2 font-medium">W3</th>
              <th className="px-2 py-2 font-medium">W4</th>
              <th className="px-2 py-2 font-medium">W5</th>
              <th className="px-2 py-2 font-medium">W6</th>
            </tr>
          </thead>
          <tbody>
            {COHORT_HEATMAP.map((row) => (
              <tr key={row.cohort} className="border-t">
                <td className="px-3 py-2 font-medium">{row.cohort}</td>
                {row.retention.map((value, index) => (
                  <td key={`${row.cohort}-${index}`} className="px-2 py-2">
                    <div className={cn('rounded px-1.5 py-1 text-center font-medium tabular-nums', retentionTone(value))}>
                      {value}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-emerald-500/60" />
          Strong retention
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-amber-500/60" />
          Moderate retention
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-rose-500/60" />
          High decay
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function DistributionBreakdownSection() {
  const sampleCount = DISTRIBUTION.reduce((sum, bucket) => sum + bucket.count, 0);

  return (
    <DashboardSectionCard
      title="Distribution Breakdown"
      instruction="Histogram view of account activity score distribution."
      className="lg:col-span-5"
    >
      <ChartContainer className="h-44" config={{ count: { label: 'Accounts', color: '#7c3aed' } }}>
        <ChartPrimitives.BarChart data={DISTRIBUTION} margin={{ top: 8, right: 4, left: -10, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="bucket" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis allowDecimals={false} tickLine={false} axisLine={false} width={22} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} accounts`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Samples</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{sampleCount}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Median</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">43</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">P90</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">71</p>
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function DrillDownTableSection() {
  return (
    <DashboardSectionCard
      title="Drill-down Table"
      instruction="Segment-level breakdown for ARR, conversion, and churn risk."
      className="lg:col-span-8"
    >
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Segment</th>
              <th className="px-3 py-2 font-medium">Accounts</th>
              <th className="px-3 py-2 font-medium">ARR</th>
              <th className="px-3 py-2 font-medium">Conversion</th>
              <th className="px-3 py-2 font-medium">Churn Risk</th>
            </tr>
          </thead>
          <tbody>
            {DRILL_DOWN_ROWS.map((row) => (
              <tr key={row.segment} className="border-t">
                <td className="px-3 py-2 font-medium">{row.segment}</td>
                <td className="px-3 py-2 tabular-nums">{row.accounts.toLocaleString()}</td>
                <td className="px-3 py-2 tabular-nums">{formatCurrency(row.arr)}</td>
                <td className="px-3 py-2 tabular-nums">{row.conversion.toFixed(1)}%</td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      row.churnRisk === 'Low' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                      row.churnRisk === 'Medium' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                      row.churnRisk === 'High' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                    )}
                  >
                    {row.churnRisk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="xs">
          Export CSV
        </Button>
      </div>
    </DashboardSectionCard>
  );
}

function InsightsSummarySection() {
  return (
    <DashboardSectionCard
      title="Insights Summary"
      instruction="Ranked analysis insights with confidence and actionability."
      className="lg:col-span-4"
    >
      <div className="space-y-2">
        {INSIGHTS.map((insight) => (
          <div key={insight.title} className="rounded-md border p-3">
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug">{insight.title}</p>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                  insight.severity === 'High' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                  insight.severity === 'Medium' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                  insight.severity === 'Low' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                )}
              >
                {insight.severity}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{insight.summary}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Confidence: <span className="font-medium text-foreground">{insight.confidence}%</span>
            </p>
          </div>
        ))}
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2">
        <Button size="xs">Create Investigation</Button>
        <Button variant="outline" size="xs">
          Share Snapshot
        </Button>
      </div>
    </DashboardSectionCard>
  );
}

export function AnalystSections() {
  return (
    <>
      <QueryFiltersSection />
      <PrimaryAnalysisChartSection />
      <CohortSegmentHeatmapSection />
      <DistributionBreakdownSection />
      <DrillDownTableSection />
      <InsightsSummarySection />
    </>
  );
}
