import {
  Button,
  ChartContainer,
  ChartPrimitives,
  ChartTooltip,
  ChartTooltipContent,
  Separator,
  cn,
} from '@repo/ui-shadcn';
import { DashboardSectionCard } from './DashboardSectionCard';

type TrendPoint = {
  month: string;
  value: number;
};

type FinancialPoint = {
  month: string;
  revenue: number;
  costs: number;
  margin: number;
};

type RiskDistributionPoint = {
  severity: string;
  open: number;
  mitigated: number;
};

type TopAccount = {
  name: string;
  owner: string;
  arr: number;
  growth: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  health: number;
};

type ExecutiveNote = {
  title: string;
  summary: string;
  owner: string;
  dueDate: string;
  status: 'Planned' | 'In Progress' | 'Review';
};

const REVENUE_TREND: TrendPoint[] = [
  { month: 'Jan', value: 1980000 },
  { month: 'Feb', value: 2070000 },
  { month: 'Mar', value: 2140000 },
  { month: 'Apr', value: 2190000 },
  { month: 'May', value: 2310000 },
  { month: 'Jun', value: 2480000 },
];

const CASH_FLOW_TREND: TrendPoint[] = [
  { month: 'Jan', value: 220000 },
  { month: 'Feb', value: 248000 },
  { month: 'Mar', value: 231000 },
  { month: 'Apr', value: 252000 },
  { month: 'May', value: 268000 },
  { month: 'Jun', value: 281000 },
];

const BURN_RATE_TREND: TrendPoint[] = [
  { month: 'Jan', value: 420000 },
  { month: 'Feb', value: 398000 },
  { month: 'Mar', value: 381000 },
  { month: 'Apr', value: 372000 },
  { month: 'May', value: 357000 },
  { month: 'Jun', value: 341000 },
];

const NET_MARGIN_TREND: TrendPoint[] = [
  { month: 'Jan', value: 14.2 },
  { month: 'Feb', value: 15.8 },
  { month: 'Mar', value: 16.1 },
  { month: 'Apr', value: 17.4 },
  { month: 'May', value: 18.6 },
  { month: 'Jun', value: 19.3 },
];

const FINANCIAL_PERFORMANCE: FinancialPoint[] = [
  { month: 'Jan', revenue: 1740000, costs: 1280000, margin: 12.4 },
  { month: 'Feb', revenue: 1830000, costs: 1330000, margin: 13.1 },
  { month: 'Mar', revenue: 1950000, costs: 1380000, margin: 14.5 },
  { month: 'Apr', revenue: 2040000, costs: 1410000, margin: 15.8 },
  { month: 'May', revenue: 2170000, costs: 1460000, margin: 17.6 },
  { month: 'Jun', revenue: 2280000, costs: 1490000, margin: 18.9 },
];

const RISK_DISTRIBUTION: RiskDistributionPoint[] = [
  { severity: 'Critical', open: 3, mitigated: 1 },
  { severity: 'High', open: 5, mitigated: 3 },
  { severity: 'Medium', open: 7, mitigated: 5 },
  { severity: 'Low', open: 9, mitigated: 8 },
];

const ALERT_FEED = [
  {
    title: 'Enterprise renewal risk flagged for Northstar Holdings',
    severity: 'Critical',
    owner: 'Revenue Ops',
    eta: 'ETA 6h',
  },
  {
    title: 'Data ingestion delay crossed SLA in US-East',
    severity: 'High',
    owner: 'Platform',
    eta: 'ETA 2h',
  },
  {
    title: 'Unusual trial-to-paid drop in SMB segment',
    severity: 'High',
    owner: 'Growth',
    eta: 'ETA 24h',
  },
] as const;

const TOP_ACCOUNTS: TopAccount[] = [
  { name: 'Northstar Holdings', owner: 'Ava Johnson', arr: 860000, growth: 18.4, churnRisk: 'Low', health: 92 },
  { name: 'Helix Group', owner: 'Noah Smith', arr: 720000, growth: 11.6, churnRisk: 'Medium', health: 74 },
  { name: 'Summit Retail', owner: 'Lena Park', arr: 645000, growth: 9.8, churnRisk: 'Low', health: 88 },
  { name: 'Atlas Industrial', owner: 'Ibrahim Khan', arr: 604000, growth: 5.2, churnRisk: 'High', health: 58 },
  { name: 'Bluewave Logistics', owner: 'Mia Turner', arr: 552000, growth: 13.1, churnRisk: 'Medium', health: 69 },
  { name: 'Crescent Bank', owner: 'Emma Davis', arr: 515000, growth: 7.4, churnRisk: 'Low', health: 85 },
];

