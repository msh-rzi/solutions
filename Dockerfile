# syntax=docker/dockerfile:1.7

# ============================================================================
# Stage 1: dependency install (cache-friendly)
# Copies only manifest files so `bun install` is cached unless deps change.
# ============================================================================
FROM oven/bun:1.3.4 AS deps

WORKDIR /app

# Root workspace manifests.
COPY package.json bun.lock turbo.json .npmrc ./

# Workspace package manifests (explicitly listed to keep cache stable).
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

# Install all workspace deps once (including dev deps needed for build + migration CLIs).
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# ============================================================================
# Stage 2: build stage
# Runs required build-time generation and Turborepo build.
# ============================================================================
FROM deps AS builder

WORKDIR /app

# Copy source only after deps are installed for better layer reuse.
COPY . .

# Build-time placeholders for ORM generators.
# These are not copied to the final image.
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/acid_transaction_system \
    DATABASE_URL_QUERY_OPTIMIZATION=postgresql://postgres:postgres@localhost:5432/query_optimization \
    NEXT_TELEMETRY_DISABLED=1

# Required build step 1: Prisma client generation.
RUN bun x prisma generate --schema apps/_1-Backend/query-optimization/prisma/schema.prisma

# Required build step 2: Drizzle artifacts generation.
RUN bun x drizzle-kit generate --config apps/_1-Backend/acid-transaction-system/drizzle.config.ts

# Required build step 3: Monorepo production build.
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun x turbo run build

# ============================================================================
# Stage 3: production runtime
# Contains built artifacts + runtime deps + entrypoint migration flow.
# ============================================================================
FROM oven/bun:1.3.4 AS runtime

WORKDIR /app

# Production-safe defaults only (no secrets baked into image).
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    APP_HOST=0.0.0.0 \
    APP_LINK_PROTOCOL=http \
    APP_LINK_HOST=localhost \
    PORT_PORTFOLIO=3010 \
    PORT_FIELD_LEVEL_PERMISSION_FILTERS=3011 \
    PORT_DATA_GRID=3012 \
    PORT_DASHBOARD=3013 \
    PORT_ACID_TRANSACTION_SYSTEM=3020 \
    PORT_QUERY_OPTIMIZATION=3021

# Copy built workspace and installed dependencies.
COPY --from=builder --chown=bun:bun /app /app

# Runtime entrypoint runs DB migrations first, then starts all apps.
COPY --chown=bun:bun docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Run as non-root user provided by Bun base image.
USER bun

# Expose all app ports hosted by this single image.
EXPOSE 3010 3011 3012 3013 3020 3021

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

