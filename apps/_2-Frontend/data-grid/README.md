# High-Volume Data Grid

## Project

This project is a React + Vite data-grid playground for large datasets (up to 100,000 rows) with configurable runtime behavior.

## Problem

Large tables can become slow and hard to use when sorting, filtering, and expanding rows, especially when rendering everything at once.

## How I Solved It

- Built a reusable `DataGrid` on top of TanStack Table.
- Added two runtime modes:
  - paginated mode
  - virtualized mode (TanStack Virtual)
- Implemented progressive virtual loading when the user nears the end of the scroll area.
- Added feature toggles for sorting, filtering, and virtualization.
- Added debounced global search to avoid expensive filtering on every keypress.
- Added master-detail row expansion with nested grid rendering.
- Centralized grid state in Zustand (row count, column count, page size, feature flags, search query).
- Added smooth loading state timing to reduce UI flicker during transitions.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Table
- TanStack Virtual
- Zustand

## Run Locally

1. Install dependencies from the repo root:
   - `bun install`
2. Start app:
   - `bun run --filter=data-grid dev`