const EXECUTIVE_NOTES: ExecutiveNote[] = [
  {
    title: 'Q3 expansion strategy for enterprise accounts',
    summary: 'Finalize pricing guardrails and success team capacity before approving rollout.',
    owner: 'Chief Revenue Officer',
    dueDate: 'Aug 12',
    status: 'In Progress',
  },
  {
    title: 'Infrastructure spend reduction initiative',
    summary: 'Target 8% infra cost reduction through reserved instances and workload rebalance.',
    owner: 'CTO',
    dueDate: 'Aug 08',
    status: 'Review',
  },
  {
    title: 'Board pack: retention and margin narrative',
    summary: 'Prepare updated margin bridge and cohort retention commentary for monthly board update.',
    owner: 'Finance Lead',
    dueDate: 'Aug 05',
    status: 'Planned',
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

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

type KpiCardProps = {
  title: string;
  instruction: string;
  value: string;
  changePercent: number;
  contextLabel: string;
  trend: TrendPoint[];
  color: string;
  gradientId: string;
  valueFormatter: (value: number) => string;
};

function KpiCard({
  title,
  instruction,
  value,
  changePercent,
  contextLabel,
  trend,
  color,
  gradientId,
  valueFormatter,
}: KpiCardProps) {
  const isPositive = changePercent >= 0;
  return (
    <DashboardSectionCard title={title} instruction={instruction} className="lg:col-span-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-[11px] font-medium',
            isPositive
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
              : 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
          )}
        >
          {isPositive ? '+' : ''}
          {changePercent.toFixed(1)}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{contextLabel}</p>

      <ChartContainer config={{ value: { label: title, color } }} className="mt-2 h-20">
        <ChartPrimitives.AreaChart data={trend} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                valueFormatter={(value) => valueFormatter(typeof value === 'number' ? value : Number(value ?? 0))}
              />
            }
          />
          <ChartPrimitives.Area
            dataKey="value"
            type="monotone"
            stroke="var(--color-value)"
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.AreaChart>
      </ChartContainer>
    </DashboardSectionCard>
  );
}

function RevenueKpiSection() {
  return (
    <KpiCard
      title="Revenue KPI"
      instruction="Monthly recurring revenue and annual run-rate trend."
      value="$2.48M"
      changePercent={8.3}
      contextLabel="MRR with ARR run-rate of $29.8M"
      trend={REVENUE_TREND}
      color="#2563eb"
      gradientId="revenue-kpi-gradient"
      valueFormatter={formatCurrency}
    />
  );
}

function CashFlowKpiSection() {
  return (
    <KpiCard
      title="Cash Flow KPI"
      instruction="Net monthly cash flow based on inflow and operating outflow."
      value="$281K"
      changePercent={4.9}
      contextLabel="Cash-in minus cash-out this month"
      trend={CASH_FLOW_TREND}
      color="#0891b2"
      gradientId="cash-flow-kpi-gradient"
      valueFormatter={formatCurrency}
    />
  );
}

function BurnRateKpiSection() {
  return (
    <KpiCard
      title="Burn Rate KPI"
      instruction="Monthly net burn with downward trend target."
      value="$341K"
      changePercent={-6.1}
      contextLabel="3-month burn average: $356K"
      trend={BURN_RATE_TREND}
      color="#ea580c"
      gradientId="burn-rate-kpi-gradient"
      valueFormatter={formatCurrency}
    />
  );
}

function NetMarginKpiSection() {
  return (
    <KpiCard
      title="Net Margin KPI"
      instruction="Net margin progression across recent periods."
      value="19.3%"
      changePercent={1.2}
      contextLabel="Up from 18.1% last month"
      trend={NET_MARGIN_TREND}
      color="#16a34a"
      gradientId="margin-kpi-gradient"
      valueFormatter={formatPercent}
    />
  );
}

