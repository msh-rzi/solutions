import { useMemo } from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { Button } from '@repo/ui-shadcn';
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react';

export type DataGridRowData = {
  id: number;
};

type UseDataGridDataResult = {
  columns: ColumnDef<DataGridRowData>[];
  data: DataGridRowData[];
};

const columnHelper = createColumnHelper<DataGridRowData>();

const useDataGridData = (columnsCount: number, rowsCount: number): UseDataGridDataResult => {
  return useMemo(() => {
    const safeColumnsCount = Math.max(0, Math.floor(columnsCount));
    const safeRowsCount = Math.max(0, Math.floor(rowsCount));

    const columns: ColumnDef<DataGridRowData>[] = new Array(safeColumnsCount + 2);
    columns[0] =
      columnHelper.display({
        id: 'masterDetail',
        size: 70,
        header: '',
        enableSorting: false,
        enableGlobalFilter: false,
        cell: ({ row }) => {
          const isExpanded = row.getIsExpanded();

          return (
            <Button variant="ghost" size="icon" onClick={row.getToggleExpandedHandler()}>
              {isExpanded ? <CaretDownIcon size={18} weight="bold" /> : <CaretRightIcon size={18} weight="bold" />}
            </Button>
          );
        },
      });
    columns[1] = {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="m-auto">{row.getValue('id')}</div>,
    };

    for (let columnIndex = 0; columnIndex < safeColumnsCount; columnIndex += 1) {
      const columnNumber = columnIndex + 1;
      const columnId = `col_${columnNumber}`;

      columns[columnIndex + 2] = columnHelper.accessor((row) => `R${row.id}C${columnNumber}`, {
        id: columnId,
        header: `Column ${columnNumber}`,
      }) as ColumnDef<DataGridRowData, unknown>;
    }

    const data = new Array<DataGridRowData>(safeRowsCount);
    for (let rowIndex = 0; rowIndex < safeRowsCount; rowIndex += 1) {
      data[rowIndex] = { id: rowIndex + 1 };
    }

    return { columns, data };
  }, [columnsCount, rowsCount]);
};

export default useDataGridData;
