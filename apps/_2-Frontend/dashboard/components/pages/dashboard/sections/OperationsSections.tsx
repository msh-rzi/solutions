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

type IncidentItem = {
  id: string;
  title: string;
  service: string;
  severity: 'Critical' | 'High' | 'Medium';
  owner: string;
  status: 'Investigating' | 'Mitigating' | 'Blocked';
  slaMinutesLeft: number;
};

type ThroughputPoint = {
  day: string;
  completed: number;
  failed: number;
  queued: number;
};

type QueueSeverityPoint = {
  severity: string;
  count: number;
};

type PipelineStage = {
  stage: string;
  items: number;
  wipLimit: number;
  blocked: number;
};

type TeamCapacityPoint = {
  team: string;
  utilization: number;
};

type AutomationRatioPoint = {
  label: string;
  value: number;
  fill: string;
};

type AutomationRun = {
  job: string;
  status: 'Success' | 'Retrying' | 'Failed';
  duration: string;
  startedAt: string;
};

type RunbookActivityPoint = {
  hour: string;
  events: number;
};

type TimelineItem = {
  time: string;
  title: string;
  detail: string;
  owner: string;
  status: 'Resolved' | 'In Progress' | 'Escalated';
};

const INCIDENTS: IncidentItem[] = [
  {
    id: 'inc-4821',
    title: 'Payment webhook timeout spike',
    service: 'Billing API',
    severity: 'Critical',
    owner: 'Platform On-call',
    status: 'Mitigating',
    slaMinutesLeft: 18,
  },
  {
    id: 'inc-4813',
    title: 'EU job runner backlog above threshold',
    service: 'Automation Workers',
    severity: 'High',
    owner: 'Workflow Ops',
    status: 'Investigating',
    slaMinutesLeft: 42,
  },
  {
    id: 'inc-4809',
    title: 'Support mailbox ingestion delay',
    service: 'Comms Gateway',
    severity: 'Medium',
    owner: 'Support Engineering',
    status: 'Blocked',
    slaMinutesLeft: 76,
  },
];

const QUEUE_BY_SEVERITY: QueueSeverityPoint[] = [
  { severity: 'Critical', count: 3 },
  { severity: 'High', count: 5 },
  { severity: 'Medium', count: 8 },
  { severity: 'Low', count: 11 },
];

const THROUGHPUT_DATA: ThroughputPoint[] = [
  { day: 'Mon', completed: 182, failed: 14, queued: 71 },
  { day: 'Tue', completed: 196, failed: 12, queued: 68 },
  { day: 'Wed', completed: 205, failed: 11, queued: 62 },
  { day: 'Thu', completed: 211, failed: 9, queued: 59 },
  { day: 'Fri', completed: 223, failed: 10, queued: 53 },
  { day: 'Sat', completed: 198, failed: 8, queued: 49 },
  { day: 'Sun', completed: 176, failed: 7, queued: 45 },
];

const PIPELINE_STAGES: PipelineStage[] = [
  { stage: 'Triage', items: 23, wipLimit: 28, blocked: 3 },
  { stage: 'In Progress', items: 31, wipLimit: 35, blocked: 6 },
  { stage: 'Review', items: 14, wipLimit: 22, blocked: 2 },
  { stage: 'Deploy', items: 9, wipLimit: 14, blocked: 1 },
];

const TEAM_CAPACITY: TeamCapacityPoint[] = [
  { team: 'Core', utilization: 74 },
  { team: 'Platform', utilization: 83 },
  { team: 'Support', utilization: 92 },
  { team: 'QA', utilization: 69 },
];

const AUTOMATION_RATIO: AutomationRatioPoint[] = [
  { label: 'Success', value: 82, fill: '#16a34a' },
  { label: 'Retrying', value: 11, fill: '#f59e0b' },
  { label: 'Failed', value: 7, fill: '#dc2626' },
];

const RECENT_RUNS: AutomationRun[] = [
  { job: 'nightly-index-build', status: 'Success', duration: '07m 14s', startedAt: '07:10' },
  { job: 'invoice-reconciliation', status: 'Retrying', duration: '03m 52s', startedAt: '07:28' },
  { job: 'customer-sync-delta', status: 'Failed', duration: '01m 05s', startedAt: '07:33' },
];

const RUNBOOK_ACTIVITY: RunbookActivityPoint[] = [
  { hour: '00:00', events: 2 },
  { hour: '04:00', events: 4 },
  { hour: '08:00', events: 7 },
  { hour: '12:00', events: 5 },
  { hour: '16:00', events: 9 },
  { hour: '20:00', events: 6 },
];

const RUNBOOK_TIMELINE: TimelineItem[] = [
  {
    time: '07:11',
    title: 'Rate limiter increased for billing webhooks',
    detail: 'Temporary limit raised from 1.2k/s to 1.8k/s to drain queued retries.',
    owner: 'Platform On-call',
    status: 'In Progress',
  },
  {
    time: '07:06',
    title: 'Failover workers promoted in EU-West',
    detail: 'Secondary worker pool promoted after queue latency crossed 220 seconds.',
    owner: 'Workflow Ops',
    status: 'Escalated',
  },
  {
    time: '06:54',
    title: 'Dead-letter replay completed',
    detail: 'Replayed 341 dead-letter messages with 100% reconciliation success.',
    owner: 'Data Platform',
    status: 'Resolved',
  },
];

