import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, ScrollArea, Separator, cn } from '@repo/ui-shadcn';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, LucideIcon } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TransactionType = 'credit' | 'debit' | 'transfer';

export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency?: string;
  type: TransactionType;
  status: TransactionStatus;
  date: string | Date;
  category?: string;
}

export interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
  description?: string;
  /** Max visible height before scroll kicks in */
  scrollHeight?: number;
  /** Custom currency formatter — defaults to Intl.NumberFormat */
  formatAmount?: (amount: number, currency: string) => string;
  /** Called when a row is clicked */
  onTransactionClick?: (transaction: Transaction) => void;
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const typeConfig: Record<TransactionType, { icon: LucideIcon; iconClass: string; bgClass: string }> = {
  credit: {
    icon: ArrowDownLeft,
    iconClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
  },
  debit: {
    icon: ArrowUpRight,
    iconClass: 'text-rose-600',
    bgClass: 'bg-rose-50',
  },
  transfer: {
    icon: RefreshCw,
    iconClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
  },
};

const statusConfig: Record<TransactionStatus, { label: string; class: string }> = {
  completed: {
    label: 'Completed',
    class: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  pending: {
    label: 'Pending',
    class: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  failed: {
    label: 'Failed',
    class: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const defaultFormatAmount = (amount: number, currency: string) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Math.abs(amount));

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const TransactionSkeleton = () => (
  <div className="space-y-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
        <div className="h-9 w-9 rounded-full bg-muted shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 w-32 rounded bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
        </div>
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
    ))}
  </div>
);

// ─── Row ──────────────────────────────────────────────────────────────────────

const TransactionRow = ({
  transaction,
  formatAmount,
  onClick,
}: {
  transaction: Transaction;
  formatAmount: (amount: number, currency: string) => string;
  onClick?: (t: Transaction) => void;
}) => {
  const currency = transaction.currency ?? 'USD';
  const { icon: Icon, iconClass, bgClass } = typeConfig[transaction.type];
  const status = statusConfig[transaction.status];
  const isCredit = transaction.type === 'credit';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(transaction)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(transaction)}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
        onClick && 'cursor-pointer hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      {/* Icon */}
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', bgClass)}>
        <Icon className={cn('h-4 w-4', iconClass)} />
      </div>

      {/* Title + date */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-foreground leading-tight">{transaction.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDate(transaction.date)}
          {transaction.category && <span className="ml-1.5 text-muted-foreground/70">· {transaction.category}</span>}
        </p>
      </div>

      {/* Amount + status */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={cn('text-sm font-semibold tabular-nums', isCredit ? 'text-emerald-600' : 'text-foreground')}>
          {isCredit ? '+' : '−'}
          {formatAmount(transaction.amount, currency)}
        </span>
        <Badge variant="outline" className={cn('py-0 px-1.5 text-[10px] font-medium', status.class)}>
          {status.label}
        </Badge>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TransactionList = ({
  transactions,
  title = 'Transactions',
  description,
  scrollHeight = 400,
  formatAmount = defaultFormatAmount,
  onTransactionClick,
  className,
  loading = false,
  emptyMessage = 'No transactions yet.',
}: TransactionListProps) => {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        {loading ? (
          <TransactionSkeleton />
        ) : transactions.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ScrollArea style={{ height: scrollHeight }}>
            <div className="py-2">
              {transactions.map((tx, idx) => (
                <React.Fragment key={tx.id}>
                  <TransactionRow transaction={tx} formatAmount={formatAmount} onClick={onTransactionClick} />
                  {idx < transactions.length - 1 && <Separator className="mx-4 w-auto" />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
