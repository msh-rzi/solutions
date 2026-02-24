import { NPlusOneSignal } from '../../../common/observability/services/n-plus-one-detector.service';
import { UserWithPostsView } from '../../users/types/user-with-posts.type';

export type OptimizationStrategy = 'naive' | 'relation-loading' | 'left-join';

export type StrategyExecution = {
  strategy: OptimizationStrategy;
  queryCount: number;
  durationMs: number;
  usersReturned: number;
  postsReturned: number;
  sampleQueries: string[];
  signals: NPlusOneSignal[];
  notes: string;
  data?: UserWithPostsView[];
};

export type StrategyBenchmark = {
  strategy: OptimizationStrategy;
  runs: number;
  avgDurationMs: number;
  minDurationMs: number;
  maxDurationMs: number;
  avgQueryCount: number;
};

export type ComparisonResponse = {
  limit: number;
  includeData: boolean;
  strategies: StrategyExecution[];
  benchmark: StrategyBenchmark[];
  summary: {
    fewestQueries: OptimizationStrategy;
    fastestAverage: OptimizationStrategy;
    naiveVsLeftJoinQueryReductionPercent: number;
  };
};
