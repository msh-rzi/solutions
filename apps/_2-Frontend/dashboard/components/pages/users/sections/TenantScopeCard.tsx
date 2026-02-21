type TenantScopeCardProps = {
  organizationName?: string | null;
};

export function TenantScopeCard({ organizationName }: TenantScopeCardProps) {
  return (
    <div className="mt-4 rounded-lg border p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Tenant Scope</p>
      <p className="mt-2 text-sm font-medium">{organizationName ?? '-'}</p>
      <p className="text-xs text-muted-foreground">
        Implement tenant-scoped user queries, RBAC, and audit boundaries here.
      </p>
    </div>
  );
}

