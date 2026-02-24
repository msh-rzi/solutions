import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { DataGridMeta } from '../types/shared.type';

type UseDataGridTableParams<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  meta?: DataGridMeta<TData>;
  pageSize: number;
  sortable: boolean;
  filterable: boolean;
  virtualization: boolean;
  globalFilter: string;
};

const useDataGridTable = <TData,>({
  data,
  columns,
  meta,
  pageSize,
  sortable,
  filterable,
  virtualization,
  globalFilter,
}: UseDataGridTableParams<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>(() => ({ pageIndex: 0, pageSize }));
  const deferredGlobalFilter = useDeferredValue(globalFilter);

  useEffect(() => {
    setPagination((previousPagination) => {
      if (previousPagination.pageSize === pageSize) return previousPagination;
      return { pageIndex: 0, pageSize };
    });
  }, [pageSize]);

  useEffect(() => {
    if (!sortable && sorting.length > 0) {
      setSorting([]);
    }
  }, [sortable, sorting.length]);

  const sortedRowModel = useMemo(() => getSortedRowModel<TData>(), []);
  const filteredRowModel = useMemo(() => getFilteredRowModel<TData>(), []);

  return useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter: filterable ? deferredGlobalFilter : '',
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableSorting: sortable,
    enableMultiSort: false,
    enableGlobalFilter: filterable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? sortedRowModel : undefined,
    getFilteredRowModel: filterable ? filteredRowModel : undefined,
    getPaginationRowModel: virtualization ? undefined : getPaginationRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: 'includesString',
    meta,
  });
};

export default useDataGridTable;