function FinancialPerformanceSection() {
  return (
    <DashboardSectionCard
      title="Financial Performance"
      instruction="Revenue and costs by month with net margin trend overlay."
      className="lg:col-span-8"
    >
      <ChartContainer
        className="h-56"
        config={{
          revenue: { label: 'Revenue', color: '#2563eb' },
          costs: { label: 'Costs', color: '#f97316' },
          margin: { label: 'Margin', color: '#16a34a' },
        }}
      >
        <ChartPrimitives.ComposedChart data={FINANCIAL_PERFORMANCE} margin={{ top: 8, right: 8, bottom: 0, left: 4 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            width={50}
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          />
          <ChartPrimitives.YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            width={38}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value, name) => {
                  const numericValue = typeof value === 'number' ? value : Number(value ?? 0);
                  return String(name).toLowerCase().includes('margin') ? `${numericValue.toFixed(1)}%` : formatCurrency(numericValue);
                }}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="revenue" yAxisId="left" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} maxBarSize={24} />
          <ChartPrimitives.Bar dataKey="costs" yAxisId="left" fill="var(--color-costs)" radius={[4, 4, 0, 0]} maxBarSize={24} />
          <ChartPrimitives.Line
            dataKey="margin"
            yAxisId="right"
            type="monotone"
            stroke="var(--color-margin)"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-[#2563eb]" />
          Revenue
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-[#f97316]" />
          Costs
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-[#16a34a]" />
          Net Margin %
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function RiskAlertsSection() {
  return (
    <DashboardSectionCard
      title="Risk & Alerts"
      instruction="Current risk profile by severity with active executive alerts."
      className="lg:col-span-4"
    >
      <ChartContainer
        className="h-36"
        config={{
          open: { label: 'Open', color: '#dc2626' },
          mitigated: { label: 'Mitigated', color: '#0ea5e9' },
        }}
      >
        <ChartPrimitives.BarChart data={RISK_DISTRIBUTION} margin={{ top: 8, right: 4, left: -8, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="severity" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis allowDecimals={false} tickLine={false} axisLine={false} width={24} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartPrimitives.Bar dataKey="open" stackId="risk" fill="var(--color-open)" radius={[4, 4, 0, 0]} />
          <ChartPrimitives.Bar dataKey="mitigated" stackId="risk" fill="var(--color-mitigated)" radius={[4, 4, 0, 0]} />
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <Separator />

      <div className="space-y-2">
        {ALERT_FEED.map((alert) => (
          <div key={alert.title} className="rounded-md border p-2">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                  alert.severity === 'Critical'
                    ? 'bg-rose-500/15 text-rose-700 dark:text-rose-400'
                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                )}
              >
                {alert.severity}
              </span>
              <span className="text-[10px] text-muted-foreground">{alert.eta}</span>
            </div>
            <p className="text-xs font-medium leading-snug">{alert.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Owner: {alert.owner}</p>
          </div>
        ))}
      </div>

      <Button size="xs" variant="outline" className="w-full">
        Review All Alerts
      </Button>
    </DashboardSectionCard>
  );
}

function TopAccountsSection() {
  return (
    <DashboardSectionCard
      title="Top Accounts"
      instruction="Top enterprise accounts ranked by ARR with growth, churn risk, and health."
      className="lg:col-span-7"
    >
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Account</th>
              <th className="px-3 py-2 font-medium">ARR</th>
              <th className="px-3 py-2 font-medium">Growth</th>
              <th className="px-3 py-2 font-medium">Churn Risk</th>
              <th className="px-3 py-2 font-medium">Health</th>
            </tr>
          </thead>
          <tbody>
            {TOP_ACCOUNTS.map((account) => (
              <tr key={account.name} className="border-t">
                <td className="px-3 py-2">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-[11px] text-muted-foreground">{account.owner}</p>
                </td>
                <td className="px-3 py-2 tabular-nums">{formatCurrency(account.arr)}</td>
                <td className="px-3 py-2 tabular-nums text-emerald-700 dark:text-emerald-400">
                  +{account.growth.toFixed(1)}%
                </td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      account.churnRisk === 'Low' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                      account.churnRisk === 'Medium' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                      account.churnRisk === 'High' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                    )}
                  >
                    {account.churnRisk}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-muted">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          account.health >= 85 && 'bg-emerald-500',
                          account.health >= 70 && account.health < 85 && 'bg-amber-500',
                          account.health < 70 && 'bg-rose-500',
                        )}
                        style={{ width: `${account.health}%` }}
                      />
                    </div>
                    <span className="tabular-nums text-[11px] text-muted-foreground">{account.health}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" size="xs">
          View Full Account List
        </Button>
      </div>
    </DashboardSectionCard>
  );
}

function ExecutiveNotesSection() {
  return (
    <DashboardSectionCard
      title="Executive Notes"
      instruction="Leadership decision notes and follow-up action tracking."
      className="lg:col-span-5"
    >
      <div className="space-y-2">
        {EXECUTIVE_NOTES.map((note) => (
          <div key={note.title} className="rounded-md border p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{note.title}</p>
                <p className="text-[11px] text-muted-foreground">Owner: {note.owner}</p>
              </div>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  note.status === 'In Progress' && 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
                  note.status === 'Review' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                  note.status === 'Planned' && 'bg-muted text-muted-foreground',
                )}
              >
                {note.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{note.summary}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Due {note.dueDate}</span>
              <Button size="xs" variant="ghost">
                Open
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        Add Executive Note
      </Button>
    </DashboardSectionCard>
  );
}

export function ExecutiveSections() {
  return (
    <>
      <RevenueKpiSection />
      <CashFlowKpiSection />
      <BurnRateKpiSection />
      <NetMarginKpiSection />
      <FinancialPerformanceSection />
      <RiskAlertsSection />
      <TopAccountsSection />
      <ExecutiveNotesSection />
    </>
  );
}
