# syntax=docker/dockerfile:1.7

FROM oven/bun:1.3.4 AS deps
WORKDIR /app

COPY package.json bun.lock turbo.json .npmrc ./

COPY apps/_1-Backend/acid-transaction-system/package.json apps/_1-Backend/acid-transaction-system/package.json
COPY apps/_1-Backend/query-optimization/package.json apps/_1-Backend/query-optimization/package.json
COPY apps/_2-Frontend/dashboard/package.json apps/_2-Frontend/dashboard/package.json
COPY apps/_2-Frontend/data-grid/package.json apps/_2-Frontend/data-grid/package.json
COPY apps/_2-Frontend/field-level-permission-filters/package.json apps/_2-Frontend/field-level-permission-filters/package.json
COPY apps/_3-Portfolio/package.json apps/_3-Portfolio/package.json
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

WORKDIR /app/apps/_1-Backend/query-optimization

RUN bun run prisma:generate

RUN bun run build

FROM oven/bun:1.3.4 AS runner
WORKDIR /app

ENV NODE_ENV=production \
    APP_HOST=0.0.0.0 \
    PORT_QUERY_OPTIMIZATION=3021 \
    DATABASE_URL_QUERY_OPTIMIZATION=postgresql://postgres:postgres@host.docker.internal:5432/query_optimization \
    DATABASE_URL_QUERY_OPTIMIZATION_TEST=postgresql://postgres:postgres@host.docker.internal:5432/query_optimization_test \
    RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS=false

COPY --from=builder --chown=bun:bun /app /app

WORKDIR /app/apps/_1-Backend/query-optimization
EXPOSE 3021

CMD ["sh", "-c", "if [ -n \"$DATABASE_URL_QUERY_OPTIMIZATION\" ]; then export DATABASE_URL_QUERY_OPTIMIZATION=$(printf \"%s\" \"$DATABASE_URL_QUERY_OPTIMIZATION\" | sed 's/@localhost:/@host.docker.internal:/g'); fi; if [ -n \"$DATABASE_URL_QUERY_OPTIMIZATION_TEST\" ]; then export DATABASE_URL_QUERY_OPTIMIZATION_TEST=$(printf \"%s\" \"$DATABASE_URL_QUERY_OPTIMIZATION_TEST\" | sed 's/@localhost:/@host.docker.internal:/g'); fi; bun dist/main.js"]
