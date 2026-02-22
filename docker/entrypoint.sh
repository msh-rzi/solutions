#!/usr/bin/env sh
set -eu

log() {
  printf '[entrypoint] %s\n' "$1"
}

require_env() {
  var_name="$1"
  why="$2"
  eval var_value="\${$var_name:-}"
  if [ -z "$var_value" ]; then
    printf '[entrypoint] missing required env %s: %s\n' "$var_name" "$why" >&2
    exit 1
  fi
}

# Migrations are fail-fast on purpose:
# if schema is not up to date, the app should not accept traffic.
require_env "DATABASE_URL" "required for Drizzle migration and acid-transaction-system runtime"
require_env "DATABASE_URL_QUERY_OPTIMIZATION" "required for Prisma migration and query-optimization runtime"

log "running Drizzle migrations (acid-transaction-system)"
(
  cd /app/apps/_1-Backend/acid-transaction-system
  bun x drizzle-kit migrate --config drizzle.config.ts
)

log "running Prisma migrations (query-optimization)"
(
  cd /app/apps/_1-Backend/query-optimization
  bun x prisma migrate deploy --schema prisma/schema.prisma
)

log "migrations completed, starting all applications"

pids=""

start_bg() {
  name="$1"
  shift
  log "starting ${name}"
  "$@" &
  pid=$!
  pids="$pids $pid"
  log "${name} started with pid ${pid}"
}

shutdown_all() {
  log "stopping all applications"
  for pid in $pids; do
    kill "$pid" 2>/dev/null || true
  done
  wait || true
}

trap 'shutdown_all; exit 143' INT TERM

start_bg "portfolio" sh -c 'cd /app/apps/_3-Portfolio && exec bun x next start --hostname "$APP_HOST" --port "$PORT_PORTFOLIO"'
start_bg "field-level-permission-filters" sh -c 'cd /app/apps/_2-Frontend/field-level-permission-filters && exec bun x next start --hostname "$APP_HOST" --port "$PORT_FIELD_LEVEL_PERMISSION_FILTERS"'
start_bg "data-grid" sh -c 'cd /app/apps/_2-Frontend/data-grid && exec bun x vite preview --host "$APP_HOST" --port "$PORT_DATA_GRID" --strictPort'
start_bg "dashboard" sh -c 'cd /app/apps/_2-Frontend/dashboard && exec bun x next start --hostname "$APP_HOST" --port "$PORT_DASHBOARD"'
start_bg "acid-transaction-system" sh -c 'cd /app/apps/_1-Backend/acid-transaction-system && exec bun dist/main.js'
start_bg "query-optimization" sh -c 'cd /app/apps/_1-Backend/query-optimization && exec bun dist/main.js'

# Fail-fast if any child process exits.
while :; do
  for pid in $pids; do
    if ! kill -0 "$pid" 2>/dev/null; then
      exit_code=0
      if ! wait "$pid"; then
        exit_code=$?
      fi
      log "process ${pid} exited with status ${exit_code}; terminating remaining processes"
      shutdown_all
      exit "$exit_code"
    fi
  done
  sleep 1
done

