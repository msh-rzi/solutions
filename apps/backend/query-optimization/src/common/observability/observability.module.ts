import { Global, Module } from '@nestjs/common';
import { NPlusOneDetectorService } from './services/n-plus-one-detector.service';
import { QueryMetricsService } from './services/query-metrics.service';

@Global()
@Module({
  providers: [QueryMetricsService, NPlusOneDetectorService],
  exports: [QueryMetricsService, NPlusOneDetectorService],
})
export class ObservabilityModule {}
