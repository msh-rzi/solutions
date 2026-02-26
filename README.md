# Solutions Monorepo

This workspace is a Bun + Turborepo monorepo that groups multiple production-style applications across backend and frontend domains, plus a portfolio app that links to each project.

## Workspace Overview

| Area | App | Path | Primary Stack |
| --- | --- | --- | --- |
| Backend | ACID Transaction System | `apps/backend/acid-transaction-system` | NestJS, Drizzle ORM, PostgreSQL, TypeScript |
| Backend | Query Optimization Lab | `apps/backend/query-optimization` | NestJS, Prisma, PostgreSQL, TypeScript |
| Frontend | Field-Level Permission Filters | `apps/frontend/field-level-permission-filters` | Next.js, React, TanStack Form, Zod |
| Frontend | Data Grid | `apps/frontend/data-grid` | React, Vite, TanStack Table, TanStack Virtual, Zustand |
| Frontend | Dashboard | `apps/frontend/dashboard` | Next.js, React, better-auth, shadcn/ui |
| Portfolio | Portfolio Site | `apps/portfolio` | Next.js, React, shared UI packages |

## Shared Tooling

- Runtime and package manager: `bun@1.3.4`
- Monorepo orchestration: Turborepo
- Language: TypeScript
- Linting and formatting: ESLint + Prettier
- Shared internal packages: `packages/ui-shadcn`, `packages/ui-mantine`, `packages/tailwind-config`, `packages/i18n`

## Backend API Docs (Swagger)

Swagger docs are enabled for both backend services at `/docs`.

- ACID Swagger: `http://localhost:3020/docs`
- Query Optimization Swagger: `http://localhost:3021/docs`

## Local Development

1. Install dependencies from workspace root:

```bash
bun install
```

2. Ensure PostgreSQL is available, then configure local `.env` files for each app you plan to run by copying each app's `.env.example`:
   - `apps/portfolio/.env.example`
   - `apps/frontend/field-level-permission-filters/.env.example`
   - `apps/frontend/data-grid/.env.example`
   - `apps/frontend/dashboard/.env.example`
   - `apps/backend/acid-transaction-system/.env.example`
   - `apps/backend/query-optimization/.env.example`

3. Start all apps:

```bash
bun run dev
```

4. Access apps:

- Portfolio: `http://localhost:3010`
- Field-level app: `http://localhost:3011`
- Data-grid: `http://localhost:3012`
- Dashboard: `http://localhost:3013`
- ACID Swagger: `http://localhost:3020/docs`
- Query Optimization Swagger: `http://localhost:3021/docs`

## Docker Usage

Each app now has its own `Dockerfile` in its app directory.
Use the root `docker-compose.yml` as the global runner for all app Dockerfiles.

1. Build and run all services:

```bash
docker compose up --build
```

2. Open:

- Portfolio: `http://localhost:3010`
- Field-level app: `http://localhost:3011`
- Data-grid: `http://localhost:3012`
- Dashboard: `http://localhost:3013`
- ACID Swagger: `http://localhost:3020/docs`
- Query Optimization Swagger: `http://localhost:3021/docs`

Database service URLs default to `host.docker.internal`.
Override `DATABASE_URL`, `DATABASE_URL_QUERY_OPTIMIZATION`, and related env vars in your shell before running `docker compose up --build` if needed.
If your database password contains special characters (for example `@`), URL-encode it in the connection string (for example `%40`).

## Workspace Commands

- `bun run dev` runs all apps in watch mode through Turbo.
- `bun run build` builds all workspace packages/apps.
- `bun run lint` runs lint tasks across the monorepo.
- `bun run check-types` runs type checking tasks across the monorepo.

## Verification Note

`docker compose config` was validated in this environment. Full image builds/runs were not executed in this session.
