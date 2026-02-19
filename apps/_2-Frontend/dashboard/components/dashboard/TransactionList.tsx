'use client';

import * as React from 'react';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, cn } from '@repo/ui-shadcn';
import TransactionFeed, { type Transaction, type TransactionStatus, type TransactionType } from './ui/Transaction';
import type { DashboardDensity, DashboardLayoutPreset } from './useDashboardPreferences';

interface DashboardTransactionsProps {
  transactions: readonly Transaction[];
  density: DashboardDensity;
  layout: DashboardLayoutPreset;
  loading?: boolean;
  className?: string;
}

type StatusFilter = 'all' | TransactionStatus;
type TypeFilter = 'all' | TransactionType;
type SortMode = 'newest' | 'oldest' | 'amount-desc' | 'amount-asc';

const DashboardTransactions = ({ transactions, density, layout, loading = false, className }: DashboardTransactionsProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>('all');
  const [sortMode, setSortMode] = React.useState<SortMode>('newest');

  const deferredSearchQuery = React.useDeferredValue(searchQuery);
  const normalizedQuery = deferredSearchQuery.trim().toLowerCase();

  const filteredTransactions = React.useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      if (statusFilter !== 'all' && transaction.status !== statusFilter) {
        return false;
      }

      if (typeFilter !== 'all' && transaction.type !== typeFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${transaction.title} ${transaction.category ?? ''} ${transaction.description ?? ''}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    const sorted = [...filtered];
    sorted.sort((left, right) => {
      if (sortMode === 'amount-asc') {
        return left.amount - right.amount;
      }

      if (sortMode === 'amount-desc') {
        return right.amount - left.amount;
      }

      const leftDate = new Date(left.date).getTime();
      const rightDate = new Date(right.date).getTime();
      return sortMode === 'oldest' ? leftDate - rightDate : rightDate - leftDate;
    });

    return sorted;
  }, [normalizedQuery, sortMode, statusFilter, transactions, typeFilter]);

  const showLoadingState = loading || deferredSearchQuery !== searchQuery;
  const transactionCountLabel = `${filteredTransactions.length.toLocaleString()} items`;

  return (
    <div className={cn('dashboard-panel flex flex-col gap-3', className)}>
      <div className={cn('grid gap-2', density === 'compact' ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4')}>
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search transactions"
          className={cn('md:col-span-2', density === 'compact' && 'md:col-span-1')}
        />

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All type</SelectItem>
            <SelectItem value="credit">Credit</SelectItem>
            <SelectItem value="debit">Debit</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortMode} onValueChange={(value) => setSortMode(value as SortMode)}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="amount-desc">Amount high to low</SelectItem>
            <SelectItem value="amount-asc">Amount low to high</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TransactionFeed
        transactions={filteredTransactions}
        title="Recent transactions"
        description={`${transactionCountLabel} filtered for ${layout} layout`}
        loading={showLoadingState}
        scrollHeight={density === 'compact' ? 412 : 480}
        virtualized
      />
    </div>
  );
};

export default React.memo(DashboardTransactions);
