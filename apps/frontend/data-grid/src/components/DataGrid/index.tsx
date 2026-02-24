'use client';

import { useRef } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { cn } from '@repo/ui-shadcn';
import DataGridHeader from './components/Header';
import DataGridBody from './components/Body';
import DataGridPagination from './components/Pagination';
import useDataGridTable from './hooks/useDataGridTable';
import useVirtualEndReach from './hooks/useVirtualEndReach';
import type { DataGridMeta } from './types/shared.type';

type DataGridProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  meta?: DataGridMeta<TData>;
  pageSize?: number;
  sortable?: boolean;
  filterable?: boolean;
  virtualization?: boolean;
  globalFilter?: string;
  loading?: boolean;
  canLoadMoreVirtualRows?: boolean;
  isLoadingMoreVirtualRows?: boolean;
  onVirtualEndReached?: () => void;
};

const DataGrid = <TData,>({
  columns,
  data,
  meta,
  pageSize = 25,
  sortable = false,
  filterable = false,
  virtualization = false,
  globalFilter = '',
  loading = false,
  canLoadMoreVirtualRows = false,
  isLoadingMoreVirtualRows = false,
  onVirtualEndReached,
}: DataGridProps<TData>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const table = useDataGridTable({
    data,
    columns,
    meta,
    pageSize,
    sortable,
    filterable,
    virtualization,
    globalFilter,
  });
  const handleVirtualScroll = useVirtualEndReach({
    virtualization,
    canLoadMoreVirtualRows,
    isLoadingMoreVirtualRows,
    onVirtualEndReached,
    dataLength: data.length,
    scrollContainerRef,
  });

  return (
    <div className={cn('datagrid-wrapper datagrid-theme-quartz ag-theme-quartz', loading && 'is-loading')}>
      <div ref={scrollContainerRef} className="datagrid-container" onScroll={virtualization ? handleVirtualScroll : undefined}>
        <DataGridHeader tableReference={table} />
        <DataGridBody tableReference={table} virtualization={virtualization} scrollContainerRef={scrollContainerRef} />
      </div>
      {!virtualization ? <DataGridPagination tableReference={table} /> : null}
      {loading ? <div className="datagrid-loading-overlay">Loading data...</div> : null}
    </div>
  );
};

export default DataGrid;
