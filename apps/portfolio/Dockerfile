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

WORKDIR /app/apps/portfolio

RUN bun run build

FROM oven/bun:1.3.4 AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT_PORTFOLIO=3010 \
    APP_LINK_PROTOCOL=http \
    APP_LINK_HOST=localhost \
    PORT_FIELD_LEVEL_PERMISSION_FILTERS=3011 \
    PORT_DATA_GRID=3012 \
    PORT_DASHBOARD=3013 \
    PORT_ACID_TRANSACTION_SYSTEM=3020 \
    PORT_QUERY_OPTIMIZATION=3021

COPY --from=builder --chown=bun:bun /app /app

WORKDIR /app/apps/portfolio
EXPOSE 3010

CMD ["sh", "-c", "bun x next start --hostname 0.0.0.0 --port ${PORT_PORTFOLIO:-3010}"]
