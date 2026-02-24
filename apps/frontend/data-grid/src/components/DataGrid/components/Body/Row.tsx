import type { Row } from '@tanstack/react-table';
import DataGridCell from './Cell';
import type { DataGridMeta, DataGridTableReference } from '../../types/shared.type';
import { Activity } from 'react';
import { cn } from '@repo/ui-shadcn';

type DataGridRowProps<TData> = {
  row: Row<TData>;
} & DataGridTableReference<TData>;

const DataGridRow = <TData,>({ tableReference: table, row }: DataGridRowProps<TData>) => {
  const meta = table.options.meta as DataGridMeta<TData>;
  const rowStyle = meta?.getRowStyle?.(row) || '';
  const setMasterDetailRenderer = meta?.setMasterDetailRenderer;

  return (
    <div className="datagrid-row-wrapper">
      <div className={cn('datagrid-row', rowStyle, row.getIsExpanded() ? 'has-detail' : '')}>
        {row.getVisibleCells().map((cell) => {
          const chip =
            meta?.getRowChip?.({
              columnId: cell.column.id,
              row,
              value: cell.getValue(),
            }) ?? null;

          return <DataGridCell<TData> key={cell.id} cell={cell} chip={chip} />;
        })}
      </div>
      <Activity mode={row.getIsExpanded() ? 'visible' : 'hidden'}>
        <div className="datagrid-row-detail">{setMasterDetailRenderer?.({ row })}</div>
      </Activity>
    </div>
  );
};

export default DataGridRow;
