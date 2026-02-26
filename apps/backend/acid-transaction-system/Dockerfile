# syntax=docker/dockerfile:1.7

FROM oven/bun:1.3.4 AS deps
WORKDIR /app

COPY package.json bun.lock turbo.json .npmrc ./

COPY apps/backend/acid-transaction-system/package.json apps/backend/acid-transaction-system/package.json
COPY apps/backend/query-optimization/package.json apps/backend/query-optimization/package.json
COPY apps/frontend/dashboard/package.json apps/frontend/dashboard/package.json
COPY apps/frontend/data-grid/package.json apps/frontend/data-grid/package.json
COPY apps/frontend/field-level-permission-filters/package.json apps/frontend/field-level-permission-filters/package.json
COPY apps/portfolio/package.json apps/portfolio/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/i18n/package.json packages/i18n/package.json
COPY packages/tailwind-config/package.json packages/tailwind-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
COPY packages/ui-mantine/package.json packages/ui-mantine/package.json
COPY packages/ui-shadcn/package.json packages/ui-shadcn/package.json

RUN bun install --frozen-lockfile

FROM deps AS builder
WORKDIR /app

COPY . .

WORKDIR /app/apps/backend/acid-transaction-system

RUN bun run build

FROM oven/bun:1.3.4 AS runner
WORKDIR /app

ENV NODE_ENV=production \
    APP_HOST=0.0.0.0 \
    PORT_ACID_TRANSACTION_SYSTEM=3020 \
    DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/acid-transaction-system

COPY --from=builder --chown=bun:bun /app /app

WORKDIR /app/apps/backend/acid-transaction-system
EXPOSE 3020

CMD ["sh", "-c", "if [ -n \"$DATABASE_URL\" ]; then export DATABASE_URL=$(printf \"%s\" \"$DATABASE_URL\" | sed 's/@localhost:/@host.docker.internal:/g'); fi; bun dist/main.js"]
