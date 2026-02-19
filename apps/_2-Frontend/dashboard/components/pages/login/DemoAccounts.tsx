import { DEMO_ACCOUNTS } from '../../../lib/auth-client';

interface DemoAccountsProps {
  disabled: boolean;
  onSelect: (email: string, password: string) => void;
}

export function DemoAccounts({ disabled, onSelect }: DemoAccountsProps) {
  return (
    <div className="rounded-md border bg-muted/30 p-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Demo Users
      </p>
      <div className="space-y-2">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.id}
            type="button"
            className="w-full rounded-md border bg-background px-3 py-2 text-left text-xs transition-colors hover:bg-muted"
            onClick={() => onSelect(account.email, account.password)}
            disabled={disabled}
          >
            <span className="block font-medium">
              {account.name} ({account.tenant.name})
            </span>
            <span className="text-muted-foreground">{account.email}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
