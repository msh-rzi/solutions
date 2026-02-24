import { useEffect } from 'react';
import useDataGridData from '../../hooks/useDataGridData';
import useSmoothLoading from '../../hooks/useSmoothLoading';
import useActiveGridSettings from '../../hooks/useActiveGridSettings';
import useGridRuntimeSettings from '../../hooks/useGridRuntimeSettings';
import useVirtualRowsController from '../../hooks/useVirtualRowsController';
import DataGrid from '../DataGrid';
import MasterDetailGrid from './MasterDetailGrid';

const Main = () => {
  const { rowCount, columnCount, pageSize, sortable, filterable, virtualization, searchQuery, setLoading } = useGridRuntimeSettings();
  const { activeGridSettings, isPending, startTransition } = useActiveGridSettings(rowCount, columnCount);
  const { effectiveRowsCount, hasMoreVirtualRows, loadMoreVirtualRows } = useVirtualRowsController({
    virtualization,
    targetRowsCount: activeGridSettings.rowCount,
    startTransition,
  });
  const smoothLoading = useSmoothLoading(isPending, {
    showDelayMs: 90,
    minVisibleMs: 260,
  });

  useEffect(() => {
    setLoading(smoothLoading);
  }, [smoothLoading, setLoading]);

  const gridModeKey = virtualization ? 'virtualized' : 'paginated';
  const { columns, data } = useDataGridData(activeGridSettings.columnCount, effectiveRowsCount);

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <DataGrid
        key={gridModeKey}
        columns={columns}
        data={data}
        pageSize={pageSize}
        sortable={sortable}
        filterable={filterable}
        virtualization={virtualization}
        globalFilter={searchQuery}
        loading={smoothLoading}
        canLoadMoreVirtualRows={hasMoreVirtualRows}
        onVirtualEndReached={loadMoreVirtualRows}
        isLoadingMoreVirtualRows={isPending}
        meta={{
          setMasterDetailRenderer() {
            return (
              <div className="p-4 bg-gray-50">
                <MasterDetailGrid
                  modeKey={gridModeKey}
                  pageSize={pageSize}
                  sortable={sortable}
                  filterable={filterable}
                  virtualization={virtualization}
                  searchQuery={searchQuery}
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default Main;