function formatQueueStatus(status: IncidentItem['status']) {
  if (status === 'Mitigating') {
    return 'bg-blue-500/15 text-blue-700 dark:text-blue-400';
  }
  if (status === 'Blocked') {
    return 'bg-rose-500/15 text-rose-700 dark:text-rose-400';
  }
  return 'bg-amber-500/15 text-amber-700 dark:text-amber-400';
}

function formatSeverity(severity: IncidentItem['severity']) {
  if (severity === 'Critical') {
    return 'bg-rose-500/15 text-rose-700 dark:text-rose-400';
  }
  if (severity === 'High') {
    return 'bg-orange-500/15 text-orange-700 dark:text-orange-400';
  }
  return 'bg-blue-500/15 text-blue-700 dark:text-blue-400';
}

function IncidentQueueSection() {
  const totalOpen = QUEUE_BY_SEVERITY.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <DashboardSectionCard
      title="Incident Queue"
      instruction="Live incident queue with severity split, SLA pressure, and current responders."
      className="lg:col-span-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold tracking-tight">{totalOpen}</p>
        <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:text-rose-400">
          3 critical
        </span>
      </div>
      <p className="text-xs text-muted-foreground">Open incidents across all services</p>

      <ChartContainer className="h-28" config={{ count: { label: 'Incidents', color: '#dc2626' } }}>
        <ChartPrimitives.BarChart data={QUEUE_BY_SEVERITY} margin={{ top: 8, right: 6, left: -10, bottom: 0 }}>
          <ChartPrimitives.XAxis dataKey="severity" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis allowDecimals={false} tickLine={false} axisLine={false} width={22} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} incidents`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <Separator />

      <div className="space-y-2">
        {INCIDENTS.map((incident) => (
          <div key={incident.id} className="rounded-md border p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', formatSeverity(incident.severity))}>
                  {incident.severity}
                </span>
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', formatQueueStatus(incident.status))}>
                  {incident.status}
                </span>
              </div>
              <span className="text-[11px] tabular-nums text-muted-foreground">{incident.slaMinutesLeft}m SLA</span>
            </div>
            <p className="text-xs font-medium leading-snug">{incident.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {incident.service} • {incident.owner}
            </p>
          </div>
        ))}
      </div>

      <Button variant="outline" size="xs" className="w-full">
        Open Incident Console
      </Button>
    </DashboardSectionCard>
  );
}

function WorkflowThroughputSection() {
  const completedTotal = THROUGHPUT_DATA.reduce((sum, entry) => sum + entry.completed, 0);
  const failedTotal = THROUGHPUT_DATA.reduce((sum, entry) => sum + entry.failed, 0);
  const queuedNow = THROUGHPUT_DATA[THROUGHPUT_DATA.length - 1]?.queued ?? 0;

  return (
    <DashboardSectionCard
      title="Workflow Throughput"
      instruction="Daily processed volume with failure trend and queue backlog."
      className="lg:col-span-8"
    >
      <ChartContainer
        className="h-52"
        config={{
          completed: { label: 'Completed', color: '#2563eb' },
          failed: { label: 'Failed', color: '#dc2626' },
          queued: { label: 'Queued', color: '#f59e0b' },
        }}
      >
        <ChartPrimitives.ComposedChart data={THROUGHPUT_DATA} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="day" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={32} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} jobs`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} maxBarSize={24} />
          <ChartPrimitives.Line
            dataKey="failed"
            type="monotone"
            stroke="var(--color-failed)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ChartPrimitives.Line
            dataKey="queued"
            type="monotone"
            stroke="var(--color-queued)"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
            isAnimationActive={false}
          />
        </ChartPrimitives.ComposedChart>
      </ChartContainer>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Completed (7d)</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{completedTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Failed (7d)</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{failedTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-[11px] text-muted-foreground">Queue now</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{queuedNow.toLocaleString()}</p>
        </div>
      </div>
    </DashboardSectionCard>
  );
}

