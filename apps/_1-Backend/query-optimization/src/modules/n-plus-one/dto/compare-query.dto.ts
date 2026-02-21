import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { NPlusOneQueryDto } from './n-plus-one-query.dto';

export class CompareQueryDto extends NPlusOneQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  runs = 3;
}
