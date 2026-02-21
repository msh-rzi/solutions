export type UserRole = 'Admin' | 'Manager' | 'Analyst' | 'Viewer';
export type UserStatus = 'Active' | 'Invited' | 'Suspended';

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  team: string;
  lastActive: string;
  mfaEnabled: boolean;
};

export type RoleDistributionPoint = {
  role: UserRole;
  count: number;
  fill: string;
};

export type BulkActivityPoint = {
  week: string;
  invites: number;
  deactivations: number;
  roleChanges: number;
};

export type PendingInvitation = {
  email: string;
  role: UserRole;
  team: string;
  invitedBy: string;
  sentAt: string;
  expiresIn: string;
};

export type AccessException = {
  user: string;
  resource: string;
  reason: string;
  startAt: string;
  endAt: string;
  approver: string;
  status: 'Pending' | 'Approved' | 'Expiring';
};

export type AuditTrendPoint = {
  day: string;
  logins: number;
  roleChanges: number;
  statusUpdates: number;
};

export type AuditEvent = {
  time: string;
  actor: string;
  action: string;
  target: string;
  detail: string;
  severity: 'Info' | 'Warning' | 'Critical';
};

export const USERS: UserRecord[] = [
  {
    id: 'u-1001',
    name: 'Ava Johnson',
    email: 'ava@acme.com',
    role: 'Admin',
    status: 'Active',
    team: 'Revenue Ops',
    lastActive: '2m ago',
    mfaEnabled: true,
  },
  {
    id: 'u-1002',
    name: 'Noah Smith',
    email: 'noah@acme.com',
    role: 'Manager',
    status: 'Active',
    team: 'Platform',
    lastActive: '12m ago',
    mfaEnabled: true,
  },
  {
    id: 'u-1003',
    name: 'Lena Park',
    email: 'lena@acme.com',
    role: 'Analyst',
    status: 'Active',
    team: 'Growth',
    lastActive: '28m ago',
    mfaEnabled: true,
  },
  {
    id: 'u-1004',
    name: 'Mia Turner',
    email: 'mia@acme.com',
    role: 'Viewer',
    status: 'Invited',
    team: 'Finance',
    lastActive: 'Never',
    mfaEnabled: false,
  },
  {
    id: 'u-1005',
    name: 'Ibrahim Khan',
    email: 'ibrahim@acme.com',
    role: 'Manager',
    status: 'Suspended',
    team: 'Operations',
    lastActive: '3d ago',
    mfaEnabled: false,
  },
  {
    id: 'u-1006',
    name: 'Emma Davis',
    email: 'emma@acme.com',
    role: 'Analyst',
    status: 'Active',
    team: 'Data',
    lastActive: '1h ago',
    mfaEnabled: true,
  },
];

export const ROLE_DISTRIBUTION: RoleDistributionPoint[] = [
  { role: 'Admin', count: 7, fill: '#2563eb' },
  { role: 'Manager', count: 14, fill: '#0ea5e9' },
  { role: 'Analyst', count: 24, fill: '#16a34a' },
  { role: 'Viewer', count: 31, fill: '#f59e0b' },
];

export const BULK_ACTIVITY: BulkActivityPoint[] = [
  { week: 'W1', invites: 12, deactivations: 2, roleChanges: 5 },
  { week: 'W2', invites: 16, deactivations: 3, roleChanges: 7 },
  { week: 'W3', invites: 9, deactivations: 5, roleChanges: 4 },
  { week: 'W4', invites: 18, deactivations: 2, roleChanges: 8 },
  { week: 'W5', invites: 14, deactivations: 1, roleChanges: 6 },
  { week: 'W6', invites: 20, deactivations: 4, roleChanges: 9 },
];

export const PENDING_INVITATIONS: PendingInvitation[] = [
  {
    email: 'samir@acme.com',
    role: 'Analyst',
    team: 'Data',
    invitedBy: 'Ava Johnson',
    sentAt: '2h ago',
    expiresIn: '5 days',
  },
  {
    email: 'nina@acme.com',
    role: 'Viewer',
    team: 'Finance',
    invitedBy: 'Noah Smith',
    sentAt: '5h ago',
    expiresIn: '4 days',
  },
  {
    email: 'omar@acme.com',
    role: 'Manager',
    team: 'Operations',
    invitedBy: 'Emma Davis',
    sentAt: '1d ago',
    expiresIn: '3 days',
  },
];

export const ACCESS_EXCEPTIONS: AccessException[] = [
  {
    user: 'Lena Park',
    resource: 'Billing exports',
    reason: 'Quarter-end reconciliation',
    startAt: 'Today 09:00',
    endAt: 'Today 18:00',
    approver: 'CFO',
    status: 'Approved',
  },
  {
    user: 'Mia Turner',
    resource: 'Prod analytics schema',
    reason: 'Incident RCA support',
    startAt: 'Today 11:00',
    endAt: 'Tomorrow 11:00',
    approver: 'CTO',
    status: 'Pending',
  },
  {
    user: 'Ibrahim Khan',
    resource: 'Admin settings',
    reason: 'Temporary org migration',
    startAt: 'Yesterday 13:00',
    endAt: 'Today 14:00',
    approver: 'Security Lead',
    status: 'Expiring',
  },
];

export const AUDIT_TREND: AuditTrendPoint[] = [
  { day: 'Mon', logins: 134, roleChanges: 4, statusUpdates: 3 },
  { day: 'Tue', logins: 142, roleChanges: 6, statusUpdates: 2 },
  { day: 'Wed', logins: 151, roleChanges: 5, statusUpdates: 4 },
  { day: 'Thu', logins: 148, roleChanges: 3, statusUpdates: 2 },
  { day: 'Fri', logins: 157, roleChanges: 8, statusUpdates: 5 },
  { day: 'Sat', logins: 121, roleChanges: 2, statusUpdates: 1 },
  { day: 'Sun', logins: 116, roleChanges: 1, statusUpdates: 1 },
];

export const AUDIT_EVENTS: AuditEvent[] = [
  {
    time: '07:14',
    actor: 'Ava Johnson',
    action: 'Role updated',
    target: 'Omar Hassan',
    detail: 'Viewer -> Manager',
    severity: 'Warning',
  },
  {
    time: '06:58',
    actor: 'Noah Smith',
    action: 'User suspended',
    target: 'Ibrahim Khan',
    detail: 'Policy violation review pending',
    severity: 'Critical',
  },
  {
    time: '06:21',
    actor: 'System',
    action: 'MFA enrollment reminder',
    target: '8 users',
    detail: 'Weekly security reminder sent',
    severity: 'Info',
  },
  {
    time: '05:44',
    actor: 'Emma Davis',
    action: 'Invitation resent',
    target: 'nina@acme.com',
    detail: 'Invite token refreshed',
    severity: 'Info',
  },
];
