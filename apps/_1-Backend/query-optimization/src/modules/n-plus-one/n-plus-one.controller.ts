import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompareQueryDto } from './dto/compare-query.dto';
import { NPlusOneQueryDto } from './dto/n-plus-one-query.dto';
import { NPlusOneService } from './n-plus-one.service';

@ApiTags('n-plus-one')
@Controller('n-plus-one')
export class NPlusOneController {
  constructor(private readonly nPlusOneService: NPlusOneService) {}

  @ApiOperation({
    summary: 'Explain available strategies and experiment goals',
  })
  @Get('explain')
  explain() {
    return this.nPlusOneService.explain();
  }

  @ApiOperation({ summary: 'Run naive strategy to demonstrate N+1 behavior' })
  @Get('naive')
  getNaive(@Query() query: NPlusOneQueryDto) {
    return this.nPlusOneService.getNaive(query.limit, query.includeData);
  }

  @ApiOperation({
    summary: 'Run relation-loading strategy using Prisma includes',
  })
  @Get('relation-loading')
  getRelationLoading(@Query() query: NPlusOneQueryDto) {
    return this.nPlusOneService.getRelationLoading(
      query.limit,
      query.includeData,
    );
  }

  @ApiOperation({ summary: 'Run left-join SQL strategy' })
  @Get('left-join')
  getLeftJoin(@Query() query: NPlusOneQueryDto) {
    return this.nPlusOneService.getLeftJoin(query.limit, query.includeData);
  }

  @ApiOperation({
    summary: 'Compare all strategies over multiple benchmark runs',
  })
  @Get('compare')
  compare(@Query() query: CompareQueryDto) {
    return this.nPlusOneService.compareStrategies(
      query.limit,
      query.includeData,
      query.runs,
    );
  }
}
