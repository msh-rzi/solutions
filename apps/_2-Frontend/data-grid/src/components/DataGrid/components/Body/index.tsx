import { useEffect, type RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { DataGridTableReference } from '../../types/shared.type';
import DataGridRow from './Row';

type DataGridBodyProps<TData> = {
  virtualization?: boolean;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
} & DataGridTableReference<TData>;

const DataGridBody = <TData,>({
  tableReference: table,
  virtualization = false,
  scrollContainerRef,
}: DataGridBodyProps<TData>) => {
  const rows = table.getRowModel().rows;
  const expandedState = table.getState().expanded;
  const rowVirtualizer = useVirtualizer({
    count: virtualization ? rows.length : 0,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 44,
    overscan: 12,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (!virtualization) return;
    rowVirtualizer.measure();
  }, [virtualization, expandedState, rowVirtualizer]);

  if (virtualization) {
    return (
      <div className="datagrid-body datagrid-body-virtualized" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];
          if (!row) return null;

          return (
            <div
              key={row.id}
              ref={rowVirtualizer.measureElement}
              data-index={virtualRow.index}
              className="datagrid-virtual-row"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <DataGridRow row={row} tableReference={table} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="datagrid-body">
      {rows.map((row) => (
        <DataGridRow key={row.id} row={row} tableReference={table} />
      ))}
    </div>
  );
};

export default DataGridBody;
