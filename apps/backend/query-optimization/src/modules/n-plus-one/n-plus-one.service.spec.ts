import { NPlusOneDetectorService } from '../../common/observability/services/n-plus-one-detector.service';
import { QueryMetricsService } from '../../common/observability/services/query-metrics.service';
import { UsersRepository } from '../users/users.repository';
import { NPlusOneService } from './n-plus-one.service';

describe('NPlusOneService (unit)', () => {
  const users = [
    { id: 1, name: 'User 1', email: 'user1@demo.dev' },
    { id: 2, name: 'User 2', email: 'user2@demo.dev' },
  ];

  const postsByUser = {
    1: [{ id: 11, title: 'Post 1', createdAt: new Date('2025-01-01T00:00:00Z') }],
    2: [{ id: 21, title: 'Post 2', createdAt: new Date('2025-01-02T00:00:00Z') }],
  };

  const mockUsersRepository = {
    findUsers: jest.fn(),
    findPostsByUserId: jest.fn(),
    findUsersWithPostsUsingRelationLoading: jest.fn(),
    findUsersWithPostsUsingLeftJoin: jest.fn(),
  } as unknown as UsersRepository;

  const mockQueryMetrics = {
    capture: jest.fn(
      async (strategy: string, fn: () => Promise<unknown>) => {
        const result = await fn();

        const queryCountMap: Record<string, number> = {
          naive: 11,
          'relation-loading': 2,
          'left-join': 1,
        };
        const durationMap: Record<string, number> = {
          naive: 12,
          'relation-loading': 4,
          'left-join': 2,
        };

        return {
          strategy,
          queryCount: queryCountMap[strategy] ?? 1,
          durationMs: durationMap[strategy] ?? 1,
          sampleQueries: [`${strategy}-query`],
          result,
        };
      },
    ),
  } as unknown as QueryMetricsService;

  const mockDetector = {
    detect: jest.fn(() => []),
  } as unknown as NPlusOneDetectorService;

  let service: NPlusOneService;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUsersRepository.findUsers.mockResolvedValue(users);
    mockUsersRepository.findPostsByUserId.mockImplementation((userId: number) =>
      Promise.resolve(postsByUser[userId as 1 | 2] ?? []),
    );
    mockUsersRepository.findUsersWithPostsUsingRelationLoading.mockResolvedValue(
      users.map((user) => ({
        ...user,
        posts: postsByUser[user.id as 1 | 2],
      })),
    );
    mockUsersRepository.findUsersWithPostsUsingLeftJoin.mockResolvedValue(
      users.map((user) => ({
        ...user,
        posts: postsByUser[user.id as 1 | 2],
      })),
    );

    service = new NPlusOneService(
      mockUsersRepository,
      mockQueryMetrics,
      mockDetector,
    );
  });

  it('runs naive strategy with one posts query per user', async () => {
    const result = await service.getNaive(2, true);

    expect(mockUsersRepository.findUsers).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.findPostsByUserId).toHaveBeenCalledTimes(2);
    expect(result.strategy).toBe('naive');
    expect(result.usersReturned).toBe(2);
    expect(result.postsReturned).toBe(2);
    expect(result.queryCount).toBe(11);
  });

  it('compares strategies and reports query reduction', async () => {
    const comparison = await service.compareStrategies(2, false, 1);

    expect(comparison.strategies).toHaveLength(3);
    expect(comparison.summary.fewestQueries).toBe('left-join');
    expect(comparison.summary.fastestAverage).toBe('left-join');
    expect(comparison.summary.naiveVsLeftJoinQueryReductionPercent).toBeCloseTo(
      90.91,
      2,
    );
  });
});