function TaskPipelineSection() {
  return (
    <DashboardSectionCard
      title="Task Pipeline"
      instruction="Kanban stage utilization with blocked work visibility."
      className="lg:col-span-6"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {PIPELINE_STAGES.map((stage) => {
          const utilization = Math.min(100, Math.round((stage.items / stage.wipLimit) * 100));
          return (
            <div key={stage.stage} className="rounded-md border p-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium">{stage.stage}</p>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {stage.items}/{stage.wipLimit}
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted">
                <div
                  className={cn(
                    'h-full rounded-full',
                    utilization < 80 && 'bg-emerald-500',
                    utilization >= 80 && utilization < 95 && 'bg-amber-500',
                    utilization >= 95 && 'bg-rose-500',
                  )}
                  style={{ width: `${utilization}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {stage.blocked} blocked • {utilization}% utilized
              </p>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="rounded-md border p-2.5">
        <p className="text-xs font-medium">Pipeline Notes</p>
        <ul className="mt-2 space-y-1.5 text-[11px] text-muted-foreground">
          <li>Blocked items cluster in `In Progress` due to QA environment contention.</li>
          <li>`Review` stage has spare capacity; reroute two tickets from `In Progress` today.</li>
          <li>Deploy lane within safe limits; no immediate WIP expansion needed.</li>
        </ul>
      </div>
    </DashboardSectionCard>
  );
}

function TeamCapacitySection() {
  const avgUtilization = Math.round(
    TEAM_CAPACITY.reduce((sum, team) => sum + team.utilization, 0) / TEAM_CAPACITY.length,
  );

  return (
    <DashboardSectionCard
      title="Team Capacity"
      instruction="Current team utilization and staffing pressure."
      className="lg:col-span-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold tabular-nums">{avgUtilization}%</p>
        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
          Near capacity
        </span>
      </div>
      <p className="text-xs text-muted-foreground">Average utilization across ops squads</p>

      <ChartContainer className="h-36" config={{ utilization: { label: 'Utilization', color: '#0284c7' } }}>
        <ChartPrimitives.BarChart data={TEAM_CAPACITY} margin={{ top: 8, right: 0, left: -14, bottom: 0 }}>
          <ChartPrimitives.XAxis dataKey="team" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis tickLine={false} axisLine={false} width={26} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)}%`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="utilization" fill="var(--color-utilization)" radius={[4, 4, 0, 0]} />
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <div className="text-[11px] text-muted-foreground">
        On-call staffed: <span className="font-medium text-foreground">8 / 9</span>
      </div>
    </DashboardSectionCard>
  );
}

function AutomationRunsSection() {
  const successful = AUTOMATION_RATIO.find((entry) => entry.label === 'Success')?.value ?? 0;

  return (
    <DashboardSectionCard
      title="Automation Runs"
      instruction="Run health ratio and latest automation execution states."
      className="lg:col-span-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold tabular-nums">{successful}%</p>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
          Success ratio
        </span>
      </div>

      <ChartContainer className="h-32" config={{ value: { label: 'Runs', color: '#16a34a' } }}>
        <ChartPrimitives.PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)}%`}
              />
            }
          />
          <ChartPrimitives.Pie
            data={AUTOMATION_RATIO}
            dataKey="value"
            nameKey="label"
            innerRadius={34}
            outerRadius={52}
            strokeWidth={3}
            isAnimationActive={false}
          />
        </ChartPrimitives.PieChart>
      </ChartContainer>

      <div className="space-y-1.5">
        {RECENT_RUNS.map((run) => (
          <div key={run.job} className="flex items-center justify-between gap-2 rounded-md border px-2 py-1.5">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium">{run.job}</p>
              <p className="text-[10px] text-muted-foreground">{run.startedAt}</p>
            </div>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                run.status === 'Success' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                run.status === 'Retrying' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                run.status === 'Failed' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
              )}
            >
              {run.status}
            </span>
          </div>
        ))}
      </div>

      <Button variant="ghost" size="xs" className="w-full">
        Open Run Logs
      </Button>
    </DashboardSectionCard>
  );
}

function RunbookTimelineSection() {
  return (
    <DashboardSectionCard
      title="Runbook Timeline"
      instruction="Recent runbook actions with event volume trend and ownership."
      className="lg:col-span-12"
    >
      <ChartContainer className="h-32" config={{ events: { label: 'Events', color: '#6366f1' } }}>
        <ChartPrimitives.AreaChart data={RUNBOOK_ACTIVITY} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="runbook-activity-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-events)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--color-events)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartPrimitives.CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ChartPrimitives.XAxis dataKey="hour" tickLine={false} axisLine={false} />
          <ChartPrimitives.YAxis allowDecimals={false} tickLine={false} axisLine={false} width={22} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} events`}
              />
            }
          />
          <ChartPrimitives.Area
            dataKey="events"
            type="monotone"
            stroke="var(--color-events)"
            fill="url(#runbook-activity-gradient)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ChartPrimitives.AreaChart>
      </ChartContainer>

      <div className="grid gap-2">
        {RUNBOOK_TIMELINE.map((entry) => (
          <div key={`${entry.time}-${entry.title}`} className="rounded-md border p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-xs font-medium tabular-nums">{entry.time}</span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  entry.status === 'Resolved' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                  entry.status === 'In Progress' && 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
                  entry.status === 'Escalated' && 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
                )}
              >
                {entry.status}
              </span>
            </div>
            <p className="text-sm font-medium">{entry.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{entry.detail}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Owner: {entry.owner}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          Open Full Timeline
        </Button>
      </div>
    </DashboardSectionCard>
  );
}

export function OperationsSections() {
  return (
    <>
      <IncidentQueueSection />
      <WorkflowThroughputSection />
      <TaskPipelineSection />
      <TeamCapacitySection />
      <AutomationRunsSection />
      <RunbookTimelineSection />
    </>
  );
}
