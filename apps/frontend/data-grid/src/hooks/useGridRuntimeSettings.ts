import { useShallow } from 'zustand/react/shallow';
import { useDataGridStore } from '../store/useDataGridStore';

const useGridRuntimeSettings = () =>
  useDataGridStore(
    useShallow((state) => ({
      rowCount: state.rowCount,
      columnCount: state.columnCount,
      pageSize: state.pageSize,
      sortable: state.sortable,
      filterable: state.filterable,
      virtualization: state.virtualization,
      searchQuery: state.searchQuery,
      setLoading: state.setLoading,
    })),
  );

export default useGridRuntimeSettings;
