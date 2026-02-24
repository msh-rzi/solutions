type ActiveTenantContextCardProps = {
  organizationName?: string | null;
  userName?: string | null;
  userEmail?: string | null;
};

export function ActiveTenantContextCard({
  organizationName,
  userName,
  userEmail,
}: ActiveTenantContextCardProps) {
  return (
    <div className="mt-6 rounded-lg border p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Active Tenant Context</p>
      <p className="mt-2 text-sm font-medium">{organizationName ?? '-'}</p>
      <p className="text-xs text-muted-foreground">
        User: {userName ?? '-'} ({userEmail ?? '-'})
      </p>
    </div>
  );
}

