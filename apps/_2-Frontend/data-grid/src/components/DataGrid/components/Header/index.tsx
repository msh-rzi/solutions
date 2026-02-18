import type { DataGridTableReference } from '../../types/shared.type';
import DataGridHeaderRow from './Row';

type DataGridColumnsProps<TData> = DataGridTableReference<TData>;

const DataGridHeader = <TData,>({ tableReference: table }: DataGridColumnsProps<TData>) => {
  return (
    <div className="datagrid-header-group">
      {table.getHeaderGroups().map((headerGroup) => (
        <DataGridHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
      ))}
    </div>
  );
};

export default DataGridHeader;
