# Solutions Monorepo

This workspace is a Bun + Turborepo monorepo that groups multiple production-style applications across backend and frontend domains, plus a portfolio app that links to each project.

## Workspace Overview

| Area | App | Path | Primary Stack |
| --- | --- | --- | --- |
| Backend | ACID Transaction System | `apps/_1-Backend/acid-transaction-system` | NestJS, Drizzle ORM, PostgreSQL, TypeScript |
| Backend | Query Optimization Lab | `apps/_1-Backend/query-optimization` | NestJS, Prisma, PostgreSQL, TypeScript |
| Frontend | Field-Level Permission Filters | `apps/_2-Frontend/field-level-permission-filters` | Next.js, React, TanStack Form, Zod |
| Frontend | Data Grid | `apps/_2-Frontend/data-grid` | React, Vite, TanStack Table, TanStack Virtual, Zustand |
| Frontend | Dashboard | `apps/_2-Frontend/dashboard` | Next.js, React, better-auth, shadcn/ui |
| Portfolio | Portfolio Site | `apps/_3-Portfolio` | Next.js, React, shared UI packages |

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

2. Ensure PostgreSQL is available and your root `.env` is configured.

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

This repository includes a root `Dockerfile` that starts all apps in one container image, each on a dedicated port.

1. Build image:

```bash
docker build -t solutions-all .
```

2. Run container:

```bash
docker run --rm \
  -p 3010:3010 \
  -p 3011:3011 \
  -p 3012:3012 \
  -p 3013:3013 \
  -p 3020:3020 \
  -p 3021:3021 \
  solutions-all
```

3. Open:

- Portfolio: `http://localhost:3010`
- Field-level app: `http://localhost:3011`
- Data-grid: `http://localhost:3012`
- Dashboard: `http://localhost:3013`
- ACID Swagger: `http://localhost:3020/docs`
- Query Optimization Swagger: `http://localhost:3021/docs`

The container defaults to `host.docker.internal` for database host access. If your Docker environment cannot resolve it, override `DATABASE_URL` and `DATABASE_URL_QUERY_OPTIMIZATION` at `docker run` time.

## Workspace Commands

- `bun run dev` runs all apps in watch mode through Turbo.
- `bun run build` builds all workspace packages/apps.
- `bun run lint` runs lint tasks across the monorepo.
- `bun run check-types` runs type checking tasks across the monorepo.

## Verification Note

Docker CLI is not installed in this execution environment, so Docker build/run commands are documented but were not executed here.
