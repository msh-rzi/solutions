'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { cn } from '../../utils';

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

type ChartContainerProps = React.ComponentProps<'div'> & {
  config?: ChartConfig;
  children: React.ReactElement;
};

function ChartContainer({ config, className, children, style, ...props }: ChartContainerProps) {
  const colorVariables = React.useMemo(() => {
    if (!config) {
      return {};
    }

    return Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
      if (value.color) {
        acc[`--color-${key}`] = value.color;
      }
      return acc;
    }, {});
  }, [config]);

  return (
    <div
      data-slot="chart"
      className={cn('h-64 w-full text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground', className)}
      style={{ ...colorVariables, ...style } as React.CSSProperties}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
    </div>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

type ChartTooltipPayload = {
  color?: string;
  dataKey?: string | number;
  name?: string | number;
  value?: ValueType;
};

type ChartTooltipContentProps = {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: string | number;
  hideLabel?: boolean;
  className?: string;
  valueFormatter?: (
    value: ValueType | undefined,
    name: NameType | undefined,
    item: ChartTooltipPayload,
  ) => React.ReactNode;
};

function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  className,
  valueFormatter,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={cn('grid min-w-[9rem] gap-1 rounded-md border bg-background/95 p-2 text-xs shadow-lg', className)}>
      {!hideLabel && label !== undefined && label !== null ? <p className="font-medium">{String(label)}</p> : null}
      <div className="grid gap-1">
        {payload.map((item, index) => {
          const indicatorColor = item.color ?? 'currentColor';
          const itemName =
            item.name !== undefined && item.name !== null
              ? String(item.name)
              : item.dataKey !== undefined && item.dataKey !== null
                ? String(item.dataKey)
                : 'Value';

          const itemValue =
            valueFormatter?.(item.value, item.name as NameType | undefined, item) ??
            (typeof item.value === 'number' ? item.value.toLocaleString() : String(item.value ?? '-'));

          return (
            <div key={`${itemName}-${index}`} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2 rounded-[2px]" style={{ backgroundColor: indicatorColor }} />
                <span>{itemName}</span>
              </div>
              <span className="font-medium text-foreground">{itemValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  RechartsPrimitive as ChartPrimitives,
};

