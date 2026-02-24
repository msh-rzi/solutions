import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { QueryMetricsService } from '../common/observability/services/query-metrics.service';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'warn' | 'error'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly queryMetricsService: QueryMetricsService) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    this.$on('query', (event: Prisma.QueryEvent) => {
      this.queryMetricsService.recordQuery(event.query);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
