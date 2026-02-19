import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import Stat from './ui/Stat';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    trend: 'up',
    description: 'vs. last month',
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180',
    trend: 'up',
    description: 'new this week',
    icon: Users,
  },
  {
    title: 'Orders',
    value: '1,247',
    change: '-3.2%',
    trend: 'down',
    description: 'vs. last month',
    icon: ShoppingCart,
  },
  {
    title: 'Uptime',
    value: '99.9%',
    change: '0%',
    trend: 'neutral',
    description: 'last 30 days',
    icon: Activity,
  },
] as const;

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Stat key={s.title} {...s} />
      ))}
    </div>
  );
}
