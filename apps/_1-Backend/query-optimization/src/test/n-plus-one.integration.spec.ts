import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { NPlusOneService } from '../modules/n-plus-one/n-plus-one.service';
import { PrismaService } from '../prisma/prisma.service';

const integrationDatabaseUrl =
  process.env.DATABASE_URL_QUERY_OPTIMIZATION_TEST ??
  process.env.DATABASE_URL_QUERY_OPTIMIZATION;

const runIntegrationTests =
  process.env.RUN_QUERY_OPTIMIZATION_INTEGRATION_TESTS === 'true';

const describeIfDatabase =
  runIntegrationTests && integrationDatabaseUrl ? describe : describe.skip;

describeIfDatabase('N+1 Query Optimization (integration)', () => {
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let nPlusOneService: NPlusOneService;

  beforeAll(async () => {
    if (process.env.DATABASE_URL_QUERY_OPTIMIZATION_TEST) {
      process.env.DATABASE_URL_QUERY_OPTIMIZATION =
        process.env.DATABASE_URL_QUERY_OPTIMIZATION_TEST;
    }

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prismaService = moduleRef.get(PrismaService);
    nPlusOneService = moduleRef.get(NPlusOneService);

    await prismaService.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" SERIAL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prismaService.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Post" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "content" TEXT,
        "userId" INTEGER NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prismaService.$executeRawUnsafe(
      'CREATE INDEX IF NOT EXISTS "Post_userId_createdAt_idx" ON "Post"("userId", "createdAt");',
    );

    await prismaService.$executeRawUnsafe(
      'CREATE INDEX IF NOT EXISTS "User_createdAt_idx" ON "User"("createdAt");',
    );
  }, 60_000);

  beforeEach(async () => {
    await prismaService.post.deleteMany();
    await prismaService.user.deleteMany();

    await prismaService.user.createMany({
      data: Array.from({ length: 10 }, (_, index) => ({
        email: `integration-user-${index + 1}@demo.dev`,
        name: `Integration User ${index + 1}`,
      })),
    });

    const users = await prismaService.user.findMany({
      select: { id: true },
      orderBy: { id: 'asc' },
    });

    await prismaService.post.createMany({
      data: users.flatMap((user) =>
        Array.from({ length: 3 }, (_, index) => ({
          userId: user.id,
          title: `User ${user.id} - Post ${index + 1}`,
          content: 'Integration content',
        })),
      ),
    });
  });

  afterAll(async () => {
    await prismaService.post.deleteMany();
    await prismaService.user.deleteMany();
    await moduleRef.close();
  });

  it('executes more SQL queries in naive implementation than optimized implementations', async () => {
    const naive = await nPlusOneService.getNaive(10, false);
    const relation = await nPlusOneService.getRelationLoading(10, false);
    const leftJoin = await nPlusOneService.getLeftJoin(10, false);

    expect(naive.queryCount).toBeGreaterThan(relation.queryCount);
    expect(naive.queryCount).toBeGreaterThan(leftJoin.queryCount);
    expect(naive.queryCount).toBeGreaterThanOrEqual(11);
    expect(leftJoin.queryCount).toBe(1);
    expect(relation.queryCount).toBeLessThanOrEqual(3);
  });

  it('returns comparison summary with measurable query reduction', async () => {
    const comparison = await nPlusOneService.compareStrategies(10, false, 2);

    expect(comparison.summary.naiveVsLeftJoinQueryReductionPercent).toBeGreaterThan(
      0,
    );
    expect(comparison.summary.fewestQueries).toBe('left-join');
    expect(comparison.benchmark).toHaveLength(3);
  });
});
