import { Controller, Get, Query } from '@nestjs/common';
import { CompareQueryDto } from './dto/compare-query.dto';
import { NPlusOneQueryDto } from './dto/n-plus-one-query.dto';
import { NPlusOneService } from './n-plus-one.service';

@Controller('n-plus-one')
export class NPlusOneController {
  constructor(private readonly nPlusOneService: NPlusOneService) {}

  @Get('explain')
  explain() {
    return this.nPlusOneService.explain();
  }

  @Get('naive')
  getNaive(@Query() query: NPlusOneQueryDto) {
    return this.nPlusOneService.getNaive(query.limit, query.includeData);
  }

  @Get('relation-loading')
  getRelationLoading(@Query() query: NPlusOneQueryDto) {
    return this.nPlusOneService.getRelationLoading(query.limit, query.includeData);
  }

  @Get('left-join')
  getLeftJoin(@Query() query: NPlusOneQueryDto) {
    return this.nPlusOneService.getLeftJoin(query.limit, query.includeData);
  }

  @Get('compare')
  compare(@Query() query: CompareQueryDto) {
    return this.nPlusOneService.compareStrategies(
      query.limit,
      query.includeData,
      query.runs,
    );
  }
}
