export type NotificationPriority = 'P1' | 'P2' | 'P3';
export type NotificationType = 'Alert' | 'Mention' | 'System' | 'Approval';
export type NotificationState = 'Unread' | 'Acknowledged' | 'Resolved';
export type DeliveryChannel = 'In-app' | 'Email' | 'SMS' | 'Slack' | 'Webhook';

export type NotificationFeedItem = {
  id: string;
  title: string;
  type: NotificationType;
  priority: NotificationPriority;
  source: string;
  assignee: string;
  state: NotificationState;
  channel: DeliveryChannel;
  createdAt: string;
};

export type NotificationVolumePoint = {
  day: string;
  notifications: number;
  incidents: number;
};

export type PriorityQueuePoint = {
  priority: NotificationPriority;
  count: number;
};

export type ChannelHealthPoint = {
  channel: DeliveryChannel;
  successRate: number;
  volume: number;
};

export type EscalationRule = {
  name: string;
  severity: NotificationPriority;
  timeoutMinutes: number;
  fallbackOwner: string;
  status: 'Active' | 'Paused';
  triggeredToday: number;
};

export type SlaMetricsPoint = {
  day: string;
  avgResponseMinutes: number;
  breaches: number;
  ackRate: number;
};

export type BulkActionPoint = {
  week: string;
  markRead: number;
  assigned: number;
  archived: number;
};

export type TopicSubscription = {
  topic: string;
  owner: string;
  subscribers: number;
  channels: DeliveryChannel[];
  muted: boolean;
};

export type DeliveryAuditPoint = {
  day: string;
  delivered: number;
  failed: number;
};

export type DeliveryAuditItem = {
  id: string;
  time: string;
  notification: string;
  channel: DeliveryChannel;
  status: 'Delivered' | 'Retrying' | 'Failed';
  retries: number;
  latencyMs: number;
  error?: string;
};

export const NOTIFICATION_VOLUME: NotificationVolumePoint[] = [
  { day: 'Mon', notifications: 126, incidents: 8 },
  { day: 'Tue', notifications: 138, incidents: 9 },
  { day: 'Wed', notifications: 149, incidents: 7 },
  { day: 'Thu', notifications: 162, incidents: 11 },
  { day: 'Fri', notifications: 173, incidents: 10 },
  { day: 'Sat', notifications: 132, incidents: 6 },
  { day: 'Sun', notifications: 124, incidents: 5 },
];

export const NOTIFICATION_FEED: NotificationFeedItem[] = [
  {
    id: 'n-1001',
    title: 'Billing webhook retries exceeded threshold',
    type: 'Alert',
    priority: 'P1',
    source: 'Billing API',
    assignee: 'Platform On-call',
    state: 'Unread',
    channel: 'Slack',
    createdAt: '07:21 UTC',
  },
  {
    id: 'n-1002',
    title: 'Security mention from SOC channel',
    type: 'Mention',
    priority: 'P2',
    source: 'Security Ops',
    assignee: 'Ava Johnson',
    state: 'Acknowledged',
    channel: 'In-app',
    createdAt: '07:09 UTC',
  },
  {
    id: 'n-1003',
    title: 'Change request #482 approved',
    type: 'Approval',
    priority: 'P3',
    source: 'Release Management',
    assignee: 'Noah Smith',
    state: 'Resolved',
    channel: 'Email',
    createdAt: '06:58 UTC',
  },
  {
    id: 'n-1004',
    title: 'Worker queue latency degraded in EU-West',
    type: 'Alert',
    priority: 'P2',
    source: 'Workflow Runtime',
    assignee: 'Operations Lead',
    state: 'Unread',
    channel: 'Slack',
    createdAt: '06:44 UTC',
  },
  {
    id: 'n-1005',
    title: 'Daily digest generation completed',
    type: 'System',
    priority: 'P3',
    source: 'Reporting Service',
    assignee: 'System',
    state: 'Resolved',
    channel: 'Email',
    createdAt: '06:31 UTC',
  },
];

export const PRIORITY_QUEUE: PriorityQueuePoint[] = [
  { priority: 'P1', count: 7 },
  { priority: 'P2', count: 18 },
  { priority: 'P3', count: 26 },
];

export const CHANNEL_HEALTH: ChannelHealthPoint[] = [
  { channel: 'In-app', successRate: 99.6, volume: 1820 },
  { channel: 'Email', successRate: 98.2, volume: 1394 },
  { channel: 'SMS', successRate: 95.4, volume: 286 },
  { channel: 'Slack', successRate: 97.7, volume: 644 },
  { channel: 'Webhook', successRate: 94.9, volume: 311 },
];

