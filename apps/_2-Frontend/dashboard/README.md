# Multi-Tenant Dashboard

## Project

This project is a Next.js dashboard prototype for enterprise operations across analytics, users, and notifications workflows.

## Problem

Enterprise dashboards usually need multi-tenant context, protected routes, and configurable workspaces. Generic UI demos often skip these concerns.

## How I Solved It

- Built a memory-backed auth flow using `better-auth` with signed session tokens in HTTP-only cookies.
- Implemented route protection using `proxy.ts`:
  - unauthenticated users are redirected to `/login`
  - authenticated users are redirected away from `/login`
- Added tenant/org switching in the sidebar with secure server-side token re-issue.
- Implemented dedicated pages for:
  - Dashboard
  - Analytics
  - Users
  - Notifications
- Added a settings system with local persistence for layout and dashboard preferences.
- Organized the UI into reusable section components and chart-driven cards for realistic enterprise screens.

## Demo Accounts

- `ava@acme.com` / `acme1234`
- `noah@globex.com` / `globex1234`

## Tech Stack

- Next.js
- React
- TypeScript
- better-auth
- Tailwind CSS
- shadcn/ui

## Run Locally

1. Install dependencies from the repo root:
   - `bun install`
2. Set root `.env`:
   - `PORT_DASHBOARD`
   - optional: `AUTH_SECRET`
3. Start app:
   - `bun run --filter=dashboard dev`
