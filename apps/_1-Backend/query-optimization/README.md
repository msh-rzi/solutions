# Query Optimization (N+1 Detection Lab)

## Project

This project is a NestJS + Prisma + PostgreSQL lab that demonstrates the N+1 query problem and compares multiple query strategies.

## Problem

In data-heavy APIs, a naive parent-then-loop pattern causes N+1 queries:

- 1 query to fetch users
- N extra queries to fetch each user's posts

This increases DB round-trips and hurts latency as row counts grow.

## How I Solved It

- Implemented and exposed 3 strategies for the same data request:
  - `naive`
  - `relation-loading` (Prisma include)
  - `left-join` (single SQL with JSON aggregation)
- Added request-scoped query observability with AsyncLocalStorage:
  - query count
  - sample SQL statements
  - request duration
- Hooked Prisma query events into a metrics service for automatic per-request counting.
- Added N+1 signal detection rules (query count scaling with returned users, high query thresholds).
- Added benchmark endpoint to compare strategies over multiple runs and compute query reduction percent.
- Added unit and integration tests to prevent query-count regressions.

## API Endpoints

- `GET /n-plus-one/explain`
- `GET /n-plus-one/naive?limit=100&includeData=false`
- `GET /n-plus-one/relation-loading?limit=100&includeData=false`
- `GET /n-plus-one/left-join?limit=100&includeData=false`
- `GET /n-plus-one/compare?limit=100&runs=3&includeData=false`

## Tech Stack

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Jest

## Run Locally

1. Install dependencies from the repo root:
   - `bun install`
2. Configure root `.env`:
   - `DATABASE_URL_QUERY_OPTIMIZATION`
   - `PORT_QUERY_OPTIMIZATION`
3. Prepare DB:
   - `bun run --filter=query-optimization prisma:generate`
   - `bun run --filter=query-optimization prisma:migrate:deploy`
   - `bun run --filter=query-optimization db:seed`
4. Start app:
   - `bun run --filter=query-optimization dev`

## Test

- Unit tests:
  - `bun run --filter=query-optimization test:unit`
- Integration tests (real DB):
  - set `RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS=true`
  - optional test DB: `DATABASE_URL_QUERY_OPTIMIZATION_TEST`
  - run `bun run --filter=query-optimization test:integration`
