import { Injectable } from '@nestjs/common';
import { NPlusOneDetectorService } from '../../common/observability/services/n-plus-one-detector.service';
import { QueryMetricsService } from '../../common/observability/services/query-metrics.service';
import { UsersRepository } from '../users/users.repository';
import {
  ComparisonResponse,
  OptimizationStrategy,
  StrategyBenchmark,
  StrategyExecution,
} from './types/n-plus-one.types';

@Injectable()
export class NPlusOneService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly queryMetricsService: QueryMetricsService,
    private readonly nPlusOneDetectorService: NPlusOneDetectorService,
  ) {}

  async getNaive(limit = 100, includeData = false): Promise<StrategyExecution> {
    return this.executeStrategy('naive', limit, includeData);
  }

  async getRelationLoading(
    limit = 100,
    includeData = false,
  ): Promise<StrategyExecution> {
    return this.executeStrategy('relation-loading', limit, includeData);
  }

  async getLeftJoin(limit = 100, includeData = false): Promise<StrategyExecution> {
    return this.executeStrategy('left-join', limit, includeData);
  }

  async compareStrategies(
    limit = 100,
    includeData = false,
    runs = 3,
  ): Promise<ComparisonResponse> {
    const strategies = [
      await this.getNaive(limit, includeData),
      await this.getRelationLoading(limit, includeData),
      await this.getLeftJoin(limit, includeData),
    ];

    const benchmark = [
      await this.benchmarkStrategy('naive', limit, runs),
      await this.benchmarkStrategy('relation-loading', limit, runs),
      await this.benchmarkStrategy('left-join', limit, runs),
    ];

    const fewestQueries =
      [...strategies].sort((left, right) => left.queryCount - right.queryCount)[0]
        ?.strategy ?? 'left-join';
    const fastestAverage =
      [...benchmark].sort(
        (left, right) => left.avgDurationMs - right.avgDurationMs,
      )[0]?.strategy ?? 'left-join';

    const naiveBenchmark = benchmark.find(
      (item) => item.strategy === 'naive',
    ) as StrategyBenchmark;
    const leftJoinBenchmark = benchmark.find(
      (item) => item.strategy === 'left-join',
    ) as StrategyBenchmark;

    const naiveVsLeftJoinQueryReductionPercent =
      naiveBenchmark.avgQueryCount > 0
        ? Number(
            (
              ((naiveBenchmark.avgQueryCount - leftJoinBenchmark.avgQueryCount) /
                naiveBenchmark.avgQueryCount) *
              100
            ).toFixed(2),
          )
        : 0;

    return {
      limit,
      includeData,
      strategies,
      benchmark,
      summary: {
        fewestQueries,
        fastestAverage,
        naiveVsLeftJoinQueryReductionPercent,
      },
    };
  }

  explain() {
    return {
      whatIsNPlusOne:
        'N+1 happens when one query fetches parent rows (N users), then an extra query runs for each parent row (N more queries).',
      usersPostsExample:
        'Load users first, then fetch posts inside a loop per user. With 100 users this becomes 101 queries.',
      fixes: [
        'Relation loading with Prisma include to fetch children in a bounded number of queries.',
        'LEFT JOIN + aggregation to fetch users and posts in one SQL query.',
      ],
      endpoints: {
        naive: '/n-plus-one/naive?limit=100&includeData=false',
        relationLoading:
          '/n-plus-one/relation-loading?limit=100&includeData=false',
        leftJoin: '/n-plus-one/left-join?limit=100&includeData=false',
        compare: '/n-plus-one/compare?limit=100&runs=3&includeData=false',
      },
      productionDetection:
        'Track query count per request, emit alerts when query count scales with row count, and watch slow-query logs and traces.',
    };
  }

  private async executeStrategy(
    strategy: OptimizationStrategy,
    limit: number,
    includeData: boolean,
  ): Promise<StrategyExecution> {
    const report = await this.queryMetricsService.capture(strategy, async () => {
      if (strategy === 'naive') {
        return this.fetchNaive(limit);
      }

      if (strategy === 'relation-loading') {
        return this.usersRepository.findUsersWithPostsUsingRelationLoading(limit);
      }

      return this.usersRepository.findUsersWithPostsUsingLeftJoin(limit);
    });

    const users = report.result;
    const postsReturned = users.reduce(
      (total, user) => total + user.posts.length,
      0,
    );

    return {
      strategy,
      queryCount: report.queryCount,
      durationMs: report.durationMs,
      usersReturned: users.length,
      postsReturned,
      sampleQueries: report.sampleQueries,
      signals: this.nPlusOneDetectorService.detect({
        strategy,
        queryCount: report.queryCount,
        usersReturned: users.length,
      }),
      notes: this.strategyNotes(strategy),
      data: includeData ? users : undefined,
    };
  }

  private async benchmarkStrategy(
    strategy: OptimizationStrategy,
    limit: number,
    runs: number,
  ): Promise<StrategyBenchmark> {
    const executions: StrategyExecution[] = [];
    for (let currentRun = 0; currentRun < runs; currentRun += 1) {
      executions.push(await this.executeStrategy(strategy, limit, false));
    }

    const durations = executions.map((execution) => execution.durationMs);
    const queryCounts = executions.map((execution) => execution.queryCount);

    const avgDurationMs = Number(
      (durations.reduce((sum, value) => sum + value, 0) / runs).toFixed(2),
    );
    const avgQueryCount = Number(
      (queryCounts.reduce((sum, value) => sum + value, 0) / runs).toFixed(2),
    );

    return {
      strategy,
      runs,
      avgDurationMs,
      minDurationMs: Number(Math.min(...durations).toFixed(2)),
      maxDurationMs: Number(Math.max(...durations).toFixed(2)),
      avgQueryCount,
    };
  }

  private async fetchNaive(limit: number) {
    const users = await this.usersRepository.findUsers(limit);

    return Promise.all(
      users.map(async (user) => ({
        ...user,
        posts: await this.usersRepository.findPostsByUserId(user.id),
      })),
    );
  }

  private strategyNotes(strategy: OptimizationStrategy): string {
    if (strategy === 'naive') {
      return '1 query for users + N queries for each user posts lookup. This is the N+1 anti-pattern.';
    }

    if (strategy === 'relation-loading') {
      return 'Prisma relation loading reduces query count to a bounded small number (commonly 2).';
    }

    return 'Single LEFT JOIN + JSON aggregation produces users and posts in one SQL query.';
  }
}
