# ACID Transaction System

## Project

This project is a NestJS + PostgreSQL ledger service focused on transaction correctness under concurrency.
It implements a double-entry posting model with audit logs for financial traceability.

## Problem

Financial transactions fail in production when:

- concurrent requests update the same accounts at once
- writes partially succeed and leave inconsistent balances
- security checks (inactive accounts, overdrafts, cross-currency moves) are missing

## How I Solved It

- Built a double-entry transaction flow where postings must balance (`sum(debits) == sum(credits)`).
- Added strict amount validation (numeric string, max 4 decimals, positive posting values).
- Used a DB transaction with `SELECT ... FOR UPDATE` row locks to prevent race conditions.
- Sorted account lock order to reduce deadlock risk across concurrent requests.
- Enforced domain rules before commit:
  - active accounts only
  - same-currency transaction only
  - overdraft blocking for `ASSET` and `EXPENSE` accounts
- Wrote transaction, postings, balance updates, and audit log atomically in one commit.
- Added integration tests for:
  - high concurrency transfer simulation
  - rollback on failure (no partial writes)
  - consistency checks between account balances and postings

## API Endpoints

- `POST /transactions` create a balanced transaction
- `GET /transactions` list recent transactions with postings

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Drizzle ORM
- Jest

## Run Locally

1. Install dependencies from the repo root:
   - `bun install`
2. Set env variables in root `.env`:
   - `DATABASE_URL`
   - `PORT_ACID_TRANSACTION_SYSTEM`
3. Run migrations:
   - `bun run --filter=acid-transaction-system drizzle:generate`
   - `bun run --filter=acid-transaction-system drizzle:migrate`
4. Start the app:
   - `bun run --filter=acid-transaction-system dev`

## Test

- `bun run --filter=acid-transaction-system test:transactions`
