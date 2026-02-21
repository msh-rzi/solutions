# Field-Level Permission Filters

## Project

This project is a schema-driven form system that enforces field-level RBAC on both the UI and server side.

## Problem

Most form authorization implementations only hide fields in the frontend. That is not secure, because users can still submit blocked fields directly.

## How I Solved It

- Defined form structure, visibility, permissions, sanitization, transforms, and validation in one typed schema.
- Built a permission resolver that computes each field state by request context:
  - `editable`
  - `readonly`
  - `hidden`
- Implemented server-side input filtering that:
  - rejects unauthorized/readonly field writes
  - validates allowed fields with Zod
  - returns rejected fields and validation errors
- Used TanStack Form to render dynamic fields and map server validation back into field state.
- Added role switching (`employee`, `manager`, `admin`) to demonstrate live access resolution.
- Added user feedback with toast notifications for success, validation failures, and RBAC-blocked fields.

## Tech Stack

- Next.js
- React
- TypeScript
- TanStack Form
- Zod
- Mantine UI

## Run Locally

1. Install dependencies from the repo root:
   - `bun install`
2. Set root `.env`:
   - `PORT_FIELD_LEVEL_PERMISSION_FILTERS`
3. Start app:
   - `bun run --filter=field-level-permission-filters dev`
