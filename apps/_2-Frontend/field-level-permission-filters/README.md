# Field-Level Permission Filters

Next.js app that demonstrates schema-driven field-level RBAC with both client rendering controls and server-side submission filtering.

## Problem Addressed in This Codebase

UI-only field hiding is not enough for authorization. Submitted payloads can still include blocked fields unless the server filters them.

## What Exists in the Code

- Typed form schema in `lib/form-schema/schemas.ts`:
  - field definitions, validation, sanitizers, transforms
  - role/context visibility rules
  - role/context permission rules
- Permission resolution in `lib/form-schema/resolver.ts`:
  - resolves `editable`, `readonly`, `hidden`
  - resolves visibility and required state per request context
  - supports role, context, attribute, and custom rule types
- Server-side filtering in `lib/form-schema/filter.ts`:
  - rejects unknown/hidden fields
  - rejects writes to readonly fields
  - runs sanitizer and transformer pipeline
  - validates with field-level Zod schema
  - returns `allowedData`, `rejectedFields`, and `validationErrors`
- Server action entrypoint in `app/actions/form-actions.ts`:
  - runs filter against submission
  - returns structured result for UI feedback
  - currently includes simulated latency
- UI behavior:
  - role switcher for `employee`, `manager`, `admin`
  - resolved fields rendered via TanStack Form
  - server validation errors mapped back into field meta
  - toast notifications for save result and blocked fields
- Preloaded demo form data is returned by `getFormData` server action.

## Potential Improvements

- Replace mock data and simulated latency with real persistence.
- Derive role/user context from authenticated server session instead of demo state.
- Add audit logging for rejected field write attempts.
- Add automated tests for resolver/filter logic and server actions.
- Add CSRF protection strategy for state-changing submissions.

## Tech Stack

- Next.js
- React
- TypeScript
- TanStack Form
- Zod
- Mantine UI
- Bun

## Run Locally

1. From repo root: `bun install`
2. Create `apps/_2-Frontend/field-level-permission-filters/.env` from `apps/_2-Frontend/field-level-permission-filters/.env.example` and configure:
   - `PORT_FIELD_LEVEL_PERMISSION_FILTERS`
3. Start app:
   - `bun run --filter=field-level-permission-filters dev`
