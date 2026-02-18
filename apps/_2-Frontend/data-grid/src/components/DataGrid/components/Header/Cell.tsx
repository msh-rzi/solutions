import type { Header } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { cn } from '@repo/ui-shadcn';

type DataGridHeaderProps<TData> = {
  header: Header<TData, unknown>;
};

const DataGridHeaderCell = <TData,>({ header }: DataGridHeaderProps<TData>) => {
  const canSort = header.column.getCanSort();
  const sortedState = header.column.getIsSorted();
  const title = canSort ? (sortedState === 'asc' ? 'Sort descending' : 'Sort ascending') : undefined;

  return (
    <div
      className={cn('datagrid-header-cell', canSort && 'sortable')}
      style={{
        minWidth: header.getSize(),
        width: header.getSize(),
      }}
    >
      {header.isPlaceholder ? null : canSort ? (
        <button type="button" className="datagrid-header-sort-button" onClick={header.column.getToggleSortingHandler()} title={title}>
          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
          {sortedState === 'asc' ? <CaretUpIcon size={14} weight="bold" /> : null}
          {sortedState === 'desc' ? <CaretDownIcon size={14} weight="bold" /> : null}
        </button>
      ) : (
        flexRender(header.column.columnDef.header, header.getContext())
      )}
    </div>
  );
};

export default DataGridHeaderCell;
