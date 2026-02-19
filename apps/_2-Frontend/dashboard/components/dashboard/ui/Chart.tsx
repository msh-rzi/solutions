import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, Line, LineChart, CartesianGrid, XAxis, YAxis, ChartConfig } from '@repo/ui-shadcn';
import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChartDataKey = {
  key: string;
  label: string;
  color: string;
};

export interface FinancialChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  series: ChartDataKey[];
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  tooltipLabelFormatter?: (value: string) => string;
  /** Dot radius on data points — set to 0 to hide */
  dotRadius?: number;
  /** Line stroke width */
  strokeWidth?: number;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const FinancialChart = ({
  data,
  xKey,
  series,
  xTickFormatter,
  yTickFormatter,
  tooltipLabelFormatter,
  dotRadius = 3,
  strokeWidth = 2,
  showYAxis = true,
  showLegend = true,
  showGrid = true,
  className = 'min-h-64 w-full',
}: FinancialChartProps) => {
  const chartConfig = series.reduce<ChartConfig>((acc, s) => {
    acc[s.key] = { label: s.label, color: s.color };
    return acc;
  }, {});

  return (
    <ChartContainer config={chartConfig} className={className}>
      <LineChart accessibilityLayer data={data}>
        {showGrid && <CartesianGrid vertical={false} />}

        <XAxis dataKey={xKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={xTickFormatter} />

        {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={yTickFormatter} width={yTickFormatter ? 64 : 40} />}

        <ChartTooltip content={<ChartTooltipContent labelFormatter={tooltipLabelFormatter} labelClassName="w-32" />} />

        {showLegend && <ChartLegend content={<ChartLegendContent />} />}

        {series.map((s) => (
          <Line
            key={s.key}
            dataKey={s.key}
            stroke={`var(--color-${s.key})`}
            strokeWidth={strokeWidth}
            dot={{ r: dotRadius, fill: `var(--color-${s.key})`, strokeWidth: 0 }}
            activeDot={{ r: dotRadius + 2 }}
            type="monotone"
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default FinancialChart;
