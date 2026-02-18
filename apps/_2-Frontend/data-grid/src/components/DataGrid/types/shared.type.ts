import type { Row, Table } from '@tanstack/react-table';
import type { HTMLAttributes, ReactNode } from 'react';

export type DataGridTableReference<TData> = {
  tableReference: Table<TData>;
};

export type DataGridRowChip = {
  label: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
};

export type GetRowParams<TData> = { columnId: string; row: Row<TData>; value: unknown };

export type DataGridMeta<TData> = {
  getRowStyle?: (row: Row<TData>) => string;
  getRowChip?: (data: GetRowParams<TData>) => DataGridRowChip | null;

  setMasterDetailRenderer?: (data: { row: Row<TData> }) => ReactNode;
};
