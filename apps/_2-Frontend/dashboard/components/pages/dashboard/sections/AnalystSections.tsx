import { Skeleton } from '@repo/ui-shadcn';
import { DashboardSectionCard } from './DashboardSectionCard';

function QueryFiltersSection() {
  return (
    <DashboardSectionCard
      title="Query Filters"
      instruction="Implement advanced filter builder for analysis here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </DashboardSectionCard>
  );
}

function PrimaryAnalysisChartSection() {
  return (
    <DashboardSectionCard
      title="Primary Analysis Chart"
      instruction="Implement main time-series analysis chart here."
      className="lg:col-span-9"
    >
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-3 w-40" />
    </DashboardSectionCard>
  );
}

function CohortSegmentHeatmapSection() {
  return (
    <DashboardSectionCard
      title="Cohort / Segment Heatmap"
      instruction="Implement cohort retention heatmap here."
      className="lg:col-span-7"
    >
      <Skeleton className="h-36 w-full" />
    </DashboardSectionCard>
  );
}

function DistributionBreakdownSection() {
  return (
    <DashboardSectionCard
      title="Distribution Breakdown"
      instruction="Implement histogram and distribution chart here."
      className="lg:col-span-5"
    >
      <Skeleton className="h-36 w-full" />
    </DashboardSectionCard>
  );
}

function DrillDownTableSection() {
  return (
    <DashboardSectionCard
      title="Drill-down Table"
      instruction="Implement raw data drill-down table here."
      className="lg:col-span-8"
    >
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
    </DashboardSectionCard>
  );
}

function InsightsSummarySection() {
  return (
    <DashboardSectionCard
      title="Insights Summary"
      instruction="Implement generated insights and anomaly notes here."
      className="lg:col-span-4"
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
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

