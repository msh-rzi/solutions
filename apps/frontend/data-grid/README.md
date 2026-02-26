# High-Volume Data Grid

React + Vite data-grid playground with configurable scale, virtualization, filtering, sorting, and master-detail rows.

## Problem Addressed in This Codebase

Large table rendering becomes expensive without viewport-based rendering and state controls.

## What Exists in the Code

- Reusable `DataGrid` component built with TanStack Table.
- Two runtime modes:
  - paginated mode (`getPaginationRowModel`)
  - virtualized mode (`@tanstack/react-virtual`)
- Progressive virtual loading in `useVirtualRowsController.ts`:
  - initial virtual load: 1200 rows
  - load increment: 2000 rows
- Scroll end detection in `useVirtualEndReach.ts` with 220px threshold.
- Configurable dataset limits in Zustand store:
  - max rows: 100,000
  - max columns: 22
  - predefined size presets
- Feature toggles in store:
  - virtualization
  - sortable
  - filterable
- Debounced search input:
  - `useDebouncedValue` hook
  - 180ms apply delay in `SearchField.tsx`
- Smooth loading visibility control in `useSmoothLoading.ts`:
  - show delay and minimum visible duration
- Master-detail expansion:
  - expandable rows enabled in table
  - nested `MasterDetailGrid` renderer in row detail panel
- Data generation is local in `useDataGridData.tsx` (no backend fetch in current app).

## Potential Improvements

- Add server-backed data source with server-side pagination/filtering/sorting.
- Add automated performance benchmarks and UI tests.
- Add keyboard-navigation and screen-reader audits for accessibility.
- Add telemetry for interaction timing and render cost.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Table
- TanStack Virtual
- Zustand
- Tailwind CSS
- Bun

## Run Locally

1. From repo root: `bun install`
2. Optional: create `apps/frontend/data-grid/.env` from `apps/frontend/data-grid/.env.example` to override host/port.
3. Start app:
   - `bun run --filter=data-grid dev`
