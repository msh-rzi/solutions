import type { HeaderGroup } from '@tanstack/react-table';
import DataGridHeaderCell from './Cell';

type DataGridHeaderRowProps<TData> = {
  headerGroup: HeaderGroup<TData>;
};

const DataGridHeaderRow = <TData,>({ headerGroup }: DataGridHeaderRowProps<TData>) => {
  return (
    <div key={headerGroup.id} className="datagrid-header-row">
      {headerGroup.headers.map((header) => (
        <DataGridHeaderCell key={header.id} header={header} />
      ))}
    </div>
  );
};

export default DataGridHeaderRow;
