import { Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { performance } from 'node:perf_hooks';

type QueryCaptureContext = {
  queryCount: number;
  sampleQueries: string[];
};

export type QueryExecutionReport<T> = {
  strategy: string;
  queryCount: number;
  durationMs: number;
  sampleQueries: string[];
  result: T;
};

const MAX_CAPTURED_QUERIES = 20;

@Injectable()
export class QueryMetricsService {
  private readonly logger = new Logger(QueryMetricsService.name);
  private readonly storage = new AsyncLocalStorage<QueryCaptureContext>();

  async capture<T>(
    strategy: string,
    fn: () => Promise<T>,
  ): Promise<QueryExecutionReport<T>> {
    const context: QueryCaptureContext = { queryCount: 0, sampleQueries: [] };

    return this.storage.run(context, async () => {
      const startedAt = performance.now();
      const result = await fn();
      const durationMs = Number((performance.now() - startedAt).toFixed(2));
      const store = this.storage.getStore() ?? context;

      this.logger.log(
        `[${strategy}] executed ${store.queryCount} SQL queries in ${durationMs}ms`,
      );

      return {
        strategy,
        queryCount: store.queryCount,
        durationMs,
        sampleQueries: [...store.sampleQueries],
        result,
      };
    });
  }

  recordQuery(rawQuery: string): void {
    const store = this.storage.getStore();
    if (!store) {
      return;
    }

    store.queryCount += 1;
    if (store.sampleQueries.length >= MAX_CAPTURED_QUERIES) {
      return;
    }

    store.sampleQueries.push(this.normalizeQuery(rawQuery));
  }

  private normalizeQuery(query: string): string {
    return query.replace(/\s+/g, ' ').trim();
  }
}