export const ESCALATION_RULES: EscalationRule[] = [
  {
    name: 'P1 incident unacked',
    severity: 'P1',
    timeoutMinutes: 5,
    fallbackOwner: 'Director of Engineering',
    status: 'Active',
    triggeredToday: 3,
  },
  {
    name: 'Security alerts no owner',
    severity: 'P1',
    timeoutMinutes: 10,
    fallbackOwner: 'Security Lead',
    status: 'Active',
    triggeredToday: 1,
  },
  {
    name: 'Billing alerts unresolved > 30m',
    severity: 'P2',
    timeoutMinutes: 30,
    fallbackOwner: 'Revenue Ops Lead',
    status: 'Paused',
    triggeredToday: 0,
  },
];

export const SLA_METRICS: SlaMetricsPoint[] = [
  { day: 'Mon', avgResponseMinutes: 7.2, breaches: 3, ackRate: 96.1 },
  { day: 'Tue', avgResponseMinutes: 8.1, breaches: 4, ackRate: 95.4 },
  { day: 'Wed', avgResponseMinutes: 6.8, breaches: 2, ackRate: 97.3 },
  { day: 'Thu', avgResponseMinutes: 9.4, breaches: 5, ackRate: 94.7 },
  { day: 'Fri', avgResponseMinutes: 8.6, breaches: 4, ackRate: 95.1 },
  { day: 'Sat', avgResponseMinutes: 6.3, breaches: 1, ackRate: 97.8 },
  { day: 'Sun', avgResponseMinutes: 6.0, breaches: 1, ackRate: 98.2 },
];

export const BULK_ACTION_ACTIVITY: BulkActionPoint[] = [
  { week: 'W1', markRead: 128, assigned: 36, archived: 24 },
  { week: 'W2', markRead: 142, assigned: 39, archived: 27 },
  { week: 'W3', markRead: 136, assigned: 31, archived: 29 },
  { week: 'W4', markRead: 159, assigned: 44, archived: 33 },
  { week: 'W5', markRead: 173, assigned: 47, archived: 35 },
  { week: 'W6', markRead: 166, assigned: 43, archived: 31 },
];

export const TOPIC_SUBSCRIPTIONS: TopicSubscription[] = [
  { topic: 'Security Incidents', owner: 'Security Team', subscribers: 29, channels: ['In-app', 'Slack', 'Email'], muted: false },
  { topic: 'Billing Alerts', owner: 'Revenue Ops', subscribers: 18, channels: ['In-app', 'Email'], muted: false },
  { topic: 'Product Incidents', owner: 'Platform Ops', subscribers: 24, channels: ['In-app', 'Slack'], muted: false },
  { topic: 'Maintenance Windows', owner: 'SRE', subscribers: 42, channels: ['Email'], muted: true },
];

export const DELIVERY_AUDIT_TREND: DeliveryAuditPoint[] = [
  { day: 'Mon', delivered: 1148, failed: 22 },
  { day: 'Tue', delivered: 1234, failed: 25 },
  { day: 'Wed', delivered: 1279, failed: 18 },
  { day: 'Thu', delivered: 1366, failed: 31 },
  { day: 'Fri', delivered: 1428, failed: 27 },
  { day: 'Sat', delivered: 1184, failed: 14 },
  { day: 'Sun', delivered: 1126, failed: 13 },
];

export const DELIVERY_AUDIT_LOG: DeliveryAuditItem[] = [
  {
    id: 'd-1001',
    time: '07:24',
    notification: 'Billing webhook retries exceeded threshold',
    channel: 'Slack',
    status: 'Delivered',
    retries: 0,
    latencyMs: 382,
  },
  {
    id: 'd-1002',
    time: '07:19',
    notification: 'Security mention from SOC channel',
    channel: 'Email',
    status: 'Retrying',
    retries: 1,
    latencyMs: 941,
  },
  {
    id: 'd-1003',
    time: '07:03',
    notification: 'Worker queue latency degraded in EU-West',
    channel: 'Webhook',
    status: 'Failed',
    retries: 3,
    latencyMs: 0,
    error: '503 from destination endpoint',
  },
  {
    id: 'd-1004',
    time: '06:47',
    notification: 'Daily digest generation completed',
    channel: 'Email',
    status: 'Delivered',
    retries: 0,
    latencyMs: 426,
  },
];
