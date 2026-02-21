import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProjectOverview() {
    return {
      project: 'query-optimization',
      stack: ['NestJS', 'PostgreSQL', 'Prisma'],
      purpose: 'Demonstrate and fix the N+1 query problem for Users and Posts',
      endpoints: {
        explanation: '/n-plus-one/explain',
        naive: '/n-plus-one/naive?limit=100&includeData=false',
        relationLoading: '/n-plus-one/relation-loading?limit=100&includeData=false',
        leftJoin: '/n-plus-one/left-join?limit=100&includeData=false',
        comparison: '/n-plus-one/compare?limit=100&runs=3&includeData=false',
      },
    };
  }
}
