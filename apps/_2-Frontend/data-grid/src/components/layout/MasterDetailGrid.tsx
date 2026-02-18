import DataGrid from '../DataGrid';
import useDataGridData from '../../hooks/useDataGridData';

type MasterDetailGridProps = {
  modeKey: 'virtualized' | 'paginated';
  pageSize: number;
  sortable: boolean;
  filterable: boolean;
  virtualization: boolean;
  searchQuery: string;
};

const MasterDetailGrid = ({ modeKey, pageSize, sortable, filterable, virtualization, searchQuery }: MasterDetailGridProps) => {
  const { columns, data } = useDataGridData(8, 50);

  return (
    <DataGrid
      key={`master-detail-${modeKey}`}
      columns={columns}
      data={data}
      pageSize={pageSize}
      sortable={sortable}
      filterable={filterable}
      virtualization={virtualization}
      globalFilter={searchQuery}
      meta={{
        setMasterDetailRenderer(gridData) {
          return <div className="p-4 bg-gray-50">Master Detail Renderer for {gridData.row.id}</div>;
        },
      }}
    />
  );
};

export default MasterDetailGrid;

