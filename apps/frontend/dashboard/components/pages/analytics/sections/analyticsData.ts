export type TrafficTrendPoint = {
  period: string;
  sessions: number;
  signups: number;
  conversionRate: number;
};

export type AttributionPoint = {
  channel: string;
  share: number;
  sessions: number;
  conversionRate: number;
  fill: string;
};

export type FunnelPoint = {
  step: string;
  users: number;
  dropOffRate: number;
  fill: string;
};

export type CohortRow = {
  cohort: string;
  retention: number[];
};

export type TopSegmentRow = {
  segment: string;
  arr: number;
  growth: number;
  conversionRate: number;
  churnRisk: 'Low' | 'Medium' | 'High';
};

export type AnomalyTrendPoint = {
  day: string;
  anomalies: number;
};

export type AnomalyItem = {
  id: string;
  title: string;
  metric: string;
  changePercent: number;
  severity: 'High' | 'Medium' | 'Low';
  detectedAt: string;
  owner: string;
};

export type ScheduledReport = {
  name: string;
  format: 'CSV' | 'PDF';
  cadence: string;
  nextRun: string;
  recipients: number;
};

export const TRAFFIC_TREND: TrafficTrendPoint[] = [
  { period: 'W1', sessions: 124000, signups: 3710, conversionRate: 3.0 },
  { period: 'W2', sessions: 132500, signups: 4125, conversionRate: 3.1 },
  { period: 'W3', sessions: 138900, signups: 4722, conversionRate: 3.4 },
  { period: 'W4', sessions: 143300, signups: 5026, conversionRate: 3.5 },
  { period: 'W5', sessions: 149600, signups: 5685, conversionRate: 3.8 },
  { period: 'W6', sessions: 156200, signups: 6404, conversionRate: 4.1 },
];

export const ATTRIBUTION_BREAKDOWN: AttributionPoint[] = [
  { channel: 'Paid Search', share: 34, sessions: 53100, conversionRate: 4.6, fill: '#2563eb' },
  { channel: 'Organic', share: 26, sessions: 40600, conversionRate: 3.9, fill: '#16a34a' },
  { channel: 'Referral', share: 18, sessions: 28100, conversionRate: 3.4, fill: '#f59e0b' },
  { channel: 'Direct', share: 22, sessions: 34400, conversionRate: 3.8, fill: '#7c3aed' },
];

export const FUNNEL_STEPS: FunnelPoint[] = [
  { step: 'Visit', users: 156200, dropOffRate: 0, fill: '#2563eb' },
  { step: 'Signup', users: 6404, dropOffRate: 95.9, fill: '#0ea5e9' },
  { step: 'Activation', users: 3180, dropOffRate: 50.3, fill: '#16a34a' },
  { step: 'Paid', users: 1234, dropOffRate: 61.2, fill: '#f59e0b' },
];

export const COHORT_RETENTION: CohortRow[] = [
  { cohort: 'Mar 31', retention: [100, 84, 73, 66, 62, 58] },
  { cohort: 'Apr 07', retention: [100, 82, 70, 64, 60, 55] },
  { cohort: 'Apr 14', retention: [100, 86, 76, 69, 64, 61] },
  { cohort: 'Apr 21', retention: [100, 81, 69, 61, 56, 52] },
  { cohort: 'Apr 28', retention: [100, 88, 79, 72, 66, 63] },
];

export const TOP_SEGMENTS: TopSegmentRow[] = [
  { segment: 'Enterprise / Paid Search', arr: 1240000, growth: 18.4, conversionRate: 5.2, churnRisk: 'Low' },
  { segment: 'Mid-Market / Organic', arr: 980000, growth: 12.1, conversionRate: 4.4, churnRisk: 'Medium' },
  { segment: 'SMB / Referral', arr: 615000, growth: 6.8, conversionRate: 3.6, churnRisk: 'High' },
  { segment: 'Enterprise / Partner', arr: 570000, growth: 14.3, conversionRate: 5.9, churnRisk: 'Low' },
  { segment: 'Mid-Market / Direct', arr: 730000, growth: 9.7, conversionRate: 4.1, churnRisk: 'Medium' },
];

export const ANOMALY_TREND: AnomalyTrendPoint[] = [
  { day: 'Mon', anomalies: 4 },
  { day: 'Tue', anomalies: 6 },
  { day: 'Wed', anomalies: 3 },
  { day: 'Thu', anomalies: 8 },
  { day: 'Fri', anomalies: 5 },
  { day: 'Sat', anomalies: 2 },
  { day: 'Sun', anomalies: 4 },
];

export const ANOMALY_FEED: AnomalyItem[] = [
  {
    id: 'a-1001',
    title: 'Signup volume surged beyond expected range',
    metric: 'Signups / hour',
    changePercent: 42.8,
    severity: 'High',
    detectedAt: '07:21 UTC',
    owner: 'Growth Analytics',
  },
  {
    id: 'a-1002',
    title: 'Organic conversion dipped for EU cohort',
    metric: 'Conversion rate',
    changePercent: -17.4,
    severity: 'Medium',
    detectedAt: '06:44 UTC',
    owner: 'Lifecycle',
  },
  {
    id: 'a-1003',
    title: 'Referral traffic quality improved significantly',
    metric: 'Activation rate',
    changePercent: 13.2,
    severity: 'Low',
    detectedAt: '05:59 UTC',
    owner: 'Performance Marketing',
  },
];

export const SCHEDULED_REPORTS: ScheduledReport[] = [
  { name: 'Executive Weekly Snapshot', format: 'PDF', cadence: 'Weekly', nextRun: 'Mon 08:00', recipients: 9 },
  { name: 'Channel Performance Export', format: 'CSV', cadence: 'Daily', nextRun: 'Tomorrow 06:30', recipients: 4 },
  { name: 'Cohort Retention Digest', format: 'PDF', cadence: 'Weekly', nextRun: 'Fri 09:00', recipients: 6 },
];

export function formatCurrencyCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

