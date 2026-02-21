import { Skeleton } from '@repo/ui-shadcn';
import { DashboardSectionCard } from './DashboardSectionCard';

function RevenueKpiSection() {
  return (
    <DashboardSectionCard
      title="Revenue KPI"
      instruction="Implement MRR and ARR metric widget here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-3 w-28" />
    </DashboardSectionCard>
  );
}

function CashFlowKpiSection() {
  return (
    <DashboardSectionCard
      title="Cash Flow KPI"
      instruction="Implement cash-in versus cash-out metric here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-28" />
    </DashboardSectionCard>
  );
}

function BurnRateKpiSection() {
  return (
    <DashboardSectionCard
      title="Burn Rate KPI"
      instruction="Implement monthly burn rate metric here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-28" />
    </DashboardSectionCard>
  );
}

function NetMarginKpiSection() {
  return (
    <DashboardSectionCard
      title="Net Margin KPI"
      instruction="Implement net margin trend metric here."
      className="lg:col-span-3"
    >
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-28" />
    </DashboardSectionCard>
  );
}

function FinancialPerformanceSection() {
  return (
    <DashboardSectionCard
      title="Financial Performance"
      instruction="Implement financial chart here (revenue, costs, margin)."
      className="lg:col-span-8"
    >
      <Skeleton className="h-44 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </DashboardSectionCard>
  );
}

function RiskAlertsSection() {
  return (
    <DashboardSectionCard
      title="Risk & Alerts"
      instruction="Implement executive risk feed and critical alerts here."
      className="lg:col-span-4"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </DashboardSectionCard>
  );
}

function TopAccountsSection() {
  return (
    <DashboardSectionCard
      title="Top Accounts"
      instruction="Implement top enterprise accounts table here."
      className="lg:col-span-7"
    >
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-full" />
    </DashboardSectionCard>
  );
}

function ExecutiveNotesSection() {
  return (
    <DashboardSectionCard
      title="Executive Notes"
      instruction="Implement decision notes and action items panel here."
      className="lg:col-span-5"
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
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

