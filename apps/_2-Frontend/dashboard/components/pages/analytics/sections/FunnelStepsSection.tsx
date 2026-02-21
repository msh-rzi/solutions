import { ChartContainer, ChartPrimitives, ChartTooltip, ChartTooltipContent } from '@repo/ui-shadcn';
import { AnalyticsSectionCard } from './AnalyticsSectionCard';
import { FUNNEL_STEPS } from './analyticsData';

export function FunnelStepsSection() {
  const visitStep = FUNNEL_STEPS.find((step) => step.step === 'Visit')?.users ?? 0;
  const paidStep = FUNNEL_STEPS.find((step) => step.step === 'Paid')?.users ?? 0;
  const totalConversion = visitStep > 0 ? (paidStep / visitStep) * 100 : 0;

  return (
    <AnalyticsSectionCard
      title="Funnel Steps"
      instruction="Visitor-to-paid funnel progression with drop-off insight."
      className="lg:col-span-4"
    >
      <ChartContainer className="h-40" config={{ users: { label: 'Users', color: '#2563eb' } }}>
        <ChartPrimitives.BarChart data={FUNNEL_STEPS} layout="vertical" margin={{ top: 4, right: 0, left: 12, bottom: 0 }}>
          <ChartPrimitives.XAxis type="number" hide />
          <ChartPrimitives.YAxis
            type="category"
            dataKey="step"
            tickLine={false}
            axisLine={false}
            width={68}
            tick={{ fontSize: 11 }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                valueFormatter={(value) => `${typeof value === 'number' ? value : Number(value ?? 0)} users`}
              />
            }
          />
          <ChartPrimitives.Bar dataKey="users" radius={[0, 6, 6, 0]} isAnimationActive={false}>
            {FUNNEL_STEPS.map((entry) => (
              <ChartPrimitives.Cell key={entry.step} fill={entry.fill} />
            ))}
          </ChartPrimitives.Bar>
        </ChartPrimitives.BarChart>
      </ChartContainer>

      <div className="grid gap-1.5">
        {FUNNEL_STEPS.map((step) => (
          <div key={step.step} className="flex items-center justify-between rounded-md border px-2 py-1.5 text-xs">
            <span className="font-medium">{step.step}</span>
            <div className="text-right">
              <p className="tabular-nums">{step.users.toLocaleString()}</p>
              {step.dropOffRate > 0 ? (
                <p className="text-[10px] text-muted-foreground">-{step.dropOffRate.toFixed(1)}% from prev.</p>
              ) : (
                <p className="text-[10px] text-muted-foreground">Baseline</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        End-to-end conversion: <span className="font-medium text-foreground">{totalConversion.toFixed(2)}%</span>
      </p>
    </AnalyticsSectionCard>
  );
}
