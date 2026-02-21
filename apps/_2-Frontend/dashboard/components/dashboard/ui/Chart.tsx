'use client';

import * as React from 'react';
import { CartesianGrid, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, Line, LineChart, XAxis, YAxis } from '@repo/ui-shadcn';

export type ChartDataKey = {
  key: string;
  label: string;
  color: string;
};

export interface FinancialChartProps<TData extends object = Record<string, string | number>> {
  data: ReadonlyArray<TData>;
  xKey: string;
  series: ReadonlyArray<ChartDataKey>;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  tooltipLabelFormatter?: (value: React.ReactNode) => React.ReactNode;
  dotRadius?: number;
  strokeWidth?: number;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

const FinancialChart = <TData extends object>({
  data,
  xKey,
  series,
  xTickFormatter,
  yTickFormatter,
  tooltipLabelFormatter,
  dotRadius = 2.8,
  strokeWidth = 2,
  showYAxis = true,
  showLegend = true,
  showGrid = true,
  className = 'min-h-72 w-full',
}: FinancialChartProps<TData>) => {
  const chartConfig = React.useMemo(
    () =>
      series.reduce<ChartConfig>((acc, currentSeries) => {
        acc[currentSeries.key] = {
          label: currentSeries.label,
          color: currentSeries.color,
        };

        return acc;
      }, {}),
    [series],
  );

  return (
    <ChartContainer config={chartConfig} className={className}>
      <LineChart accessibilityLayer data={data as any}>
        {showGrid && <CartesianGrid vertical={false} />}

        <XAxis dataKey={xKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={xTickFormatter} />
        {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={yTickFormatter} width={yTickFormatter ? 64 : 40} />}

        <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => (tooltipLabelFormatter ? tooltipLabelFormatter(label) : label)} labelClassName="w-32" />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}

        {series.map((currentSeries) => (
          <Line
            key={currentSeries.key}
            dataKey={currentSeries.key}
            stroke={`var(--color-${currentSeries.key})`}
            strokeWidth={strokeWidth}
            dot={{ r: dotRadius, fill: `var(--color-${currentSeries.key})`, strokeWidth: 0 }}
            activeDot={{ r: dotRadius + 1.6 }}
            type="monotone"
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default React.memo(FinancialChart);

