import { Skeleton } from '@repo/ui-shadcn';
import { DashboardSectionCard } from './DashboardSectionCard';

function IncidentQueueSection() {
  return (
    <DashboardSectionCard
      title="Incident Queue"
      instruction="Implement active incidents queue with SLA badges here."
      className="lg:col-span-4"
    >
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </DashboardSectionCard>
  );
}

function WorkflowThroughputSection() {
  return (
    <DashboardSectionCard
      title="Workflow Throughput"
      instruction="Implement operations throughput chart here."
      className="lg:col-span-8"
    >
      <Skeleton className="h-36 w-full" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </DashboardSectionCard>
  );
}

function TaskPipelineSection() {
  return (
    <DashboardSectionCard
      title="Task Pipeline"
      instruction="Implement kanban pipeline health summary here."
      className="lg:col-span-6"
    >
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </DashboardSectionCard>
  );
}

function TeamCapacitySection() {
  return (
    <DashboardSectionCard
      title="Team Capacity"
      instruction="Implement staffing and shift capacity chart here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-28 w-full" />
    </DashboardSectionCard>
  );
}

function AutomationRunsSection() {
  return (
    <DashboardSectionCard
      title="Automation Runs"
      instruction="Implement job runs and failed tasks summary here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </DashboardSectionCard>
  );
}

function RunbookTimelineSection() {
  return (
    <DashboardSectionCard
      title="Runbook Timeline"
      instruction="Implement live timeline of operations events here."
      className="lg:col-span-12"
    >
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
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

