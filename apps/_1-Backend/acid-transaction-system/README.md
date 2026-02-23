# ACID Transaction System

NestJS ledger service that enforces balanced double-entry postings inside a single PostgreSQL transaction.

## Problem Addressed in This Codebase

When multiple requests modify the same accounts, balance drift can happen if writes are not atomic and lock-safe.

## What Exists in the Code

- `POST /transactions` and `GET /transactions` endpoints in `transactions.controller.ts`.
- Double-entry validation in `transactions.service.ts`:
  - at least two postings and max 200 postings
  - only `DEBIT` and `CREDIT`
  - amount as numeric string with up to 4 decimals
  - each posting amount must be positive
  - full transaction must balance to zero
- Transaction boundary implemented with `db.transaction(...)`.
- Pessimistic account locking with `SELECT ... FOR UPDATE`.
- Deterministic lock ordering (`accountId` sort) before lock acquisition.
- Domain guards before commit:
  - all accounts must exist
  - account must be active
  - one currency per transaction
  - overdraft blocked for `ASSET` and `EXPENSE`
- Atomic persistence sequence inside the same transaction:
  - create `transactions` row
  - create `postings` rows
  - update account balances and versions
  - create audit log row in `audit_logs`
- Swagger docs are enabled at `/docs`.
- Integration tests in `src/test/transactions.service.spec.ts` cover:
  - 50 concurrent transfer simulation
  - rollback on forced failure
  - postings vs account-balance consistency check
  - overdraft rejection

## Data Model in Current Migration

- `accounts`
- `transactions`
- `postings`
- `audit_logs`

## Potential Improvements

- Add API-level idempotency keys for retry-safe transaction creation.
- Add explicit retry policy for transient DB errors (for example deadlock/serialization failures).
- Add DB-level constraints/checks for more invariants where possible.
- Add structured metrics/tracing for transaction throughput and lock wait time.
- Add public account-management endpoints if external account CRUD is required.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Drizzle ORM
- Jest
- Swagger
- Bun

## Run Locally

1. From repo root: `bun install`
2. Create `apps/_1-Backend/acid-transaction-system/.env` from `apps/_1-Backend/acid-transaction-system/.env.example` and configure:
   - `DATABASE_URL`
   - `PORT_ACID_TRANSACTION_SYSTEM`
3. Run migrations:
   - `bun run --filter=acid-transaction-system drizzle:generate`
   - `bun run --filter=acid-transaction-system drizzle:migrate`
4. Start service:
   - `bun run --filter=acid-transaction-system dev`

## Test

- `bun run --filter=acid-transaction-system test:transactions`
