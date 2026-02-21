import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NPlusOneQueryDto } from './n-plus-one-query.dto';

export class CompareQueryDto extends NPlusOneQueryDto {
  @ApiPropertyOptional({
    description: 'Number of benchmark runs for each strategy.',
    minimum: 1,
    maximum: 20,
    default: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  runs = 3;
}
