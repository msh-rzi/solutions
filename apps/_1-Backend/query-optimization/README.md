# Query Optimization (NestJS + Prisma + PostgreSQL)

This app demonstrates the **N+1 query problem** and two fixes using:

- NestJS
- Prisma
- PostgreSQL

## 1) What is the N+1 Query Problem?

N+1 happens when you:

1. Fetch a list of parent rows in one query (`N` users)
2. Run one additional query per parent row to fetch children (`posts` per user)

If you load 100 users, this pattern executes **101 SQL queries** (1 + 100).  
That creates avoidable DB round-trips and usually worse latency under load.

## 2) Real-world Example (Users and Posts)

`User` has many `Post`.

- Bad pattern: get users, then loop each user and query posts separately.
- Better patterns:
  - Prisma relation loading (`include: { posts: true }`)
  - SQL `LEFT JOIN` with aggregation.

## 3) Implemented Strategies

Endpoints:

- `GET /n-plus-one/naive`
- `GET /n-plus-one/relation-loading`
- `GET /n-plus-one/left-join`
- `GET /n-plus-one/compare`
- `GET /n-plus-one/explain`

Query params:

- `limit` (default `100`)
- `includeData` (default `false`)
- `runs` (compare only, default `3`)

### Naive (causes N+1)

- 1 query for users
- N queries for posts (one per user)

### Optimized A: Relation Loading

- Prisma loads relations in a bounded small number of queries (commonly 2)
- Removes query explosion

### Optimized B: LEFT JOIN

- Single SQL with `LEFT JOIN` + `JSON_AGG`
- Usually the fewest round-trips (`1` query)

## 4) Query Counting + Timing

The project includes request-scoped query metrics:

- Captures SQL query count
- Captures sample SQL statements
- Measures duration (ms)

Each strategy response includes:

- `queryCount`
- `durationMs`
- `usersReturned`
- `postsReturned`
- `sampleQueries`
- `signals` (N+1 detection hints)

## 5) Performance Comparison

Use:

```bash
GET /n-plus-one/compare?limit=100&runs=3&includeData=false
```

Response includes:

- Per-strategy execution metrics
- Benchmark averages across runs
- Query reduction percent (`naive` vs `left-join`)

## 6) Seed Data (100 users x 10 posts)

Seed script inserts:

- 100 users
- 1,000 posts (10 per user)

Run:

```bash
bun run prisma:generate
bun run prisma:migrate:deploy
# for local prototyping without migrations, you can use:
# bun run prisma:db:push
bun run db:seed
```

## 7) Tests

### Unit tests

- `src/modules/n-plus-one/n-plus-one.service.spec.ts`
- Verifies service logic and comparison summary

### Integration tests (real DB)

- `src/test/n-plus-one.integration.spec.ts`
- Uses a PostgreSQL database
- Verifies naive query count > optimized query count
- Asserts query-count expectations (`left-join` should be 1)

Run:

```bash
bun run test:unit
bun run test:integration
```

Integration tests run only when:

- `RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS=true`
- a valid DB URL is set (`DATABASE_URL_QUERY_OPTIMIZATION_TEST` preferred)

## 8) Environment

Required root `.env` keys:

- `PORT_QUERY_OPTIMIZATION`
- `DATABASE_URL_QUERY_OPTIMIZATION`
- `DATABASE_URL_QUERY_OPTIMIZATION_TEST` (optional, recommended for integration tests)
- `RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS` (set `true` only when DB is ready)

## 9) Production Detection Guidance (Bonus)

How to catch N+1 in production:

1. Track `queryCount` per request in logs/metrics.
2. Alert on high query count thresholds per endpoint.
3. Correlate query count with response latency.
4. Add tracing spans around DB calls (OpenTelemetry).
5. Inspect slow query logs and repeated SQL patterns.
6. Add CI tests that fail on query-count regression for critical flows.
