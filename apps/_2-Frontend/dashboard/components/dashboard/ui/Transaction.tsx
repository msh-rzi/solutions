'use client';

import * as React from 'react';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, type LucideIcon } from 'lucide-react';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from '@repo/ui-shadcn';

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
  transactions: readonly Transaction[];
  title?: string;
  description?: string;
  scrollHeight?: number;
  formatAmount?: (amount: number, currency: string) => string;
  onTransactionClick?: (transaction: Transaction) => void;
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  virtualized?: boolean;
  rowHeight?: number;
  overscan?: number;
}

const amountFormatterCache = new Map<string, Intl.NumberFormat>();
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const dateLabelCache = new Map<string, string>();

const typeConfig: Record<TransactionType, { icon: LucideIcon; iconClass: string; bgClass: string }> = {
  credit: {
    icon: ArrowDownLeft,
    iconClass: 'text-emerald-600',
    bgClass: 'bg-emerald-500/10',
  },
  debit: {
    icon: ArrowUpRight,
    iconClass: 'text-rose-600',
    bgClass: 'bg-rose-500/10',
  },
  transfer: {
    icon: RefreshCw,
    iconClass: 'text-blue-600',
    bgClass: 'bg-blue-500/10',
  },
};

const statusConfig: Record<TransactionStatus, { label: string; className: string }> = {
  completed: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  failed: {
    label: 'Failed',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

const getAmountFormatter = (currency: string) => {
  const cached = amountFormatterCache.get(currency);
  if (cached) {
    return cached;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  amountFormatterCache.set(currency, formatter);
  return formatter;
};

const defaultFormatAmount = (amount: number, currency: string) => getAmountFormatter(currency).format(Math.abs(amount));

const formatDate = (date: string | Date) => {
  const key = typeof date === 'string' ? date : date.toISOString();
  const cached = dateLabelCache.get(key);

  if (cached) {
    return cached;
  }

  const label = dateFormatter.format(new Date(date));
  dateLabelCache.set(key, label);
  return label;
};

const TransactionSkeleton = () => (
  <div className="space-y-0">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={`skeleton-${index}`} className="flex h-[72px] items-center gap-3 border-b px-4 py-3 animate-pulse">
        <div className="h-9 w-9 shrink-0 rounded-full bg-muted" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 w-36 rounded bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
        </div>
        <div className="space-y-1">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
        </div>
      </div>
    ))}
  </div>
);

interface TransactionRowProps {
  transaction: Transaction;
  formatAmount: (amount: number, currency: string) => string;
  onClick?: (transaction: Transaction) => void;
  isLast: boolean;
}

const TransactionRow = React.memo(function TransactionRow({ transaction, formatAmount, onClick, isLast }: TransactionRowProps) {
  const currency = transaction.currency ?? 'USD';
  const { icon: Icon, iconClass, bgClass } = typeConfig[transaction.type];
  const status = statusConfig[transaction.status];
  const isCredit = transaction.type === 'credit';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(transaction);
    }
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(transaction)}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex h-[72px] items-center gap-3 px-4 py-3 transition-colors',
        !isLast && 'border-b',
        onClick && 'cursor-pointer hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', bgClass)}>
        <Icon className={cn('h-4 w-4', iconClass)} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight">{transaction.title}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {formatDate(transaction.date)}
          {transaction.category && <span className="ml-1.5 text-muted-foreground/70">- {transaction.category}</span>}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={cn('text-sm font-semibold tabular-nums', isCredit ? 'text-emerald-600' : 'text-foreground')}>
          {isCredit ? '+' : '-'}
          {formatAmount(transaction.amount, currency)}
        </span>
        <Badge variant="outline" className={cn('px-1.5 py-0 text-[10px] font-medium', status.className)}>
          {status.label}
        </Badge>
      </div>
    </div>
  );
});

const TransactionList = ({
  transactions,
  title = 'Transactions',
  description,
  scrollHeight = 460,
  formatAmount = defaultFormatAmount,
  onTransactionClick,
  className,
  loading = false,
  emptyMessage = 'No transactions yet.',
  virtualized = true,
  rowHeight = 72,
  overscan = 6,
}: TransactionListProps) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const frameRef = React.useRef<number | null>(null);
  const shouldVirtualize = virtualized && transactions.length > 120;

  const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const nextScrollTop = event.currentTarget.scrollTop;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      setScrollTop(nextScrollTop);
      frameRef.current = null;
    });
  }, []);

  React.useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const virtualMetrics = React.useMemo(() => {
    if (!shouldVirtualize) {
      return {
        startIndex: 0,
        endIndex: transactions.length,
        offsetTop: 0,
        totalHeight: transactions.length * rowHeight,
      };
    }

    const visibleCount = Math.ceil(scrollHeight / rowHeight);
    const baseStart = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const baseEnd = Math.min(transactions.length, baseStart + visibleCount + overscan * 2);

    return {
      startIndex: baseStart,
      endIndex: baseEnd,
      offsetTop: baseStart * rowHeight,
      totalHeight: transactions.length * rowHeight,
    };
  }, [overscan, rowHeight, scrollHeight, scrollTop, shouldVirtualize, transactions.length]);

  const visibleTransactions = React.useMemo(
    () => transactions.slice(virtualMetrics.startIndex, virtualMetrics.endIndex),
    [transactions, virtualMetrics.endIndex, virtualMetrics.startIndex],
  );

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="px-0 pb-0">
        {loading ? (
          <TransactionSkeleton />
        ) : transactions.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <div style={{ height: scrollHeight }} className="overflow-y-auto" onScroll={handleScroll}>
            {shouldVirtualize ? (
              <div style={{ height: virtualMetrics.totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${virtualMetrics.offsetTop}px)` }}>
                  {visibleTransactions.map((transaction, index) => {
                    const absoluteIndex = virtualMetrics.startIndex + index;
                    return (
                      <TransactionRow
                        key={transaction.id}
                        transaction={transaction}
                        formatAmount={formatAmount}
                        onClick={onTransactionClick}
                        isLast={absoluteIndex === transactions.length - 1}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                {transactions.map((transaction, index) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    formatAmount={formatAmount}
                    onClick={onTransactionClick}
                    isLast={index === transactions.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(TransactionList);

