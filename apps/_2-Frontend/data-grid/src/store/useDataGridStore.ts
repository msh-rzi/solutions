import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const DATA_GRID_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export type DataGridPageSize = (typeof DATA_GRID_PAGE_SIZE_OPTIONS)[number];
export const DATA_GRID_MAX_ROW_COUNT = 100_000;
export const DATA_GRID_MAX_COLUMN_COUNT = 22;

export const DATA_GRID_SIZE_OPTIONS = [
  { rowCount: 1_000, columnCount: 5, label: '1,000 rows / 5 columns' },
  { rowCount: 5_000, columnCount: 8, label: '5,000 rows / 8 columns' },
  { rowCount: 20_000, columnCount: 10, label: '20,000 rows / 10 columns' },
  { rowCount: 50_000, columnCount: 16, label: '50,000 rows / 16 columns' },
  { rowCount: 75_000, columnCount: 20, label: '75,000 rows / 20 columns' },
  { rowCount: 100_000, columnCount: 22, label: '100,000 rows / 22 columns' },
] as const;

export const DATA_GRID_FEATURES = [
  { id: 'virtualization', label: 'Virtualization' },
  { id: 'sortable', label: 'Sortable' },
  { id: 'filterable', label: 'Filterable' },
] as const;

export type DataGridFeatureId = (typeof DATA_GRID_FEATURES)[number]['id'];

const DEFAULT_STATE = {
  loading: false,
  searchQuery: '',
  rowCount: 20000,
  columnCount: 10,
  pageSize: 25 as DataGridPageSize,
  virtualization: false,
  sortable: false,
  filterable: false,
} as const;

type DataGridStoreState = {
  loading: boolean;
  searchQuery: string;
  rowCount: number;
  columnCount: number;
  pageSize: DataGridPageSize;
  virtualization: boolean;
  sortable: boolean;
  filterable: boolean;
};

type DataGridStoreActions = {
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setRowCount: (rowCount: number) => void;
  setColumnCount: (columnCount: number) => void;
  setGridSize: (gridSize: { rowCount: number; columnCount: number }) => void;
  setPageSize: (pageSize: number) => void;
  setFeatureEnabled: (featureId: DataGridFeatureId, enabled: boolean) => void;
  toggleFeature: (featureId: DataGridFeatureId) => void;
  resetSidebarSettings: () => void;
};

export type DataGridStore = DataGridStoreState & DataGridStoreActions;

const normalizeCount = (value: number, fallback: number, max: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(1, Math.floor(value)));
};

const normalizePageSize = (value: number, fallback: DataGridPageSize): DataGridPageSize => {
  if (DATA_GRID_PAGE_SIZE_OPTIONS.includes(value as DataGridPageSize)) {
    return value as DataGridPageSize;
  }

  return fallback;
};

const FEATURE_KEY_BY_ID = {
  virtualization: 'virtualization',
  sortable: 'sortable',
  filterable: 'filterable',
} as const satisfies Record<DataGridFeatureId, keyof DataGridStoreState>;

export const useDataGridStore = create<DataGridStore>()(
  subscribeWithSelector((set) => ({
    ...DEFAULT_STATE,
    setLoading: (loading) =>
      set((state) => {
        if (state.loading === loading) return state;
        return { loading };
      }),
    setSearchQuery: (query) =>
      set((state) => {
        const nextQuery = query.trimStart();
        if (state.searchQuery === nextQuery) return state;
        return { searchQuery: nextQuery };
      }),
    setRowCount: (rowCount) =>
      set((state) => {
        const nextRowCount = normalizeCount(rowCount, state.rowCount, DATA_GRID_MAX_ROW_COUNT);
        if (nextRowCount === state.rowCount) return state;
        return { rowCount: nextRowCount };
      }),
    setColumnCount: (columnCount) =>
      set((state) => {
        const nextColumnCount = normalizeCount(columnCount, state.columnCount, DATA_GRID_MAX_COLUMN_COUNT);
        if (nextColumnCount === state.columnCount) return state;
        return { columnCount: nextColumnCount };
      }),
    setGridSize: ({ rowCount, columnCount }) =>
      set((state) => {
        const nextRowCount = normalizeCount(rowCount, state.rowCount, DATA_GRID_MAX_ROW_COUNT);
        const nextColumnCount = normalizeCount(columnCount, state.columnCount, DATA_GRID_MAX_COLUMN_COUNT);

        if (nextRowCount === state.rowCount && nextColumnCount === state.columnCount) return state;

        return {
          rowCount: nextRowCount,
          columnCount: nextColumnCount,
        };
      }),
    setPageSize: (pageSize) =>
      set((state) => {
        if (state.virtualization) return state;

        const nextPageSize = normalizePageSize(pageSize, state.pageSize);
        if (nextPageSize === state.pageSize) return state;
        return { pageSize: nextPageSize };
      }),
    setFeatureEnabled: (featureId, enabled) =>
      set((state) => {
        const featureStateKey = FEATURE_KEY_BY_ID[featureId];
        if (state[featureStateKey] === enabled) return state;
        return { [featureStateKey]: enabled };
      }),
    toggleFeature: (featureId) =>
      set((state) => {
        const featureStateKey = FEATURE_KEY_BY_ID[featureId];
        return { [featureStateKey]: !state[featureStateKey] };
      }),
    resetSidebarSettings: () =>
      set((state) => {
        if (
          state.rowCount === DEFAULT_STATE.rowCount &&
          state.columnCount === DEFAULT_STATE.columnCount &&
          state.pageSize === DEFAULT_STATE.pageSize &&
          state.virtualization === DEFAULT_STATE.virtualization &&
          state.sortable === DEFAULT_STATE.sortable &&
          state.filterable === DEFAULT_STATE.filterable
        ) {
          return state;
        }

        return {
          rowCount: DEFAULT_STATE.rowCount,
          columnCount: DEFAULT_STATE.columnCount,
          pageSize: DEFAULT_STATE.pageSize,
          virtualization: DEFAULT_STATE.virtualization,
          sortable: DEFAULT_STATE.sortable,
          filterable: DEFAULT_STATE.filterable,
        };
      }),
  })),
);
