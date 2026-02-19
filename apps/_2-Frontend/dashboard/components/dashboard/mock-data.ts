import { Activity, DollarSign, ShoppingCart, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Transaction, TransactionStatus, TransactionType } from './ui/Transaction';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: StatTrend;
  description: string;
  icon: LucideIcon;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  expenses: number;
}

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const seeded = (value: number) => {
  const raw = Math.sin(value * 999.17) * 10000;
  return raw - Math.floor(raw);
};

const formatDelta = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;

const transactionTypes: readonly TransactionType[] = ['credit', 'debit', 'transfer'];
const transactionStatuses: readonly TransactionStatus[] = ['completed', 'pending', 'failed'];
const merchants = ['Stripe', 'AWS', 'Google Cloud', 'Notion', 'Linear', 'OpenAI', 'Atlas', 'Payroll', 'Mercury', 'Slack'] as const;
const categories = ['Revenue', 'Cloud', 'Payroll', 'Subscriptions', 'Refunds', 'Operations', 'Transfer'] as const;

const createRevenueSeries = (points: number) => {
  const now = new Date();
  let revenue = 72000;
  let expenses = 41000;

  return Array.from({ length: points }, (_, index) => {
    const offset = points - index - 1;
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const revenueVariance = Math.round((seeded(index + 3) - 0.38) * 12000);
    const expenseVariance = Math.round((seeded(index + 31) - 0.46) * 9000);

    revenue = Math.max(28000, revenue + revenueVariance);
    expenses = Math.max(18000, expenses + expenseVariance);

    return {
      month: monthFormatter.format(date),
      revenue,
      expenses,
    } satisfies RevenuePoint;
  });
};

const createTransactionTitle = (type: TransactionType, merchant: string) => {
  if (type === 'credit') {
    return `${merchant} payout`;
  }

  if (type === 'debit') {
    return `${merchant} invoice`;
  }

  return `${merchant} transfer`;
};

const createTransactions = (count: number) => {
  const now = Date.now();

  return Array.from({ length: count }, (_, index) => {
    const cursor = index + 1;
    const type = transactionTypes[Math.floor(seeded(cursor * 7) * transactionTypes.length)] ?? 'transfer';
    const statusRoll = seeded(cursor * 11);
    const status =
      statusRoll > 0.9
        ? (transactionStatuses[2] ?? 'failed')
        : statusRoll > 0.72
          ? (transactionStatuses[1] ?? 'pending')
          : (transactionStatuses[0] ?? 'completed');
    const merchant = merchants[Math.floor(seeded(cursor * 17) * merchants.length)] ?? merchants[0];
    const category = categories[Math.floor(seeded(cursor * 23) * categories.length)] ?? categories[0];
    const amount = Number((140 + seeded(cursor * 29) * 9800).toFixed(2));
    const daysAgo = Math.floor(seeded(cursor * 37) * 240);
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();

    return {
      id: `tx-${String(cursor).padStart(5, '0')}`,
      title: createTransactionTitle(type, merchant),
      description: `${category} transaction`,
      amount,
      type,
      status,
      date,
      category,
      currency: 'USD',
    } satisfies Transaction;
  });
};

const createStats = (transactions: readonly Transaction[], revenueSeries: readonly RevenuePoint[]) => {
  const recentWindow = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = transactions.filter((tx) => new Date(tx.date).getTime() >= recentWindow);

  const recentCredits = recent.filter((tx) => tx.type === 'credit').reduce((sum, tx) => sum + tx.amount, 0);
  const recentDebits = recent.filter((tx) => tx.type === 'debit').reduce((sum, tx) => sum + tx.amount, 0);
  const completedCount = recent.filter((tx) => tx.status === 'completed').length;
  const monthlyRevenue = revenueSeries.at(-1)?.revenue ?? 0;
  const previousRevenue = revenueSeries.at(-2)?.revenue ?? monthlyRevenue;
  const revenueDelta = previousRevenue === 0 ? 0 : ((monthlyRevenue - previousRevenue) / previousRevenue) * 100;

  return [
    {
      title: 'Monthly Revenue',
      value: currencyFormatter.format(monthlyRevenue),
      change: formatDelta(revenueDelta),
      trend: revenueDelta >= 0 ? 'up' : 'down',
      description: 'from previous month',
      icon: DollarSign,
    },
    {
      title: 'Net Cashflow',
      value: currencyFormatter.format(recentCredits - recentDebits),
      change: formatDelta(4.7),
      trend: 'up',
      description: 'last 30 days',
      icon: Activity,
    },
    {
      title: 'Processed Orders',
      value: compactNumberFormatter.format(completedCount * 11.4),
      change: formatDelta(2.1),
      trend: 'up',
      description: 'completed transactions',
      icon: ShoppingCart,
    },
    {
      title: 'Active Accounts',
      value: compactNumberFormatter.format(2350 + Math.round(seeded(completedCount + 19) * 380)),
      change: formatDelta(1.3),
      trend: 'neutral',
      description: 'across all tenants',
      icon: Users,
    },
  ] satisfies DashboardStat[];
};

export const DASHBOARD_REVENUE_SERIES = createRevenueSeries(48);
export const DASHBOARD_TRANSACTIONS = createTransactions(1800);
export const DASHBOARD_STATS = createStats(DASHBOARD_TRANSACTIONS, DASHBOARD_REVENUE_SERIES);
