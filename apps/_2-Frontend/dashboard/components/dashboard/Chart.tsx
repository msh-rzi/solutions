import React from 'react';
import FinancialChart from './ui/Chart';
import { Card, CardContent } from '@repo/ui-shadcn';

const Chart = () => {
  const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 28000 },
    { month: 'Feb', revenue: 53000, expenses: 31000 },
    { month: 'Mar', revenue: 61000, expenses: 29000 },
    { month: 'Apr', revenue: 48000, expenses: 34000 },
    { month: 'May', revenue: 70000, expenses: 38000 },
    { month: 'Jun', revenue: 65000, expenses: 36000 },
    { month: 'Mar', revenue: 61000, expenses: 29000 },
    { month: 'Apr', revenue: 48000, expenses: 34000 },
    { month: 'May', revenue: 70000, expenses: 38000 },
    { month: 'Jun', revenue: 65000, expenses: 36000 },
    { month: 'Mar', revenue: 61000, expenses: 29000 },
    { month: 'Apr', revenue: 48000, expenses: 34000 },
    { month: 'May', revenue: 70000, expenses: 38000 },
    { month: 'Jun', revenue: 65000, expenses: 36000 },
  ];

  const series = [
    { key: 'revenue', label: 'Revenue', color: '#475b63' },
    { key: 'expenses', label: 'Expenses', color: '#2e2c2f' },
  ];

  return (
    <Card>
      <CardContent>
        <FinancialChart data={revenueData} xKey="month" series={series} yTickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tooltipLabelFormatter={(v) => `Month: ${v}`} />
      </CardContent>
    </Card>
  );
};

export default Chart;
