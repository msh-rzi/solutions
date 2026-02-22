# Multi-Tenant Dashboard

Next.js dashboard prototype with tenant-aware demo sessions, protected routes, and organization switching.

## Problem Addressed in This Codebase

The app demonstrates how tenant context and route protection can be handled in a dashboard flow using in-repo demo auth data.

## What Exists in the Code

- Route guard in `proxy.ts`:
  - allows `/login` and `/api/auth/*`
  - redirects unauthenticated users to `/login`
  - redirects authenticated users away from `/login`
- Auth API handlers in `app/api/auth/[...all]/route.ts`:
  - `POST /api/auth/sign-in/email`
  - `GET /api/auth/get-session`
  - `POST /api/auth/switch-organization`
  - `POST /api/auth/sign-out`
- Session model in `lib/auth-session.ts`:
  - demo users and organizations are in memory constants
  - token is signed with HMAC SHA-256 via Web Crypto
  - session is stored in HTTP-only cookie (`dashboard.demo-auth-session.v2`)
  - token includes active organization and expiration
  - organization switch validates membership before re-issuing token
- UI pages present in app router:
  - dashboard (`/`)
  - analytics (`/analytics`)
  - users (`/users`)
  - notifications (`/notifications`)
- Sidebar includes organization switcher and sign-out action.
- Login page includes two demo accounts:
  - `ava@acme.com` / `acme1234`
  - `noah@globex.com` / `globex1234`
- Dashboard preferences are persisted in localStorage via `useDashboardPreferences.ts`.

## Potential Improvements

- Replace demo in-memory accounts with persistent user/session storage.
- Replace plain demo passwords with a real credential flow and password hashing.
- Add automated tests for middleware, auth endpoints, and tenant-switch behavior.
- Add centralized audit logs for sign-in, sign-out, and organization switch events.
- Add CSRF mitigation strategy for auth state-changing endpoints.

## Tech Stack

- Next.js
- React
- TypeScript
- better-auth (client integration)
- Tailwind CSS
- shadcn/ui
- Bun

## Run Locally

1. From repo root: `bun install`
2. Configure root `.env`:
   - `PORT_DASHBOARD`
   - optional: `AUTH_SECRET`
3. Start app:
   - `bun run --filter=dashboard dev`
