# Query Optimization (N+1 Detection Lab)

NestJS service that exposes three user-post query strategies and captures per-request SQL metrics.

## Problem Addressed in This Codebase

The service demonstrates how a naive users-plus-posts fetch pattern creates N+1 queries and compares it with optimized alternatives.

## What Exists in the Code

- Public endpoints in `n-plus-one.controller.ts`:
  - `GET /n-plus-one/explain`
  - `GET /n-plus-one/naive`
  - `GET /n-plus-one/relation-loading`
  - `GET /n-plus-one/left-join`
  - `GET /n-plus-one/compare`
- Query params with DTO validation:
  - `limit` default `100`, min `1`, max `500`
  - `includeData` boolean
  - `runs` default `3`, min `1`, max `20`
- Three implemented strategies in `users.repository.ts`:
  - naive users query + one posts query per user
  - Prisma relation loading (`findMany` with `posts`)
  - SQL `LEFT JOIN` + `JSON_AGG` single query via `$queryRaw`
- Request-scoped metrics in `query-metrics.service.ts` using `AsyncLocalStorage`:
  - query count
  - sample normalized SQL statements (up to 20)
  - duration in ms
- Prisma query event hook in `prisma.service.ts` records SQL into metrics service.
- N+1 signal detection in `n-plus-one-detector.service.ts`:
  - warns when query count scales with returned users
  - warns when query count is 50+
- Seed script creates 100 users and 10 posts per user.
- Integration tests in `src/test/n-plus-one.integration.spec.ts` verify:
  - naive query count is higher than optimized strategies
  - left-join query count equals 1 in test scenario
  - comparison summary reports query reduction
- Swagger docs enabled at `/docs`.

## Potential Improvements

- Add endpoint-level pagination for nested post lists when response payload grows.
- Add `EXPLAIN (ANALYZE, BUFFERS)` capture workflow for query-plan analysis.
- Add production-grade metrics export and alerting integration (currently logs + in-response metrics).
- Add cache strategy only if profiling shows repeated identical reads.

## Tech Stack

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Jest
- Swagger
- AsyncLocalStorage
- Bun

## Run Locally

1. From repo root: `bun install`
2. Create `apps/_1-Backend/query-optimization/.env` from `apps/_1-Backend/query-optimization/.env.example` and configure:
   - `DATABASE_URL_QUERY_OPTIMIZATION`
   - `PORT_QUERY_OPTIMIZATION`
3. Prepare database:
   - `bun run --filter=query-optimization prisma:generate`
   - `bun run --filter=query-optimization prisma:migrate:deploy`
   - `bun run --filter=query-optimization db:seed`
4. Start service:
   - `bun run --filter=query-optimization dev`

## Test

- Unit tests: `bun run --filter=query-optimization test:unit`
- Integration tests:
  1. Set `RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS=true`
  2. Optional: set `DATABASE_URL_QUERY_OPTIMIZATION_TEST`
  3. Run `bun run --filter=query-optimization test:integration`
