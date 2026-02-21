type ScopeCardProps = {
  organizationName?: string | null;
};

export function ScopeCard({ organizationName }: ScopeCardProps) {
  return (
    <div className="mt-4 rounded-lg border p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Scope</p>
      <p className="mt-2 text-sm font-medium">{organizationName ?? '-'}</p>
      <p className="text-xs text-muted-foreground">
        Implement organization-scoped analytics queries and access control here.
      </p>
    </div>
  );
}

