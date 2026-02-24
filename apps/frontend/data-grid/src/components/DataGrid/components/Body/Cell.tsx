import type { Cell } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { DataGridRowChip } from '../../types/shared.type';
import { cn } from '@repo/ui-shadcn';

type DataGridCellProps<TData> = {
  cell: Cell<TData, unknown>;
  chip?: DataGridRowChip | null;
};

const DataGridCell = <TData,>({ cell, chip }: DataGridCellProps<TData>) => {
  return (
    <div
      className="datagrid-cell"
      style={{
        minWidth: cell.column.getSize(),
        width: cell.column.getSize(),
      }}
    >
      {chip && <div className={cn('datagrid-cell-chip', chip.className)}>{chip.label}</div>}
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </div>
  );
};

export default DataGridCell;
