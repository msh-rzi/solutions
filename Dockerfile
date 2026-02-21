FROM oven/bun:1.3.4

WORKDIR /workspace

COPY package.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages
COPY scripts ./scripts

RUN bun install --frozen-lockfile

ENV NODE_ENV=development \
    APP_HOST=0.0.0.0 \
    APP_LINK_PROTOCOL=http \
    APP_LINK_HOST=localhost \
    PORT_PORTFOLIO=3010 \
    PORT_FIELD_LEVEL_PERMISSION_FILTERS=3011 \
    PORT_DATA_GRID=3012 \
    PORT_DASHBOARD=3013 \
    PORT_ACID_TRANSACTION_SYSTEM=3020 \
    PORT_QUERY_OPTIMIZATION=3021 \
    DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/acid-transaction-system \
    DATABASE_URL_QUERY_OPTIMIZATION=postgresql://postgres:postgres@host.docker.internal:5432/acid-transaction-system \
    DATABASE_URL_QUERY_OPTIMIZATION_TEST=postgresql://postgres:postgres@host.docker.internal:5432/query_optimization_test \
    RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS=false

EXPOSE 3010 3011 3012 3013 3020 3021

CMD ["bun", "x", "turbo", "run", "dev", "--parallel", "--continue=always"]
